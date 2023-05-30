import React from 'react'
import Link from 'next/dist/client/link'

const business = () => {
  return (
    <div style={{height:"100vh"}}>
      <h1>Business</h1>
      <hr/>
      <div style={{display:"flex",justifyContent:"center",width:"100%"}}>
        <div>
          <div className='businessBtn'>
            <Link href={'tasks'}><button className='btn'>Task</button></Link>
          </div>
          <div className='businessBtn'>
            <Link href={'costs'}><button className='btn'>Costs</button></Link>
          </div>
          <div className='businessBtn'>
            <Link href={'suppliers'}><button className='btn'>Suppliers</button></Link>
          </div>
          <div className='businessBtn'>
            <Link href={'heightAndSafety'}><button className='btn'>Height and Safety List</button></Link>
          </div>
          <div className='businessBtn'>
            <Link href={'jobCategories'}><button className='btn'>Job Categories</button></Link>
          </div>  
          <div className='businessBtn'>
            <Link href={'jobTemplate'}><button className='btn'>Job Template</button></Link>
          </div>
          <div className='businessBtn'>
            <Link href={'quotes'}><button className='btn'>Quotes</button></Link>
          </div>
          <div className='businessBtn'>
            <Link href={'documents'}><button className='btn'>Documents</button></Link>
          </div>
          <div className='businessBtn'>
            <Link href={'loginTable'}><button className='btn'>Timesheets</button></Link>
          </div>
        </div>
      </div>
      
      
      <style jsx>{`
          .businessBtn {
              margin: 0 auto;
          }

          .btn {
              border: 1px solid #ecec;
              border-radius: 8px;
              text-align: center;
              margin-bottom: 20px;
              width: 100%;
          }

          .btn:hover {
              border:1px solid red;
              box-shadow: 0 0 10px #719ECE;
              cursor: pointer;
          }
        `}</style>
    </div>
  )
}

export default business