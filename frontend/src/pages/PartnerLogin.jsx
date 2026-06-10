import React from 'react'
import AuthForm from '../components/AuthForm'

const PartnerLogin = () => (
  <AuthForm
    title="Partner login"
    subtitle="Access your partner dashboard and manage orders."
    showName={false}
    submitLabel="Login"
    bottomText="Don't have an account?"
    bottomLinkText="Register"
    bottomLinkTo="/food-partner/register"
  />
)

export default PartnerLogin
