import React from 'react'
import { FaHeart,FaCommentDots , FaBookmark  } from "react-icons/fa";
import '../styles/reelActions.css'

 export const ReelActions = () => {
  return (
    <div className="reel-actions">
      <button type="button" className="reel-action reel-action-like" aria-label="Like">
        <FaHeart />
      </button>
      <button type="button" className="reel-action reel-action-comment" aria-label="Comment">
        <FaCommentDots />
      </button>
      <button type="button" className="reel-action reel-action-save" aria-label="Save">
        <FaBookmark />
      </button>
    </div>
  )
}


