import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/auth.css'

const AuthForm = ({
  title,
  subtitle,
  showName,
  showPartnerFields,
  submitLabel,
  bottomText,
  bottomLinkText,
  bottomLinkTo,
  onSubmit,
}) => {
  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <h1>{title}</h1>
          <p>{subtitle}</p>
        </div>

        <form className="auth-form" noValidate onSubmit={onSubmit}>
          {showName && (
            <label className="auth-label">
              <span>Name</span>
              <input type="text" placeholder="Your name" name="fullName" className="auth-input" />
            </label>
          )}

          {showPartnerFields && (
            <>
              <label className="auth-label">
                <span>Business Name</span>
                <input type="text" placeholder="Your business name" name="businessName" className="auth-input" />
              </label>

              <label className="auth-label">
                <span>Contact Name</span>
                <input type="text" placeholder="Contact person name" name='contactName' className="auth-input" />
              </label>

              <label className="auth-label">
                <span>Phone No</span>
                <input type="tel" placeholder="123-456-7890" name="phoneNo" className="auth-input" />
              </label>

              <label className="auth-label">
                <span>Address</span>
                <textarea placeholder="Business address" className="auth-textarea" rows="4" name="address" />
              </label>
            </>
          )}

          <label className="auth-label">
            <span>Email</span>
            <input type="email" placeholder="you@example.com" className="auth-input" name="email" />
          </label>

          <label className="auth-label">
            <span>Password</span>
            <input type="password" placeholder="Enter password" className="auth-input" name="password" />
          </label>

          <button type="submit" className="auth-button">
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
