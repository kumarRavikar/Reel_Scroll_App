import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/savedFoods.css";

const SavedFoods = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    const fetchSavedFoods = async () => {
      setLoading(true);

      try {
        const response = await axios.get("https://reel-scroll-app.onrender.com/api/food/saved", {
          withCredentials: true,
        });
       
        const savedFoods = Array.isArray(response.data.savedFoods)
          ? response.data.savedFoods.map((item) => ({
              _id: item.food?._id ?? item._id,
              video: item.food?.video ?? item.video,
              name: item.food?.name ?? item.name ?? "Untitled dish",
              description:
                item.food?.description ??
                item.description ??
                "A delicious pick saved for later.",
              likeCount: item.food?.likeCount ?? item.likeCount ?? 0,
              saveCount: item.food?.saveCount ?? item.saveCount ?? 0,
              commentCount: item.food?.commentCount ?? item.commentCount ?? 0,
            }))
          : [];

        setVideos(savedFoods);
        console.log("Fetched saved foods:", savedFoods);
      } catch (error) {
        console.error("Failed to fetch saved foods:", error);
        setVideos([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSavedFoods();
  }, []);
    console.log("Current videos state:", videos);
  useEffect(() => {
    if (!selectedVideo) {
      document.body.style.overflow = "";
      return;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setSelectedVideo(null);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [selectedVideo]);

  const openVideo = (video) => setSelectedVideo(video);
  const closeVideo = () => setSelectedVideo(null);

  return (
    <section className="saved-foods-page" aria-busy={loading}>
      <header className="saved-foods-header">
        <div>
          <p className="saved-foods-kicker">Curated picks</p>
          <h1>Saved foods</h1>
          <p className="saved-foods-subtitle">
            Revisit your favorite dishes whenever you are ready.
          </p>
        </div>
        <span className="saved-foods-count">{videos.length} saved</span>
      </header>

      {loading ? (
        <div className="saved-foods-grid" role="status" aria-live="polite">
          {Array.from({ length: 4 }).map((_, index) => (
            <div className="saved-food-card saved-food-card--skeleton" key={index} />
          ))}
        </div>
      ) : videos.length === 0 ? (
        <div className="saved-foods-empty">
          <div className="saved-foods-empty-icon">♡</div>
          <h2>No saved posts yet</h2>
          <p>Save a few favorites and they will appear here instantly.</p>
        </div>
      ) : (
        <div className="saved-foods-grid">
          {videos.map((video) => (
            <button
              key={video._id}
              type="button"
              className="saved-food-card"
              onClick={() => openVideo(video)}
            >
              {video.video ? (
                <video
                  className="saved-food-video"
                  src={video.video}
                  muted
                  playsInline
                  preload="metadata"
                />
              ) : (
                <div className="saved-food-video saved-food-video--fallback" />
              )}

              <div className="saved-food-card-overlay">
                <div className="saved-food-card-meta">
                  <span className="saved-food-card-name">{video.name}</span>
                </div>
                <div className="saved-food-card-stats">
                  <span>Likes: {video.likeCount}</span>
                  <span> Saves: {video.saveCount}</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      {selectedVideo && (
        <div
          className="saved-foods-modal-backdrop"
          role="dialog"
          aria-modal="true"
          onClick={closeVideo}
        >
          <div className="saved-foods-modal" onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              className="saved-foods-modal-close"
              onClick={closeVideo}
              aria-label="Close saved food"
            >
              ×
            </button>

            <div className="saved-foods-modal-media">
              {selectedVideo.video ? (
                <video
                  className="saved-foods-modal-video"
                  src={selectedVideo.video}
                  autoPlay
                  muted
                  loop
                  playsInline
                />
              ) : (
                <div className="saved-foods-modal-video saved-foods-modal-video--fallback" />
              )}
            </div>

            <div className="saved-foods-modal-content">
              <div className="saved-foods-modal-heading">
                <div>
                  <h2>{selectedVideo.name}</h2>
                  <p>{selectedVideo.description}</p>
                </div>
                <div className="saved-foods-modal-stats">
                  <span>❤ {selectedVideo.likeCount}</span>
                  <span>💬 {selectedVideo.commentCount}</span>
                  <span>🔖 {selectedVideo.saveCount}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default SavedFoods;
