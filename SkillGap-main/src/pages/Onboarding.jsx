import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { ONBOARDING_SKILL_CATEGORIES } from '../data/companyData.js'
import { api } from '../services/api.js'

export default function Onboarding() {
  const navigate = useNavigate()
  const location = useLocation()
  const isEdit = new URLSearchParams(location.search).get('edit') === 'true'
  const returnTo = new URLSearchParams(location.search).get('returnTo') || '/skill-gap-report'

  const user = (() => {
    try { return JSON.parse(localStorage.getItem('skillgap_user') || '{}') }
    catch { return {} }
  })()

  // Selected skills set - starts empty for new users
  const [selectedSkills, setSelectedSkills] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('skillgap_my_skills') || '[]')
      if (Array.isArray(saved)) return saved
    } catch {}
    return []
  })

  // Redirect if already completed onboarding unless edit mode is requested
  useEffect(() => {
    const existing = localStorage.getItem('skillgap_my_skills')
    if (existing && existing !== '[]' && !isEdit && !location.search.includes('returnTo')) {
      navigate('/skill-gap-report')
    }
  }, [isEdit, navigate, location.search])

  const toggleSkill = (skill) => {
    setSelectedSkills(prev => {
      if (prev.includes(skill)) {
        return prev.filter(s => s !== skill)
      } else {
        return [...prev, skill]
      }
    })
  }

  const selectAllInCategory = (skills) => {
    setSelectedSkills(prev => {
      const allPresent = skills.every(s => prev.includes(s))
      if (allPresent) {
        // Deselect all
        return prev.filter(s => !skills.includes(s))
      } else {
        // Select all
        const set = new Set([...prev, ...skills])
        return Array.from(set)
      }
    })
  }

  const handleSave = async (e) => {
    e.preventDefault()
    // Save to localStorage for fast reads
    localStorage.setItem('skillgap_my_skills', JSON.stringify(selectedSkills))
    // Also persist to backend
    try {
      const skillsPayload = selectedSkills.map(name => ({ name, level: 'Intermediate' }))
      await api.skills.saveSkills(skillsPayload)
    } catch {
      // Backend unavailable — localStorage save is sufficient
    }
    // Navigate to /skill-gap-report so student immediately sees impact (Change 10)
    navigate('/skill-gap-report')
  }

  const totalSkillsCount = ONBOARDING_SKILL_CATEGORIES.reduce((acc, c) => acc + c.skills.length, 0)

  return (
    <div style={{ minHeight: '100vh', background: 'var(--light-gray)', padding: '40px 20px' }}>
      <div style={{ maxWidth: 880, margin: '0 auto' }}>
        
        {/* Top Header Card */}
        <div className="card fade-in-up" style={{
          background: 'linear-gradient(135deg, var(--dark) 0%, #2c0a07 100%)',
          color: 'white',
          padding: '36px',
          marginBottom: 28,
          borderRadius: 'var(--radius)',
          boxShadow: 'var(--shadow-lg)',
          border: '1px solid rgba(192,57,43,0.3)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.1)', padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 700, marginBottom: 12 }}>
                <span>🎯 STEP 1 OF PREPARATION</span>
              </div>
              <h1 style={{ fontSize: 28, fontWeight: 800, color: 'white', marginBottom: 8 }}>
                Tell us what you already know 🚀
              </h1>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)', maxWidth: 580, lineHeight: 1.6 }}>
                Welcome {user.name ? <strong>{user.name}</strong> : 'Candidate'}! Check all the programming languages, frameworks, databases, and tools you have worked with.
                We'll compute your personalized skill gap and readiness score against your target companies.
              </p>
            </div>

            <div style={{
              background: 'rgba(255,255,255,0.1)',
              padding: '16px 20px',
              borderRadius: 'var(--radius)',
              textAlign: 'center',
              border: '1px solid rgba(255,255,255,0.15)'
            }}>
              <div style={{ fontSize: 28, fontWeight: 800, color: '#f1c40f' }}>
                {selectedSkills.length} / {totalSkillsCount}
              </div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)', fontWeight: 600, textTransform: 'uppercase' }}>
                Skills Selected
              </div>
            </div>
          </div>
        </div>

        {/* Categories Checklist Form */}
        <form onSubmit={handleSave}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {ONBOARDING_SKILL_CATEGORIES.map((catGroup, idx) => {
              const allSelected = catGroup.skills.every(s => selectedSkills.includes(s))
              const selectedCount = catGroup.skills.filter(s => selectedSkills.includes(s)).length

              return (
                <div key={idx} className="card fade-in-up" style={{ padding: '24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, flexWrap: 'wrap', gap: 8 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span style={{ fontSize: 22 }}>{catGroup.icon}</span>
                      <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--dark)' }}>
                        {catGroup.category}
                      </h3>
                      <span style={{
                        fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 20,
                        background: selectedCount > 0 ? 'var(--green-light)' : 'var(--light-gray)',
                        color: selectedCount > 0 ? 'var(--green)' : 'var(--text-muted)'
                      }}>
                        {selectedCount} of {catGroup.skills.length}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => selectAllInCategory(catGroup.skills)}
                      style={{
                        background: 'none', border: 'none', color: 'var(--primary)',
                        fontSize: 12, fontWeight: 600, cursor: 'pointer', padding: '4px 8px'
                      }}
                    >
                      {allSelected ? '✕ Deselect All' : '✓ Select All in Category'}
                    </button>
                  </div>

                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))',
                    gap: 10
                  }}>
                    {catGroup.skills.map((skill) => {
                      const isChecked = selectedSkills.includes(skill)
                      return (
                        <label
                          key={skill}
                          onClick={() => toggleSkill(skill)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 10,
                            padding: '10px 14px',
                            borderRadius: 'var(--radius-sm)',
                            border: isChecked ? '1.5px solid var(--primary)' : '1px solid var(--mid-gray)',
                            background: isChecked ? 'var(--primary-glow)' : 'var(--white)',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            userSelect: 'none'
                          }}
                        >
                          <div className={`custom-checkbox ${isChecked ? 'checked' : ''}`}>
                            {isChecked && '✓'}
                          </div>
                          <span style={{
                            fontSize: 13,
                            fontWeight: isChecked ? 700 : 500,
                            color: isChecked ? 'var(--dark)' : 'var(--text-secondary)'
                          }}>
                            {skill}
                          </span>
                        </label>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Sticky Bottom Save Action Bar (FIX 1 & FIX 11) */}
          <div style={{
            position: 'sticky',
            bottom: 20,
            marginTop: 28,
            background: 'var(--white)',
            padding: '18px 24px',
            borderRadius: 'var(--radius)',
            boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 16,
            zIndex: 50,
            border: '1px solid var(--mid-gray)'
          }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--dark)' }}>
                {selectedSkills.length} skills verified in your profile
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                You can always re-take this assessment or add skills from your Profile.
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <button
                type="button"
                onClick={() => navigate(returnTo)}
                style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: 13, cursor: 'pointer', fontWeight: 600 }}
              >
                Skip for now →
              </button>
              <button
                type="submit"
                className="btn btn-primary btn-lg"
                id="save-onboarding-btn"
              >
                🚀 Save My Profile & Continue →
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
