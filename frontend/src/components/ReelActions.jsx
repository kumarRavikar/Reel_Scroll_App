import React from 'react'
import { FaHeart, FaCommentDots, FaBookmark } from 'react-icons/fa'
import '../styles/reelActions.css'

export const ReelActions = ({ likes = 124, comments = 18, saves = 9 }) => {
  return (
    <div className="reel-actions">
      <div className="reel-action-group">
        <button type="button" className="reel-action reel-action-like" aria-label="Like">
          <FaHeart />
        </button>
        <span className="reel-action-count">{likes}</span>
      </div>
      <div className="reel-action-group">
        <button type="button" className="reel-action reel-action-comment" aria-label="Comment">
          <FaCommentDots />
        </button>
        <span className="reel-action-count">{comments}</span>
      </div>
      <div className="reel-action-group">
        <button type="button" className="reel-action reel-action-save" aria-label="Save">
          <FaBookmark />
        </button>
        <span className="reel-action-count">{saves}</span>
      </div>
    </div>
  )
}


