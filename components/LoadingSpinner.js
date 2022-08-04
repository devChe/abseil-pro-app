import React from 'react'

function LoadingSpinner({loading}) {
  return (
    <div className="spinner-container">
      <div className="loading-spinner">
      </div>
      <style jsx>{`
        @keyframes spinner {
            0% {
                transform: rotate(0deg);
            }
            100% {
                transform: rotate(360deg);
            }
        }

        .loading-spinner {
            width: 50px;
            height: 50px;
            border: 10px solid #f3f3f3; /* Light grey */
            border-top: 10px solid #383636; /* Black */
            border-radius: 50%;
            animation: spinner 1.5s linear infinite;
            position: absolute;
            inset: 50% auto auto 50%;
            overflow: auto;
            transform: translate(50%, 50%);
            background: #fff;
        }
    `}</style>
    </div>
  )
}

export default LoadingSpinner