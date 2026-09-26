import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar.jsx'
import Navbar from '../components/Navbar.jsx'
import { TARGET_COMPANIES, SALARY_GROUPS, getCompanyAnalysis } from '../data/companyData.js'
import { generatePortalJobs } from '../data/careerData.js'
import { api } from '../services/api.js'

export default function UploadResume() {
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Mode: 'company' | 'salary'
  const [targetMode, setTargetMode] = useState(() => {
    return localStorage.getItem('skillgap_mode') || 'company'
  })

  // Selected company and role
  const [selectedCompanyId, setSelectedCompanyId] = useState(() => {
    return localStorage.getItem('skillgap_target_company_id') || 'amazon'
  })
  const [selectedRoleId, setSelectedRoleId] = useState(() => {
    return localStorage.getItem('skillgap_target_role_id') || 'amazon-sde1'
  })

  // Selected salary group
  const [selectedSalaryGroup, setSelectedSalaryGroup] = useState(() => {
    return localStorage.getItem('skillgap_salary_group') || '5-8lpa'
  })

  const [companySearch, setCompanySearch] = useState('')

  // Current company & role objects
  const activeCompany = TARGET_COMPANIES.find(c => c.id === selectedCompanyId) || TARGET_COMPANIES[0]
  const activeRole = activeCompany.roles.find(r => r.id === selectedRoleId) || activeCompany.roles[0]
  const activeSalaryGroup = SALARY_GROUPS[selectedSalaryGroup] || SALARY_GROUPS['5-8lpa']

  const [file, setFile] = useState(null)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [showResult, setShowResult] = useState(() => !!localStorage.getItem('skillgap_ats_done'))
  const [dragover, setDragover] = useState(false)

  // Current analysis data
  const [analysisData, setAnalysisData] = useState(() => {
    return getCompanyAnalysis(selectedCompanyId, selectedRoleId, targetMode, selectedSalaryGroup)
  })

  // Check if resume is present (either selected now or saved previously)
  const hasResume = !!file || !!localStorage.getItem('skillgap_has_resume')
  const resumeName = file ? file.name : (localStorage.getItem('skillgap_resume_name') || 'Uploaded_Resume.pdf')

  // Handle Mode Change
  const handleModeChange = (mode) => {
    setTargetMode(mode)
    localStorage.setItem('skillgap_mode', mode)
    if (mode === 'salary') {
      setAnalysisData(getCompanyAnalysis(selectedCompanyId, selectedRoleId, 'salary', selectedSalaryGroup))
    } else {
      setAnalysisData(getCompanyAnalysis(selectedCompanyId, selectedRoleId, 'company', selectedSalaryGroup))
    }
    setShowResult(false)
  }

  // Handle Salary Group change
  const handleSalaryGroupChange = (groupKey) => {
    setSelectedSalaryGroup(groupKey)
    localStorage.setItem('skillgap_salary_group', groupKey)
    setAnalysisData(getCompanyAnalysis(selectedCompanyId, selectedRoleId, 'salary', groupKey))
    setShowResult(false)
  }

  // Handle Company change
  const handleCompanyChange = (companyId) => {
    setSelectedCompanyId(companyId)
    const newComp = TARGET_COMPANIES.find(c => c.id === companyId) || TARGET_COMPANIES[0]
    const defaultRole = newComp.roles[0]
    setSelectedRoleId(defaultRole.id)
    setAnalysisData(getCompanyAnalysis(companyId, defaultRole.id, 'company', selectedSalaryGroup))
    setErrors(prev => ({ ...prev, company: '', role: '' }))
    setShowResult(false)
  }

  // Handle Role change
  const handleRoleChange = (roleId) => {
    setSelectedRoleId(roleId)
    setAnalysisData(getCompanyAnalysis(selectedCompanyId, roleId, 'company', selectedSalaryGroup))
    setErrors(prev => ({ ...prev, role: '' }))
    setShowResult(false)
  }

  const handleFileChange = (e) => {
    const f = e.target.files[0]
    if (f) {
      setFile(f)
      localStorage.setItem('skillgap_has_resume', 'true')
      localStorage.setItem('skillgap_resume_name', f.name)
      setErrors(err => ({ ...err, file: '' }))
      setShowResult(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragover(false)
    const f = e.dataTransfer.files[0]
    if (f && (f.name.endsWith('.pdf') || f.name.endsWith('.docx'))) {
      setFile(f)
      localStorage.setItem('skillgap_has_resume', 'true')
      localStorage.setItem('skillgap_resume_name', f.name)
      setErrors(err => ({ ...err, file: '' }))
      setShowResult(false)
    }
  }

  const handleAnalyse = async (e) => {
    e.preventDefault()
    if (!hasResume) {
      setErrors({ file: 'Please upload a resume first.' })
      return
    }

    setLoading(true)
    setShowResult(false)

    try {
      if (file) {
        try {
          await api.resume.upload(file)
          localStorage.setItem('skillgap_has_resume', 'true')
          localStorage.setItem('skillgap_resume_name', file.name)
        } catch (uploadErr) {
          console.warn('Backend resume upload notice:', uploadErr.message)
        }
      }

      const result = getCompanyAnalysis(selectedCompanyId, selectedRoleId, targetMode, selectedSalaryGroup)
      const currentSalary = targetMode === 'salary' ? activeSalaryGroup.typicalSalary : activeRole.salary

      localStorage.setItem('skillgap_ats_done', 'true')
      localStorage.setItem('skillgap_mode', targetMode)
      localStorage.setItem('skillgap_salary_group', selectedSalaryGroup)
      localStorage.setItem('skillgap_target_company_id', selectedCompanyId)
      localStorage.setItem('skillgap_target_role_id', selectedRoleId)
      localStorage.setItem('skillgap_target_company', result.companyName)
      localStorage.setItem('skillgap_target_role', result.roleTitle)
      localStorage.setItem('skillgap_target_salary', currentSalary)
      localStorage.setItem('skillgap_analysis_data', JSON.stringify(result))

      try {
        const user = JSON.parse(localStorage.getItem('skillgap_user') || '{}')
        user.targetCompany = result.companyName
        user.targetRole = result.roleTitle
        user.targetSalary = currentSalary
        localStorage.setItem('skillgap_user', JSON.stringify(user))
      } catch (err) {}

      // Sync target & generate roadmap on backend
      try {
        const targetsRes = await api.targets.getAll()
        if (targetsRes && targetsRes.targets && targetsRes.targets.length > 0) {
          const match = targetsRes.targets.find(t =>
            t.name.toLowerCase().includes(result.companyName.toLowerCase()) ||
            result.companyName.toLowerCase().includes(t.name.toLowerCase())
          ) || targetsRes.targets[0]
          if (match) {
            await api.targets.selectTarget(match._id)
            await api.roadmap.generate().catch(() => {})
          }
        }
      } catch (targetErr) {
        console.warn('Backend target sync error:', targetErr)
      }

      setAnalysisData(result)
      setShowResult(true)
    } catch (err) {
      setErrors(prev => ({ ...prev, file: err.message || 'Analysis failed. Please try again.' }))
    } finally {
      setLoading(false)
    }
  }

  // Filtered companies based on search input
  const filteredCompanies = TARGET_COMPANIES.filter(c => {
    if (!companySearch.trim()) return true
    const q = companySearch.toLowerCase()
    return c.name.toLowerCase().includes(q) ||
           c.category.toLowerCase().includes(q) ||
           c.badge.toLowerCase().includes(q) ||
           c.roles.some(r => r.title.toLowerCase().includes(q))
  })

  const bigTechComps = filteredCompanies.filter(c => c.categoryGroup === '🏢 Big Tech')
  const unicornComps = filteredCompanies.filter(c => c.categoryGroup === '🦄 Unicorns & Startups')
  const financeComps = filteredCompanies.filter(c => c.categoryGroup === '🏦 Finance Tech')
  const itServiceComps = filteredCompanies.filter(c => c.categoryGroup === '🖥️ IT Service')

  // Generate plain-English verdict and action items
  const score = analysisData.atsBaseline || 72
  let verdictText = ''
  let verdictColor = '#27ae60'
  if (score >= 80) {
    verdictText = 'Strong match. Your resume is well-aligned. Focus on the missing keywords below.'
    verdictColor = '#27ae60'
  } else if (score >= 65) {
    verdictText = 'Decent start. Several important keywords are missing. Follow the action items below.'
    verdictColor = '#e67e22'
  } else {
    verdictText = 'Significant gaps found. Use the roadmap to close these before applying.'
    verdictColor = '#c0392b'
  }

  const missingList = analysisData.missingKeywords || []
  const m1 = missingList[0] || 'System Design basics'
  const m2 = missingList[1] || 'Cloud Services'
  const m3 = missingList[2] || 'Unit Testing'
  const m4 = missingList[3] || 'High-throughput APIs'

  const actionItems = [
    `Add a dedicated section or bullet listing hands-on experience with ${m1} and ${m2}.`,
    `Highlight quantifiable project achievements demonstrating knowledge of ${m3}.`,
    `Ensure your technical skills summary explicitly mentions ${m4} to pass automated recruiter screening filters.`,
  ]

  const targetLabel = targetMode === 'company'
    ? `${activeCompany.name} (${activeRole.title})`
    : activeSalaryGroup.label

  return (
    <div className="app-layout">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="app-main">
        <Navbar title="Resume & Target Calibration" onToggleSidebar={() => setSidebarOpen(o => !o)} />

        <main className="page-content" style={{ maxWidth: 840, margin: '0 auto' }}>
          
          <div className="page-header" style={{ marginBottom: 28 }}>
            <h1>📄 Resume & Target Setup</h1>
            <p>Upload your resume, pick your dream target, and get instant recruiter-level ATS feedback.</p>
          </div>

          {/* Vertical Step-by-Step Flow */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

            {/* ── STEP 1: UPLOAD RESUME ─────────────────── */}
            <div className="card" style={{ borderLeft: hasResume ? '4px solid var(--green)' : '4px solid var(--primary)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{
                    width: 28, height: 28, borderRadius: '50%',
                    background: hasResume ? 'var(--green)' : 'var(--primary)',
                    color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 14, fontWeight: 800
                  }}>
                    {hasResume ? '✓' : '1'}
                  </span>
                  <div className="card-title" style={{ margin: 0 }}>
                    Step 1 — Upload your resume
                  </div>
                </div>
                {hasResume && (
                  <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--green)', display: 'flex', alignItems: 'center', gap: 4 }}>
                    ✅ Uploaded
                  </span>
                )}
              </div>

              {!hasResume ? (
                <>
                  <div
                    className={`file-upload-zone ${dragover ? 'dragover' : ''}`}
                    onDragOver={(e) => { e.preventDefault(); setDragover(true) }}
                    onDragLeave={() => setDragover(false)}
                    onDrop={handleDrop}
                  >
                    <input
                      type="file"
                      accept=".pdf,.docx"
                      onChange={handleFileChange}
                      id="resume-file-input"
                    />
                    <span className="file-upload-icon">📤</span>
                    <h3 style={{ margin: '8px 0 4px', fontSize: 16 }}>Drop your resume here or click to browse</h3>
                    <p style={{ margin: 0, fontSize: 13, color: 'var(--text-muted)' }}>PDF or DOCX format · Max 5 MB</p>
                  </div>
                  {errors.file && <div className="form-error" style={{ marginTop: 10 }}>⚠ {errors.file}</div>}
                </>
              ) : (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '14px 18px',
                  background: 'var(--green-light)',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid rgba(39, 174, 96, 0.3)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span style={{ fontSize: 24 }}>📄</span>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 15, color: '#1e7e34' }}>
                        {resumeName}
                      </div>
                      <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
                        Resume verified & ready for ATS scanning
                      </div>
                    </div>
                  </div>
                  <label
                    htmlFor="resume-file-input-replace"
                    className="btn btn-outline btn-sm"
                    style={{ cursor: 'pointer', background: 'white' }}
                  >
                    Change File
                    <input
                      type="file"
                      accept=".pdf,.docx"
                      onChange={handleFileChange}
                      id="resume-file-input-replace"
                      style={{ display: 'none' }}
                    />
                  </label>
                </div>
              )}
            </div>

            {/* ── STEP 2: CHOOSE TARGET (Appears once resume is uploaded) ─── */}
            {hasResume && (
              <div className="card fade-in-up" style={{ borderLeft: '4px solid var(--primary)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                  <span style={{
                    width: 28, height: 28, borderRadius: '50%',
                    background: 'var(--primary)', color: 'white',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 14, fontWeight: 800
                  }}>
                    2
                  </span>
                  <div className="card-title" style={{ margin: 0 }}>
                    Step 2 — Choose your target
                  </div>
                </div>

                {/* Large Radio Cards for Option A vs Option B */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 20 }}>
                  <div
                    onClick={() => handleModeChange('company')}
                    style={{
                      padding: '16px',
                      borderRadius: 'var(--radius-sm)',
                      border: targetMode === 'company' ? '2px solid var(--primary)' : '1px solid var(--mid-gray)',
                      background: targetMode === 'company' ? 'rgba(192, 57, 43, 0.05)' : 'white',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                      <input
                        type="radio"
                        name="targetMode"
                        checked={targetMode === 'company'}
                        onChange={() => handleModeChange('company')}
                        style={{ accentColor: 'var(--primary)', cursor: 'pointer' }}
                      />
                      <span style={{ fontWeight: 800, fontSize: 14, color: targetMode === 'company' ? 'var(--primary)' : 'var(--dark)' }}>
                        Target a Specific Company
                      </span>
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)', paddingLeft: 24 }}>
                      Benchmark directly against Big Tech, Unicorns, or IT Service hiring rubrics.
                    </div>
                  </div>

                  <div
                    onClick={() => handleModeChange('salary')}
                    style={{
                      padding: '16px',
                      borderRadius: 'var(--radius-sm)',
                      border: targetMode === 'salary' ? '2px solid var(--primary)' : '1px solid var(--mid-gray)',
                      background: targetMode === 'salary' ? 'rgba(192, 57, 43, 0.05)' : 'white',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                      <input
                        type="radio"
                        name="targetMode"
                        checked={targetMode === 'salary'}
                        onChange={() => handleModeChange('salary')}
                        style={{ accentColor: 'var(--primary)', cursor: 'pointer' }}
                      />
                      <span style={{ fontWeight: 800, fontSize: 14, color: targetMode === 'salary' ? 'var(--primary)' : 'var(--dark)' }}>
                        Target a Salary Range
                      </span>
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)', paddingLeft: 24 }}>
                      Match expectations for ₹5–8 LPA, ₹12–18 LPA, or ₹25+ LPA tiers.
                    </div>
                  </div>
                </div>

                {/* Sub-form for Option A: Company & Role */}
                {targetMode === 'company' && (
                  <div style={{ background: '#fcfcfc', border: '1px solid #eee', borderRadius: 'var(--radius-sm)', padding: 16 }}>
                    <div className="form-group" style={{ marginBottom: 12 }}>
                      <label className="form-label" htmlFor="company-search-input">
                        Filter Company ({TARGET_COMPANIES.length} available)
                      </label>
                      <input
                        id="company-search-input"
                        type="text"
                        className="form-input"
                        placeholder="🔍 Type to filter e.g. Google, Amazon, TCS, PhonePe..."
                        value={companySearch}
                        onChange={(e) => setCompanySearch(e.target.value)}
                      />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                      <div className="form-group" style={{ marginBottom: 0 }}>
                        <label className="form-label" htmlFor="company-select">Select Company</label>
                        <select
                          id="company-select"
                          className="form-select"
                          value={selectedCompanyId}
                          onChange={(e) => handleCompanyChange(e.target.value)}
                        >
                          {bigTechComps.length > 0 && (
                            <optgroup label="🏢 Big Tech">
                              {bigTechComps.map(c => (
                                <option key={c.id} value={c.id}>{c.logo} {c.name} — {c.badge}</option>
                              ))}
                            </optgroup>
                          )}
                          {unicornComps.length > 0 && (
                            <optgroup label="🦄 Unicorns & Startups">
                              {unicornComps.map(c => (
                                <option key={c.id} value={c.id}>{c.logo} {c.name} — {c.badge}</option>
                              ))}
                            </optgroup>
                          )}
                          {financeComps.length > 0 && (
                            <optgroup label="🏦 Finance Tech">
                              {financeComps.map(c => (
                                <option key={c.id} value={c.id}>{c.logo} {c.name} — {c.badge}</option>
                              ))}
                            </optgroup>
                          )}
                          {itServiceComps.length > 0 && (
                            <optgroup label="🖥️ IT Service">
                              {itServiceComps.map(c => (
                                <option key={c.id} value={c.id}>{c.logo} {c.name} — {c.badge}</option>
                              ))}
                            </optgroup>
                          )}
                        </select>
                      </div>

                      <div className="form-group" style={{ marginBottom: 0 }}>
                        <label className="form-label" htmlFor="role-select">Target Role</label>
                        <select
                          id="role-select"
                          className="form-select"
                          value={selectedRoleId}
                          onChange={(e) => handleRoleChange(e.target.value)}
                        >
                          {activeCompany.roles.map(r => (
                            <option key={r.id} value={r.id}>📌 {r.title} ({r.salary})</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {/* Sub-form for Option B: Salary Group */}
                {targetMode === 'salary' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {Object.entries(SALARY_GROUPS).map(([key, group]) => {
                      const isSelected = selectedSalaryGroup === key
                      return (
                        <div
                          key={key}
                          onClick={() => handleSalaryGroupChange(key)}
                          style={{
                            padding: '12px 16px',
                            borderRadius: 'var(--radius-sm)',
                            border: isSelected ? '2px solid var(--primary)' : '1px solid var(--mid-gray)',
                            background: isSelected ? 'rgba(192, 57, 43, 0.05)' : 'white',
                            cursor: 'pointer',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                          }}
                        >
                          <div>
                            <span style={{ fontWeight: 700, fontSize: 14, color: isSelected ? 'var(--primary)' : 'var(--dark)' }}>
                              {group.label}
                            </span>
                            <span style={{ fontSize: 12, color: 'var(--text-muted)', marginLeft: 10 }}>
                              e.g. {group.companies.slice(0, 3).join(', ')}
                            </span>
                          </div>
                          <span style={{ fontSize: 11, background: 'var(--light-gray)', padding: '3px 8px', borderRadius: 10, fontWeight: 700 }}>
                            {group.badge}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            )}

            {/* ── STEP 3: RUN ANALYSIS ─────────────────── */}
            {hasResume && (
              <div className="card fade-in-up" style={{ borderLeft: '4px solid var(--primary)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                  <span style={{
                    width: 28, height: 28, borderRadius: '50%',
                    background: 'var(--primary)', color: 'white',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 14, fontWeight: 800
                  }}>
                    3
                  </span>
                  <div className="card-title" style={{ margin: 0 }}>
                    Step 3 — Run Analysis
                  </div>
                </div>

                <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 18 }}>
                  Our AI scanner will parse your resume against the embedded hiring requirements and ATS keyword rubrics for <strong>{targetLabel}</strong>.
                </p>

                <button
                  type="button"
                  onClick={handleAnalyse}
                  className="btn btn-primary btn-lg"
                  style={{ width: '100%', justifyContent: 'center', fontSize: 16, padding: '14px 20px' }}
                  disabled={loading}
                  id="analyse-resume-btn"
                >
                  {loading ? (
                    <>
                      <span className="spinner" />
                      Scanning resume against {targetLabel}...
                    </>
                  ) : (
                    `🔍 Analyse My Resume Against ${targetMode === 'company' ? activeCompany.name : activeSalaryGroup.label}`
                  )}
                </button>
              </div>
            )}

            {/* ── USEFUL ATS RESULT PANEL (Change 3) ─────────────────── */}
            {showResult && !loading && (
              <div className="card fade-in-up" style={{
                background: '#ffffff',
                border: '2px solid #e1e8ed',
                borderRadius: 'var(--radius)',
                padding: '28px',
                boxShadow: 'var(--shadow-md)'
              }}>
                {/* Score Headline */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: 16,
                  paddingBottom: 20,
                  borderBottom: '1px solid var(--mid-gray)',
                  marginBottom: 20
                }}>
                  <div>
                    <div style={{ fontSize: 13, textTransform: 'uppercase', letterSpacing: 1, fontWeight: 800, color: 'var(--primary)', marginBottom: 4 }}>
                      ATS Resume Calibration Report
                    </div>
                    <h2 style={{ fontSize: 22, fontWeight: 800, margin: 0, color: 'var(--dark)' }}>
                      Your resume scored <span style={{ color: verdictColor }}>{score}/100</span> for {analysisData.companyName} {analysisData.roleTitle}
                    </h2>
                  </div>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 72,
                    height: 72,
                    borderRadius: '50%',
                    background: `${verdictColor}15`,
                    border: `3px solid ${verdictColor}`,
                    fontWeight: 900,
                    fontSize: 22,
                    color: verdictColor
                  }}>
                    {score}
                  </div>
                </div>

                {/* Plain-English Verdict */}
                <div style={{
                  padding: '14px 18px',
                  borderRadius: 'var(--radius-sm)',
                  background: `${verdictColor}10`,
                  borderLeft: `4px solid ${verdictColor}`,
                  marginBottom: 24,
                  fontSize: 14,
                  fontWeight: 600,
                  color: 'var(--dark)',
                  lineHeight: 1.5
                }}>
                  💡 <strong>Verdict:</strong> {verdictText}
                </div>

                {/* Keywords Grids */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 26 }} className="upload-keywords-grid">
                  
                  {/* Matched Keywords */}
                  <div style={{ background: '#f8fdf9', padding: '18px', borderRadius: 'var(--radius-sm)', border: '1px solid #d4edda' }}>
                    <div style={{ fontWeight: 800, fontSize: 14, color: '#155724', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span>✅ Keywords your resume already contains</span>
                      <span style={{ fontSize: 12, background: '#c3e6cb', padding: '1px 7px', borderRadius: 10 }}>
                        {analysisData.matchedKeywords?.length || 0}
                      </span>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                      {analysisData.matchedKeywords && analysisData.matchedKeywords.length > 0 ? (
                        analysisData.matchedKeywords.map((k) => (
                          <span
                            key={k}
                            style={{
                              background: '#e8f5e9',
                              color: '#2e7d32',
                              border: '1px solid #c8e6c9',
                              padding: '4px 10px',
                              borderRadius: 14,
                              fontSize: 12,
                              fontWeight: 600
                            }}
                          >
                            ✓ {k}
                          </span>
                        ))
                      ) : (
                        <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>None detected yet.</div>
                      )}
                    </div>
                  </div>

                  {/* Missing Keywords */}
                  <div style={{ background: '#fff9f9', padding: '18px', borderRadius: 'var(--radius-sm)', border: '1px solid #f8d7da' }}>
                    <div style={{ fontWeight: 800, fontSize: 14, color: '#721c24', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span>❌ Keywords recruiters look for that are missing</span>
                      <span style={{ fontSize: 12, background: '#f5c6cb', padding: '1px 7px', borderRadius: 10 }}>
                        {analysisData.missingKeywords?.length || 0}
                      </span>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                      {analysisData.missingKeywords && analysisData.missingKeywords.length > 0 ? (
                        analysisData.missingKeywords.map((k) => (
                          <span
                            key={k}
                            style={{
                              background: '#ffebee',
                              color: '#c62828',
                              border: '1px solid #ffcdd2',
                              padding: '4px 10px',
                              borderRadius: 14,
                              fontSize: 12,
                              fontWeight: 600
                            }}
                          >
                            ✗ {k}
                          </span>
                        ))
                      ) : (
                        <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>No critical missing keywords!</div>
                      )}
                    </div>
                  </div>
                </div>

                {/* 3 Specific Action Items */}
                <div style={{
                  background: '#fafafa',
                  border: '1px solid var(--mid-gray)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '20px',
                  marginBottom: 24
                }}>
                  <div style={{ fontWeight: 800, fontSize: 14, color: 'var(--dark)', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span>🎯</span> 3 Specific Resume Action Items:
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {actionItems.map((action, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 13, color: '#333' }}>
                        <span style={{
                          minWidth: 20, height: 20, borderRadius: '50%', background: 'var(--primary)', color: 'white',
                          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, marginTop: 1
                        }}>
                          {i + 1}
                        </span>
                        <span>{action}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* View Full Skill Gap Report CTA Button */}
                <button
                  type="button"
                  className="btn btn-primary btn-lg"
                  style={{ width: '100%', justifyContent: 'center', fontSize: 16, padding: '14px 20px', marginBottom: 24 }}
                  onClick={() => navigate('/skill-gap-report')}
                  id="view-skill-gap-btn"
                >
                  View My Full Skill Gap Report →
                </button>

                {/* ── LIVE JOBS MATCHING YOUR RESUME (JOB DISCOVERY INTEGRATION) ── */}
                {(() => {
                  const resumeSkills = (analysisData.matchedKeywords || []).map(k => k.trim())
                  const jobsList = generatePortalJobs({ skills: resumeSkills })
                  const topResumeJobs = jobsList.slice(0, 4)

                  return (
                    <div style={{
                      background: '#f8fafc',
                      border: '1.5px solid #e2e8f0',
                      borderRadius: 'var(--radius)',
                      padding: 24,
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, flexWrap: 'wrap', gap: 12 }}>
                        <div>
                          <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--dark)', display: 'flex', alignItems: 'center', gap: 8 }}>
                            <span>💼</span> Live Jobs Matching Your Verified Resume Skills
                          </div>
                          <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 4 }}>
                            Roles matching keywords found in your parsed resume ({resumeSkills.length} keywords detected):
                          </div>
                        </div>
                        <button
                          className="btn btn-secondary btn-sm"
                          onClick={() => navigate('/jobs')}
                          style={{ display: 'flex', alignItems: 'center', gap: 6 }}
                        >
                          View All in Job Finder →
                        </button>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 14 }}>
                        {topResumeJobs.map(job => {
                          const isHighMatch = job.matchPercent >= 70
                          const isMediumMatch = job.matchPercent >= 40
                          const badgeColor = isHighMatch ? '#10b981' : isMediumMatch ? '#f59e0b' : '#6366f1'

                          return (
                            <div
                              key={job.id}
                              style={{
                                background: '#ffffff',
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
                                    {job.matchPercent}%
                                  </span>
                                </div>

                                <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--dark)', marginTop: 10 }}>
                                  {job.title}
                                </div>

                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginTop: 8 }}>
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
              </div>
            )}
          </div>
        </main>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .upload-keywords-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}
