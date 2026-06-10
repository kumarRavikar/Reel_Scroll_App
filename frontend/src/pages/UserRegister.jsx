import React from 'react'
import AuthForm from '../components/AuthForm'

const UserRegister = () => (
  <AuthForm
    title="Create your account"
    subtitle="Register as a food customer and start exploring meals."
    showName
    submitLabel="Register"
    bottomText="Already have an account?"
    bottomLinkText="Login"
    bottomLinkTo="/user/login"
  />
)

export default UserRegister
