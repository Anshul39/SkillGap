import React, { useEffect, useState } from 'react'

export default function ProgressBar({ label, value, color = '', showValue = true }) {
  const [width, setWidth] = useState(0)

  useEffect(() => {
    // Animate in
    const timer = setTimeout(() => setWidth(value), 100)
    return () => clearTimeout(timer)
  }, [value])

  return (
    <div className="progress-bar-wrap">
      {(label || showValue) && (
        <div className="progress-bar-header">
          {label && <span className="progress-bar-label">{label}</span>}
          {showValue && <span className="progress-bar-value">{value}%</span>}
        </div>
      )}
      <div className="progress-bar-track">
        <div
          className={`progress-bar-fill ${color}`}
          style={{ width: `${width}%` }}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={label}
        />
      </div>
    </div>
  )
}
