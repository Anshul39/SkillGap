import React, { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar.jsx'
import Navbar from '../components/Navbar.jsx'
import Modal from '../components/Modal.jsx'
import { api } from '../services/api.js'
import {
  CAREER_PORTALS,
  generatePortalJobs,
  JOB_LOCATIONS,
  JOB_TYPES,
  EXPERIENCE_LEVELS,
  ROLE_OPTIONS
} from '../data/careerData.js'

export default function JobDiscovery() {
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [jobs, setJobs] = useState([])
  const [trackedApps, setTrackedApps] = useState([])
  const [userSkills, setUserSkills] = useState([])
  const [selectedJob, setSelectedJob] = useState(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [toastMessage, setToastMessage] = useState(null)
  const [promptTrackJob, setPromptTrackJob] = useState(null)
  const [isConfiguredApi, setIsConfiguredApi] = useState(false)

  // Filters
  const [searchRole, setSearchRole] = useState('any')
  const [searchLocation, setSearchLocation] = useState('Any Location')
  const [searchJobType, setSearchJobType] = useState('any')
  const [searchExperience, setSearchExperience] = useState('any')
  const [searchCompany, setSearchCompany] = useState('any')
  const [minMatch, setMinMatch] = useState(0)
  const [selectedSkillsFilter, setSelectedSkillsFilter] = useState([])

  // Load user skills from localStorage or profile
  useEffect(() => {
    let skills = []
    try {
      const stored = localStorage.getItem('skillgap_my_skills')
      if (stored) {
        skills = JSON.parse(stored)
      } else {
        const user = JSON.parse(localStorage.getItem('skillgap_user') || '{}')
        if (user && user.skills && Array.isArray(user.skills)) {
          skills = user.skills.map(s => (typeof s === 'string' ? s : s.name))
        }
      }
    } catch (e) {
      console.error('Error reading user skills', e)
    }

    if (!skills || skills.length === 0) {
      // Common default skill set if none found yet
      skills = ['Java', 'React', 'JavaScript', 'SQL', 'Data Structures', 'Python']
    }
    setUserSkills(skills)
  }, [])

  // Load tracked applications to detect duplicates
  const loadTrackedApps = async () => {
    try {
      const res = await api.applications.getAll()
      if (res && res.success && res.applications) {
        setTrackedApps(res.applications)
        return
      }
    } catch (err) {
      // Fallback to localStorage
    }
    try {
      const saved = JSON.parse(localStorage.getItem('skillgap_apps') || '[]')
      setTrackedApps(saved)
    } catch {
      setTrackedApps([])
    }
  }

  useEffect(() => {
    loadTrackedApps()
  }, [])

  // Fetch jobs from backend API or fallback to curated data
  useEffect(() => {
    let isMounted = true
    setLoading(true)

    const fetchJobs = async () => {
      try {
        const queryParams = {
          role: searchRole !== 'any' ? searchRole : undefined,
          location: searchLocation !== 'Any Location' ? searchLocation : undefined,
          jobType: searchJobType !== 'any' ? searchJobType : undefined,
          experience: searchExperience !== 'any' ? searchExperience : undefined,
          company: searchCompany !== 'any' ? searchCompany : undefined,
          skills: userSkills.length > 0 ? userSkills.join(',') : undefined,
        }

        const res = await api.jobs.search(queryParams)
        if (isMounted && res && res.success && res.jobs) {
          setIsConfiguredApi(Boolean(res.configured))
          // Recalculate skill match percentage using student's actual skills
          const enriched = res.jobs.map(job => enrichJobWithUserSkills(job, userSkills))
          setJobs(enriched)
          setLoading(false)
          return
        }
      } catch (err) {
        console.warn('Backend job API unavailable, using local curated dataset:', err.message)
      }

      // Local fallback
      if (isMounted) {
        const localJobs = generatePortalJobs({
          role: searchRole !== 'any' ? searchRole : undefined,
          location: searchLocation !== 'Any Location' ? searchLocation : undefined,
          jobType: searchJobType !== 'any' ? searchJobType : undefined,
          experience: searchExperience !== 'any' ? searchExperience : undefined,
          company: searchCompany !== 'any' ? searchCompany : undefined,
          skills: userSkills,
        })
        const enriched = localJobs.map(job => enrichJobWithUserSkills(job, userSkills))
        setJobs(enriched)
        setLoading(false)
      }
    }

    fetchJobs()

    return () => {
      isMounted = false
    }
  }, [searchRole, searchLocation, searchJobType, searchExperience, searchCompany, userSkills])

  // Helper to calculate exact matched and missing skills
  function enrichJobWithUserSkills(job, studentSkills) {
    const studentSkillsLower = (studentSkills || []).map(s => s.toLowerCase().trim())
    const jobSkills = job.skills || []

    const matched = []
    const missing = []

    for (const skill of jobSkills) {
      const sLower = skill.toLowerCase().trim()
      const isMatch = studentSkillsLower.some(
        userSkill => userSkill.includes(sLower) || sLower.includes(userSkill)
      )
      if (isMatch) {
        matched.push(skill)
      } else {
        missing.push(skill)
      }
    }

    const matchPercent = jobSkills.length > 0
      ? Math.round((matched.length / jobSkills.length) * 100)
      : 0

    return {
      ...job,
      matchPercent,
      matchedSkills: matched,
      missingSkills: missing,
    }
  }

  // Filter jobs by minimum match and custom toggled skill chips
  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      if (job.matchPercent < minMatch) return false

      if (selectedSkillsFilter.length > 0) {
        const jobSkillsLower = (job.skills || []).map(s => s.toLowerCase())
        const hasAllSelected = selectedSkillsFilter.every(reqSkill =>
          jobSkillsLower.some(js => js.includes(reqSkill.toLowerCase()) || reqSkill.toLowerCase().includes(js))
        )
        if (!hasAllSelected) return false
      }

      return true
    })
  }, [jobs, minMatch, selectedSkillsFilter])

  // Check if a job is already tracked in the Application Tracker
  const isJobTracked = (job) => {
    return trackedApps.some(app => {
      if (app.jobId && app.jobId === job.id) return true
      if (
        app.company &&
        job.companyName &&
        app.company.toLowerCase().trim() === job.companyName.toLowerCase().trim() &&
        app.role &&
        job.title &&
        app.role.toLowerCase().trim() === job.title.toLowerCase().trim()
      ) {
        return true
      }
      return false
    })
  }

  // Handle Track Application
  const handleTrackApplication = async (job) => {
    try {
      const newAppData = {
        company: job.companyName,
        role: job.title,
        status: 'Applied',
        appliedDate: new Date().toISOString(),
        notes: `Discovered on SkillGap Job Finder. Match score: ${job.matchPercent}%`,
        jobId: job.id,
        applicationUrl: job.applicationUrl,
        location: job.location,
      }

      const res = await api.applications.create(newAppData)
      if (res && res.success) {
        setTrackedApps(prev => [...prev, res.application || newAppData])
      } else {
        // Fallback for offline mode
        const saved = JSON.parse(localStorage.getItem('skillgap_apps') || '[]')
        const updated = [...saved, { ...newAppData, id: 'local-' + Date.now() }]
        localStorage.setItem('skillgap_apps', JSON.stringify(updated))
        setTrackedApps(updated)
      }

      showToast(`🎉 "${job.title} at ${job.companyName}" added to your Application Tracker!`)
      setPromptTrackJob(null)
    } catch (err) {
      console.error('Error tracking application:', err)
      // Save locally if backend fails
      const saved = JSON.parse(localStorage.getItem('skillgap_apps') || '[]')
      const updated = [...saved, {
        company: job.companyName,
        role: job.title,
        status: 'Applied',
        appliedDate: new Date().toISOString().split('T')[0],
        notes: `Discovered on SkillGap Job Finder`,
        jobId: job.id,
        applicationUrl: job.applicationUrl,
        location: job.location,
        id: 'local-' + Date.now()
      }]
      localStorage.setItem('skillgap_apps', JSON.stringify(updated))
      setTrackedApps(updated)
      showToast(`Saved to Application Tracker!`)
      setPromptTrackJob(null)
    }
  }

  // Handle Apply Now
  const handleApplyNow = (job) => {
    window.open(job.applicationUrl, '_blank', 'noopener,noreferrer')
    if (!isJobTracked(job)) {
      setPromptTrackJob(job)
    }
  }

  const showToast = (msg) => {
    setToastMessage(msg)
    setTimeout(() => {
      setToastMessage(null)
    }, 4500)
  }

  const toggleSkillChip = (skill) => {
    setSelectedSkillsFilter(prev =>
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    )
  }

  const handleClearFilters = () => {
    setSearchRole('any')
    setSearchLocation('Any Location')
    setSearchJobType('any')
    setSearchExperience('any')
    setSearchCompany('any')
    setMinMatch(0)
    setSelectedSkillsFilter([])
  }

  // Best match percentage in current listings
  const topMatch = useMemo(() => {
    if (jobs.length === 0) return 0
    return Math.max(...jobs.map(j => j.matchPercent || 0))
  }, [jobs])

  return (
    <div className="app-layout">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="app-main">
        <Navbar title="Job Finder & Discovery" onToggleSidebar={() => setSidebarOpen(o => !o)} />

        <main className="page-content" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

          {/* Toast Notification */}
          {toastMessage && (
            <div
              style={{
                position: 'fixed',
                bottom: 24,
                right: 24,
                backgroundColor: 'var(--primary)',
                color: '#fff',
                padding: '14px 22px',
                borderRadius: 'var(--radius)',
                boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
                zIndex: 9999,
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                animation: 'slideUp 0.3s ease-out',
              }}
            >
              <span>{toastMessage}</span>
              <button
                onClick={() => navigate('/applications')}
                style={{
                  background: 'rgba(255,255,255,0.2)',
                  border: 'none',
                  color: '#fff',
                  padding: '4px 10px',
                  borderRadius: 4,
                  cursor: 'pointer',
                  fontSize: 12,
                }}
              >
                View Tracker →
              </button>
            </div>
          )}

          {/* Page Header */}
          <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <h1 style={{ margin: 0 }}>💼 Job Finder & Discovery</h1>
                <span className="badge badge-primary" style={{ fontSize: 13, padding: '4px 10px' }}>
                  Live Matching
                </span>
              </div>
              <p style={{ marginTop: 6, color: 'var(--text-muted)' }}>
                Discover real opportunities at top companies matched directly against your assessed skills. Apply via official portals and sync directly into your tracker.
              </p>
            </div>

            <button
              className="btn btn-secondary"
              onClick={() => navigate('/applications')}
              style={{ display: 'flex', alignItems: 'center', gap: 8 }}
            >
              <span>📋</span> View Application Tracker ({trackedApps.length})
            </button>
          </div>

          {/* Top Metric Cards */}
          <div className="grid-cards" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: 16 }}>
            <div className="card" style={{ padding: 18, borderLeft: '4px solid var(--primary)' }}>
              <div style={{ fontSize: 13, color: 'var(--text-muted)', fontWeight: 600 }}>AVAILABLE ROLES</div>
              <div style={{ fontSize: 28, fontWeight: 700, marginTop: 4, color: 'var(--text-main)' }}>
                {jobs.length}
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>
                Across {CAREER_PORTALS.length} top tech companies
              </div>
            </div>

            <div className="card" style={{ padding: 18, borderLeft: '4px solid #10b981' }}>
              <div style={{ fontSize: 13, color: 'var(--text-muted)', fontWeight: 600 }}>TOP SKILL MATCH</div>
              <div style={{ fontSize: 28, fontWeight: 700, marginTop: 4, color: '#10b981' }}>
                {topMatch}%
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>
                Based on your profile skills
              </div>
            </div>

            <div className="card" style={{ padding: 18, borderLeft: '4px solid #6366f1' }}>
              <div style={{ fontSize: 13, color: 'var(--text-muted)', fontWeight: 600 }}>TRACKED PIPELINE</div>
              <div style={{ fontSize: 28, fontWeight: 700, marginTop: 4, color: '#6366f1' }}>
                {trackedApps.length}
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>
                Active tracked applications
              </div>
            </div>

            <div className="card" style={{ padding: 18, borderLeft: '4px solid #f59e0b' }}>
              <div style={{ fontSize: 13, color: 'var(--text-muted)', fontWeight: 600 }}>MY SKILLS LOADED</div>
              <div style={{ fontSize: 28, fontWeight: 700, marginTop: 4, color: '#f59e0b' }}>
                {userSkills.length}
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>
                <span
                  style={{ textDecoration: 'underline', cursor: 'pointer' }}
                  onClick={() => navigate('/onboarding')}
                >
                  Update skills in assessment →
                </span>
              </div>
            </div>
          </div>

          {/* Mode Notice Banner */}
          {!isConfiguredApi ? (
            <div
              className="card"
              style={{
                backgroundColor: 'rgba(99, 102, 241, 0.08)',
                borderColor: 'rgba(99, 102, 241, 0.25)',
                padding: '14px 18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: 12,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: 22 }}>ℹ️</span>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>
                    Curated Career Portals Mode
                  </div>
                  <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>
                    Listing official career portal opportunities from Amazon, Google, Microsoft, and 20+ top employers. All links direct straight to verified company career search engines.
                  </div>
                </div>
              </div>
              <span className="badge badge-info" style={{ fontSize: 12 }}>
                Verified Official Portals
              </span>
            </div>
          ) : (
            <div
              className="card"
              style={{
                backgroundColor: 'rgba(16, 185, 129, 0.08)',
                borderColor: 'rgba(16, 185, 129, 0.25)',
                padding: '14px 18px',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
              }}
            >
              <span style={{ fontSize: 22 }}>⚡</span>
              <div>
                <div style={{ fontWeight: 600, fontSize: 14, color: '#10b981' }}>
                  Live External Job API Connected
                </div>
                <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>
                  Real-time live job postings aggregated from external API provider.
                </div>
              </div>
            </div>
          )}

          {/* User Skills Quick Chips */}
          {userSkills.length > 0 && (
            <div className="card" style={{ padding: '14px 18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10, flexWrap: 'wrap', gap: 8 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-muted)' }}>
                  FILTER BY YOUR SKILLS (CLICK TO TOGGLE):
                </div>
                {selectedSkillsFilter.length > 0 && (
                  <button
                    onClick={() => setSelectedSkillsFilter([])}
                    style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', fontSize: 12, fontWeight: 600 }}
                  >
                    Clear skill filters ({selectedSkillsFilter.length})
                  </button>
                )}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {userSkills.map(skill => {
                  const isSelected = selectedSkillsFilter.includes(skill)
                  return (
                    <button
                      key={skill}
                      onClick={() => toggleSkillChip(skill)}
                      style={{
                        background: isSelected ? 'var(--primary)' : 'var(--bg-card)',
                        color: isSelected ? '#fff' : 'var(--text-main)',
                        border: isSelected ? '1px solid var(--primary)' : '1px solid var(--border-color)',
                        borderRadius: 20,
                        padding: '5px 12px',
                        fontSize: 12,
                        cursor: 'pointer',
                        fontWeight: isSelected ? 600 : 500,
                        transition: 'all 0.15s ease',
                      }}
                    >
                      {isSelected ? '✓ ' : '+ '} {skill}
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {/* Filter Bar */}
          <div className="card filter-bar" style={{ padding: 20 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 14 }}>
              {/* Role filter */}
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, marginBottom: 6, color: 'var(--text-muted)' }}>
                  Target Role
                </label>
                <select
                  className="form-control"
                  value={searchRole}
                  onChange={e => setSearchRole(e.target.value)}
                  style={{ width: '100%' }}
                >
                  <option value="any">All Roles</option>
                  {ROLE_OPTIONS.map(r => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>

              {/* Location filter */}
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, marginBottom: 6, color: 'var(--text-muted)' }}>
                  Location
                </label>
                <select
                  className="form-control"
                  value={searchLocation}
                  onChange={e => setSearchLocation(e.target.value)}
                  style={{ width: '100%' }}
                >
                  {JOB_LOCATIONS.map(loc => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
              </div>

              {/* Job Type filter */}
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, marginBottom: 6, color: 'var(--text-muted)' }}>
                  Job Type
                </label>
                <select
                  className="form-control"
                  value={searchJobType}
                  onChange={e => setSearchJobType(e.target.value)}
                  style={{ width: '100%' }}
                >
                  <option value="any">All Types</option>
                  {JOB_TYPES.map(jt => (
                    <option key={jt} value={jt}>{jt}</option>
                  ))}
                </select>
              </div>

              {/* Experience */}
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, marginBottom: 6, color: 'var(--text-muted)' }}>
                  Experience Level
                </label>
                <select
                  className="form-control"
                  value={searchExperience}
                  onChange={e => setSearchExperience(e.target.value)}
                  style={{ width: '100%' }}
                >
                  <option value="any">All Levels</option>
                  {EXPERIENCE_LEVELS.map(exp => (
                    <option key={exp} value={exp}>{exp}</option>
                  ))}
                </select>
              </div>

              {/* Company filter */}
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, marginBottom: 6, color: 'var(--text-muted)' }}>
                  Company
                </label>
                <select
                  className="form-control"
                  value={searchCompany}
                  onChange={e => setSearchCompany(e.target.value)}
                  style={{ width: '100%' }}
                >
                  <option value="any">All Companies</option>
                  {CAREER_PORTALS.map(cp => (
                    <option key={cp.id} value={cp.name}>{cp.name}</option>
                  ))}
                </select>
              </div>

              {/* Match percentage */}
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, marginBottom: 6, color: 'var(--text-muted)' }}>
                  Min Skill Match
                </label>
                <select
                  className="form-control"
                  value={minMatch}
                  onChange={e => setMinMatch(Number(e.target.value))}
                  style={{ width: '100%' }}
                >
                  <option value={0}>Any Match (0%+)</option>
                  <option value={30}>30%+ Match</option>
                  <option value={50}>50%+ Match</option>
                  <option value={70}>70%+ High Match</option>
                </select>
              </div>
            </div>

            <div style={{ marginTop: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12, paddingTop: 12, borderTop: '1px solid var(--border-color)' }}>
              <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>
                Showing <strong>{filteredJobs.length}</strong> matching positions
              </span>
              <button
                className="btn btn-secondary btn-sm"
                onClick={handleClearFilters}
              >
                Reset Filters
              </button>
            </div>
          </div>

          {/* Did you apply prompt dialog */}
          {promptTrackJob && (
            <div
              className="card"
              style={{
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                borderColor: '#10b981',
                padding: '16px 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: 16,
              }}
            >
              <div>
                <div style={{ fontWeight: 700, fontSize: 15, color: '#10b981' }}>
                  🎯 Opened {promptTrackJob.companyName} Career Portal!
                </div>
                <div style={{ fontSize: 13, color: 'var(--text-main)', marginTop: 2 }}>
                  Did you apply for <strong>{promptTrackJob.title}</strong>? Track it now so you can manage follow-ups and OA rounds.
                </div>
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => handleTrackApplication(promptTrackJob)}
                >
                  ✓ Yes, Add to Tracker
                </button>
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => setPromptTrackJob(null)}
                >
                  Not Yet
                </button>
              </div>
            </div>
          )}

          {/* Job Listings Grid */}
          {loading ? (
            <div style={{ textAlign: 'center', padding: '60px 20px' }}>
              <div className="spinner" style={{ margin: '0 auto 16px' }} />
              <p style={{ color: 'var(--text-muted)' }}>Matching opportunities against your skill profile...</p>
            </div>
          ) : filteredJobs.length === 0 ? (
            <div className="card" style={{ textAlign: 'center', padding: '48px 24px' }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>🔍</div>
              <h3 style={{ margin: 0 }}>No matching roles found</h3>
              <p style={{ color: 'var(--text-muted)', maxWidth: 460, margin: '8px auto 20px' }}>
                Try relaxing your filter criteria or minimum skill match percentage to see more available positions.
              </p>
              <button className="btn btn-primary" onClick={handleClearFilters}>
                Reset All Filters
              </button>
            </div>
          ) : (
            <div
              className="job-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(330px, 1fr))',
                gap: 20,
              }}
            >
              {filteredJobs.map(job => {
                const tracked = isJobTracked(job)
                const isHighMatch = job.matchPercent >= 70
                const isMediumMatch = job.matchPercent >= 40

                const badgeColor = isHighMatch ? '#10b981' : isMediumMatch ? '#f59e0b' : '#6366f1'

                return (
                  <div
                    key={job.id}
                    className="card job-card"
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      padding: 20,
                      position: 'relative',
                      border: tracked ? '1px solid #10b981' : undefined,
                      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                    }}
                  >
                    {/* Top Row: Logo, Company, Match Badge */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <div
                          style={{
                            fontSize: 28,
                            width: 44,
                            height: 44,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: 'var(--bg-page)',
                            borderRadius: 'var(--radius)',
                            border: '1px solid var(--border-color)',
                          }}
                        >
                          {job.companyLogo}
                        </div>
                        <div>
                          <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--text-main)' }}>
                            {job.companyName}
                          </div>
                          <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                            {job.category} Company
                          </div>
                        </div>
                      </div>

                      {/* Skill Match Badge */}
                      <div
                        style={{
                          backgroundColor: `${badgeColor}18`,
                          color: badgeColor,
                          border: `1px solid ${badgeColor}40`,
                          borderRadius: 20,
                          padding: '4px 10px',
                          fontSize: 12,
                          fontWeight: 700,
                          display: 'flex',
                          alignItems: 'center',
                          gap: 4,
                        }}
                      >
                        <span>{job.matchPercent}%</span>
                        <span style={{ fontSize: 10, fontWeight: 500 }}>Match</span>
                      </div>
                    </div>

                    {/* Role Title */}
                    <div style={{ marginTop: 14 }}>
                      <h3
                        style={{
                          margin: 0,
                          fontSize: 16,
                          fontWeight: 700,
                          lineHeight: 1.3,
                          color: 'var(--text-main)',
                        }}
                      >
                        {job.title}
                      </h3>
                    </div>

                    {/* Meta info chips */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 12 }}>
                      <span className="badge badge-secondary" style={{ fontSize: 11 }}>
                        📍 {job.location}
                      </span>
                      <span className="badge badge-secondary" style={{ fontSize: 11 }}>
                        💼 {job.jobType}
                      </span>
                      <span className="badge badge-secondary" style={{ fontSize: 11 }}>
                        ⏱️ {job.experience}
                      </span>
                    </div>

                    {/* Skills Match Summary */}
                    <div style={{ marginTop: 14, flex: 1 }}>
                      <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 6 }}>
                        MATCHED SKILLS ({job.matchedSkills?.length || 0}):
                      </div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 8 }}>
                        {job.matchedSkills && job.matchedSkills.length > 0 ? (
                          job.matchedSkills.slice(0, 4).map(skill => (
                            <span
                              key={skill}
                              style={{
                                fontSize: 11,
                                padding: '2px 8px',
                                borderRadius: 12,
                                backgroundColor: 'rgba(16, 185, 129, 0.12)',
                                color: '#10b981',
                                fontWeight: 600,
                              }}
                            >
                              ✓ {skill}
                            </span>
                          ))
                        ) : (
                          <span style={{ fontSize: 11, color: 'var(--text-muted)', fontStyle: 'italic' }}>
                            None yet (see gaps to learn)
                          </span>
                        )}
                        {job.matchedSkills && job.matchedSkills.length > 4 && (
                          <span style={{ fontSize: 11, color: 'var(--text-muted)', alignSelf: 'center' }}>
                            +{job.matchedSkills.length - 4} more
                          </span>
                        )}
                      </div>

                      {/* Missing skills (if any) */}
                      {job.missingSkills && job.missingSkills.length > 0 && (
                        <div>
                          <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 6 }}>
                            SKILLS TO LEARN ({job.missingSkills.length}):
                          </div>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                            {job.missingSkills.slice(0, 3).map(skill => (
                              <span
                                key={skill}
                                style={{
                                  fontSize: 11,
                                  padding: '2px 8px',
                                  borderRadius: 12,
                                  backgroundColor: 'rgba(239, 68, 68, 0.08)',
                                  color: 'var(--danger)',
                                  border: '1px dashed rgba(239, 68, 68, 0.25)',
                                }}
                              >
                                {skill}
                              </span>
                            ))}
                            {job.missingSkills.length > 3 && (
                              <span style={{ fontSize: 11, color: 'var(--text-muted)', alignSelf: 'center' }}>
                                +{job.missingSkills.length - 3} more
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div
                      style={{
                        marginTop: 18,
                        paddingTop: 14,
                        borderTop: '1px solid var(--border-color)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 8,
                      }}
                    >
                      <div style={{ display: 'flex', gap: 8 }}>
                        <button
                          className="btn btn-primary"
                          style={{ flex: 1, padding: '8px 12px', fontSize: 13 }}
                          onClick={() => handleApplyNow(job)}
                        >
                          Apply on Portal ↗
                        </button>
                        <button
                          className="btn btn-secondary"
                          style={{ padding: '8px 12px', fontSize: 13 }}
                          onClick={() => {
                            setSelectedJob(job)
                            setIsDetailOpen(true)
                          }}
                        >
                          Details
                        </button>
                      </div>

                      {/* Track Button */}
                      {tracked ? (
                        <div
                          style={{
                            textAlign: 'center',
                            padding: '6px 10px',
                            backgroundColor: 'rgba(16, 185, 129, 0.1)',
                            color: '#10b981',
                            borderRadius: 'var(--radius)',
                            fontSize: 12,
                            fontWeight: 600,
                          }}
                        >
                          ✓ Already in Application Tracker
                        </div>
                      ) : (
                        <button
                          className="btn btn-secondary btn-sm"
                          style={{ width: '100%', fontSize: 12 }}
                          onClick={() => handleTrackApplication(job)}
                        >
                          + Track in Pipeline
                        </button>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          {/* Quick Career Portals Directory Carousel / Grid */}
          <div className="card" style={{ padding: 24, marginTop: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, flexWrap: 'wrap', gap: 10 }}>
              <div>
                <h3 style={{ margin: 0, fontSize: 16 }}>🌐 Direct Company Career Portals</h3>
                <p style={{ margin: '4px 0 0', fontSize: 13, color: 'var(--text-muted)' }}>
                  Jump directly to verified search pages of all {CAREER_PORTALS.length} top tech employers:
                </p>
              </div>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
                gap: 12,
              }}
            >
              {CAREER_PORTALS.map(portal => (
                <a
                  key={portal.id}
                  href={portal.careerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card"
                  style={{
                    padding: '12px 14px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    textDecoration: 'none',
                    color: 'var(--text-main)',
                    border: '1px solid var(--border-color)',
                    transition: 'border-color 0.2s, transform 0.2s',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'var(--primary)'
                    e.currentTarget.style.transform = 'translateY(-2px)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'var(--border-color)'
                    e.currentTarget.style.transform = 'translateY(0)'
                  }}
                >
                  <span style={{ fontSize: 22 }}>{portal.logo}</span>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 13 }}>{portal.name}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Official Portal ↗</div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Job Detail Modal */}
          {selectedJob && (
            <Modal
              isOpen={isDetailOpen}
              onClose={() => {
                setIsDetailOpen(false)
                setSelectedJob(null)
              }}
              title={`${selectedJob.companyLogo} ${selectedJob.title} — ${selectedJob.companyName}`}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {/* Header details */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12, paddingBottom: 16, borderBottom: '1px solid var(--border-color)' }}>
                  <div>
                    <h3 style={{ margin: 0, fontSize: 20 }}>{selectedJob.title}</h3>
                    <div style={{ fontSize: 14, color: 'var(--text-muted)', marginTop: 4 }}>
                      {selectedJob.companyName} • {selectedJob.category} Tier • 📍 {selectedJob.location}
                    </div>
                  </div>
                  <div
                    style={{
                      backgroundColor: selectedJob.matchPercent >= 70 ? '#10b98120' : '#f59e0b20',
                      color: selectedJob.matchPercent >= 70 ? '#10b981' : '#f59e0b',
                      padding: '8px 16px',
                      borderRadius: 20,
                      fontWeight: 700,
                      fontSize: 16,
                    }}
                  >
                    {selectedJob.matchPercent}% Match
                  </div>
                </div>

                {/* Job Specs */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
                  <div className="card" style={{ padding: 12, textAlign: 'center' }}>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>JOB TYPE</div>
                    <div style={{ fontWeight: 600, marginTop: 4 }}>{selectedJob.jobType}</div>
                  </div>
                  <div className="card" style={{ padding: 12, textAlign: 'center' }}>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>EXPERIENCE</div>
                    <div style={{ fontWeight: 600, marginTop: 4 }}>{selectedJob.experience}</div>
                  </div>
                  <div className="card" style={{ padding: 12, textAlign: 'center' }}>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>SOURCE</div>
                    <div style={{ fontWeight: 600, marginTop: 4 }}>{selectedJob.sourceName}</div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h4 style={{ margin: '0 0 8px 0', fontSize: 14 }}>Role Overview</h4>
                  <p style={{ margin: 0, color: 'var(--text-muted)', lineHeight: 1.6, fontSize: 14 }}>
                    {selectedJob.description}
                  </p>
                </div>

                {/* Skill Match Breakdown */}
                <div>
                  <h4 style={{ margin: '0 0 12px 0', fontSize: 14 }}>Detailed Skills Breakdown</h4>
                  
                  <div style={{ marginBottom: 12 }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: '#10b981', marginBottom: 6 }}>
                      ✓ Your Matching Skills ({selectedJob.matchedSkills?.length || 0}):
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                      {selectedJob.matchedSkills && selectedJob.matchedSkills.length > 0 ? (
                        selectedJob.matchedSkills.map(s => (
                          <span
                            key={s}
                            style={{
                              fontSize: 12,
                              padding: '4px 10px',
                              borderRadius: 14,
                              backgroundColor: 'rgba(16, 185, 129, 0.15)',
                              color: '#10b981',
                              fontWeight: 600,
                            }}
                          >
                            ✓ {s}
                          </span>
                        ))
                      ) : (
                        <span style={{ fontSize: 12, color: 'var(--text-muted)', fontStyle: 'italic' }}>
                          No matched skills yet.
                        </span>
                      )}
                    </div>
                  </div>

                  <div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--danger)', marginBottom: 6 }}>
                      ⚠️ Skills to Learn / Bridge ({selectedJob.missingSkills?.length || 0}):
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                      {selectedJob.missingSkills && selectedJob.missingSkills.length > 0 ? (
                        selectedJob.missingSkills.map(s => (
                          <span
                            key={s}
                            style={{
                              fontSize: 12,
                              padding: '4px 10px',
                              borderRadius: 14,
                              backgroundColor: 'rgba(239, 68, 68, 0.08)',
                              color: 'var(--danger)',
                              border: '1px dashed rgba(239, 68, 68, 0.25)',
                            }}
                          >
                            {s}
                          </span>
                        ))
                      ) : (
                        <span style={{ fontSize: 12, color: '#10b981', fontWeight: 600 }}>
                          🎉 You have all the required core skills!
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Footer buttons */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 16, borderTop: '1px solid var(--border-color)', flexWrap: 'wrap', gap: 10 }}>
                  <button
                    className="btn btn-secondary"
                    onClick={() => {
                      setIsDetailOpen(false)
                      navigate('/skill-gap-report')
                    }}
                  >
                    View In Skill Gap Report →
                  </button>

                  <div style={{ display: 'flex', gap: 10 }}>
                    {!isJobTracked(selectedJob) && (
                      <button
                        className="btn btn-secondary"
                        onClick={() => handleTrackApplication(selectedJob)}
                      >
                        + Add to Tracker
                      </button>
                    )}
                    <button
                      className="btn btn-primary"
                      onClick={() => handleApplyNow(selectedJob)}
                    >
                      Apply on Official Site ↗
                    </button>
                  </div>
                </div>
              </div>
            </Modal>
          )}

        </main>
      </div>
    </div>
  )
}
