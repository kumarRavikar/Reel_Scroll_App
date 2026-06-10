import React from 'react'
import AuthForm from '../components/AuthForm'

const PartnerRegister = () => (
  <AuthForm
    title="Partner with us"
    subtitle="Register your food partner account and start receiving orders."
    showName
    submitLabel="Register"
    bottomText="Already have an account?"
    bottomLinkText="Login"
    bottomLinkTo="/food-partner/login"
  />
)

export default PartnerRegister
