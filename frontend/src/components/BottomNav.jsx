import React from 'react'
import { FaHome, FaBookmark } from 'react-icons/fa'
import '../styles/reelActions.css'

const BottomNav = () => {
  return (
    <nav className="bottom-nav" aria-label="Bottom navigation">
      <button type="button" className="bottom-nav-button" aria-label="Home">
        <FaHome />
      </button>
      <button type="button" className="bottom-nav-button" aria-label="Saved videos">
        <FaBookmark />
      </button>
    </nav>
  )
}

export default BottomNav
