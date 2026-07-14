import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import UserRegister from '../pages/UserRegister'
import UserLogin from '../pages/UserLogin'
import PartnerRegister from '../pages/PartnerRegister'
import PartnerLogin from '../pages/PartnerLogin'
import ChooseAccount from '../pages/ChooseAccount'
import Home from '../general/Home'
import CreateFood from '../food-partner/CreateFood'
import Profile from '../food-partner/Profile'
import SavedFoods from '../pages/SavedFoods'
import Comments from '../pages/Comments'

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ChooseAccount />} />
        <Route path="/user/register" element={<UserRegister />} />
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/food-partner/register" element={<PartnerRegister />} />
        <Route path="/food-partner/login" element={<PartnerLogin />} />
        <Route path="/home" element={<Home />} />
        <Route path="/food-partner/create-food" element={<CreateFood/>} />
        <Route path="/food-partner/profile/:id" element={<Profile />} />
        <Route path="/saved-foods" element={<SavedFoods />} />
        <Route path="/comments" element={<Comments />} />
        <Route path="*" element={<Navigate to="/" replace />} /> 
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes