import React from 'react'
import AuthForm from '../components/AuthForm'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
const PartnerLogin = () => {
  const navigate = useNavigate();
  const handleSubmit = async(e) => {
       e.preventDefault();
       const email = e.target.email.value;
       const password = e.target.password.value;
       try{
          await axios.post("https://reel-scroll-app.onrender.com/api/food-partner/login",
         {email,password},{
           withCredentials:true
         }
       )
       alert("Food Partner Login successful!");
       e.target.reset();
        navigate('/food-partner/create-food');
     }catch (error) {
        return alert(error.response?.data?.message || error.message) //see real backend error
     }
       }
  
  return (
    <AuthForm
    title="Partner login"
    subtitle="Access your partner dashboard and manage orders."
    showName={false}
    submitLabel="Login"
    bottomText="Don't have an account?"
    bottomLinkText="Register"
    bottomLinkTo="/food-partner/register"
    onSubmit={handleSubmit}
  />
  )
}
export default PartnerLogin
 