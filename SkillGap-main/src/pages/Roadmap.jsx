import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar.jsx'
import Navbar from '../components/Navbar.jsx'
import { TARGET_COMPANIES, SALARY_GROUPS, getCompanyAnalysis } from '../data/companyData.js'
import { api } from '../services/api.js'

export default function Roadmap() {
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const mode = localStorage.getItem('skillgap_mode') || 'company'
  const salaryGroup = localStorage.getItem('skillgap_salary_group') || '5-8lpa'

  // Target company & role
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

  // Roadmap task state stored by company key for separate progress tracking
  const roadmapKey = `skillgap_roadmap_${analysis.id || analysis.companyId || 'default'}`
  const [roadmap, setRoadmap] = useState([])
  const [backendRoadmap, setBackendRoadmap] = useState([])

  // Read student's real skills from onboarding (Change 6)
  const mySkills = (() => {
    try {
      return JSON.parse(localStorage.getItem('skillgap_my_skills') || '[]')
    } catch { return [] }
  })()

  const dynamicSkillsNeed = mySkills.length > 0
    ? (analysis.skillsNeed || []).filter(s =>
        !mySkills.some(ms => s.name.toLowerCase().includes(ms.toLowerCase()) || ms.toLowerCase().includes(s.name.toLowerCase()))
      )
    : (analysis.skillsNeed || [])

  // Match roadmap tasks to skill gaps
  const getMonthCoveredSkills = (month) => {
    const textToSearch = `${month.title || ''} ${(month.tasks || []).map(t => t.label || '').join(' ')}`.toLowerCase()
    return dynamicSkillsNeed.filter(s => {
      const sName = s.name.toLowerCase()
      if (textToSearch.includes(sName)) return true
      const words = sName.split(/[\s/,]+/).filter(w => w.length >= 4)
      return words.some(w => textToSearch.includes(w))
    })
  }

  // Load roadmap — try backend first, then localStorage, then companyData default
  useEffect(() => {
    // Try to fetch from backend
    api.roadmap.get().then(data => {
      if (data && data.success && data.roadmap && data.roadmap.length > 0) {
        setBackendRoadmap(data.roadmap)
      } else {
        // Try generating if user has a target
        return api.roadmap.generate()
      }
    }).then(genData => {
      if (genData && genData.success && genData.roadmap && genData.roadmap.length > 0) {
        setBackendRoadmap(genData.roadmap)
      }
    }).catch(() => {
      // Backend unavailable — use local data
    })

    // Always load local roadmap for the rich timeline view
    const saved = localStorage.getItem(roadmapKey)
    if (saved) {
      try {
        setRoadmap(JSON.parse(saved))
        return
      } catch (e) {}
    }
    const activeAnalysis = getCompanyAnalysis(companyId, roleId, mode, salaryGroup)
    setRoadmap(activeAnalysis.roadmap || [])
  }, [companyId, roleId, roadmapKey, mode, salaryGroup])

  // Save when changed — also sync to backend
  const handleToggleTask = (monthId, taskId) => {
    setRoadmap(prev => {
      const updated = prev.map(m => {
        if (m.id !== monthId) return m
        return {
          ...m,
          tasks: m.tasks.map(t => t.id === taskId ? { ...t, done: !t.done } : t)
        }
      })
      localStorage.setItem(roadmapKey, JSON.stringify(updated))
      return updated
    })
    // Also toggle in backend if we have backend roadmap tasks
    if (backendRoadmap.length > 0) {
      api.roadmap.toggleTask(taskId, true).catch(() => {/* ignore */})
    }
  }

  const handleCompanySwitch = (newCompId, newRoleId) => {
    setCompanyId(newCompId)
    setRoleId(newRoleId)
    const newAnalysis = getCompanyAnalysis(newCompId, newRoleId, 'company', salaryGroup)
    setAnalysis(newAnalysis)
    localStorage.setItem('skillgap_mode', 'company')
    localStorage.setItem('skillgap_target_company_id', newCompId)
    localStorage.setItem('skillgap_target_role_id', newRoleId)
    localStorage.setItem('skillgap_target_company', newAnalysis.companyName)
    localStorage.setItem('skillgap_target_role', newAnalysis.roleTitle)
    localStorage.setItem('skillgap_analysis_data', JSON.stringify(newAnalysis))

    // Sync to backend
    api.targets.getAll().then(res => {
      if (res && res.targets) {
        const match = res.targets.find(t =>
          t.name.toLowerCase().includes(newAnalysis.companyName.toLowerCase()) ||
          newAnalysis.companyName.toLowerCase().includes(t.name.toLowerCase())
        ) || res.targets[0]
        if (match) {
          api.targets.selectTarget(match._id).then(() => {
            api.roadmap.generate().then(genRes => {
              if (genRes && genRes.roadmap) setBackendRoadmap(genRes.roadmap)
            }).catch(() => {})
          }).catch(() => {})
        }
      }
    }).catch(() => {})
  }

  const handleResetProgress = () => {
    if (window.confirm(`Reset roadmap progress for ${analysis.companyName}?`)) {
      const activeAnalysis = getCompanyAnalysis(companyId, roleId, mode, salaryGroup)
      setRoadmap(activeAnalysis.roadmap || [])
      localStorage.removeItem(roadmapKey)
    }
  }

  const handlePrint = () => {
    window.print()
  }

  // Calculate metrics
  const totalTasks = roadmap.reduce((acc, m) => acc + (m.tasks || []).length, 0)
  const completedTasks = roadmap.reduce((acc, m) => acc + (m.tasks || []).filter(t => t.done).length, 0)
  const progressPct = totalTasks ? Math.round((completedTasks / totalTasks) * 100) : 0

  return (
    <div className="app-layout">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="app-main">
        <Navbar title={`Preparation Roadmap — ${analysis.companyName}`} onToggleSidebar={() => setSidebarOpen(o => !o)} />

        <main className="page-content print-content">
          
          {/* Header with Print / Export Action (FIX 8) */}
          <div className="page-header no-print" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                <h1>🗺️ {analysis.companyName} Preparation Roadmap</h1>
                <span className="navbar-badge">{analysis.badge}</span>
              </div>
              <p>Target: <strong>{analysis.roleTitle}</strong> · Structured preparation milestones for clearing the interview rounds.</p>
            </div>

            <div style={{ display: 'flex', gap: 10 }}>
              <button className="btn btn-outline" onClick={handlePrint} id="print-roadmap-btn">
                🖨️ Print / Export PDF
              </button>
              <button className="btn btn-outline" onClick={() => navigate('/skill-gap-report')}>
                ← View Skill Gaps
              </button>
            </div>
          </div>

          {/* Quick Target Switcher (Hidden in print) */}
          <div className="card no-print" style={{ marginBottom: 24, padding: '12px 16px', background: 'var(--white)' }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Switch Target Roadmap:
            </div>
            <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4 }}>
              {TARGET_COMPANIES.slice(0, 10).map(c => {
                const isSelected = c.id === companyId
                return (
                  <button
                    key={c.id}
                    onClick={() => handleCompanySwitch(c.id, c.roles[0].id)}
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: 6,
                      padding: '6px 12px', borderRadius: 20, fontSize: 12,
                      fontWeight: 600, border: isSelected ? '1.5px solid var(--primary)' : '1px solid var(--mid-gray)',
                      background: isSelected ? 'var(--primary-glow)' : 'var(--light-gray)',
                      color: isSelected ? 'var(--primary)' : 'var(--dark)',
                      cursor: 'pointer', whiteSpace: 'nowrap'
                    }}
                  >
                    <span>{c.logo}</span>
                    <span>{c.name}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Top Progress Bar Banner */}
          <div className="roadmap-top-bar fade-in-up">
            <div className="roadmap-progress-info">
              <h3>{analysis.companyName} Roadmap Completion: {completedTasks}/{totalTasks} tasks done</h3>
              <p>
                {progressPct === 100
                  ? '🎉 Outstanding! You are 100% prepared for the interview pipeline!'
                  : `Keep going! You're ${progressPct}% ready for ${analysis.companyName}'s rounds.`}
              </p>
            </div>
            <div style={{ flex: 1, minWidth: 220, maxWidth: 400 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 13, fontWeight: 700, color: 'var(--primary)' }}>
                <span>Milestone Progress</span>
                <span>{progressPct}%</span>
              </div>
              <div style={{ height: 10, background: 'var(--mid-gray)', borderRadius: 5, overflow: 'hidden' }}>
                <div style={{
                  height: '100%', width: `${progressPct}%`, borderRadius: 5,
                  background: progressPct >= 75 ? 'linear-gradient(90deg, #27ae60, #2ecc71)' : 'linear-gradient(90deg, #c0392b, #e74c3c)',
                  transition: 'width 0.4s ease'
                }} />
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="roadmap-timeline fade-in-up">
            {roadmap.map((month) => {
              const allDone = month.tasks && month.tasks.length > 0 && month.tasks.every(t => t.done)
              const completedCount = (month.tasks || []).filter(t => t.done).length
              const coveredSkills = getMonthCoveredSkills(month)

              return (
                <div key={month.id} className="timeline-item">
                  <div className={`timeline-dot ${allDone ? 'done' : ''}`}></div>
                  <div className={`timeline-card ${allDone ? 'done' : ''}`}>
                    <div className="timeline-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                        <div className="timeline-month-badge">{month.month}</div>
                        <div className="timeline-title">{month.title}</div>
                        {coveredSkills.length > 0 && (
                          <span style={{
                            background: '#fee2e2',
                            color: '#dc2626',
                            border: '1px solid #f87171',
                            borderRadius: 16,
                            padding: '3px 10px',
                            fontSize: 11,
                            fontWeight: 800,
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 4
                          }}>
                            🎯 Fixes {coveredSkills.length} of your skill gap{coveredSkills.length > 1 ? 's' : ''}
                          </span>
                        )}
                      </div>
                      <div style={{ fontSize: 12, fontWeight: 700, color: allDone ? 'var(--green)' : 'var(--text-muted)' }}>
                        {completedCount}/{(month.tasks || []).length} Completed
                      </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 16 }}>
                      {(month.tasks || []).map((task) => (
                        <label key={task.id} className="timeline-checkbox-label">
                          <input
                            type="checkbox"
                            checked={task.done}
                            onChange={() => handleToggleTask(month.id, task.id)}
                          />
                          <div className={`custom-checkbox ${task.done ? 'checked' : ''}`}>
                            {task.done && '✓'}
                          </div>
                          <span style={{
                            fontSize: 14,
                            textDecoration: task.done ? 'line-through' : 'none',
                            color: task.done ? 'var(--text-muted)' : 'var(--dark)'
                          }}>
                            {task.label}
                          </span>
                        </label>
                      ))}
                    </div>

                    {/* Change 6: Why these tasks? section */}
                    <div style={{
                      marginTop: 18,
                      padding: '12px 14px',
                      background: 'var(--light-gray)',
                      borderRadius: 'var(--radius-sm)',
                      borderLeft: '3px solid var(--primary)',
                      fontSize: 12
                    }}>
                      <div style={{ fontWeight: 700, color: 'var(--dark)', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 6 }}>
                        <span>💡 Why these tasks?</span>
                      </div>
                      <div style={{ color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                        {coveredSkills.length > 0 ? (
                          <>
                            <strong>This month covers:</strong>{' '}
                            {coveredSkills.map((s, idx) => (
                              <span
                                key={idx}
                                style={{
                                  display: 'inline-block',
                                  background: 'var(--white)',
                                  color: 'var(--primary)',
                                  border: '1px solid var(--mid-gray)',
                                  padding: '2px 8px',
                                  borderRadius: 12,
                                  fontSize: 11,
                                  fontWeight: 700,
                                  margin: '2px 4px 2px 0'
                                }}
                              >
                                {s.name}
                              </span>
                            ))}
                          </>
                        ) : (
                          <span>This month builds core foundations and technical prerequisites required for {analysis.companyName}'s interview rounds.</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="no-print" style={{ display: 'flex', justifyContent: 'center', gap: 12, marginTop: 32 }}>
            <button className="btn btn-outline" onClick={handleResetProgress}>
              🔄 Reset {analysis.companyName} Progress
            </button>
            <button className="btn btn-primary" onClick={() => navigate('/applications')}>
              📋 Track Your Applications →
            </button>
          </div>
        </main>
      </div>
    </div>
  )
}
