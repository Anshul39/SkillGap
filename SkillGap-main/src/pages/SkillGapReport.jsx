import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar.jsx'
import Navbar from '../components/Navbar.jsx'
import ProgressBar from '../components/ProgressBar.jsx'
import { TARGET_COMPANIES, SALARY_GROUPS, getCompanyAnalysis } from '../data/companyData.js'
import { generatePortalJobs } from '../data/careerData.js'
import { api } from '../services/api.js'

export default function SkillGapReport() {
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [filter, setFilter] = useState('All')
  const [isPreviewMode, setIsPreviewMode] = useState(false)

  const mode = localStorage.getItem('skillgap_mode') || 'company'
  const salaryGroup = localStorage.getItem('skillgap_salary_group') || '5-8lpa'

  // Active company & role
  const [companyId, setCompanyId] = useState(() => {
    return localStorage.getItem('skillgap_target_company_id') || 'amazon'
  })
  const [roleId, setRoleId] = useState(() => {
    return localStorage.getItem('skillgap_target_role_id') || 'amazon-sde1'
  })

  const [analysis, setAnalysis] = useState(() => {
    const saved = localStorage.getItem('skillgap_analysis_data')
    if (saved) {
      try { return JSON.parse(saved) } catch (e) {}
    }
    return getCompanyAnalysis(companyId, roleId, mode, salaryGroup)
  })

  // Backend skill gap data
  const [backendGap, setBackendGap] = useState(null)

  useEffect(() => {
    api.skillgap.get().then(data => {
      if (data && data.success) {
        setBackendGap(data)
      }
    }).catch(() => {
      // Backend unavailable — continue with local data
    })
  }, [])

  // Read student's real skills from onboarding
  const mySkills = (() => {
    try {
      return JSON.parse(localStorage.getItem('skillgap_my_skills') || '[]')
    } catch { return [] }
  })()

  // Compute dynamicSkillsHave & dynamicSkillsNeed
  const dynamicSkillsHave = mySkills.length > 0
    ? analysis.skillsHave.filter(s =>
        mySkills.some(ms => s.name.toLowerCase().includes(ms.toLowerCase()) || ms.toLowerCase().includes(s.name.toLowerCase()))
      )
    : analysis.skillsHave

  const dynamicSkillsNeed = mySkills.length > 0
    ? analysis.skillsNeed.filter(s =>
        !mySkills.some(ms => s.name.toLowerCase().includes(ms.toLowerCase()) || ms.toLowerCase().includes(s.name.toLowerCase()))
      )
    : analysis.skillsNeed

  // Use backend summary if available
  const backendSummary = backendGap?.summary
  const highGapCount = backendSummary?.high ?? dynamicSkillsNeed.filter(s => s.priority === 'High').length
  const mediumGapCount = backendSummary?.medium ?? dynamicSkillsNeed.filter(s => s.priority === 'Medium').length

  // FIX 4: Exact key matching Roadmap page
  const roadmapKey = `skillgap_roadmap_${analysis.id}`
  const savedRoadmap = (() => {
    try { return JSON.parse(localStorage.getItem(roadmapKey) || 'null') }
    catch { return null }
  })() || analysis.roadmap || []

  const roadmapDone = savedRoadmap.reduce((acc, m) => acc + (m.tasks || []).filter(t => t.done).length, 0)
  const roadmapTotal = Math.max((analysis.roadmap || []).reduce((acc, m) => acc + (m.tasks || []).length, 0), 1)

  const dynamicReadinessScore = Math.min(100, Math.round(
    ((dynamicSkillsHave.length / Math.max(analysis.skillsHave.length + analysis.skillsNeed.length, 1)) * 50) +
    ((analysis.atsBaseline / 100) * 30) +
    ((roadmapDone / roadmapTotal) * 20)
  ))

  // FIX 7: Preview-only switch without silently overwriting active target
  const handlePreviewSwitch = (newCompId, newRoleId) => {
    setCompanyId(newCompId)
    setRoleId(newRoleId)
    const newAnalysis = getCompanyAnalysis(newCompId, newRoleId, 'company', salaryGroup)
    setAnalysis(newAnalysis)
    const activeStoredTarget = localStorage.getItem('skillgap_target_company_id') || 'amazon'
    setIsPreviewMode(newCompId !== activeStoredTarget)
  }

  // FIX 7: Explicitly sets as permanent target
  const handleSetAsTarget = () => {
    localStorage.setItem('skillgap_mode', 'company')
    localStorage.setItem('skillgap_target_company_id', companyId)
    localStorage.setItem('skillgap_target_role_id', roleId)
    localStorage.setItem('skillgap_target_company', analysis.companyName)
    localStorage.setItem('skillgap_target_role', analysis.roleTitle)
    localStorage.setItem('skillgap_target_salary', analysis.typicalSalary)
    localStorage.setItem('skillgap_analysis_data', JSON.stringify(analysis))

    try {
      const u = JSON.parse(localStorage.getItem('skillgap_user') || '{}')
      u.targetCompany = analysis.companyName
      u.targetRole = analysis.roleTitle
      u.targetSalary = analysis.typicalSalary
      localStorage.setItem('skillgap_user', JSON.stringify(u))
    } catch (e) {}

    // Sync to backend
    api.targets.getAll().then(res => {
      if (res && res.targets) {
        const match = res.targets.find(t =>
          t.name.toLowerCase().includes(analysis.companyName.toLowerCase()) ||
          analysis.companyName.toLowerCase().includes(t.name.toLowerCase())
        ) || res.targets[0]
        if (match) {
          api.targets.selectTarget(match._id).then(() => {
            api.roadmap.generate().catch(() => {})
          }).catch(() => {})
        }
      }
    }).catch(() => {})

    setIsPreviewMode(false)
  }

  const filteredSkillsNeed = filter === 'All'
    ? dynamicSkillsNeed
    : dynamicSkillsNeed.filter(s => s.priority === filter)

  return (
    <div className="app-layout">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="app-main">
        <Navbar title={`Skill Gap Report — ${analysis.companyName}`} onToggleSidebar={() => setSidebarOpen(o => !o)} />

        <main className="page-content">

          {/* Missing Onboarding Warning (Change 5) */}
          {mySkills.length === 0 && (
            <div style={{
              background: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)',
              border: '2px solid #f59e0b',
              borderRadius: 'var(--radius)',
              padding: '20px 24px',
              marginBottom: 24,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 16,
              boxShadow: '0 4px 12px rgba(245, 158, 11, 0.15)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, flex: 1, minWidth: 280 }}>
                <span style={{ fontSize: 32 }}>⚡</span>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 800, color: '#92400e', marginBottom: 4 }}>
                    Notice: Estimated Baseline Results
                  </div>
                  <div style={{ fontSize: 14, color: '#78350f', lineHeight: 1.5 }}>
                    These results are estimated based on a typical student profile. Complete your 2-minute skill check to see your real gaps.
                  </div>
                </div>
              </div>
              <button
                onClick={() => navigate('/onboarding?returnTo=/skill-gap-report')}
                className="btn btn-primary"
                style={{
                  background: '#d97706',
                  borderColor: '#b45309',
                  color: 'white',
                  fontWeight: 800,
                  fontSize: 15,
                  padding: '12px 24px',
                  boxShadow: '0 4px 10px rgba(217, 119, 6, 0.3)'
                }}
              >
                Complete Skill Assessment →
              </button>
            </div>
          )}

          {/* Preview Mode Notification Banner (FIX 7) */}
          {isPreviewMode && (
            <div style={{
              background: '#fff9db',
              border: '1.5px solid #f59f00',
              borderRadius: 8,
              padding: '12px 18px',
              marginBottom: 20,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 12
            }}>
              <span style={{ fontSize: 13, color: '#664d03', fontWeight: 600 }}>
                👀 Previewing <strong>{analysis.companyName} ({analysis.roleTitle})</strong> — this is not your active saved target yet.
              </span>
              <button
                onClick={handleSetAsTarget}
                className="btn btn-sm"
                style={{ background: '#f59f00', color: 'white', fontWeight: 700 }}
              >
                ✅ Set as My Target
              </button>
            </div>
          )}

          {/* Header */}
          <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                <h1>🎯 Skill Gap Analysis: {analysis.companyName}</h1>
                <span className="navbar-badge" style={{ fontSize: 13 }}>{analysis.badge}</span>
              </div>
              <p>Target: <strong>{analysis.roleTitle}</strong> · Expected Compensation: <strong style={{ color: 'var(--primary)' }}>{analysis.typicalSalary}</strong></p>
            </div>

            <button
              className="btn btn-primary"
              onClick={() => navigate('/roadmap')}
              id="generate-roadmap-btn-top"
            >
              🗺️ Open Tailored Roadmap →
            </button>
          </div>

          {/* Quick Target Switcher Pill Bar (Preview only - FIX 7) */}
          <div className="card" style={{ marginBottom: 24, padding: '14px 18px', background: 'var(--white)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8, flexWrap: 'wrap', gap: 8 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                ⚡ Click company pill to preview differential skill gaps:
              </div>
              <button
                onClick={() => navigate('/upload-resume')}
                style={{ background: 'none', border: 'none', color: 'var(--primary)', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}
              >
                + View all 20+ companies & salary groups →
              </button>
            </div>
            <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4 }}>
              {TARGET_COMPANIES.map(c => {
                const isSelected = c.id === companyId
                return (
                  <button
                    key={c.id}
                    onClick={() => handlePreviewSwitch(c.id, c.roles[0].id)}
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: 6,
                      padding: '7px 14px', borderRadius: 20, fontSize: 13,
                      fontWeight: 600, border: isSelected ? '1.5px solid var(--primary)' : '1px solid var(--mid-gray)',
                      background: isSelected ? 'var(--primary-glow)' : 'var(--light-gray)',
                      color: isSelected ? 'var(--primary)' : 'var(--dark)',
                      cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all 0.2s'
                    }}
                  >
                    <span>{c.logo}</span>
                    <span>{c.name}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Summary Stat Tiles */}
          <div style={{
            background: 'linear-gradient(135deg, #1a1a1a 0%, #2c0a07 100%)',
            borderRadius: 'var(--radius)',
            padding: '22px 28px',
            marginBottom: 24,
            display: 'flex',
            gap: 20,
            flexWrap: 'wrap',
            border: '1px solid rgba(192,57,43,0.3)',
            boxShadow: 'var(--shadow)'
          }}>
            {[
              { label: 'Your Verified Skills', value: dynamicSkillsHave.length, color: '#2ecc71', icon: '✅' },
              { label: 'Identified Skill Gaps', value: dynamicSkillsNeed.length, color: '#e74c3c', icon: '❌' },
              { label: 'High Priority (🔴 Must-Have)', value: dynamicSkillsNeed.filter(s => s.priority === 'High').length, color: '#e74c3c', icon: '🔥' },
              { label: 'Calculated Readiness Score', value: `${dynamicReadinessScore}/100`, color: '#f1c40f', icon: '🏆' },
            ].map((s, i) => (
              <div key={i} style={{ flex: 1, minWidth: 130, textAlign: 'center' }}>
                <div style={{ fontSize: 22, marginBottom: 2 }}>{s.icon}</div>
                <div style={{ fontSize: 24, fontWeight: 800, color: s.color }}>{s.value}</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', fontWeight: 500 }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Two Columns: Skills You Have vs Skills You Need */}
          <div className="skill-panels">
            {/* Skills You Have */}
            <div className="card">
              <div className="card-title" style={{ color: 'var(--green)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span>✅ Skills You Have ({dynamicSkillsHave.length})</span>
                <span style={{
                  fontSize: 12, background: 'var(--green-light)',
                  color: 'var(--green)', padding: '3px 10px', borderRadius: 20, fontWeight: 700
                }}>
                  {mySkills.length > 0 ? 'Verified in Assessment' : 'Standard Baseline'}
                </span>
              </div>
              <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 14 }}>
                Skills verified in your profile that match {analysis.companyName}'s prerequisites.
              </p>

              {dynamicSkillsHave.length === 0 ? (
                <div className="empty-state" style={{ padding: '20px' }}>
                  <p>No verified matching skills found yet. Take the skill assessment!</p>
                </div>
              ) : (
                dynamicSkillsHave.map((s, i) => (
                  <div key={i} className="skill-item have">
                    <div className="skill-item-left">
                      <span className="skill-check">✓</span>
                      <span style={{ fontWeight: 600 }}>{s.name}</span>
                    </div>
                    <span style={{
                      fontSize: 11, fontWeight: 600, padding: '2px 8px',
                      background: 'rgba(39,174,96,0.15)', color: 'var(--green)',
                      borderRadius: 20
                    }}>
                      {s.level || 'Verified'}
                    </span>
                  </div>
                ))
              )}
            </div>

            {/* Skills You Need */}
            <div className="card">
              <div className="card-title" style={{ color: 'var(--red)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span>❌ Skills You Need ({dynamicSkillsNeed.length})</span>
                <span style={{
                  fontSize: 12, background: 'var(--red-light)',
                  color: 'var(--red)', padding: '3px 10px', borderRadius: 20, fontWeight: 700
                }}>
                  {dynamicSkillsNeed.filter(s => s.priority === 'High').length} High Priority
                </span>
              </div>

              {/* Priority Filter */}
              <div style={{ display: 'flex', gap: 6, marginBottom: 14 }}>
                {['All', 'High', 'Medium', 'Low'].map(f => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    style={{
                      padding: '4px 12px', borderRadius: 20, fontSize: 12,
                      fontWeight: 600, border: 'none', cursor: 'pointer',
                      background: filter === f ? 'var(--primary)' : 'var(--light-gray)',
                      color: filter === f ? 'white' : 'var(--text-secondary)',
                      transition: 'all 0.2s'
                    }}
                  >
                    {f} {f === 'High' ? '🔴' : f === 'Medium' ? '🟡' : f === 'Low' ? '🟢' : ''}
                  </button>
                ))}
              </div>

              {filteredSkillsNeed.length === 0 ? (
                <div className="empty-state" style={{ padding: '24px' }}>
                  <div className="empty-state-icon">🎉</div>
                  <h3>No {filter} priority gaps identified!</h3>
                </div>
              ) : (
                filteredSkillsNeed.map((s, i) => (
                  <div key={i} className="skill-item need" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: 6 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                      <div className="skill-item-left">
                        <span className="skill-cross">✗</span>
                        <span style={{ fontWeight: 700, fontSize: 14 }}>{s.name}</span>
                      </div>
                      <span className={`badge badge-${s.priorityClass}`}>
                        {s.emoji} {s.priority} Priority
                      </span>
                    </div>
                    <div style={{
                      fontSize: 12,
                      color: 'var(--text-secondary)',
                      padding: '8px 12px',
                      background: 'var(--light-gray)',
                      borderRadius: 6,
                      marginTop: 4,
                      lineHeight: 1.4,
                      width: '100%'
                    }}>
                      <strong style={{ color: 'var(--dark)' }}>You need this because:</strong> {s.desc}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Target Match Category Score Bars */}
          <div className="card" style={{ marginBottom: 24 }}>
            <div className="card-title">
              📊 Target Category Breakdown for {analysis.companyName}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px 32px' }}>
              {(analysis.matchScores || []).map((m, i) => (
                <ProgressBar key={i} label={m.label} value={m.value} color={m.color} />
              ))}
            </div>
          </div>

          {/* Real-World Interview Pipeline */}
          {analysis.interviewRounds && (
            <div className="card" style={{ marginBottom: 24, background: '#fafbfc' }}>
              <div className="card-title">
                🏢 {analysis.companyName} Interview Pipeline & Selection Rounds
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {analysis.interviewRounds.map((round, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex', alignItems: 'flex-start', gap: 12,
                      padding: '12px 16px', background: 'var(--white)',
                      borderRadius: 8, border: '1px solid var(--mid-gray)'
                    }}
                  >
                    <div style={{
                      width: 28, height: 28, borderRadius: '50%',
                      background: 'var(--primary-glow)', color: 'var(--primary)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontWeight: 800, fontSize: 13, flexShrink: 0
                    }}>
                      {idx + 1}
                    </div>
                    <div style={{ fontSize: 13, color: 'var(--dark)', fontWeight: 500, paddingTop: 4 }}>
                      {round}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Change 5: Personalised Summary Box */}
          {(() => {
            const topMissingSkill = dynamicSkillsNeed.find(s => s.priority === 'High')?.name || dynamicSkillsNeed[0]?.name || 'core technical skills'
            const nGaps = dynamicSkillsNeed.length
            return (
              <div style={{
                background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
                borderRadius: 'var(--radius)',
                padding: '28px 32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: 20,
                border: '1px solid #334155',
                boxShadow: 'var(--shadow-lg)'
              }}>
                <div style={{ maxWidth: 640 }}>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(239, 68, 68, 0.2)', color: '#f87171', padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 700, marginBottom: 10 }}>
                    <span>🎯 Personalised Gap Summary</span>
                  </div>
                  <div style={{ fontSize: 18, fontWeight: 700, color: 'white', marginBottom: 8, lineHeight: 1.5 }}>
                    To get from your current profile to <strong>{analysis.companyName} {analysis.roleTitle}</strong> readiness, you need to close <strong>{nGaps} skill gaps</strong>.
                  </div>
                  <div style={{ fontSize: 14, color: '#94a3b8', lineHeight: 1.6 }}>
                    Your highest-priority gap is <span style={{ color: '#f87171', fontWeight: 700 }}>{topMissingSkill}</span>. Start with the roadmap.
                  </div>
                </div>
                <button
                  className="btn btn-primary btn-lg"
                  onClick={() => navigate('/roadmap')}
                  id="generate-roadmap-btn"
                  style={{
                    padding: '14px 28px',
                    fontSize: 15,
                    fontWeight: 800,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8
                  }}
                >
                  🗺️ Start With Roadmap →
                </button>
              </div>
            )
          })()}

          {/* ── LIVE JOBS MATCHING YOUR SKILLS (JOB DISCOVERY INTEGRATION) ── */}
          {(() => {
            const rawMatching = generatePortalJobs({ skills: mySkills })
            const topJobs = rawMatching.slice(0, 4)

            return (
              <div className="card" style={{ marginTop: 24, padding: 24, borderTop: '4px solid #10b981' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, flexWrap: 'wrap', gap: 12 }}>
                  <div>
                    <div className="card-title" style={{ margin: 0, display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span>🔥</span> Live Jobs Matching Your Current Skills
                    </div>
                    <p style={{ margin: '4px 0 0', fontSize: 13, color: 'var(--text-muted)' }}>
                      Based on your assessed skills, you have immediate match potential for these active roles:
                    </p>
                  </div>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => navigate('/jobs')}
                    style={{ display: 'flex', alignItems: 'center', gap: 6 }}
                  >
                    Explore All in Job Finder ({rawMatching.length}) →
                  </button>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
                  {topJobs.map(job => {
                    const isHighMatch = job.matchPercent >= 70
                    const isMediumMatch = job.matchPercent >= 40
                    const badgeColor = isHighMatch ? '#10b981' : isMediumMatch ? '#f59e0b' : '#6366f1'

                    return (
                      <div
                        key={job.id}
                        style={{
                          background: 'var(--light-gray)',
                          border: '1px solid var(--mid-gray)',
                          borderRadius: 'var(--radius)',
                          padding: 16,
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                          gap: 12,
                        }}
                      >
                        <div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                              <span style={{ fontSize: 24 }}>{job.companyLogo}</span>
                              <div>
                                <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--dark)' }}>
                                  {job.companyName}
                                </div>
                                <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                                  {job.location} • {job.jobType}
                                </div>
                              </div>
                            </div>
                            <span
                              style={{
                                background: `${badgeColor}18`,
                                color: badgeColor,
                                border: `1px solid ${badgeColor}40`,
                                padding: '3px 8px',
                                borderRadius: 12,
                                fontSize: 11,
                                fontWeight: 700,
                              }}
                            >
                              {job.matchPercent}% Match
                            </span>
                          </div>

                          <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--dark)', marginTop: 10 }}>
                            {job.title}
                          </div>

                          {/* Matching skills */}
                          <div style={{ marginTop: 8 }}>
                            <div style={{ fontSize: 11, fontWeight: 600, color: '#10b981', marginBottom: 4 }}>
                              ✓ Matching ({job.matchedSkills?.length || 0}):
                            </div>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                              {(job.matchedSkills || []).slice(0, 3).map(s => (
                                <span
                                  key={s}
                                  style={{
                                    fontSize: 10,
                                    padding: '2px 6px',
                                    borderRadius: 10,
                                    background: 'rgba(16, 185, 129, 0.12)',
                                    color: '#10b981',
                                    fontWeight: 600,
                                  }}
                                >
                                  {s}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
                          <button
                            className="btn btn-primary btn-sm"
                            style={{ flex: 1, fontSize: 12 }}
                            onClick={() => window.open(job.applicationUrl, '_blank', 'noopener,noreferrer')}
                          >
                            Apply ↗
                          </button>
                          <button
                            className="btn btn-secondary btn-sm"
                            style={{ fontSize: 12 }}
                            onClick={() => navigate('/jobs')}
                          >
                            Details
                          </button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })()}
        </main>
      </div>
    </div>
  )
}
