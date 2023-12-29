import React from 'react'
import {AiFillStar} from 'react-icons/ai'
import { AiOutlineStar } from 'react-icons/ai'
import '../css/Ratings.css'

const Ratings = ({ rate, starClick }) => {

  return (
      <div className='rate-container'>
          {
        [...Array(5)].map(
          (_, index) => {
            return <span key={index} onClick={() => starClick(index)}>
              {
                (index + 1) <= rate ? <AiFillStar size={25} fill='goldenrod' /> : <AiOutlineStar size={25} fill='goldenrod' />
              }
            </span>
          }
        )
          }
    </div>
  )
}

export default Ratings