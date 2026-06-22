import React, { useMemo, useState } from 'react'
import './createFood.css'
import axios from 'axios'
import {useNavigate} from "react-router-dom";
const CreateFood = () => {
  const navigate = useNavigate()
  const [videoFile, setVideoFile] = useState(null)
  const [foodName, setFoodName] = useState('')
  const [description, setDescription] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  
  const isFormValid = useMemo(() => {
    return videoFile && foodName.trim() && description.trim()
  }, [videoFile, foodName, description])

  const normalizedUrl = useMemo(() => {
    if (!videoFile) return ''
    return URL.createObjectURL(videoFile)
  }, [videoFile])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setUploadProgress(0)

    try {
      const formData = new FormData()
      formData.append('video', videoFile)
      formData.append('name', foodName)
      formData.append('description', description)

      const response = await axios.post('http://localhost:3000/api/food', formData, {
        withCredentials: true,
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            setUploadProgress(Math.round((progressEvent.loaded / progressEvent.total) * 100))
          }
        },
      })

      console.log(response.data)
      navigate('/home')
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
      setUploadProgress(0)
    }
  }

  return (
    <main className="create-food-page" aria-label="Create food item page">
      <section className="create-food-card">
        <div className="create-food-panel">
          <div>
            <p style={{ marginBottom: '1rem', color: '#f97316', fontWeight: 700 }}>
              New menu item
            </p>
            <h1>Create Food Item</h1>
            <p>
              Add a delicious new food item to your menu with a video preview, clear
              title, and appetizing description. This form is built for modern admin
              experiences with accessible labels and a responsive layout.
            </p>
          </div>

          <form className="create-food-form" spellCheck="false" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="videoFile">Video File</label>
              <input
                id="videoFile"
                name="videoFile"
                type="file"
                accept="video/*"
                onChange={(event) => setVideoFile(event.target.files?.[0] || null)}
                autoComplete="off"
                disabled={isLoading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="foodName">Food Name</label>
              <input
                id="foodName"
                name="foodName"
                type="text"
                placeholder="Spicy Chicken Bowl"
                value={foodName}
                onChange={(event) => setFoodName(event.target.value)}
                autoComplete="off"
                disabled={isLoading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                placeholder="Write a short, tasty description of the dish."
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
            </div>

            <button type="submit" className="create-button" disabled={!isFormValid || isLoading}>
              {isLoading ? `Uploading ${uploadProgress ? `${uploadProgress}%` : ''}` : 'Create'}
            </button>
          </form>
        </div>

        <aside className="preview-panel" aria-label="Food preview section">
          <div>
            <h2>Video Preview</h2>
            <p className="preview-description">
              Paste a valid URL to preview the food video and ensure the item looks
              appetizing before publishing.
            </p>
          </div>

          <div className="preview-box">
            {isLoading && (
              <div className="preview-loading">
                <span className="preview-spinner" />
                <div>
                  <p>Uploading your video</p>
                  <p className="preview-progress">{uploadProgress}% complete</p>
                </div>
              </div>
            )}

            {normalizedUrl ? (
              <video
                title="Food video preview"
                src={normalizedUrl}
                controls
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            ) : (
              <div className="preview-empty">
                Select a video file to preview your food item here.
              </div>
            )}
          </div>

          <div className="preview-box preview-fallback">
            <strong>Food name:</strong> {foodName || 'Your next menu star'}
            <br />
            <strong>Description:</strong>{' '}
            {description || 'A short description helps customers choose your meal.'}
          </div>
        </aside>
      </section>
    </main>
  )
}

export default CreateFood