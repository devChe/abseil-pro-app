import React from 'react'
import JobTabs from '../components/JobTabs'

const jobs = () => {
  return (
    <>
      <h1 style={{padding:"15px"}}>Jobs</h1>
      <hr/>
      <div className='timeMonitoring'>
        <div className='box'>
          <div>Total</div>
          <div>17</div>
        </div>
        <div className='box'>
          <div>Starting Today</div>
          <div>0</div>
        </div>
        <div className='box'>
          <div>Due this week</div>
          <div>4</div>
        </div>
        <div className='box'>
          <div>Due Next Week</div>
          <div>2</div>
        </div>
        <div className='box'>
          <div>Overdue</div>
          <div>10</div>
        </div>
      </div>
      <JobTabs />

      <style jsx>{`
        .timeMonitoring {
          display: grid;
          justify-content: center;
          align-items: center;
          gap: 15px;
          grid-template-columns: 1fr 1fr;
          padding: 15px 20px;      
        }

        .timeMonitoring .box {
          text-align: center;
          border: 1px solid #e5e5e5;
          border-radius: 5px;
          padding-top: 15px;
          padding-bottom: 15px;
          background: linear-gradient(#ffffff, #f5f7f8);
        }

        .box div:first-child {
          font-size: 12px;
        }

        .box div:nth-child(2) {
          font-size: 30px;
          font-weight: 700px;
          color: blue;
        }

        @media only screen and (min-width: 991px) {
          .timeMonitoring {
            display: flex;
            padding: 0;
          }

          .timeMonitoring .box {
            width: 20%;
          }
        }
      `}</style>
    </>
  )
}

export default jobs