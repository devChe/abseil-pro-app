import React from 'react'

function ImageUpload({ image, handleChange, handleUpload }) {

  return (
    <div>
        <input type="file" onChange={handleChange} />
        <button onClick={handleUpload}>Upload</button>
    </div>
  )
}

export default ImageUpload