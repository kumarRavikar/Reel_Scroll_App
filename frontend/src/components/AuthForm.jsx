import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/auth.css'

const AuthForm = ({
  title,
  subtitle,
  showName,
  submitLabel,
  bottomText,
  bottomLinkText,
  bottomLinkTo,
}) => {
  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <h1>{title}</h1>
          <p>{subtitle}</p>
        </div>

        <form className="auth-form" noValidate>
          {showName && (
            <label className="auth-label">
              <span>Name</span>
              <input type="text" placeholder="Your name" className="auth-input" />
            </label>
          )}

          <label className="auth-label">
            <span>Email</span>
            <input type="email" placeholder="you@example.com" className="auth-input" />
          </label>

          <label className="auth-label">
            <span>Password</span>
            <input type="password" placeholder="Enter password" className="auth-input" />
          </label>

          <button type="button" className="auth-button">
            {submitLabel}
          </button>
        </form>

        <div className="auth-footer">
          <span>{bottomText}</span>
          <Link to={bottomLinkTo} className="auth-link">
            {bottomLinkText}
          </Link>
        </div>
      </div>
    </div>
  )
}

export default AuthForm
