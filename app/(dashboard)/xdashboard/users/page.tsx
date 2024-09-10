"use client";

import DialogComponent from "@/components/modal/Modal";
import useAuth from "@/helpers/hook/useAuth";
import React, { useEffect, useState } from "react";

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
  const [confirmModal, setConfirmModal] = useState(false);
  const [userInfo, setUserInfo] = useState<null | any>(null);
  const [formValue, setFormValue] = useState({
    status: "",
    verify: "",
  });

  React.useEffect(() => {
    if (auth?.userId) fetchUsers();
  }, [auth?.userId, fetchUsers]);

  const handleUserUpdate = async (data: { status: string; verify: string }) => {
    console.log(formValue);
    return;
    try {
      const response = await fetch(`/api/v1/users`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userInfo?._id,
        }),
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

  const openModal = () => setConfirmModal(true);
  const closeModal = () => setConfirmModal(false);

  useEffect(() => {
    if (userInfo) {
      setFormValue({
        status: userInfo?.status,
        verify: userInfo?.verify,
      });
    }
  }, [userInfo]);

  return (
    <div>
      {state?.error && (
        <h1 className="text-red-500 text-center">{state?.error}</h1>
      )}
      <div className="overflow-x-auto w-full">
        {state?.loading ? (
          <table className="w-full overflow-auto">
            <thead>
              <tr className="border-b">
                <th className="px-4 py-1 text-left bg-primary_light_3">Name</th>
                <th className="px-4 py-1 text-left bg-primary_light_3">
                  Email
                </th>
                <th className="px-4 py-1 text-left bg-primary_light_3">Role</th>
                <th className="px-4 py-1 text-left bg-primary_light_3">
                  Status
                </th>
                <th className="px-4 py-1 text-left bg-primary_light_3">
                  Count
                </th>
                <th className="px-4 py-1 text-left bg-primary_light_3">
                  Verified
                </th>
                <th className="px-4 py-1 text-left bg-primary_light_3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {[...Array(15)].map((_, i) => (
                <tr key={i} className="border-b hover:bg-gray-100">
                  <td className="text-start px-4 py-2">
                    <div className="animate-pulse bg-primary_light_3 h-4 w-8"></div>
                  </td>
                  <td className="text-start px-4 py-2">
                    <div className="animate-pulse bg-primary_light_3 h-4 w-24"></div>
                  </td>
                  <td className="text-start px-4 py-2">
                    <div className="animate-pulse bg-primary_light_3 h-4 w-36"></div>
                  </td>
                  <td className="text-start px-4 py-2">
                    <div className="animate-pulse bg-primary_light_3 h-4 w-20"></div>
                  </td>
                  <td className="text-start px-4 py-2">
                    <div className="animate-pulse bg-primary_light_3 h-4 w-16"></div>
                  </td>
                  <td className="text-start px-4 py-2">
                    <div className="animate-pulse bg-primary_light_3 h-4 w-12"></div>
                  </td>
                  <td className="text-start px-4 py-2">
                    <div className="animate-pulse bg-primary_light_3 h-4 w-12"></div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
                    <button
                      onClick={() => {
                        openModal();
                        setUserInfo(user);
                      }}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <DialogComponent
          isOpen={confirmModal}
          onClose={closeModal}
          title={`${userInfo?.name}`}
          size="lg"
          closeOnOverlayClick={true}
        >
          <div className="flex flex-col gap-4">
            <div className="flex gap-4 border-b border-primary_light_3 pb-4">
              {formValue?.verify == "VERIFIED" ? (
                <div className="flex items-center gap-2">
                  <label htmlFor="">Un Verified</label>
                  <input
                    type="checkbox"
                    value={formValue?.verify}
                    onChange={(e) =>
                      setFormValue({ ...formValue, verify: e.target.value })
                    }
                  />
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <label htmlFor="">Verified</label>
                  <input
                    type="checkbox"
                    value={formValue?.verify}
                    onChange={(e) =>
                      setFormValue({ ...formValue, verify: e.target.value })
                    }
                  />
                </div>
              )}
            </div>
            <div>
              {formValue?.status == "FREE" ? (
                <div className="flex items-center gap-2">
                  <label htmlFor="limit">Upgrade Limit</label>
                  <input
                    type="checkbox"
                    value={formValue?.status}
                    onChange={(e) =>
                      setFormValue({ ...formValue, status: e.target.value })
                    }
                  />
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <label htmlFor="limit">Down Limit</label>
                  <input
                    type="checkbox"
                    value={formValue?.status}
                    onChange={(e) =>
                      setFormValue({ ...formValue, status: e.target.value })
                    }
                  />
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-end gap-4 mt-4">
            <button
              onClick={() => handleUserUpdate({ ...formValue })}
              className="input-btn text-primary_light"
            >
              Save
            </button>
          </div>
        </DialogComponent>
      </div>
    </div>
  );
};

export default UserPage;
