import React from 'react'
import { FaHome, FaBookmark } from 'react-icons/fa'
import '../styles/reelActions.css'
import { Link } from 'react-router-dom'

const BottomNav = () => {
  return (
    <nav className="bottom-nav" aria-label="Bottom navigation">
      <button type="button" className="bottom-nav-button" aria-label="Home">
        <FaHome />
      </button>
      <Link to="/saved-foods" >
      <button type="button" className="bottom-nav-button" aria-label="Saved videos">
        <FaBookmark />
      </button>
      </Link>
    </nav>
  )
}

export default BottomNav
