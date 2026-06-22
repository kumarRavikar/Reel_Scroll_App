import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import ReelItem from './ReelItem'
import "../styles/reels.css"


const placeholderReels = [
  {
    id: 'placeholder-1',
    videoUrl: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    description: 'Loading reels, please wait while we fetch the latest video feed.',
    likeCount: 124,
    commentCount: 18,
    saveCount: 9
  }
]

const ReelsFeed = () => {
  const [reels, setReels] = useState(placeholderReels)
  const feedRef = useRef(null)

  useEffect(() => {
    const controller = new AbortController()

    const fetchReels = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/food', {
         withCredentials: true,
         signal: controller.signal
        })
        const items = Array.isArray(response.data.foodItems)
          ? response.data.foodItems
              .filter(food => Boolean(food.video))
              .map(food => ({
                id: food._id || food.id,
                videoUrl: food.video,
                description: food.description || food.name || 'No description available',
                foodPartner: food.foodPartner,
                likeCount: typeof food.likeCount === 'number' ? food.likeCount : food.likeCount?.length ?? 124,
                commentCount: typeof food.comments === 'number' ? food.comments : food.comments?.length ?? 18,
                saveCount: typeof food.saves === 'number' ? food.saves : food.saves?.length ?? 9
              }))
          : []

        if (items.length > 0) {
          setReels(items)
        }
      } catch (error) {
        if (axios.isCancel(error)) {
          return
        }
        console.error('Unable to load food reels:', error)
      }
    }

    fetchReels()

    return () => {
      controller.abort()
    }
  }, [])

  useEffect(() => {
    const feed = feedRef.current
    if (!feed) return

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          const video = entry.target
          if (entry.isIntersecting && entry.intersectionRatio >= 0.75) {
            video.muted = true
            const playPromise = video.play()
            if (playPromise !== undefined) {
              playPromise.catch(() => {
                // Autoplay may be blocked by the browser unless the video is muted.
              })
            }
          } else {
            video.pause()
          }
        })
      },
      {
        threshold: [0.5, 0.75, 1]
      }
    )

    const videos = feed.querySelectorAll('video')
    videos.forEach(video => observer.observe(video))

    return () => {
      videos.forEach(video => observer.unobserve(video))
      observer.disconnect()
    }
  }, [reels])

  console.log('Current reels state:', reels)
  return (
    <>
      <main className="reels-feed" ref={feedRef}>
        {reels.map(item => (
          <ReelItem
            key={item.id}
            videoUrl={item.videoUrl}
            description={item.description}
            itemId={item.foodPartner}
            likeCount={item.likeCount}
            commentCount={item.commentCount}
            saveCount={item.saveCount}
          />
        ))}
      </main>
      
    </>
  )
}

export default ReelsFeed
