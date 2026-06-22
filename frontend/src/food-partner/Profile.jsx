import React ,{useState, useEffect} from 'react'
import '../styles/profile.css'
import axios from 'axios'
import { useParams } from 'react-router-dom';
const Profile = () => {
  const {id} = useParams();
  const [profile, setProfile] = useState(null);
  const [videos, setVideos] = useState([]);
  
 useEffect(()=>{
   axios.get(`http://localhost:3000/api/food-partner/profile/${id}`, {withCredentials: true}).then((res)=>{
    setProfile(res.data.foodPartner)
    setVideos(res.data.foodPartner.foodItems)
   })
 },[id])
console.log("profile",profile)
console.log("videos",videos)
  return (
    <div className="profile-page">
      <div className="container">
        <header className="profile-header" role="banner">
          <div className="profile-top">
            <figure className="profile-avatar">
              <img
                src={profile?.avatar || "https://cyber.comolho.com/static/img/avatar.png"}
                alt="Business profile image"
                width="160"
                height="160"
              />
            </figure>

            <div className="profile-info">
              <h1 className="business-name">{profile?.businessName}</h1>
              <p className="business-address">{profile?.address}</p>
            </div>
          </div>

          <div className="profile-stats" aria-hidden="false">
            <div className="stat-card" role="region" aria-label="Total Meals">
              <span className="stat-label">Total Meals</span>
              <span className="stat-value">{profile?.totalMeals || 1254}</span>
            </div>

            <div className="stat-card" role="region" aria-label="Customers Served">
              <span className="stat-label">Customers Served</span>
              <span className="stat-value">{profile?.customersServed || 9872}</span>
            </div>
          </div>
        </header>

        <main>
          <section className="videos-section" aria-labelledby="videos-title">
            <h2 id="videos-title">All Videos</h2>

            <div className="videos-grid">
              {videos.map((n) => (
                <article className="video-thumb" key={n._id} tabIndex="0">
                  <video
                    src={n.video}
                    alt={`Video thumbnail ${n.name}`}
                    
                      muted
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