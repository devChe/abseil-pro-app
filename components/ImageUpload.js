import React from 'react'

function ImageUpload({ image, handleChange, handleUpload }) {

  return (
    <div>
        <input type="file" onChange={handleChange} />
        <button className="button-primary" style={{width:"100%",marginTop:"15px"}} onClick={handleUpload}>UPLOAD</button>
        
    </div>
  )
}

export default ImageUpload