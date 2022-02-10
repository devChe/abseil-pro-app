import Head from 'next/head'
import Image from 'next/image'

export default function Home() {
  return (
    <>
      <div className='main'>
        <h1 style={{ padding: "100px 0 20px" }}>Abseil Pro</h1>
        <div style={{ display: "grid", width: "500px", margin: "0 auto" }}>
          <input  type="email" placeholder="E-mail" style={{marginBottom: "12px"}} />
          <input  type="password" placeholder="Password" />
        </div>
      </div>
    </>
  )
}