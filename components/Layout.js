import React from 'react';
import Navbar from '../components/Navbar';
import Sidebar from './Sidebar';

function Layout({children}) {
  return (
      <>
        <div className='flex'>
          <Sidebar />
          <div className='rightSide'>
            <Navbar />
            <main>{children}</main>
          </div>
        </div>
        <style jsx>{`
          .flex {
            display: flex;
          }

          .rightSide {
            flex: 1;
          }
        `}</style>
      </>
  )
}

export default Layout;
