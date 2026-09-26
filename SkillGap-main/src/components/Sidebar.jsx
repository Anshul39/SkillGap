import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { api } from '../services/api.js'

const navItems = [
  { icon: '📊', label: 'Dashboard', path: '/dashboard' },
  { icon: '🧠', label: 'Skills Assessment', path: '/onboarding' },
  { icon: '📄', label: 'Upload & Target JD', path: '/upload-resume' },
  { icon: '🎯', label: 'Skill Gap Report', path: '/skill-gap-report' },
  { icon: '💼', label: 'Job Finder', path: '/jobs' },
  { icon: '🗺️', label: 'Roadmap', path: '/roadmap' },
  { icon: '📋', label: 'Application Tracker', path: '/applications' },
  { icon: '👤', label: 'Profile', path: '/profile' },
]

export default function Sidebar({ isOpen, onClose }) {
  const navigate = useNavigate()
  const location = useLocation()

  const user = (() => {
    try {
      return JSON.parse(localStorage.getItem('skillgap_user') || '{}')
    } catch {
      return {}
    }
  })()

  const handleLogout = () => {
    api.auth.logout()
    localStorage.clear()
    navigate('/login')
  }

  const handleNav = (path) => {
    navigate(path)
    if (onClose) onClose()
  }

  return (
    <>
      {/* Mobile overlay */}
      <div
        className={`sidebar-overlay ${isOpen ? 'open' : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />

      <aside className={`sidebar ${isOpen ? 'open' : ''}`} role="navigation" aria-label="Main navigation">
        {/* Close button (mobile) */}
        <button
          className="sidebar-close-btn"
          onClick={onClose}
          aria-label="Close sidebar"
        >
          ✕
        </button>

        {/* Logo */}
        <div className="sidebar-logo">
          <div className="sidebar-logo-icon">SG</div>
          <div className="sidebar-logo-text">
            <span>SkillGap AI</span>
            <span>Career Prep Platform</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="sidebar-nav">
          <div className="sidebar-section-label">Main Menu</div>
          {navItems.map((item) => {
            const isActive = location.pathname === item.path
            return (
              <button
                key={item.path}
                className={`sidebar-nav-item ${isActive ? 'active' : ''}`}
                onClick={() => handleNav(item.path)}
                aria-current={isActive ? 'page' : undefined}
                style={{
                  fontWeight: isActive ? 700 : 500,
                  borderLeft: isActive ? '3px solid var(--primary)' : '3px solid transparent'
                }}
              >
                <span className="sidebar-nav-icon">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            )
          })}
        </nav>

        {/* User footer */}
        <div className="sidebar-footer">
          <div className="sidebar-user" onClick={handleLogout} title="Click to logout" role="button" tabIndex={0}>
            <div className="sidebar-avatar">
              {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
            </div>
            <div className="sidebar-user-info">
              <span>{user.name || 'User'}</span>
              <span>Sign out →</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}
