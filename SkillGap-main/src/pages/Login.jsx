import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../services/api.js'

export default function Login() {
  const navigate = useNavigate()
  const [tab, setTab] = useState('login') // 'login' | 'register'

  // Login form state
  const [loginData, setLoginData] = useState({ email: '', password: '' })
  const [loginErrors, setLoginErrors] = useState({})

  // Register form state
  const [registerData, setRegisterData] = useState({
    name: '', email: '', password: '', confirmPassword: '',
  })
  const [registerErrors, setRegisterErrors] = useState({})

  const [loading, setLoading] = useState(false)
  const [successMsg, setSuccessMsg] = useState('')
  const [apiError, setApiError] = useState('')

  /* ── Validation ────────────────────────────────── */
  const validateLogin = () => {
    const errs = {}
    if (!loginData.email.trim()) errs.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(loginData.email)) errs.email = 'Enter a valid email'
    if (!loginData.password) errs.password = 'Password is required'
    return errs
  }

  const validateRegister = () => {
    const errs = {}
    if (!registerData.name.trim()) errs.name = 'Name is required'
    if (!registerData.email.trim()) errs.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(registerData.email)) errs.email = 'Enter a valid email'
    if (!registerData.password) errs.password = 'Password is required'
    else if (registerData.password.length < 6) errs.password = 'Password must be at least 6 characters'
    if (!registerData.confirmPassword) errs.confirmPassword = 'Please confirm your password'
    else if (registerData.password !== registerData.confirmPassword) errs.confirmPassword = 'Passwords do not match'
    return errs
  }

  /* ── Handlers ──────────────────────────────────── */
  const handleLogin = async (e) => {
    e.preventDefault()
    const errs = validateLogin()
    if (Object.keys(errs).length) { setLoginErrors(errs); return }

    setLoading(true)
    setApiError('')
    try {
      const data = await api.auth.login({
        email: loginData.email.trim(),
        password: loginData.password,
      })
      // api.js already calls setAuthSession(token, user) on success
      navigate('/dashboard')
    } catch (err) {
      setApiError(err.message || 'Login failed. Please check your credentials.')
    } finally {
      setLoading(false)
    }
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    const errs = validateRegister()
    if (Object.keys(errs).length) {
      setRegisterErrors(errs)
      return
    }

    setLoading(true)
    setApiError('')
    try {
      const data = await api.auth.register({
        name: registerData.name.trim(),
        email: registerData.email.trim(),
        password: registerData.password,
      })

      // Clean up all pre-filled or polluted demo keys for a new student
      const keysToClear = [
        'skillgap_my_skills',
        'skillgap_has_resume',
        'skillgap_resume_name',
        'skillgap_ats_done',
        'skillgap_analysis_data',
        'skillgap_target_company',
        'skillgap_target_company_id',
        'skillgap_target_role',
        'skillgap_target_role_id',
        'skillgap_target_salary',
        'skillgap_salary_group',
        'skillgap_mode',
      ]
      keysToClear.forEach(k => localStorage.removeItem(k))

      // Ensure user object has blank targets
      const cleanUser = {
        ...(data.user || {}),
        targetCompany: '',
        targetRole: '',
        targetSalary: '',
      }
      localStorage.setItem('skillgap_user', JSON.stringify(cleanUser))

      navigate('/upload-resume')
    } catch (err) {
      setApiError(err.message || 'Registration failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // Demo Login — uses a seeded demo account (or creates one if missing)
  const handleDemoLogin = async () => {
    setLoading(true)
    setApiError('')
    const demoEmail = 'demo@skillgap.ai'
    const demoPassword = 'demo123456'
    try {
      await api.auth.login({ email: demoEmail, password: demoPassword })
      navigate('/dashboard')
    } catch {
      // Try creating the demo account
      try {
        await api.auth.register({
          name: 'Aditya Verma (Demo Student)',
          email: demoEmail,
          password: demoPassword,
        })
        navigate('/upload-resume')
      } catch (err2) {
        setApiError('Demo login failed. Make sure the backend is running.')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleTabSwitch = (t) => {
    setTab(t)
    setLoginErrors({})
    setRegisterErrors({})
    setSuccessMsg('')
    setApiError('')
    setLoading(false)
  }

  return (
    <div className="auth-page">
      {/* Left Panel */}
      <div className="auth-left">
        <div className="auth-left-content">
          <div className="auth-logo">
            <div className="auth-logo-icon">SG</div>
            <div className="auth-logo-text">
              Skill<span>Gap</span> AI
            </div>
          </div>
          <h1 className="auth-headline">
            Target Your Dream Job.<br />
            <span>Bridge Every Skill Gap.</span>
          </h1>
          <p className="auth-subtext">
            India's most precise career preparation platform. Benchmark against 20+ top tech and service giants with company-specific ATS analysis, real job descriptions, and custom roadmaps.
          </p>
          <div className="auth-features">
            {[
              '🏢 20+ Companies & Target Salary Group Models',
              '🎯 Real-world Job Descriptions & Company ATS Scoring',
              '🧠 Verified Skill Diagnostic vs. Company Hiring Rubric',
              '🗺️ Tailored Month-by-Month Interview Roadmaps',
              '📋 Kanban Application Tracker with Follow-up reminders',
            ].map((f, i) => (
              <div key={i} className="auth-feature">
                <div className="auth-feature-dot" />
                <span>{f}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="auth-right">
        <div className="auth-form-container">
          
          {/* Quick Demo Login Pill Bar */}
          <div style={{
            background: 'rgba(192, 57, 43, 0.06)',
            border: '1.5px dashed var(--primary)',
            borderRadius: 'var(--radius-sm)',
            padding: '12px 14px',
            marginBottom: 20,
            textAlign: 'center'
          }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--primary)', marginBottom: 4 }}>
              🎓 Demo / Teacher Preview
            </div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 8 }}>
              Loads a pre-configured student profile with verified skills, Amazon target, and sample applications.
            </div>
            <button
              type="button"
              onClick={handleDemoLogin}
              className="btn btn-outline btn-sm"
              style={{ width: '100%', justifyContent: 'center', borderColor: 'var(--primary)', color: 'var(--primary)' }}
              id="try-demo-btn"
              disabled={loading}
            >
              🚀 Launch Demo / Teacher Preview
            </button>
          </div>

          {/* Global API error banner */}
          {apiError && (
            <div style={{
              background: '#fff0f0',
              border: '1px solid #f5c6cb',
              color: '#c0392b',
              padding: '10px 14px',
              borderRadius: 8,
              marginBottom: 16,
              fontSize: 13,
              fontWeight: 600
            }}>
              ⚠ {apiError}
            </div>
          )}

          {/* Tabs */}
          <div className="auth-tabs" role="tablist">
            <button
              role="tab"
              aria-selected={tab === 'login'}
              className={`auth-tab ${tab === 'login' ? 'active' : ''}`}
              onClick={() => handleTabSwitch('login')}
              id="login-tab"
            >
              Sign In
            </button>
            <button
              role="tab"
              aria-selected={tab === 'register'}
              className={`auth-tab ${tab === 'register' ? 'active' : ''}`}
              onClick={() => handleTabSwitch('register')}
              id="register-tab"
            >
              Create Account
            </button>
          </div>

          {/* Login Form */}
          {tab === 'login' && (
            <form className="auth-form" onSubmit={handleLogin} noValidate>
              <h2>Welcome back 👋</h2>
              <p>Sign in to continue your career preparation</p>

              {successMsg && (
                <div style={{ background: 'var(--green-light)', color: 'var(--green)', padding: '10px 14px', borderRadius: 8, marginBottom: 16, fontSize: 13, fontWeight: 600 }}>
                  {successMsg}
                </div>
              )}

              <div className="form-group">
                <label className="form-label" htmlFor="login-email">Email Address</label>
                <input
                  id="login-email"
                  type="email"
                  className={`form-input ${loginErrors.email ? 'error' : ''}`}
                  placeholder="you@example.com"
                  value={loginData.email}
                  onChange={(e) => {
                    setLoginData(d => ({ ...d, email: e.target.value }))
                    setLoginErrors(err => ({ ...err, email: '' }))
                  }}
                  autoComplete="email"
                />
                {loginErrors.email && (
                  <div className="form-error">⚠ {loginErrors.email}</div>
                )}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="login-password">Password</label>
                <input
                  id="login-password"
                  type="password"
                  className={`form-input ${loginErrors.password ? 'error' : ''}`}
                  placeholder="Enter your password"
                  value={loginData.password}
                  onChange={(e) => {
                    setLoginData(d => ({ ...d, password: e.target.value }))
                    setLoginErrors(err => ({ ...err, password: '' }))
                  }}
                  autoComplete="current-password"
                />
                {loginErrors.password && (
                  <div className="form-error">⚠ {loginErrors.password}</div>
                )}
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-lg"
                style={{ width: '100%', justifyContent: 'center', marginTop: 8 }}
                disabled={loading}
                id="login-submit-btn"
              >
                {loading ? (
                  <><span className="spinner" /> Signing in...</>
                ) : 'Sign In →'}
              </button>

              <p style={{ textAlign: 'center', marginTop: 16, fontSize: 13, color: 'var(--text-muted)' }}>
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => handleTabSwitch('register')}
                  style={{ background: 'none', border: 'none', color: 'var(--primary)', fontWeight: 600, cursor: 'pointer', padding: 0, fontSize: 13 }}
                >
                  Create one
                </button>
              </p>
            </form>
          )}

          {/* Register Form */}
          {tab === 'register' && (
            <form className="auth-form" onSubmit={handleRegister} noValidate>
              <h2>Get started free 🚀</h2>
              <p>Create your account and start preparing today</p>

              <div className="form-group">
                <label className="form-label" htmlFor="reg-name">Full Name</label>
                <input
                  id="reg-name"
                  type="text"
                  className={`form-input ${registerErrors.name ? 'error' : ''}`}
                  placeholder="Rahul Sharma"
                  value={registerData.name}
                  onChange={(e) => {
                    setRegisterData(d => ({ ...d, name: e.target.value }))
                    setRegisterErrors(err => ({ ...err, name: '' }))
                  }}
                  autoComplete="name"
                />
                {registerErrors.name && (
                  <div className="form-error">⚠ {registerErrors.name}</div>
                )}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="reg-email">Email Address</label>
                <input
                  id="reg-email"
                  type="email"
                  className={`form-input ${registerErrors.email ? 'error' : ''}`}
                  placeholder="you@example.com"
                  value={registerData.email}
                  onChange={(e) => {
                    setRegisterData(d => ({ ...d, email: e.target.value }))
                    setRegisterErrors(err => ({ ...err, email: '' }))
                  }}
                  autoComplete="email"
                />
                {registerErrors.email && (
                  <div className="form-error">⚠ {registerErrors.email}</div>
                )}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="reg-password">Password</label>
                <input
                  id="reg-password"
                  type="password"
                  className={`form-input ${registerErrors.password ? 'error' : ''}`}
                  placeholder="Minimum 6 characters"
                  value={registerData.password}
                  onChange={(e) => {
                    setRegisterData(d => ({ ...d, password: e.target.value }))
                    setRegisterErrors(err => ({ ...err, password: '' }))
                  }}
                  autoComplete="new-password"
                />
                {registerErrors.password && (
                  <div className="form-error">⚠ {registerErrors.password}</div>
                )}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="reg-confirm">Confirm Password</label>
                <input
                  id="reg-confirm"
                  type="password"
                  className={`form-input ${registerErrors.confirmPassword ? 'error' : ''}`}
                  placeholder="Repeat your password"
                  value={registerData.confirmPassword}
                  onChange={(e) => {
                    setRegisterData(d => ({ ...d, confirmPassword: e.target.value }))
                    setRegisterErrors(err => ({ ...err, confirmPassword: '' }))
                  }}
                  autoComplete="new-password"
                />
                {registerErrors.confirmPassword && (
                  <div className="form-error">⚠ {registerErrors.confirmPassword}</div>
                )}
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-lg"
                style={{ width: '100%', justifyContent: 'center', marginTop: 8 }}
                disabled={loading}
                id="register-submit-btn"
              >
                {loading ? (
                  <><span className="spinner" /> Setting up account...</>
                ) : 'Create Account & Start →'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
