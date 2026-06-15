import React from 'react'

const ReelItem = ({ videoUrl, description, onVisitStore }) => {
  return (
    <article className="reel-item">
      <video
        className="reel-video"
        src={videoUrl}
        muted
        loop
        playsInline
        preload="metadata"
      />

      <div className="reel-overlay">
        <div className="reel-bottom-gradient" />
        <div className="reel-meta">
          <p className="reel-description">{description}</p>
          <button className="reel-button" type="button" onClick={onVisitStore}>
            Visit Store
          </button>
        </div>
      </div>
    </article>
  )
}

export default ReelItem
