import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar.jsx'
import Navbar from '../components/Navbar.jsx'
import StatCard from '../components/StatCard.jsx'
import ProgressBar from '../components/ProgressBar.jsx'
import { TARGET_COMPANIES, SALARY_GROUPS, getCompanyAnalysis } from '../data/companyData.js'
import { generatePortalJobs } from '../data/careerData.js'
import { api, getStoredUser } from '../services/api.js'

export default function Dashboard() {
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [showCalculation, setShowCalculation] = useState(false)
  const [showBenchmarks, setShowBenchmarks] = useState(false)

  const mode = localStorage.getItem('skillgap_mode') || 'company'
  const salaryGroup = localStorage.getItem('skillgap_salary_group') || '5-8lpa'

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

  // Backend user/dashboard data & readiness breakdown
  const [dashboardData, setDashboardData] = useState(null)
  const [readinessData, setReadinessData] = useState(null)

  const user = (() => {
    try {
      const stored = getStoredUser()
      if (stored && stored.name) return stored
      return JSON.parse(localStorage.getItem('skillgap_user') || '{}')
    } catch { return {} }
  })()

  // Fetch backend dashboard & readiness data
  useEffect(() => {
    api.dashboard.get().then(data => {
      if (data && data.success) {
        setDashboardData(data)
        if (data.user) {
          localStorage.setItem('skillgap_user', JSON.stringify(data.user))
        }
      }
    }).catch(() => {})

    api.readiness.get().then(data => {
      if (data && data.success) {
        setReadinessData(data)
      }
    }).catch(() => {})
  }, [])

  // Read verified student skills from backend or localStorage
  const mySkills = (() => {
    try {
      return JSON.parse(localStorage.getItem('skillgap_my_skills') || '[]')
    } catch { return [] }
  })()

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

  // Readiness Score Formula
  const totalRequired = Math.max(analysis.skillsHave.length + analysis.skillsNeed.length, 1)
  const matched = dynamicSkillsHave.length

  const roadmapKey = `skillgap_roadmap_${analysis.id}`
  const savedRoadmap = (() => {
    try { return JSON.parse(localStorage.getItem(roadmapKey) || 'null') }
    catch { return null }
  })() || analysis.roadmap || []

  const roadmapDone = savedRoadmap.reduce((acc, m) => acc + (m.tasks || []).filter(t => t.done).length, 0)
  const roadmapTotal = Math.max((analysis.roadmap || []).reduce((acc, m) => acc + (m.tasks || []).length, 0), 1)

  const skillMatchPct = Math.round((matched / totalRequired) * 100)
  const roadmapPct = Math.round((roadmapDone / roadmapTotal) * 100)
  const hasResume = dashboardData ? dashboardData.resumeUploaded : !!localStorage.getItem('skillgap_has_resume')
  const isAtsDone = !!localStorage.getItem('skillgap_ats_done')

  const readinessScore = readinessData?.score ?? Math.min(100, Math.round(
    ((matched / totalRequired) * 50) +
    ((analysis.atsBaseline / 100) * 30) +
    ((roadmapDone / roadmapTotal) * 20)
  ))

  const handleTargetChange = (newCompId, newRoleId) => {
    setCompanyId(newCompId)
    setRoleId(newRoleId)
    const newAnalysis = getCompanyAnalysis(newCompId, newRoleId, 'company', salaryGroup)
    setAnalysis(newAnalysis)
    localStorage.setItem('skillgap_mode', 'company')
    localStorage.setItem('skillgap_target_company_id', newCompId)
    localStorage.setItem('skillgap_target_role_id', newRoleId)
    localStorage.setItem('skillgap_target_company', newAnalysis.companyName)
    localStorage.setItem('skillgap_target_role', newAnalysis.roleTitle)
    localStorage.setItem('skillgap_target_salary', newAnalysis.typicalSalary)
    localStorage.setItem('skillgap_analysis_data', JSON.stringify(newAnalysis))

    try {
      const u = JSON.parse(localStorage.getItem('skillgap_user') || '{}')
      u.targetCompany = newAnalysis.companyName
      u.targetRole = newAnalysis.roleTitle
      u.targetSalary = newAnalysis.typicalSalary
      localStorage.setItem('skillgap_user', JSON.stringify(u))
    } catch (e) {}

    api.targets.getAll().then(res => {
      if (res && res.targets) {
        const match = res.targets.find(t =>
          t.name.toLowerCase().includes(newAnalysis.companyName.toLowerCase()) ||
          newAnalysis.companyName.toLowerCase().includes(t.name.toLowerCase())
        ) || res.targets[0]
        if (match) {
          api.targets.selectTarget(match._id).then(() => {
            api.roadmap.generate().catch(() => {})
          }).catch(() => {})
        }
      }
    }).catch(() => {})
  }

  // ── CHANGE 4: Determine exactly ONE Next Step ─────────────────────────────
  let nextStep = null
  const topMissingSkill = dynamicSkillsNeed[0]?.name || 'Data Structures & Algorithms'

  if (!hasResume) {
    nextStep = {
      badge: 'STEP 1 OF 3',
      title: 'Upload your resume to get started',
      desc: 'Benchmark your current resume against recruiter ATS screening filters.',
      btnText: 'Upload Resume →',
      btnPath: '/upload-resume',
      icon: '📄',
      color: 'var(--primary)'
    }
  } else if (mySkills.length === 0) {
    nextStep = {
      badge: 'STEP 2 OF 3',
      title: 'Complete your skill assessment so we can personalise your results',
      desc: 'Take 2 minutes to select the skills you already know to replace generic estimates.',
      btnText: 'Start Skill Assessment →',
      btnPath: '/onboarding',
      icon: '🧠',
      color: '#8e44ad'
    }
  } else if (!isAtsDone) {
    nextStep = {
      badge: 'STEP 3 OF 3',
      title: 'Run your resume analysis to see your ATS score',
      desc: 'Calibrate your uploaded resume against your target company job description.',
      btnText: 'Run Analysis →',
      btnPath: '/upload-resume',
      icon: '⚡',
      color: '#e67e22'
    }
  } else {
    nextStep = {
      badge: 'ACTIVE PREPARATION',
      title: `Your readiness score is ${readinessScore}/100. Your biggest gap right now is ${topMissingSkill}.`,
      desc: `Focus on closing high-priority skill gaps to reach ${analysis.companyName} benchmark readiness.`,
      btnText: 'View Your Roadmap →',
      btnPath: '/roadmap',
      icon: '🗺️',
      color: 'var(--green)'
    }
  }

  // 4 Core Stat Cards
  const stats = [
    {
      icon: '📈',
      label: `${analysis.companyName} ATS Score`,
      value: `${analysis.atsBaseline}%`,
      color: analysis.atsBaseline >= 75 ? 'green' : 'red',
      trend: '+5% calibrated',
      trendDir: 'up'
    },
    {
      icon: '✅',
      label: 'Verified Skills Matched',
      value: `${dynamicSkillsHave.length}/${totalRequired}`,
      color: 'green',
      trend: `${dynamicSkillsHave.length} Verified`,
      trendDir: 'up'
    },
    {
      icon: '⚠️',
      label: 'Critical Skill Gaps',
      value: `${dynamicSkillsNeed.length}`,
      color: 'yellow',
      trend: `${dynamicSkillsNeed.filter(s => s.priority === 'High').length} High Priority`,
      trendDir: 'down'
    },
    {
      icon: '🏆',
      label: 'Calculated Readiness Score',
      value: `${readinessScore}/100`,
      color: 'blue',
      trend: `${roadmapPct}% Roadmap done`,
      trendDir: 'up'
    },
  ]

  // Readiness calculation factors
  const breakdownData = [
    { factor: 'Skill Match', score: readinessData?.breakdown?.technicalSkills ?? skillMatchPct, weight: '25%' },
    { factor: 'DSA Progress', score: readinessData?.breakdown?.dsa ?? (dashboardData?.dsaProgress ?? 0), weight: '20%' },
    { factor: 'Resume Uploaded', score: readinessData?.breakdown?.resume ?? (hasResume ? 100 : 0), weight: '15%' },
    { factor: 'Roadmap Progress', score: readinessData?.breakdown?.roadmap ?? roadmapPct, weight: '10%' },
    { factor: 'Interview Prep', score: readinessData?.breakdown?.interview ?? 0, weight: '10%' },
  ]

  // Dynamic Recent Activity
  const appsSaved = (() => {
    try { return JSON.parse(localStorage.getItem('skillgap_apps') || '[]') }
    catch { return [] }
  })()
  const backendAppCount = dashboardData?.applicationCount ?? appsSaved.length

  const recentActivity = [
    mySkills.length > 0 && {
      icon: '🧠', color: '#8e44ad',
      text: `Skill profile updated — ${mySkills.length} skills verified in assessment`,
      time: 'Profile active'
    },
    hasResume && {
      icon: '📄', color: '#2980b9',
      text: `Resume calibrated for ${analysis.companyName} — ${analysis.atsBaseline}% ATS score`,
      time: 'Last analysis'
    },
    roadmapDone > 0 && {
      icon: '🗺️', color: '#f39c12',
      text: `Roadmap progress: ${roadmapDone} of ${roadmapTotal} tasks completed`,
      time: `${roadmapPct}% done`
    },
    backendAppCount > 0 && {
      icon: '📋', color: '#27ae60',
      text: `${backendAppCount} application${backendAppCount > 1 ? 's' : ''} tracked in pipeline`,
      time: 'Application tracker'
    },
    mySkills.length === 0 && {
      icon: '⚡', color: '#c0392b',
      text: 'Skills assessment not yet completed — results may be generic',
      time: 'Action needed'
    },
  ].filter(Boolean)

  return (
    <div className="app-layout">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="app-main">
        <Navbar title="Dashboard" onToggleSidebar={() => setSidebarOpen(o => !o)} />

        <main className="page-content" style={{ maxWidth: 1100, margin: '0 auto' }}>

          {/* ── CHANGE 4: "YOUR NEXT STEP" BANNER (Single clear guided action) ── */}
          {nextStep && (
            <div className="fade-in-up" style={{
              background: '#ffffff',
              border: `2px solid ${nextStep.color}`,
              borderRadius: 'var(--radius)',
              padding: '18px 24px',
              marginBottom: 24,
              boxShadow: '0 4px 14px rgba(0,0,0,0.06)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 16
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, flex: 1, minWidth: 280 }}>
                <div style={{
                  width: 48, height: 48, borderRadius: '50%',
                  background: `${nextStep.color}15`,
                  color: nextStep.color,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 22, flexShrink: 0
                }}>
                  {nextStep.icon}
                </div>
                <div>
                  <div style={{
                    fontSize: 11, fontWeight: 800, letterSpacing: 0.8,
                    color: nextStep.color, textTransform: 'uppercase', marginBottom: 2
                  }}>
                    🎯 Your Next Step • {nextStep.badge}
                  </div>
                  <h3 style={{ fontSize: 16, fontWeight: 800, margin: '0 0 2px', color: 'var(--dark)' }}>
                    {nextStep.title}
                  </h3>
                  <p style={{ fontSize: 13, color: 'var(--text-muted)', margin: 0 }}>
                    {nextStep.desc}
                  </p>
                </div>
              </div>
              <button
                className="btn btn-primary"
                onClick={() => navigate(nextStep.btnPath)}
                style={{ padding: '10px 20px', fontWeight: 700, whiteSpace: 'nowrap' }}
              >
                {nextStep.btnText}
              </button>
            </div>
          )}

          {/* Welcome Banner */}
          <div className="welcome-banner fade-in-up" style={{ marginBottom: 20 }}>
            <div className="welcome-banner-inner">
              <div>
                <h2>Hello {user.name || 'Candidate'} 👋, here's your {analysis.companyName} readiness snapshot</h2>
                <p>
                  Targeting <strong style={{ color: '#f1c40f' }}>{analysis.companyName} ({analysis.roleTitle})</strong> · Goal CTC: <strong style={{ color: '#2ecc71' }}>{analysis.typicalSalary}</strong>
                </p>
              </div>
              <div className="welcome-banner-actions">
                <button
                  className="btn btn-ghost"
                  onClick={() => navigate('/upload-resume')}
                  id="dashboard-upload-btn"
                >
                  📄 Change Target
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => navigate('/roadmap')}
                  id="dashboard-roadmap-btn"
                >
                  🗺️ View Roadmap
                </button>
              </div>
            </div>
          </div>

          {/* 4 Core Stat Cards */}
          <div className="stat-cards-grid" style={{ marginBottom: 12 }}>
            {stats.map((s, i) => (
              <StatCard key={i} {...s} />
            ))}
          </div>

          {/* ── CHANGE 9: Readiness Score Calculation Breakdown Toggle ── */}
          <div style={{ textAlign: 'right', marginBottom: 24 }}>
            <button
              type="button"
              onClick={() => setShowCalculation(prev => !prev)}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--primary)',
                fontSize: 13,
                fontWeight: 700,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6
              }}
            >
              <span>{showCalculation ? '▲ Hide' : '▼ How is readiness calculated?'}</span>
            </button>

            {showCalculation && (
              <div className="card fade-in-up" style={{
                marginTop: 12, textAlign: 'left', background: '#fafafa', border: '1px solid var(--mid-gray)', padding: 20
              }}>
                <div style={{ fontWeight: 800, fontSize: 14, color: 'var(--dark)', marginBottom: 8 }}>
                  📊 Readiness Score Formula Breakdown
                </div>
                <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 14 }}>
                  Your readiness score is a weighted composite measuring technical preparation, DSA practice, resume ATS match, and roadmap execution.
                </p>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid var(--mid-gray)', textAlign: 'left', color: 'var(--text-secondary)' }}>
                      <th style={{ padding: '8px 12px' }}>Factor</th>
                      <th style={{ padding: '8px 12px' }}>Your Score</th>
                      <th style={{ padding: '8px 12px' }}>Weight</th>
                    </tr>
                  </thead>
                  <tbody>
                    {breakdownData.map((row, idx) => (
                      <tr key={idx} style={{ borderBottom: '1px solid #eee' }}>
                        <td style={{ padding: '8px 12px', fontWeight: 600 }}>{row.factor}</td>
                        <td style={{ padding: '8px 12px' }}>{row.score}%</td>
                        <td style={{ padding: '8px 12px', color: 'var(--text-muted)' }}>{row.weight}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div style={{
                  marginTop: 14, padding: '10px 14px', background: 'var(--green-light)',
                  borderRadius: 6, fontSize: 13, fontWeight: 700, color: 'var(--green)'
                }}>
                  💡 Your biggest opportunity to improve: complete your DSA practice & roadmap tasks (+30 points possible).
                </div>
              </div>
            )}
          </div>

          {/* ── CHANGE 8: Preparation Hub Quick Actions ── */}
          <h2 style={{ fontSize: 18, fontWeight: 800, color: 'var(--dark)', marginBottom: 14 }}>
            Preparation Hub
          </h2>
          <div className="quick-actions" style={{ marginBottom: 28 }}>
            {[
              {
                icon: '📄', title: 'Upload & Target Setup',
                desc: 'Upload resume and select company target',
                path: '/upload-resume', id: 'qa-upload'
              },
              {
                icon: '🎯', title: 'Skill Gap Breakdown',
                desc: `Detailed diagnostics for ${analysis.companyName}`,
                path: '/skill-gap-report', id: 'qa-skillgap'
              },
              {
                icon: '🗺️', title: 'Tailored Roadmap',
                desc: 'Step-by-step month-by-month preparation plan',
                path: '/roadmap', id: 'qa-roadmap'
              },
              {
                icon: '📋', title: 'Application Tracker',
                desc: 'Kanban pipeline with skill gap reminders',
                path: '/applications', id: 'qa-tracker'
              },
            ].map((action) => (
              <div
                key={action.id}
                className="quick-action-card fade-in-up"
                onClick={() => navigate(action.path)}
                id={action.id}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && navigate(action.path)}
              >
                <div className="quick-action-icon">{action.icon}</div>
                <div>
                  <h3>{action.title}</h3>
                  <p>{action.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* ── CHANGE 8: Simplified Sections ── */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 28 }} className="dashboard-simple-grid">
            
            {/* Top Missing Skills for Active Target */}
            <div className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                <div className="card-title" style={{ margin: 0 }}>
                  🚨 Top Missing Skills for {analysis.companyName}
                </div>
                <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--primary)' }}>
                  {dynamicSkillsNeed.length} total gaps
                </span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {dynamicSkillsNeed.slice(0, 4).map((s, i) => (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'flex-start', gap: 12,
                    padding: '10px 14px', background: 'var(--light-gray)',
                    borderRadius: 8, border: '1px solid var(--mid-gray)'
                  }}>
                    <span style={{ fontSize: 16 }}>{s.emoji || '📌'}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--dark)', marginBottom: 2 }}>
                        {s.name} <span className={`badge badge-${s.priorityClass || 'high'}`} style={{ fontSize: 10 }}>{s.priority}</span>
                      </div>
                      <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{s.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 14, paddingTop: 12, borderTop: '1px solid var(--mid-gray)' }}>
                <button
                  className="btn btn-outline btn-sm"
                  onClick={() => navigate('/skill-gap-report')}
                >
                  View All Gaps & Action Items →
                </button>
              </div>
            </div>

            {/* Target Match Breakdown */}
            <div className="card">
              <div className="card-title">
                🎯 {analysis.companyName} Match Breakdown ({analysis.roleTitle})
              </div>
              <div className="target-match-grid" style={{ marginBottom: 14 }}>
                {(analysis.matchScores || []).map((m, idx) => (
                  <ProgressBar key={idx} label={m.label} value={m.value} color={m.color} />
                ))}
              </div>
              <div style={{ paddingTop: 14, borderTop: '1px solid var(--mid-gray)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                  Calibrated for {analysis.typicalSalary}
                </span>
                <button
                  className="btn btn-outline btn-sm"
                  onClick={() => navigate('/skill-gap-report')}
                  id="dashboard-view-report-btn"
                >
                  View Gap Diagnostics →
                </button>
              </div>
            </div>
          </div>

          {/* ── CHANGE 8: Multi-Company Benchmark collapsed behind button ── */}
          <div style={{ marginBottom: 28 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--dark)' }}>
                Multi-Company Comparison
              </span>
              <button
                type="button"
                className="btn btn-outline btn-sm"
                onClick={() => setShowBenchmarks(prev => !prev)}
              >
                {showBenchmarks ? '▲ Hide Company Benchmarks' : '🏢 Compare Companies'}
              </button>
            </div>

            {showBenchmarks && (
              <div className="card fade-in-up" style={{ padding: '18px 20px' }}>
                <div className="card-title">🏢 Multi-Company Readiness Benchmarks</div>
                <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 14 }}>
                  Compare your profile against other tech company hiring formats. Click any company to switch target:
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  {TARGET_COMPANIES.slice(0, 6).map((c) => {
                    const compAnalysis = getCompanyAnalysis(c.id, c.roles[0].id)
                    const isCurrent = c.id === companyId
                    return (
                      <div
                        key={c.name}
                        onClick={() => handleTargetChange(c.id, c.roles[0].id)}
                        style={{
                          display: 'flex', alignItems: 'center', gap: 12,
                          padding: '10px 12px', borderRadius: 8, cursor: 'pointer',
                          background: isCurrent ? 'rgba(192, 57, 43, 0.08)' : 'var(--light-gray)',
                          border: isCurrent ? '1.5px solid var(--primary)' : '1px solid var(--mid-gray)',
                          transition: 'all 0.2s'
                        }}
                        title={`Click to switch target to ${c.name}`}
                      >
                        <div style={{
                          width: 36, height: 36, background: 'white',
                          borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: 18, border: '1px solid var(--mid-gray)', flexShrink: 0
                        }}>
                          {c.logo}
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                            <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--dark)' }}>
                              {c.name} {isCurrent && <span style={{ fontSize: 10, color: 'var(--primary)', fontWeight: 800 }}>[ACTIVE]</span>}
                            </span>
                            <span style={{
                              fontSize: 12, fontWeight: 700,
                              color: compAnalysis.atsBaseline >= 75 ? 'var(--green)' : compAnalysis.atsBaseline >= 65 ? 'var(--yellow)' : 'var(--red)'
                            }}>
                              {compAnalysis.atsBaseline}% Match
                            </span>
                          </div>
                          <ProgressBar
                            value={compAnalysis.atsBaseline}
                            showValue={false}
                            color={compAnalysis.atsBaseline >= 75 ? 'green' : compAnalysis.atsBaseline >= 65 ? 'yellow' : ''}
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </div>

          {/* ── RECOMMENDED JOBS (JOB DISCOVERY INTEGRATION) ── */}
          {(() => {
            const rawRecommended = generatePortalJobs({ skills: mySkills })
            const topRecommended = rawRecommended.slice(0, 3)

            return (
              <div className="card fade-in-up" style={{ marginBottom: 20 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, flexWrap: 'wrap', gap: 10 }}>
                  <div>
                    <div className="card-title" style={{ margin: 0, display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span>💼</span> Recommended Live Jobs For You
                    </div>
                    <p style={{ margin: '4px 0 0', fontSize: 13, color: 'var(--text-muted)' }}>
                      Positions matched dynamically against your skill profile:
                    </p>
                  </div>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => navigate('/jobs')}
                    style={{ display: 'flex', alignItems: 'center', gap: 6 }}
                  >
                    View All In Job Finder →
                  </button>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 14 }}>
                  {topRecommended.map(job => {
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
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 10 }}>
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

                          <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--dark)', marginTop: 10 }}>
                            {job.title}
                          </div>

                          {/* Skill pills */}
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginTop: 8 }}>
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
                                ✓ {s}
                              </span>
                            ))}
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

          {/* ── CHANGE 8: Preparation Stream (Recent Activity) is the LAST thing on page ── */}
          <div className="card fade-in-up" style={{ marginBottom: 20 }}>
            <div className="card-title">⚡ Preparation Stream (Recent Milestones)</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {recentActivity.map((a, i) => (
                <div key={i} style={{
                  display: 'flex', gap: 12, padding: '10px 0',
                  borderBottom: i < recentActivity.length - 1 ? '1px solid var(--mid-gray)' : 'none'
                }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: '50%',
                    background: `${a.color}20`, display: 'flex',
                    alignItems: 'center', justifyContent: 'center',
                    fontSize: 14, flexShrink: 0
                  }}>
                    {a.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, color: 'var(--dark)', fontWeight: 600, marginBottom: 2 }}>{a.text}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{a.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </main>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .dashboard-simple-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}
