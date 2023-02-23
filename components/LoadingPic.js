import React from 'react'

function LoadingPic({loading}) {
  return (
    <div className="spinner-container">
      <div className="loading-spinner">
        UPLOADING PHOTO....
      </div>
      <style jsx>{`
        .spinner-container {
          background: #ffff;
        }
    `}</style>
    </div>
  )
}

export default LoadingPic