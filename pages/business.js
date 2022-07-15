import React from 'react'
import Link from 'next/dist/client/link'

const business = () => {
  return (
    <div style={{height:"100vh"}}>
      <h1>Business</h1>
      <Link href={'tasks'}><div>Task</div></Link>
    </div>
  )
}

export default business