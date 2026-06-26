import React from 'react'
import { FaHeart, FaCommentDots, FaBookmark } from 'react-icons/fa'
import '../styles/reelActions.css'

export const ReelActions = ({ likes , comments = 18, saves = 0 , onLike, onSave }) => {
  return (
    <div className="reel-actions">
      <div className="reel-action-group">
        <button type="button" className="reel-action reel-action-like" aria-label="Like" onClick={onLike}>
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
        <button type="button" className="reel-action reel-action-save" aria-label="Save" onClick={onSave}>
          <FaBookmark />
        </button>
        <span className="reel-action-count">{saves}</span>
      </div>
    </div>
  )
}


