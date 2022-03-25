import React from 'react';
import Navbar from '../components/Navbar';
import Sidebar from './Sidebar';

function Layout({children}) {
  return (
      <div>
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

          @media screen and (min-width: 991px) {
                
          }
  
          @media screen and (max-width: 990px) {
            .flex {
              display: block;
            }
          }
        `}</style>
      </div>
  )
}

export default Layout;
