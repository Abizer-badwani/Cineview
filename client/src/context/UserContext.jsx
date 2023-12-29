
import { createContext, useContext, useReducer } from "react";
import { filterReducer, userReducer } from "./Reducer";
import { GetProfileQuery } from "../utils/queries/UserQuery";

const UserContext = createContext()
const FilterContext = createContext()

const UserProvider = ({ children }) => {
    
    const [userState, userDispatch] = useReducer(userReducer, null)
    
    const onSuccess = (data) => {
        if (data?.success) {
            userDispatch({type: 'AUTH', payload: data?.profile})
        }
    }
    GetProfileQuery(onSuccess)

    return <UserContext.Provider value={{ userState, userDispatch }}>{children}</UserContext.Provider>
}


const FilterProvider = ({ children }) => {
    const [filter, dispatch] = useReducer(filterReducer, {rating: 0, categoryId: 1, searchQuery: ''})

    return <FilterContext.Provider value={{filter, dispatch}}>{children}</FilterContext.Provider>
}


const UserState = () => useContext(UserContext)
const FilterState = () => useContext(FilterContext)

export { UserProvider, UserState, FilterState, FilterProvider }