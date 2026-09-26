import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar.jsx'
import Navbar from '../components/Navbar.jsx'
import Modal from '../components/Modal.jsx'
import { api } from '../services/api.js'
import { TARGET_COMPANIES, getCompanyAnalysis } from '../data/companyData.js'

const initialApps = [
  { id: '1', company: 'Amazon', role: 'SDE-1', date: '2026-08-01', status: 'Applied', notes: 'Applied via employee referral on Amazon jobs portal.' },
  { id: '2', company: 'Google', role: 'SWE University Grad', date: '2026-08-10', status: 'OA', notes: 'Received HackerEarth screening link. Due this Friday.' },
  { id: '3', company: 'TCS', role: 'TCS Prime', date: '2026-08-15', status: 'Interview', notes: 'Technical interview scheduled for Next Tuesday at 2 PM.' },
  { id: '4', company: 'PhonePe', role: 'SDE-1', date: '2026-08-18', status: 'Offer', notes: 'Received verbal offer! Waiting on CTC document.' },
  { id: '5', company: 'Wipro', role: 'Project Engineer Turbo', date: '2026-07-20', status: 'Rejected', notes: 'Attended interview, position closed.' }
]

const columns = ['Applied', 'OA', 'Interview', 'Offer', 'Rejected']
const statusColors = {
  Applied: '#2980b9',
  OA: '#f39c12',
  Interview: '#8e44ad',
  Offer: '#27ae60',
  Rejected: '#c0392b'
}

