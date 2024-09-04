'use client'

import useAuth from '@/helpers/hook/useAuth'
import React from 'react'

const ACTION_TYPES = {
    FETCH_USERS: "FETCH_USERS",
    FETCH_USERS_SUCCESS: "FETCH_USERS_SUCCESS",
    FETCH_USERS_FAILURE: "FETCH_USERS_FAILURE",
    FETCH_USERS_LOADING: "FETCH_USERS_LOADING"
}

const userReducer = (state: any, action:any) => {
    switch(action.type) {
        case ACTION_TYPES.FETCH_USERS:
            return {
                ...state,
                loading: true
            }
        case ACTION_TYPES.FETCH_USERS_SUCCESS:
            return {
                ...state,
                loading: false,
                users: action.payload,
                error: null
            }
        case ACTION_TYPES.FETCH_USERS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state
}

}

const UserPage = () => {
    const {auth} = useAuth();
    const initialState = {
        loading: false,
        users: [],
        error: null,
        success: false
    }
    const [state, dispatch] = React.useReducer(userReducer, initialState)
    const fetchUsers = React.useCallback(async () => {
        //
    }, [])

    React.useEffect(()=>{
        if(auth?.userId) fetchUsers()
    },[auth?.userId, fetchUsers])

  return (
    <div>UserPage</div>
  )
}

export default UserPage