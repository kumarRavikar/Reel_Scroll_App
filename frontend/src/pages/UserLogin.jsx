import React from 'react'
import AuthForm from '../components/AuthForm'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
const UserLogin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const handleSubmit = async(e) => {
    e.preventDefault(); 
    const email = e.target.email.value;
    const password = e.target.password.value;
    setLoading(true);
     try {
       await axios.post("https://reel-scroll-app.onrender.com/api/user/login",
         {email,password},{
           withCredentials:true
         }
       )
       navigate('/home');
     } catch (error) {
        return alert(error.response?.data?.message || error.message) //see real backend error come from backend
     } finally {
      setLoading(false);
    }
  }
  return (
    <>
     <AuthForm
    title="Welcome back"
    subtitle="Login to continue ordering your favorite meals."
    showName={false}
    submitLabel="Login"
    bottomText="Don't have an account?"
    bottomLinkText={loading ? "Logging in..." : "logIn"}
    bottomLinkTo="/user/register"
    onSubmit={handleSubmit}
  /></>
  )
}

export default UserLogin
