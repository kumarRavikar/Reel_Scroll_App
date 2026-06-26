import React from "react";
import { Link } from "react-router-dom";
import {ReelActions} from "../components/ReelActions"
const ReelItem = ({ videoUrl, description, itemId, likeCount, commentCount, saveCount, likeVideo, saveVideo }) => {
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
      <ReelActions likes={likeCount} comments={commentCount} saves={saveCount} onLike={likeVideo} onSave={saveVideo} />

      <div className="reel-overlay">
        <div className="reel-bottom-gradient" />
        <div className="reel-meta">
          <p className="reel-description">{`${description}...`}</p>
          {itemId && (
            <Link 
              to={`/food-partner/profile/${itemId}`}
              className="reel-button"
            >
              Visit Store
            </Link>
          )}
        </div>
      </div>
    </article>
  );
};

export default ReelItem;
