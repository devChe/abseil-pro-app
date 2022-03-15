import React from 'react'
import Tabs from '../components/Tabs'

const clients = () => {
  return (
    <>
      <div>
        <h1>All Clients</h1>
        <hr/>
        <Tabs />
      </div>
      <style jsx>{`
        @media screen and (max-width: 990px) {
          h1 {
            padding: 15px;
          }
        }
        
      `}</style>
    </>
  )
}

export default clients