import React from 'react'

export default function StatCard({ icon, label, value, color = 'red', trend, trendDir }) {
  return (
    <div className={`stat-card ${color} fade-in-up`}>
      <div className="stat-card-header">
        <div className={`stat-card-icon`}>{icon}</div>
        {trend && (
          <span className={`stat-card-trend ${trendDir || 'up'}`}>
            {trendDir === 'up' ? '▲' : '▼'} {trend}
          </span>
        )}
      </div>
      <div className="stat-card-value">{value}</div>
      <div className="stat-card-label">{label}</div>
    </div>
  )
}
