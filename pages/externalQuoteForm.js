/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useContext } from 'react'
import { JobContext } from '../context/jobContext'

const externalQuoteForm = () => {

    const {jobs} = useContext(JobContext)

  return (
    <div>
        {jobs?.map((val) => (
            <li>{val.client}</li>
        ))}
    </div>
  )
}

export default externalQuoteForm