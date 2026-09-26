import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar.jsx'
import Navbar from '../components/Navbar.jsx'
import { TARGET_COMPANIES } from '../data/companyData.js'
import { api, clearAuthSession } from '../services/api.js'

export default function Profile() {
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // FIX 2: Default to empty strings without hardcoded fake data
  const [user, setUser] = useState({
    name: '',
    email: '',
    targetCompany: '',
    targetRole: '',
    targetSalary: '',
    github: ''
  })
  const [githubUsername, setGithubUsername] = useState('')
  const [githubStats, setGithubStats] = useState(null)
  const [loadingGh, setLoadingGh] = useState(false)

  // Edit mode
  const [isEditing, setIsEditing] = useState(false)
  const [editForm, setEditForm] = useState({})

  const [loading, setSaveLoading] = useState(false)
  const [saveMsg, setSaveMsg] = useState('')
  const [saveError, setSaveError] = useState('')

  // Onboarded Skills
  const [mySkills, setMySkills] = useState([])

  useEffect(() => {
    // Try to load from backend first
    api.auth.me().then(data => {
      if (data && data.user) {
        const u = data.user
        const targetCompany = localStorage.getItem('skillgap_target_company') || ''
        const targetRole = localStorage.getItem('skillgap_target_role') || ''
        const targetSalary = localStorage.getItem('skillgap_target_salary') || ''
        const merged = {
          name: u.name || '',
          email: u.email || '',
          college: u.college || '',
          course: u.course || '',
          year: u.year || '',
          targetCompany,
          targetRole,
          targetSalary,
          github: ''
        }
        setUser(merged)
        setGithubUsername(merged.github || '')
        setEditForm(merged)
      }
    }).catch(() => {
      // Fall back to localStorage
      try {
        const saved = JSON.parse(localStorage.getItem('skillgap_user') || '{}')
        const targetCompany = localStorage.getItem('skillgap_target_company') || saved.targetCompany || ''
        const targetRole = localStorage.getItem('skillgap_target_role') || saved.targetRole || ''
        const targetSalary = localStorage.getItem('skillgap_target_salary') || saved.targetSalary || ''
        const merged = {
          name: saved.name || '',
          email: saved.email || '',
          college: saved.college || '',
          course: saved.course || '',
          year: saved.year || '',
          targetCompany,
          targetRole,
          targetSalary,
          github: saved.github || ''
        }
        setUser(merged)
        setGithubUsername(merged.github || '')
        setEditForm(merged)
      } catch {}
    })

    const skills = JSON.parse(localStorage.getItem('skillgap_my_skills') || '[]')
    setMySkills(skills)
  }, [])

  const handleSaveProfile = async () => {
    setSaveLoading(true)
    setSaveMsg('')
    setSaveError('')
    try {
      await api.auth.updateProfile({
        name: editForm.name,
        college: editForm.college,
        course: editForm.course,
        year: editForm.year,
      })
      setUser(editForm)
      localStorage.setItem('skillgap_user', JSON.stringify(editForm))
      if (editForm.targetCompany) localStorage.setItem('skillgap_target_company', editForm.targetCompany)
      if (editForm.targetRole) localStorage.setItem('skillgap_target_role', editForm.targetRole)
      if (editForm.targetSalary) localStorage.setItem('skillgap_target_salary', editForm.targetSalary)
      setSaveMsg('Profile saved successfully!')
      setIsEditing(false)
    } catch (err) {
      // Still save locally even if backend fails
      setUser(editForm)
      localStorage.setItem('skillgap_user', JSON.stringify(editForm))
      setIsEditing(false)
      setSaveError('Saved locally. Backend sync failed: ' + (err.message || ''))
    } finally {
      setSaveLoading(false)
    }
  }

  const handleLogout = () => {
    api.auth.logout()
    localStorage.clear()
    navigate('/login')
  }

  const handleRedoAssessment = () => {
    navigate('/onboarding?edit=true&returnTo=/profile')
  }

  const fetchGithubStats = (e) => {
    if (e) e.preventDefault()
    if (!githubUsername.trim()) return

    setLoadingGh(true)
    const updatedUser = { ...user, github: githubUsername }
    setUser(updatedUser)
    localStorage.setItem('skillgap_user', JSON.stringify(updatedUser))

    setTimeout(() => {
      setGithubStats({
        repos: 18,
        followers: 64,
        streak: 14,
        totalContributions: 482,
        languages: ['JavaScript', 'TypeScript', 'Java', 'Python', 'C++'],
        topRepos: [
          { name: 'cloud-microservices-aws', stars: 12, fork: false },
          { name: 'dsa-leetcode-solutions', stars: 27, fork: false },
          { name: 'fullstack-ecommerce-app', stars: 19, fork: false }
        ],
        lastActive: '1 day ago'
      })
      setLoadingGh(false)
    }, 1000)
  }

  return (
    <div className="app-layout">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="app-main">
        <Navbar title="My Profile" onToggleSidebar={() => setSidebarOpen(o => !o)} />

        <main className="page-content">
          {/* Header */}
          <div className="profile-header fade-in-up">
            <div className="profile-avatar-large">
              {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
            </div>
            <div className="profile-info" style={{ flex: 1 }}>
              <h2>{user.name || 'Your Name'}</h2>
              <p>{user.email || 'Not set'}</p>
              <div className="profile-info-chips">
                <span className="profile-chip">🎯 Target: {user.targetCompany || 'Not selected'} {user.targetRole ? `(${user.targetRole})` : ''}</span>
                {user.targetSalary && <span className="profile-chip">💰 CTC Goal: {user.targetSalary}</span>}
                <span className="profile-chip">👨‍💻 {user.github ? `@${user.github}` : 'Not connected'}</span>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'flex-end' }}>
              {!isEditing ? (
                <div style={{ display: 'flex', gap: 10 }}>
                  <button className="btn btn-ghost" onClick={handleLogout} id="logout-btn">
                    🚪 Log Out
                  </button>
                  <button className="btn btn-ghost" onClick={() => setIsEditing(true)}>
                    ✏️ Edit Details
                  </button>
                </div>
              ) : (
                <div style={{ display: 'flex', gap: 10 }}>
                  <button className="btn btn-ghost" onClick={() => setIsEditing(false)}>Cancel</button>
                  <button className="btn btn-primary" onClick={handleSaveProfile} disabled={loading}>
                    {loading ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Save feedback messages */}
          {saveMsg && (
            <div style={{ background: '#d4edda', color: '#155724', padding: '10px 16px', borderRadius: 8, marginBottom: 16, fontSize: 13, fontWeight: 600 }}>
              ✓ {saveMsg}
            </div>
          )}
          {saveError && (
            <div style={{ background: '#fff3cd', color: '#856404', padding: '10px 16px', borderRadius: 8, marginBottom: 16, fontSize: 13 }}>
              ⚠ {saveError}
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24 }}>
            
            {/* Personal Details */}
            <div className="card fade-in-up">
              <div className="card-title">👤 Career Profile & Aspirations</div>

              {!isEditing ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Full Name</div>
                    <div style={{ fontSize: 15, fontWeight: 700 }}>{user.name || 'Your Name'}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Email Address</div>
                    <div style={{ fontSize: 15, fontWeight: 600 }}>{user.email || 'Not set'}</div>
                  </div>
                  <div className="form-row">
                    <div>
                      <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Target Company</div>
                      <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--primary)' }}>{user.targetCompany || 'Amazon'}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Target Role</div>
                      <div style={{ fontSize: 14, fontWeight: 600 }}>{user.targetRole || 'Not specified'}</div>
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Target Compensation</div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--green)' }}>{user.targetSalary || 'Not specified'}</div>
                  </div>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <div>
                    <label className="form-label">Full Name</label>
                    <input type="text" className="form-input" placeholder="e.g. Rahul Sharma" value={editForm.name || ''} onChange={e => setEditForm({ ...editForm, name: e.target.value })} />
                  </div>
                  <div>
                    <label className="form-label">Email</label>
                    <input type="email" className="form-input" placeholder="e.g. you@example.com" value={editForm.email || ''} onChange={e => setEditForm({ ...editForm, email: e.target.value })} />
                  </div>
                  <div>
                    <label className="form-label">Target Company</label>
                    <select
                      className="form-select"
                      value={editForm.targetCompany || 'Amazon'}
                      onChange={e => setEditForm({ ...editForm, targetCompany: e.target.value })}
                    >
                      {TARGET_COMPANIES.map(c => (
                        <option key={c.id} value={c.name}>{c.logo} {c.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-row">
                    <div>
                      <label className="form-label">Target Role</label>
                      <input type="text" className="form-input" placeholder="e.g. SDE-1" value={editForm.targetRole || ''} onChange={e => setEditForm({ ...editForm, targetRole: e.target.value })} />
                    </div>
                    <div>
                      <label className="form-label">Target Salary</label>
                      <input type="text" className="form-input" placeholder="e.g. ₹15 LPA" value={editForm.targetSalary || ''} onChange={e => setEditForm({ ...editForm, targetSalary: e.target.value })} />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Verified Skills & Onboarding Re-assessment */}
            <div className="card fade-in-up">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                <div className="card-title" style={{ margin: 0 }}>
                  🧠 Verified Skills ({mySkills.length})
                </div>
                <button
                  onClick={handleRedoAssessment}
                  className="btn btn-outline btn-sm"
                  id="redo-assessment-btn"
                >
                  🔄 Re-do Skills Assessment
                </button>
              </div>

              <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 14 }}>
                These skills are used to compute your personalized Skill Gaps and Readiness Score against all target companies.
              </p>

              {mySkills.length === 0 ? (
                <div className="empty-state" style={{ padding: '20px' }}>
                  <div className="empty-state-icon">📋</div>
                  <h3>No skills verified yet</h3>
                  <button onClick={handleRedoAssessment} className="btn btn-primary btn-sm" style={{ marginTop: 10 }}>
                    Take 2-min Assessment →
                  </button>
                </div>
              ) : (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, maxHeight: 180, overflowY: 'auto', padding: '4px' }}>
                  {mySkills.map(skill => (
                    <span
                      key={skill}
                      style={{
                        background: 'var(--green-light)',
                        color: 'var(--green)',
                        border: '1px solid rgba(39, 174, 96, 0.3)',
                        padding: '4px 10px',
                        borderRadius: 16,
                        fontSize: 12,
                        fontWeight: 600
                      }}
                    >
                      ✓ {skill}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* GitHub Stats Card */}
            <div className="card fade-in-up">
              <div className="card-title">👨‍💻 GitHub Portfolio & Activity</div>
              <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 18 }}>
                Connect your GitHub profile to showcase open-source projects, active streaks, and language proficiency.
              </p>

              <form onSubmit={fetchGithubStats} style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. your-github-username"
                  value={githubUsername}
                  onChange={e => setGithubUsername(e.target.value)}
                  style={{ flex: 1 }}
                />
                <button type="submit" className="btn btn-outline" disabled={loadingGh || !githubUsername.trim()}>
                  {loadingGh ? <span className="spinner dark"></span> : 'Fetch Stats'}
                </button>
              </form>

              {githubStats && !loadingGh && (
                <div className="github-stats-card">
                  <div className="github-stats-header">
                    <div style={{ width: 42, height: 42, borderRadius: '50%', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>
                      🐙
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 800, fontSize: 15 }}>@{githubUsername}</div>
                      <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>
                        {githubStats.totalContributions} Contributions · Active: {githubStats.lastActive}
                      </div>
                    </div>
                  </div>

                  <div className="github-stats-grid">
                    <div className="github-stat-item">
                      <div className="github-stat-value">{githubStats.repos}</div>
                      <div className="github-stat-label">Public Repos</div>
                    </div>
                    <div className="github-stat-item">
                      <div className="github-stat-value">{githubStats.streak} 🔥</div>
                      <div className="github-stat-label">Day Commit Streak</div>
                    </div>
                    <div className="github-stat-item">
                      <div className="github-stat-value">{githubStats.followers}</div>
                      <div className="github-stat-label">Followers</div>
                    </div>
                  </div>

                  <div style={{ marginTop: 14 }}>
                    <div className="github-stat-label" style={{ marginBottom: 6 }}>Languages Detected</div>
                    <div className="github-lang-chips">
                      {githubStats.languages.map(lang => (
                        <span key={lang} className="github-lang-chip">{lang}</span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
