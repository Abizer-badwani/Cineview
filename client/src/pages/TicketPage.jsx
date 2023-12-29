import React, { useState } from 'react'
import '../css/Ticket.css'
import {loadStripe} from '@stripe/stripe-js';
import axios from 'axios';
import { array } from '../global/global';
import {AiOutlineSelect} from 'react-icons/ai'
import {MdPayment} from 'react-icons/md'


const TicketPage = () => {

  const [ticket, setTicket] = useState()
  const [loading, setLoading] = useState(false)
  
  const makePay = async () => {

    setLoading(true)

    const stripe = await loadStripe('pk_test_51Nz9eQSCIzn9p3wnHYti6sBxbugaIPpzwzHIAojqSG7zhktGytzynU0dL94TAQiQUkQNlHjodfforFbmwxxSpdFB003nS9iQ7T')

    const {data} = await axios.post('http://localhost:6767/payment/checkout', ticket)

    const result = stripe.redirectToCheckout({
      sessionId: data.id
    })
    setLoading(false)

    if (result.error) {
      console.log(result.error)
    }
  }

  if (loading) {
    return <div>Loading</div>
  }

  return (
    <>
    <div className="ticket-desc"><AiOutlineSelect fill='#fb0' size={20}  /> &nbsp; select any ticket of your choice</div>
    <div className='ticket-container'>
        {
          array.map((data) => {
            return (
              <div className={ticket?.price === data?.price ? 'ticket-offer selected' : 'ticket-offer'} key={data.number}
                onClick={() => setTicket({ title: data.title, price: data.price, number: data.number })}>
                <div className="title">{data.title}</div>
                <p className="ticket-price">
                  Price
                <span>{Intl.NumberFormat('en-Us', {style: 'currency', currency: 'INR', }).format(data.price)}</span>
              </p>
              <p className="ticket-movie">
                 Ticket Count
                <span>
                  {data.number}
                  </span>
              </p>
              </div>
          )})
        }
      </div>

      <div className='ticket-payment-button'>
      <button onClick={makePay} className={ticket ? 'enabled ticket-proceed' : 'ticket-proceed'} disabled={!ticket}>Proceed To checkout &nbsp;<MdPayment size={25} fill={ticket ? '#000' : '#ccc' } /></button>
      </div>
    </>
  )
}

export default TicketPage