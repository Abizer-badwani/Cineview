import React, { useState } from 'react'
import Ratings from './Ratings'
import { FilterState } from '../context/UserContext'
import { category } from '../global/global'
import '../css/Filter.css'

const Filter = () => {

    const [display, setDisplay] = useState(false)
    const { filter, dispatch } = FilterState()
    const { rating, categoryId, searchQuery } = filter

    const handleClick = (id) => {
        dispatch({ type: 'CATEGORY', payload: id })
    }

    const handleStarClick = (ind) => {
        dispatch({ type: 'RATE', payload: ind })
    }

    const handleChange = (event) => {
        dispatch({ type: "SEARCH", payload: event.target.value })
    }

    const handleClearFilters = () => {
        dispatch({ type: 'RESET' })
        setTimeout(() => setDisplay(false), 400)
    }

    return (
        <>
            <div className="filter">
                <div className='filter-icon' onClick={() => setDisplay((prev) => !prev)}>Filters</div>
            </div>
            <div className={display ? "cover display" : "cover"}>
            <div className="contain" onClick={() => setDisplay((prev) => !prev)}></div>
                <div className="filter-container">
                    <h1>Filters</h1>
                    <div className="search-box">
                        <input type="text" placeholder='Search Movie' value={searchQuery} onChange={handleChange} />
                    </div>
                    <div className="category-filters">
                        {
                            category.map(({ name, id }) => {
                                return <p key={id} className={id == categoryId ? 'selected' : ''} onClick={() => handleClick(id)}>{name}</p>
                            })
                        }
                    </div>
                    <div className="rating-filters">
                        <Ratings rate={rating} starClick={(ind) => handleStarClick(ind + 1)} />
                    </div>
                    <div className="clear-filter" onClick={handleClearFilters}>
                        Clear
                    </div>
                </div>
            </div>
        </>
    )
}

export default Filter
