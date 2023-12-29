import React from 'react'
import '../css/Movies.css'
import Movie from '../components/Movie'
import Filter from '../components/Filter'
import { FilterState } from '../context/UserContext'
import { category } from '../global/global'
import { UseMovie } from '../context/MovieContext'

const Movies = () => {

	let filtered = []
	const { movieState } = UseMovie()
	const { filter } = FilterState()
	const { categoryId, rating, searchQuery } = filter
	const { name } = category[categoryId - 1]

	filtered = (name === 'all' ? movieState : movieState.filter(({ category }) => category === name))
	filtered = (rating === 0 ? filtered : filtered.filter
		(({ reviews }) => Math.floor
			((reviews.reduce
				((accumulator, { rating }) => accumulator + rating, 0)) /
				(reviews.length)) <= rating))

	searchQuery && (filtered = filtered?.filter((p) => p?.title.toLowerCase().includes(searchQuery?.toLowerCase())))

	return (
		<>
			<p className='category-name'>{name}</p>
			{
				filtered.length ?
					<>
						<div className="main-movie-container">
							{
								filtered?.map((data) => <Movie data={data} key={data._id} />)
							}
						</div>
					</>
					:
					<>
						<div className="empty-movies-container">
							no movies ...
						</div>
					</>
			}
			<Filter />
		</>
	)
}


export default Movies