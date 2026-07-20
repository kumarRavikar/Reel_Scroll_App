import React, { useEffect, useMemo, useRef, useState } from 'react'
import axios from 'axios'
import { useNavigate, useLocation } from 'react-router-dom'
import { FiArrowLeft, FiTrash2 } from 'react-icons/fi'
import '../styles/comments.css'

const Comments = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const inputRef = useRef(null)

  const foodId = useMemo(() => {
    return location.state?.foodId || location.search?.split('foodId=')?.[1] || ''
  }, [location])

  const [comments, setComments] = useState([])
  const [commentText, setCommentText] = useState('')
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [currentUserId, setCurrentUserId] = useState('')

  const formatTime = (value) => {
    if (!value) return ''
    const date = new Date(value)
    if (Number.isNaN(date.getTime())) return ''
    return date.toLocaleString([], { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })
  }

  const getDisplayName = (comment) => {
    if (comment?.user?.fullName) return comment.user.fullName
    if (comment?.user?.name) return comment.user.name
    if (comment?.user?.email) return comment.user.email.split('@')[0]
    return 'User'
  }

  const getInitials = (comment) => {
    const name = getDisplayName(comment)
    return name.charAt(0).toUpperCase()
  }

  const fetchComments = async () => {
    if (!foodId) {
      setLoading(false)
      setError('No food selected for comments.')
      return
    }

    try {
      setLoading(true)
      const response = await axios.get(`https://reel-scroll-app.onrender.com/api/food/comment/${foodId}`, {
        withCredentials: true,
      })
      const result = Array.isArray(response?.data?.comments) ? response.data.comments : []
      setComments(result)
      setError('')
    } catch (err) {
      console.error('Unable to fetch comments:', err)
      setError(err.response?.data?.message || 'Unable to load comments right now.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await axios.get('https://reel-scroll-app.onrender.com/api/food/me', { withCredentials: true })
        setCurrentUserId(response?.data?.user?._id || response?.data?.user?.id || '')
      } catch (err) {
        console.error('Unable to resolve current user:', err)
      }
    }

    fetchCurrentUser()
    fetchComments()
  }, [foodId])

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!commentText.trim() || !foodId) return
  console.log("Form Submitted 🚀") // ADD THIS
  if (!commentText.trim() || !foodId) {
    console.log("Blocked ❌", { commentText, foodId })
    return
  }
    try {
      setSubmitting(true)
      setError('')
      const response = await axios.post(
        'https://reel-scroll-app.onrender.com/api/food/comment',
        { foodId, text: commentText.trim() },
        { withCredentials: true }
      )

      const newComment = response?.data?.comment
      if (newComment) {
        setComments((prev) => [newComment, ...prev])
      }
      setCommentText('')
      inputRef.current?.focus()
    } catch (err) {
      console.error('Unable to add comment:', err)
      setError(err.response?.data?.message || 'Unable to post comment.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (commentId) => {
    if (!commentId) return

    try {
      await axios.delete(`https://reel-scroll-app.onrender.com/api/food/comment/${commentId}`, {
        withCredentials: true,
      })
      setComments((prev) => prev.filter((comment) => comment._id !== commentId))
    } catch (err) {
      console.error('Unable to delete comment:', err)
      setError(err.response?.data?.message || 'Unable to delete comment.')
    }
  }

  return (
    <div className="comments-shell">
      <header className="comments-header">
        <button type="button" className="comments-back-btn" onClick={() => navigate(-1)} aria-label="Go back">
          <FiArrowLeft size={18} />
        </button>
        <div>
          <h2 className="comments-title">Comments</h2>
          <p className="comments-subtitle">{comments.length} comments</p>
        </div>
      </header>

      <div className="comments-list">
        {loading ? (
          <div className="comments-empty">Loading comments...</div>
        ) : comments.length === 0 ? (
          <div className="comments-empty">No comments yet. Be the first to share your thoughts.</div>
        ) : (
          comments.map((comment) => {
            const isOwner = currentUserId && comment?.user?._id === currentUserId
            return (
              <article key={comment._id || comment.id} className="comment-card">
                <div className="comment-avatar">
                  {comment?.user?.avatar ? (
                    <img src={comment.user.avatar} alt={getDisplayName(comment)} />
                  ) : (
                    getInitials(comment)
                  )}
                </div>

                <div className="comment-body">
                  <div className="comment-meta">
                    <span className="comment-user">{getDisplayName(comment)}</span>
                    <span className="comment-time">{formatTime(comment.createdAt)}</span>
                  </div>
                  <p className="comment-text">{comment.text || comment.comment}</p>
                </div>

                {isOwner && (
                  <button
                    type="button"
                    className="comment-delete"
                    aria-label="Delete comment"
                    onClick={() => handleDelete(comment._id || comment.id)}
                  >
                    <FiTrash2 size={16} />
                  </button>
                )}
              </article>
            )
          })
        )}
      </div>

      {error ? <div className="comments-status">{error}</div> : null}

      <form className="comments-input-bar" onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          className="comments-input"
          value={commentText}
          onChange={(event) => {
            console.log("Typing:", event.target.value)
            setCommentText(event.target.value)
          }}
          placeholder="Add a comment..."
          maxLength={240}
        />
        <button type="submit" className="comments-submit" disabled={submitting || !commentText.trim()}>
          {submitting ? 'Posting...' : 'Post'}
        </button>
      </form>
    </div>
  )
}

export default Comments