import React from 'react'
import '../css/ConfirmPurchase.css'
import { BsArrowRight } from 'react-icons/bs'
import { RxCross1} from 'react-icons/rx'
import { UserState } from '../context/UserContext'

const ConfirmPurchase = ({ setNo, setYes }) => {

  const {userState} = UserState()

  return (
    <div className={`purchase-main`}>
      <div className="purchase-container">
        <div className='purchase-desc'>
          <p className='title'>Continue Purchase ?</p>
          <p className='desc'>it will charge 1 ticket.</p>
        </div>
        <div className="no" onClick={setNo}><RxCross1 size={35} fill='#fff'  /></div>
        <div className="yes" onClick={setYes}><BsArrowRight size={35} fill='#fff' /></div>
          </div>
          
    </div>
  )
}

export default ConfirmPurchase