export default function ApplicationTracker() {
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [apps, setApps] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [detailApp, setDetailApp] = useState(null)
  const [apiLoading, setApiLoading] = useState(true)

  // Form state
  const [formData, setFormData] = useState({ company: '', role: '', date: '', status: 'Applied', notes: '' })
  const [errors, setErrors] = useState({})

  // Drag state
  const [draggedAppId, setDraggedAppId] = useState(null)
  const [dragOverCol, setDragOverCol] = useState(null)

  // Load applications from backend
  useEffect(() => {
    api.applications.getAll().then(data => {
      if (data && data.success) {
        const normalized = data.applications.map(a => ({
          id: a._id,
          company: a.company,
          role: a.role,
          date: a.appliedDate ? a.appliedDate.split('T')[0] : '',
          status: a.status,
          notes: a.notes || ''
        }))
        setApps(normalized)
        localStorage.setItem('skillgap_apps', JSON.stringify(normalized))
      }
    }).catch(() => {
      // Fall back to localStorage
      const saved = localStorage.getItem('skillgap_apps')
      if (saved) {
        try { setApps(JSON.parse(saved)) } catch (e) { setApps(initialApps) }
      } else {
        setApps(initialApps)
      }
    }).finally(() => {
      setApiLoading(false)
    })
  }, [])

  // Drag Handlers
  const handleDragStart = (e, id) => {
    setDraggedAppId(id)
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('text/plain', id)
    setTimeout(() => {
      e.target.classList.add('dragging')
    }, 0)
  }

  const handleDragEnd = (e) => {
    e.target.classList.remove('dragging')
    setDraggedAppId(null)
    setDragOverCol(null)
  }

  const handleDragOver = (e, status) => {
    e.preventDefault()
    setDragOverCol(status)
  }

  const handleDrop = async (e, status) => {
    e.preventDefault()
    setDragOverCol(null)
    if (draggedAppId) {
      setApps(prev => prev.map(app =>
        app.id === draggedAppId ? { ...app, status } : app
      ))
      // Sync to backend
      try {
        await api.applications.update(draggedAppId, { status })
      } catch { /* ignore, local state already updated */ }
    }
  }

  // Open modal for Create
  const handleOpenCreate = () => {
    setEditingId(null)
    setFormData({
      company: '',
      role: '',
      date: new Date().toISOString().split('T')[0],
      status: 'Applied',
      notes: ''
    })
    setErrors({})
    setIsModalOpen(true)
  }

  // Open modal for Edit
  const handleOpenEdit = (app) => {
    setEditingId(app.id)
    setFormData({
      company: app.company,
      role: app.role,
      date: app.date || '',
      status: app.status || 'Applied',
      notes: app.notes || ''
    })
    setErrors({})
    setIsModalOpen(true)
  }

  const validateForm = () => {
    const errs = {}
    if (!formData.company.trim()) errs.company = 'Company name is required'
    if (!formData.role.trim()) errs.role = 'Role title is required'
    if (!formData.date) errs.date = 'Date applied is required'
    return errs
  }

  const handleSaveApp = async (e) => {
    e.preventDefault()
    const errs = validateForm()
    if (Object.keys(errs).length) {
      setErrors(errs)
      return
    }

    try {
      if (editingId) {
        // Update existing via backend
        const data = await api.applications.update(editingId, {
          company: formData.company,
          role: formData.role,
          status: formData.status,
          appliedDate: formData.date,
          notes: formData.notes,
        })
        setApps(prev => prev.map(a => a.id === editingId ? { ...a, ...formData } : a))
      } else {
        // Create new via backend
        const data = await api.applications.create({
          company: formData.company,
          role: formData.role,
          status: formData.status,
          appliedDate: formData.date,
          notes: formData.notes,
        })
        const newApp = {
          id: data.application?._id || Date.now().toString(),
          company: formData.company,
          role: formData.role,
          date: formData.date,
          status: formData.status,
          notes: formData.notes,
        }
        setApps(prev => [...prev, newApp])
      }
    } catch {
      // Fallback: update local state only
      if (editingId) {
        setApps(prev => prev.map(a => a.id === editingId ? { ...a, ...formData } : a))
      } else {
        const newApp = { id: Date.now().toString(), ...formData }
        setApps(prev => [...prev, newApp])
      }
    }

    setIsModalOpen(false)
  }

  const handleDelete = async (id) => {
    if (window.confirm('Delete this application record?')) {
      setApps(prev => prev.filter(a => a.id !== id))
      try {
        await api.applications.delete(id)
      } catch { /* ignore, local state already updated */ }
    }
  }

  // Check if an application is > 14 days in Applied status (Follow up reminder)
  const isFollowUpDue = (app) => {
    if (app.status !== 'Applied' || !app.date) return false
    try {
      const appliedTime = new Date(app.date).getTime()
      const now = new Date().getTime()
      const diffDays = (now - appliedTime) / (1000 * 3600 * 24)
      return diffDays >= 14
    } catch {
      return false
    }
  }

  // Analytics counts
  const totalCount = apps.length
  const appliedCount = apps.filter(a => a.status === 'Applied').length
  const inProgressCount = apps.filter(a => a.status === 'OA' || a.status === 'Interview').length
  const offerCount = apps.filter(a => a.status === 'Offer').length
  const rejectedCount = apps.filter(a => a.status === 'Rejected').length
  const followUpCount = apps.filter(isFollowUpDue).length

  return (
    <div className="app-layout">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="app-main">
        <Navbar title="Application Pipeline Tracker" onToggleSidebar={() => setSidebarOpen(o => !o)} />

        <main className="page-content" style={{ display: 'flex', flexDirection: 'column' }}>
          
          {/* Header */}
          <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }}>
            <div>
              <h1>📋 Application Pipeline & Tracker</h1>
              <p>Organize, track, and manage your job applications across each interview round.</p>
            </div>
            <button className="btn btn-primary" onClick={handleOpenCreate} id="add-app-btn">
              + Add New Application
            </button>
          </div>

          {/* Analytics Summary Bar */}
          <div className="card fade-in-up" style={{ marginBottom: 24, padding: '18px 24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14, flexWrap: 'wrap', gap: 12 }}>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                <span style={{ background: 'var(--light-gray)', padding: '6px 14px', borderRadius: 20, fontSize: 13, fontWeight: 700 }}>
                  Total: {totalCount}
                </span>
                <span style={{ background: 'rgba(41, 128, 185, 0.15)', color: '#2980b9', padding: '6px 14px', borderRadius: 20, fontSize: 13, fontWeight: 700 }}>
                  Applied: {appliedCount}
                </span>
                <span style={{ background: 'rgba(142, 68, 173, 0.15)', color: '#8e44ad', padding: '6px 14px', borderRadius: 20, fontSize: 13, fontWeight: 700 }}>
                  In Progress: {inProgressCount}
                </span>
                <span style={{ background: 'rgba(39, 174, 96, 0.15)', color: '#27ae60', padding: '6px 14px', borderRadius: 20, fontSize: 13, fontWeight: 700 }}>
                  Offers: {offerCount} 🏆
                </span>
                <span style={{ background: 'rgba(192, 57, 43, 0.15)', color: '#c0392b', padding: '6px 14px', borderRadius: 20, fontSize: 13, fontWeight: 700 }}>
                  Rejected: {rejectedCount}
                </span>
              </div>

              {followUpCount > 0 && (
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  background: 'var(--red-light)', color: 'var(--red)',
                  padding: '6px 14px', borderRadius: 20, fontSize: 12, fontWeight: 700,
                  border: '1px solid rgba(192,57,43,0.3)'
                }}>
                  <span>🔔</span> {followUpCount} application{followUpCount > 1 ? 's' : ''} need follow-up (&gt;14 days)
                </div>
              )}
            </div>

            {/* Horizontal Mini Stacked Proportion Bar */}
            {totalCount > 0 && (
              <div style={{ height: 8, display: 'flex', borderRadius: 4, overflow: 'hidden', background: 'var(--mid-gray)' }}>
                <div style={{ width: `${(appliedCount / totalCount) * 100}%`, background: statusColors.Applied }} title={`Applied: ${appliedCount}`} />
                <div style={{ width: `${(apps.filter(a => a.status === 'OA').length / totalCount) * 100}%`, background: statusColors.OA }} title="OA" />
                <div style={{ width: `${(apps.filter(a => a.status === 'Interview').length / totalCount) * 100}%`, background: statusColors.Interview }} title="Interview" />
                <div style={{ width: `${(offerCount / totalCount) * 100}%`, background: statusColors.Offer }} title={`Offer: ${offerCount}`} />
                <div style={{ width: `${(rejectedCount / totalCount) * 100}%`, background: statusColors.Rejected }} title={`Rejected: ${rejectedCount}`} />
              </div>
            )}
          </div>

          {/* Kanban Board with Drag & Drop */}
          <div className="kanban-board fade-in-up">
            {columns.map(col => {
              const colApps = apps.filter(a => a.status === col)
              return (
                <div
                  key={col}
                  className={`kanban-col ${dragOverCol === col ? 'drag-over' : ''}`}
                  onDragOver={(e) => handleDragOver(e, col)}
                  onDragLeave={() => setDragOverCol(null)}
                  onDrop={(e) => handleDrop(e, col)}
                >
                  <div className="kanban-col-header">
                    <div className="kanban-col-title">
                      <span className="kanban-col-status" style={{ background: statusColors[col] }}></span>
                      {col}
                    </div>
                    <span className="kanban-col-count">{colApps.length}</span>
                  </div>

                  <div style={{ minHeight: 120 }}>
                    {colApps.map(app => {
                      const needsFollowUp = isFollowUpDue(app)
                      return (
                        <div
                          key={app.id}
                          className="kanban-card"
                          draggable
                          onDragStart={(e) => handleDragStart(e, app.id)}
                          onDragEnd={handleDragEnd}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
                            <div className="kanban-card-company" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                              <span>{app.company}</span>
                              {needsFollowUp && (
                                <span
                                  title="Applied over 14 days ago! Consider emailing recruiter or employee referral."
                                  style={{
                                    display: 'inline-flex', alignItems: 'center',
                                    background: 'var(--red)', color: 'white',
                                    fontSize: 10, fontWeight: 800, padding: '1px 6px',
                                    borderRadius: 10
                                  }}
                                >
                                  Follow Up!
                                </span>
                              )}
                            </div>
                            <div style={{ display: 'flex', gap: 4 }}>
                              <button
                                onClick={() => handleOpenEdit(app)}
                                style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: 12 }}
                                title="Edit Application"
                              >
                                ✏️
                              </button>
                              <button
                                onClick={() => handleDelete(app.id)}
                                style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: 12 }}
                                title="Delete Application"
                              >
                                ✕
                              </button>
                            </div>
                          </div>

                          <div className="kanban-card-role">{app.role}</div>
                          <div className="kanban-card-date">🗓️ {app.date}</div>

                          {app.notes && (
                            <div style={{
                              fontSize: 11, color: 'var(--text-secondary)', background: 'var(--light-gray)',
                              padding: '6px 8px', borderRadius: 4, marginTop: 8, fontStyle: 'italic'
                            }}>
                              💬 {app.notes}
                            </div>
                          )}

                          <div style={{ marginTop: 10, display: 'flex', justifyContent: 'flex-end' }}>
                            <button
                              onClick={() => setDetailApp(app)}
                              className="btn btn-sm btn-outline"
                              style={{ padding: '3px 10px', fontSize: 11, fontWeight: 700, borderRadius: 14 }}
                              title="View Skill Gap & Preparation Details"
                            >
                              🔍 View Details
                            </button>
                          </div>
                        </div>
                      )
                    })}

                    {/* FIX 8: Clean custom empty state */}
                    {colApps.length === 0 && (
                      <div style={{
                        textAlign: 'center',
                        padding: '24px 12px',
                        border: '1.5px dashed var(--mid-gray)',
                        borderRadius: 8,
                        color: 'var(--text-muted)',
                        fontSize: 12
                      }}>
                        <div style={{ fontSize: 22, marginBottom: 6 }}>
                          {col === 'Offer' ? '🏆' : col === 'Rejected' ? '😔' : '📭'}
                        </div>
                        No applications here yet
                        {col === 'Applied' && <div style={{ marginTop: 4 }}>Click "+ Add Application" to start tracking</div>}
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </main>
      </div>

      {/* Add / Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingId ? 'Edit Application' : 'Add New Application'}
      >
        <form onSubmit={handleSaveApp}>
          <div className="form-group">
            <label className="form-label">Company Name</label>
            <input
              type="text"
              className={`form-input ${errors.company ? 'error' : ''}`}
              placeholder="e.g. Amazon, Google, TCS, PhonePe..."
              value={formData.company}
              onChange={e => {
                setFormData({ ...formData, company: e.target.value })
                setErrors({ ...errors, company: '' })
              }}
            />
            {errors.company && <div className="form-error">⚠ {errors.company}</div>}
          </div>

          <div className="form-group">
            <label className="form-label">Role / Position</label>
            <input
              type="text"
              className={`form-input ${errors.role ? 'error' : ''}`}
              placeholder="e.g. SDE-1, SDE Intern, Backend Engineer..."
              value={formData.role}
              onChange={e => {
                setFormData({ ...formData, role: e.target.value })
                setErrors({ ...errors, role: '' })
              }}
            />
            {errors.role && <div className="form-error">⚠ {errors.role}</div>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Date Applied</label>
              <input
                type="date"
                className={`form-input ${errors.date ? 'error' : ''}`}
                value={formData.date}
                onChange={e => {
                  setFormData({ ...formData, date: e.target.value })
                  setErrors({ ...errors, date: '' })
                }}
              />
              {errors.date && <div className="form-error">⚠ {errors.date}</div>}
            </div>

            <div className="form-group">
              <label className="form-label">Pipeline Status</label>
              <select
                className="form-select"
                value={formData.status}
                onChange={e => setFormData({ ...formData, status: e.target.value })}
              >
                {columns.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Interview / Application Notes</label>
            <textarea
              className="form-textarea"
              rows={3}
              placeholder="e.g. Referral from alumni, OA scheduled for Friday, completed HR round..."
              value={formData.notes}
              onChange={e => setFormData({ ...formData, notes: e.target.value })}
              style={{ minHeight: 80 }}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%', justifyContent: 'center', marginTop: 10 }}
          >
            {editingId ? 'Save Changes' : 'Save Application'}
          </button>
        </form>
      </Modal>

      {/* Change 7: Application Detail Modal with Skill Gap Connection */}
      <Modal
        isOpen={Boolean(detailApp)}
        onClose={() => setDetailApp(null)}
        title={detailApp ? `${detailApp.company} — ${detailApp.role}` : 'Application Details'}
      >
        {detailApp && (() => {
          const matchedCompany = TARGET_COMPANIES.find(c =>
            c.name.toLowerCase() === detailApp.company.toLowerCase() ||
            detailApp.company.toLowerCase().includes(c.name.toLowerCase()) ||
            c.name.toLowerCase().includes(detailApp.company.toLowerCase()) ||
            c.id.toLowerCase() === detailApp.company.toLowerCase()
          )

          const compAnalysis = matchedCompany
            ? getCompanyAnalysis(matchedCompany.id, matchedCompany.roles[0]?.id || '')
            : null

          const mySkills = (() => {
            try { return JSON.parse(localStorage.getItem('skillgap_my_skills') || '[]') }
            catch { return [] }
          })()

          const requiredSkills = compAnalysis
            ? [...(compAnalysis.skillsHave || []), ...(compAnalysis.skillsNeed || [])]
            : []

          const skillsYouHave = requiredSkills.filter(s =>
            mySkills.some(ms => s.name.toLowerCase().includes(ms.toLowerCase()) || ms.toLowerCase().includes(s.name.toLowerCase()))
          )

          const skillsYouNeed = requiredSkills.filter(s =>
            !mySkills.some(ms => s.name.toLowerCase().includes(ms.toLowerCase()) || ms.toLowerCase().includes(s.name.toLowerCase()))
          )

          return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {/* Status and metadata bar */}
              <div style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                flexWrap: 'wrap', gap: 8, padding: '10px 14px', background: 'var(--light-gray)',
                borderRadius: 'var(--radius-sm)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{
                    padding: '3px 10px', borderRadius: 12, fontSize: 12, fontWeight: 700,
                    background: statusColors[detailApp.status] || '#777', color: 'white'
                  }}>
                    {detailApp.status}
                  </span>
                  <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                    Applied: {detailApp.date || 'N/A'}
                  </span>
                </div>
                {detailApp.notes && (
                  <div style={{ fontSize: 12, color: 'var(--text-secondary)', fontStyle: 'italic', width: '100%', marginTop: 4 }}>
                    💬 {detailApp.notes}
                  </div>
                )}
              </div>

              {/* Your Current Gap for This Role Section (Change 7) */}
              <div style={{
                border: '1px solid var(--mid-gray)',
                borderRadius: 'var(--radius-sm)',
                padding: '16px',
                background: 'var(--white)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                  <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--dark)' }}>
                    🎯 Your Current Gap for This Role
                  </h3>
                  {matchedCompany && (
                    <span style={{ fontSize: 11, background: 'var(--primary-glow)', color: 'var(--primary)', padding: '2px 8px', borderRadius: 10, fontWeight: 700 }}>
                      Matched to {matchedCompany.name} Benchmarks
                    </span>
                  )}
                </div>

                {compAnalysis ? (
                  <>
                    <div style={{ marginBottom: 14 }}>
                      <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--green)', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 6 }}>
                        <span>✅ Skills You Already Have ({skillsYouHave.length})</span>
                      </div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                        {skillsYouHave.length > 0 ? (
                          skillsYouHave.map((s, idx) => (
                            <span
                              key={idx}
                              style={{
                                background: '#dcfce7',
                                color: '#15803d',
                                border: '1px solid #86efac',
                                padding: '3px 10px',
                                borderRadius: 16,
                                fontSize: 11,
                                fontWeight: 700
                              }}
                            >
                              ✓ {s.name}
                            </span>
                          ))
                        ) : (
                          <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                            No verified matching skills found yet. Complete the Skill Assessment!
                          </span>
                        )}
                      </div>
                    </div>

                    <div>
                      <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--red)', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 6 }}>
                        <span>❌ Skills You Still Need to Master ({skillsYouNeed.length})</span>
                      </div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                        {skillsYouNeed.length > 0 ? (
                          skillsYouNeed.map((s, idx) => (
                            <span
                              key={idx}
                              style={{
                                background: '#fee2e2',
                                color: '#b91c1c',
                                border: '1px solid #f87171',
                                padding: '3px 10px',
                                borderRadius: 16,
                                fontSize: 11,
                                fontWeight: 700
                              }}
                            >
                              ✗ {s.name}
                            </span>
                          ))
                        ) : (
                          <span style={{ fontSize: 12, color: 'var(--green)', fontWeight: 700 }}>
                            🎉 You have covered all tracked prerequisite skills for this role!
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Interview pipeline snapshot */}
                    {compAnalysis.interviewRounds && (
                      <div style={{ marginTop: 14, paddingTop: 12, borderTop: '1px solid var(--mid-gray)' }}>
                        <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 6 }}>
                          🏢 Selection Pipeline:
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                          {compAnalysis.interviewRounds.map((r, idx) => (
                            <span
                              key={idx}
                              style={{
                                background: 'var(--light-gray)',
                                color: 'var(--dark)',
                                padding: '3px 8px',
                                borderRadius: 6,
                                fontSize: 11,
                                fontWeight: 600
                              }}
                            >
                              Round {idx + 1}: {r}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div style={{ fontSize: 13, color: 'var(--text-secondary)', padding: '10px 0' }}>
                    <p style={{ marginBottom: 6 }}>
                      Company '{detailApp.company}' does not have a direct predefined profile in company benchmarks.
                    </p>
                    <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                      You can benchmark your skills against industry standards in the Skill Gap Report.
                    </p>
                  </div>
                )}
              </div>

              {/* Action buttons */}
              {matchedCompany && (
                <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 4 }}>
                  <button
                    className="btn btn-outline"
                    onClick={() => {
                      localStorage.setItem('skillgap_target_company_id', matchedCompany.id)
                      localStorage.setItem('skillgap_target_role_id', matchedCompany.roles[0]?.id || '')
                      localStorage.setItem('skillgap_target_company', matchedCompany.name)
                      navigate('/skill-gap-report')
                    }}
                    style={{ fontSize: 12 }}
                  >
                    View Full Skill Gap Report →
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      localStorage.setItem('skillgap_target_company_id', matchedCompany.id)
                      localStorage.setItem('skillgap_target_role_id', matchedCompany.roles[0]?.id || '')
                      localStorage.setItem('skillgap_target_company', matchedCompany.name)
                      navigate('/roadmap')
                    }}
                    style={{ fontSize: 12 }}
                  >
                    Open Roadmap →
                  </button>
                </div>
              )}
            </div>
          )
        })()}
      </Modal>
    </div>
  )
}
