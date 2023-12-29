import React, { useState } from 'react'
import '../css/Specific.css'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { useQuery } from 'react-query'
import { FaVideo } from 'react-icons/fa'
import Ratings from '../components/Ratings'
import { UserState } from '../context/UserContext'
import ConfirmPurchase from '../components/ConfirmPurchase'
import { InValidCredentials } from '../utils/queries/UserQuery'
import { InvalidateMovie } from '../utils/queries/MoviesQuery'
import toast from 'react-hot-toast'
import { AiFillHeart, AiOutlineDelete, AiOutlineHeart, AiOutlinePlusCircle } from 'react-icons/ai'
import { GetMovie } from '../utils/apis/MoviesRequests'

const Specific = () => {

	const { id } = useParams()
	const { userState } = UserState()
	const navigate = useNavigate()
	const [confirm, setConfirm] = useState(false)
	const [review, setReview] = useState(false)
	const { mutate: movieMutate } = InvalidateMovie(id)
	const { mutate: userMutate } = InValidCredentials()

	const addWish = async () => {
		const { data } = await axios.post('http://localhost:6767/wishlist/add', { movieId: _id })
		if (data?.success) {
			userMutate()
			movieMutate()
		}
	}

	const removeWish = async () => {
		const { data } = await axios.post('http://localhost:6767/wishlist/remove', { movieId: _id })
		if (data?.success) {
			userMutate()
			movieMutate()
		}
	}

	const handleYes = async () => {
		setConfirm(false)

		const { data } = await axios.post('http://localhost:6767/purchase/add', { movieId: _id })
		if (data?.success) {
			toast.success(data?.message)
			userMutate()
			movieMutate()
		}
		else {
			toast.error(data?.message)
		}

	}

	const deleteReview = async (reviewId) => {

		const { data } = await axios.delete('http://localhost:6767/reviews/delete', { body: { movieId: id, reviewId } })

		if (data?.success) {
			toast.success(data?.message)
			movieMutate()
		}
		else {
			toast.error(data?.message)
		}
	}

	const { data, isLoading } = useQuery(['movie', id], () => GetMovie(id))

	if (isLoading) {
		return <div>loading</div>
	}

	const { _id, title, desc, thumbnail, cast, trailer, reviews, director, producer, category, releaseYear } = data

	const rating = Math.floor((reviews.reduce((acc, { rating }) => acc + rating, 0)) / (reviews.length))

	return (
		<>
			<div className='specific-main-container'>
				<div className="container-one">

					<div className="image">
						<img src={`http://localhost:6767/thumbnails/${thumbnail}`} alt="movie" autoPlay />

					</div>
					<div className="movie-details-container">
						<div className="title">{title}</div>
						<div className="story">{desc}</div>
						<div className="movie-ratings"><Ratings rate={rating} /></div>
						<div className="releaseYear"><span>Release Year : </span>{new Date(releaseYear).getFullYear()}</div>
						<div className="director"><span>Director : </span>{director}</div>
						<div className="producer"><span>Producer : </span>{producer}</div>
						<div className="buttons">
							{
								userState
									?
									<>
										{
											(userState?.profile?.purchased.some(data => data === _id))
												?
												<div className="trailer">
													<FaVideo fill='orange' size={35} onClick={() => navigate('/user/purchased')} />
												</div>
												:
												<>
													<button className='purchase' onClick={() => setConfirm(true)}>Purchase</button>
													{
														userState?.profile?.wishlist.some(data => data === _id)
															?
															// <AiFillHeart className='wishlist' />
															<button className='wishlist' onClick={removeWish}><AiFillHeart size={40} fill='#F00' /></button>

															:
															<button className='wishlist' onClick={addWish}><AiOutlineHeart size={40} fill='#F00' /></button>

													}
												</>
										}
									</>
									:
									null
							}
						</div>
					</div>
				</div>
				<div className="cast-heading">casts</div>
				<div className="container-two">
					{
						cast.map(({ _id, name, image }) => {
							return <div key={_id} className='cast-container'>
								<div className="cast-image">
									<img src={`http://localhost:6767/casts/${image}`} alt="" />
								</div>
								<div className='cast-name'>
									{name}
								</div>
							</div>
						})
					}
				</div>
				{
					reviews.length != 0 && (
						<>
							<div className="review-heading">Reviews</div>
							<div className="container-three">
								{
									reviews.map(({ _id, message, rating, user }) => {
										return <div className="review-container" key={_id}>
											<div className="review-user">{user?.firstName}</div>
											<div className="message">{message}</div>
											<div className="review-rating"><Ratings rate={rating} /></div>
											{
												(user?._id === userState?._id) && <div className='delete-review-button' onClick={() => deleteReview(_id)}><AiOutlineDelete fill='red' size={25} /> </div>
											}
										</div>
									})
								}
								{ userState && <button className='add-review-button'><AiOutlinePlusCircle size={45} onClick={() => setReview(true)} fill='#FFF' /></button>}
							</div>
						</>)
				}
			</div>
			{
				confirm &&
				<ConfirmPurchase setYes={handleYes} setNo={() => setConfirm(false)} />
			}
		</>
	)

}

export default Specific