import React from 'react'

function ImageUpload() {

  const handleChange = e => {
      if(e.target.files[0]) {
          
      }
  }

  return (
    <div>
        <input type="file" onChange={handleChange} />
        <button>Upload</button>
    </div>
  )
}

export default ImageUpload