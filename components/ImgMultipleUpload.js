import React from 'react'

function ImgMultipleUpload({ images, hide, handleChange, handleChangeName, handleUpload }) {

  return (
    <div>
        <input type="file" onChange={handleChange} />
        <button className="hide" style={{width:"100%",marginTop:"15px"}} onClick={handleUpload}>UPLOAD</button>

        <style jsx>{`
          .hide {
            display: ${hide}
          }
        `}</style>
        
    </div>
  )
}

export default ImgMultipleUpload