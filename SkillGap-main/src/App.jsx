import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import Login from './pages/Login.jsx'
import Onboarding from './pages/Onboarding.jsx'
import Dashboard from './pages/Dashboard.jsx'
import UploadResume from './pages/UploadResume.jsx'
import SkillGapReport from './pages/SkillGapReport.jsx'
import Roadmap from './pages/Roadmap.jsx'
import ApplicationTracker from './pages/ApplicationTracker.jsx'
import JobDiscovery from './pages/JobDiscovery.jsx'
import Profile from './pages/Profile.jsx'

function ProtectedRoute({ children }) {
  const token = localStorage.getItem('skillgap_token')

  if (!token) {
    return <Navigate to="/login" replace />
  }

  return children
}

function PublicRoute({ children }) {
  const token = localStorage.getItem('skillgap_token')

  if (token) {
    return <Navigate to="/dashboard" replace />
  }

  return children
}


export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Login */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        {/* Skills Assessment - kept available, but NOT the starting page */}
        <Route
          path="/onboarding"
          element={
            <ProtectedRoute>
              <Onboarding />
            </ProtectedRoute>
          }
        />

        {/* Upload Resume - NEW STARTING PAGE */}
        <Route
          path="/upload-resume"
          element={
            <ProtectedRoute>
              <UploadResume />
            </ProtectedRoute>
          }
        />

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Skill Gap */}
        <Route
          path="/skill-gap-report"
          element={
            <ProtectedRoute>
              <SkillGapReport />
            </ProtectedRoute>
          }
        />

        {/* Job Finder & Discovery */}
        <Route
          path="/jobs"
          element={
            <ProtectedRoute>
              <JobDiscovery />
            </ProtectedRoute>
          }
        />

        {/* Roadmap */}
        <Route
          path="/roadmap"
          element={
            <ProtectedRoute>
              <Roadmap />
            </ProtectedRoute>
          }
        />

        {/* Application Tracker */}
        <Route
          path="/applications"
          element={
            <ProtectedRoute>
              <ApplicationTracker />
            </ProtectedRoute>
          }
        />

        {/* Profile / User Data */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* Default */}
        <Route
          path="/"
          element={<Navigate to="/dashboard" replace />}
        />

        <Route
          path="*"
          element={<Navigate to="/dashboard" replace />}
        />

      </Routes>
    </BrowserRouter>
  )
}