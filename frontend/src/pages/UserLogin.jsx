import React from 'react'
import AuthForm from '../components/AuthForm'

const UserLogin = () => (
  <AuthForm
    title="Welcome back"
    subtitle="Login to continue ordering your favorite meals."
    showName={false}
    submitLabel="Login"
    bottomText="Don't have an account?"
    bottomLinkText="Register"
    bottomLinkTo="/user/register"
  />
)

export default UserLogin
