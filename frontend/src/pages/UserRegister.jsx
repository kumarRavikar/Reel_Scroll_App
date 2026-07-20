import React,{useState} from "react";
import AuthForm from "../components/AuthForm";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserRegister = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)
 const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const name = e.target.fullName.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    setLoading(true)
    await axios.post(
      "https://reel-scroll-app.onrender.com/api/user/register",
      { fullName: name, email, password },
      { withCredentials: true }
    );
    alert("Registration successful!");
    e.target.reset();
    navigate("/home");
  } catch (err) {
    console.log(err.response?.data || err.message); //see real backend error
    alert("Registration failed");
  } finally{
    setLoading(false)
  }
};
  return (
    <>
      <AuthForm
        title="Create your account"
        subtitle="Register as a food customer and start exploring meals."
        showName
        submitLabel={loading ? "Registering..." : "Register"}
        bottomText="Already have an account?"
        bottomLinkText="Login"
        bottomLinkTo="/user/login"
        onSubmit={handleSubmit}
      />
     
    </>
  );
};

export default UserRegister;
