"use client";

import useAuth from "@/helpers/hook/useAuth";
import React from "react";

const ACTION_TYPES = {
  FETCH_USERS: "FETCH_USERS",
  FETCH_USERS_SUCCESS: "FETCH_USERS_SUCCESS",
  FETCH_USERS_FAILURE: "FETCH_USERS_FAILURE",
  FETCH_USERS_LOADING: "FETCH_USERS_LOADING",
};

const userReducer = (state: any, action: any) => {
  switch (action.type) {
    case ACTION_TYPES.FETCH_USERS:
      return {
        ...state,
        loading: action.payload,
      };
    case ACTION_TYPES.FETCH_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload,
        error: null,
      };
    case ACTION_TYPES.FETCH_USERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

const UserPage = () => {
  const { auth } = useAuth();
  const initialState = {
    loading: false,
    users: [],
    error: null,
    success: false,
  };

  const [state, dispatch] = React.useReducer(userReducer, initialState);

  const fetchUsers = React.useCallback(async () => {
    try {
      dispatch({ type: ACTION_TYPES.FETCH_USERS_LOADING, payload: true });
      const response = await fetch(`/api/v1/users?userid=${auth?.userId}`);
      dispatch({ type: ACTION_TYPES.FETCH_USERS_LOADING, payload: false });
      const data = await response.json();
      if (data.result) {
        dispatch({
          type: ACTION_TYPES.FETCH_USERS_SUCCESS,
          payload: data?.result,
        });
      }
      if (data.error) {
        dispatch({
          type: ACTION_TYPES.FETCH_USERS_FAILURE,
          payload: data?.error,
        });
      }
    } catch (error) {
      console.error(error);
    }
  }, [auth?.userId]);

  React.useEffect(() => {
    if (auth?.userId) fetchUsers();
  }, [auth?.userId, fetchUsers]);

  const handleUserUpdate = async (data: { status: string; verify: string }) => {
    try {
      const response = await fetch(`/api/v1/users`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });
      const data = await response.json();
      if (data.result) {
        //
      }
      if (data.error) {
        //
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      {state?.error && (
        <h1 className="text-red-500 text-center">{state?.error}</h1>
      )}
      <div className="overflow-x-auto w-full">
        {state?.loading ? (
          <h1>Loading...</h1>
        ) : (
          <table className="w-full border ">
            <thead>
              <tr>
                <th className="px-4 py-1 text-left bg-slate-200">Name</th>
                <th className="px-4 py-1 text-left bg-slate-200">Email</th>
                <th className="px-4 py-1 text-left bg-slate-200">Role</th>
                <th className="px-4 py-1 text-left bg-slate-200">Status</th>
                <th className="px-4 py-1 text-left bg-slate-200">Count</th>
                <th className="px-4 py-1 text-left bg-slate-200">Verified</th>
                <th className="px-4 py-1 text-left bg-slate-200">Action</th>
              </tr>
            </thead>
            <tbody>
              {state?.users?.map((user: any) => (
                <tr key={user?.id}>
                  <td className="px-4 py-2 text-left border-b border-gray-200">
                    {user?.name}
                  </td>
                  <td className="px-4 py-2 text-left border-b border-gray-200">
                    {user?.email}
                  </td>
                  <td className="px-4 py-2 text-left border-b border-gray-200">
                    {user?.xrole}
                  </td>
                  <td className="px-4 py-2 text-left border-b border-gray-200">
                    {user?.status}
                  </td>
                  <td className="px-4 py-2 text-left border-b border-gray-200">
                    {user?.count}
                  </td>
                  <td className="px-4 py-2 text-left border-b border-gray-200">
                    {user?.verify}
                  </td>
                  <td className="px-4 py-2 text-left border-b border-gray-200">
                    <button>Edit</button>
                    <button>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default UserPage;
