import React from 'react'
import AuthForm from '../components/AuthForm'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const PartnerRegister = () => {
   const navigate = useNavigate();
  const handleSubmit = async(e)=>{
       e.preventDefault()
       const businessName = e.target.businessName.value;
       const email = e.target.email.value;
       const password = e.target.password.value;
       const contactName = e.target.contactName.value;  
       const phoneNo = e.target.phoneNo.value;
       const address = e.target.address.value;
     try {
        await axios.post("http://localhost:3000/api/food-partner/register",
         { businessName,email,password,contactName,phoneNo,address },
       {withCredentials:true}
     );
     alert("Food Partner Registration successful!");
      e.target.reset();
       navigate("/food-partner/create-food");
     } catch (error) {
       return alert(error.response?.data?.message || "Registration failed");
     }
  }
  return (
   <AuthForm
    title="Partner with us"
    subtitle="Register your food partner account and start receiving orders."
    showPartnerFields
    submitLabel="Register"
    bottomText="Already have an account?"
    bottomLinkText="Login"
    bottomLinkTo="/food-partner/login"
    onSubmit={handleSubmit}
  />
  )
}

export default PartnerRegister
