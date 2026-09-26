import React from 'react'

export default function Navbar({ title, onToggleSidebar }) {
  const user = (() => {
    try {
      return JSON.parse(localStorage.getItem('skillgap_user') || '{}')
    } catch {
      return {}
    }
  })()

const targetCompany =
  localStorage.getItem('skillgap_target_company') ||user.targetCompany ||''
const targetRole = localStorage.getItem('skillgap_target_role') ||user.targetRole || ''
  const today = new Date().toLocaleDateString('en-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })

  return (
    <header className="navbar" role="banner">
      <div className="navbar-left">
        <button
          className="hamburger-btn"
          onClick={onToggleSidebar}
          aria-label="Toggle sidebar"
          id="hamburger-menu-btn"
        >
          ☰
        </button>
        <div className="navbar-breadcrumb">
          <span>{today} · </span>
          <strong>{title}</strong>
        </div>
      </div>
      <div className="navbar-right">
        {targetCompany ? (
  <span
    className="navbar-badge"
    title={`Active Target: ${targetCompany}${targetRole ? ` (${targetRole})` : ''}`}
  >
    🎯 Target: {targetCompany}
  </span>
) : (
  <span className="navbar-badge">
    🎯 No target selected
  </span>
)}
        <div
          className="navbar-avatar"
          title={user.name || 'User'}
          aria-label="User avatar"
        >
          {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
        </div>
      </div>
    </header>
  )
}
