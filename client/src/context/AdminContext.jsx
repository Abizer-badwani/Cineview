import { createContext, useContext, useReducer } from "react";
import { adminReducer } from "./Reducer";
import axios from "axios";
import { GetAdminProfileQuery } from "../utils/queries/AdminQuery";
axios.defaults.withCredentials=true

const AdminContext = createContext()

const AdminProvider = ({ children }) => {
    
    const [adminState, adminDispatch] = useReducer(adminReducer, {})
    
    const onSuccess = (data) => {
        if (data?.success) {
            adminDispatch({type: 'ADMIN_LOGIN', payload: data.admin})
        }
    }

    GetAdminProfileQuery(onSuccess)

    return <AdminContext.Provider value={{adminState, adminDispatch}}>
        {children}
    </AdminContext.Provider>
}

const AdminState = () => useContext(AdminContext)

export { AdminProvider, AdminState }