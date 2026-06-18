import React from 'react'
import '../styles/profile.css'

const Profile = () => {
  const videos = [
    1, 2, 3, 4, 5, 6, 7, 8, 9
  ]

  return (
    <div className="profile-page">
      <div className="container">
        <header className="profile-header" role="banner">
          <div className="profile-top">
            <figure className="profile-avatar">
              <img
                src="https://via.placeholder.com/160"
                alt="Business profile image"
                width="160"
                height="160"
              />
            </figure>

            <div className="profile-info">
              <h1 className="business-name">Delish Bites</h1>
              <p className="business-address">123 Food Street, Flavor Town</p>
            </div>
          </div>

          <div className="profile-stats" aria-hidden="false">
            <div className="stat-card" role="region" aria-label="Total Meals">
              <span className="stat-label">Total Meals</span>
              <span className="stat-value">1,254</span>
            </div>

            <div className="stat-card" role="region" aria-label="Customers Served">
              <span className="stat-label">Customers Served</span>
              <span className="stat-value">9,872</span>
            </div>
          </div>
        </header>

        <main>
          <section className="videos-section" aria-labelledby="videos-title">
            <h2 id="videos-title">All Videos</h2>

            <div className="videos-grid">
              {videos.map((n) => (
                <article className="video-thumb" key={n} tabIndex="0">
                  <img
                    src={`https://via.placeholder.com/600x400?text=Video+${n}`}
                    alt={`Video thumbnail ${n}`}
                    loading="lazy"
                  />
                </article>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}

export default Profile