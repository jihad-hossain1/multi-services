"use client";

import DialogComponent from "@/components/modal/Modal";
import useAuth from "@/helpers/hook/useAuth";
import { useDebounce } from "@/helpers/hook/useDebounce";
import React, { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

const UserPage = () => {
  const { auth } = useAuth();
  const [upLoading, setUpLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState<null | string>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [pageSize, setPageSize] = useState(15);
  const [totals, setTotals] = useState(0);
  const [delLoading, setDelLoading] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  // Debounced search term to delay the search
  const debouncedSearchTerm = useDebounce(searchTerm, 500); // 500ms debounce

  // Fetch users
  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `/api/v1/users?userid=${auth?.userId}&page=${page}&pageSize=${pageSize}&searchTerm=${debouncedSearchTerm}&sortOrder=${sortOrder}`
      );
      const data = await response.json();
      if (data?.data) {
        setUsers(data?.data);
        setTotalPages(data?.meta?.page);
        setPageSize(data?.meta?.pageSize);
        setTotals(data?.meta?.total);
      } else {
        setError(data?.error || "Failed to fetch users");
      }
    } catch (error) {
      setError("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  }, [auth?.userId, page, pageSize, debouncedSearchTerm, sortOrder]);

  const [confirmModal, setConfirmModal] = useState(false);
  const [userInfo, setUserInfo] = useState<null | any>(null);
  const [formValue, setFormValue] = useState({
    status: "",
    verify: "",
  });

  useEffect(() => {
    if (auth?.userId) fetchUsers();
  }, [auth?.userId, fetchUsers]);

  const handleUserUpdate = async () => {
    try {
      setUpLoading(true);
      const response = await fetch(`/api/v1/users`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userid: auth?.userId,
          upId: userInfo?.id,
          status: formValue?.status,
          verify: formValue?.verify,
        }),
      });

      setUpLoading(false);
      const data = await response.json();
      if (data.result) {
        toast.success("User updated successfully", {
          style: {
            borderRadius: "10px",
            padding: "10px",
          },
          duration: 3000,
          icon: "👏",
        });
        closeModal();
        fetchUsers();
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const openModal = () => setConfirmModal(true);
  const closeModal = () => setConfirmModal(false);

  useEffect(() => {
    if (userInfo) {
      setFormValue({
        status: userInfo?.status || "",
        verify: userInfo?.verify || "",
      });
    }
  }, [userInfo]);

  // how to optimize the search function
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setPage(1);
  };

  const handleDelete = async (id: string) => {
    try {
      setDelLoading(true);
      const response = await fetch(`/api/v1/users`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userid: auth?.userId,
          upId: id,
        }),
      });

      setDelLoading(false);
      const data = await response.json();
      if (data.result) {
        fetchUsers();
        setDeleteConfirm(false);
        closeModal();
        toast.success("User deleted successfully", {
          style: {
            borderRadius: "10px",
            padding: "10px",
          },
          duration: 3000,
          icon: "👏",
        });
      }
      if (data.error) {
        toast.error(data.error, {
          style: {
            borderRadius: "10px",
            padding: "10px",
          },
          duration: 3000,
          icon: "👏",
        });
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div>
      {error && <h1 className="text-red-500 text-center">{error}</h1>}

      <div className="flex justify-center max-w-[500px] mb-4">
        <input
          type="text"
          placeholder="Search"
          className="border border-gray-400 focus:outline-gray-600 rounded-lg px-4 py-2 w-full"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <div className="overflow-x-auto w-full">
        {loading ? (
          <table className="w-full">
            <thead>{/* Skeleton UI */}</thead>
            <tbody>
              {[...Array(15)].map((_, i) => (
                <tr
                  key={i}
                  className="border-b hover:bg-gray-100 animate-pulse"
                >
                  <td className="px-4 py-2 text-left border-b border-gray-400">
                    <div className="h-4 bg-gray-400 rounded w-3/4"></div>
                  </td>
                  <td className="px-4 py-2 text-left border-b border-gray-400">
                    <div className="h-4 bg-gray-400 rounded w-2/4"></div>
                  </td>
                  <td className="px-4 py-2 text-left border-b border-gray-400">
                    <div className="h-4 bg-gray-400 rounded w-1/4"></div>
                  </td>
                  <td className="px-4 py-2 text-left border-b border-gray-400">
                    <div className="h-4 bg-gray-400 rounded w-1/4"></div>
                  </td>
                  <td className="px-4 py-2 text-left border-b border-gray-400">
                    <div className="h-4 bg-gray-400 rounded w-1/4"></div>
                  </td>
                  <td className="px-4 py-2 text-left border-b border-gray-400">
                    <div className="h-4 bg-gray-400 rounded w-1/4"></div>
                  </td>
                  <td className="px-4 py-2 text-left border-b border-gray-400">
                    <div className="h-4 bg-gray-400 rounded w-1/4"></div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <table className="w-full border border-gray-300 border-t-none rounded-md ">
            <thead>
              <tr className="shadow-[0_1px_2px_rgba(0,0,0,0.1)]">
                <th className="px-4 py-2 text-left bg-gray-300">Name</th>
                <th className="px-4 py-2 text-left bg-gray-300">
                  Email
                </th>
                <th className="px-4 py-2 text-left bg-gray-300">Role</th>
                <th className="px-4 py-2 text-left bg-gray-300">
                  Status
                </th>
                <th className="px-4 py-2 text-left bg-gray-300">
                  Count
                </th>
                <th className="px-4 py-2 text-left bg-gray-300">
                  Verified
                </th>
                <th className="px-4 py-2 text-left bg-gray-300">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {users?.map((user: any) => (
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

        {/* pagination  */}
        {Math.ceil(totals / pageSize) > 0 && (
          <div className="flex justify-center mt-4">
            <div className="bg-gray-200 px-3">Total {totals}</div>
            {/* <div>
              <select
                className="px-4 py-1 text-sm border-blue-100 border rounded shadow-sm"
                onChange={(e) => setPageSize(Number(e.target.value))}
              >
                <option value="5">5</option>
                <option value="15">15</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
            </div> */}
            <div className="ml-2">
              <button
                className={`${
                  page === 1
                    ? "bg-gray-200 border border-gray-200 text-gray-600"
                    : "bg-gray-200 border border-gray-200 text-blue-600"
                } px-2 text-sm rounded shadow-sm hover:shadow`}
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
                type="button"
              >
                Previous
              </button>
              <span className="px-2 ">
                {page} <strong>of</strong> {Math.ceil(totals / pageSize)}
              </span>
              <button
                className={`${
                  page === Math.ceil(totals / pageSize)
                    ? "bg-gray-200 border border-gray-200 text-gray-600"
                    : "bg-gray-200 border border-gray-200 text-blue-600"
                } px-2 text-sm rounded shadow-sm hover:shadow`}
                onClick={() => setPage(page + 1)}
                disabled={page === Math.ceil(totals / pageSize)}
                type="button"
              >
                Next
              </button>
            </div>
          </div>
        )}

        <DialogComponent
          isOpen={confirmModal}
          onClose={closeModal}
          title={`${userInfo?.name}`}
          size="lg"
          closeOnOverlayClick={true}
        >
          <div className="flex flex-col gap-4">
            <div>
              <div className="flex flex-col gap-2">
                <label>Verified</label>
                <select
                  className="p-2 w-full border border-gray-500"
                  onChange={(e) =>
                    setFormValue({ ...formValue, verify: e.target.value })
                  }
                  value={formValue?.verify}
                >
                  <option value="VERIFIED">VERIFIED</option>
                  <option value="PENDING">UNVERIFIED</option>
                </select>
              </div>
            </div>
            <div>
              <div className="flex flex-col gap-2">
                <label>Status</label>
                <select
                  className="p-2 w-full border border-gray-500"
                  onChange={(e) =>
                    setFormValue({ ...formValue, status: e.target.value })
                  }
                  value={formValue?.status}
                >
                  <option value="FREE">FREE</option>
                  <option value="PAID">PAID</option>
                </select>
              </div>
            </div>
            <div>
              {deleteConfirm ? (
                <div className="flex flex-col gap-2">
                  <label>Are you sure?</label>
                  <div className="flex gap-2 items-center">
                    <button
                      disabled={delLoading}
                      onClick={() => handleDelete(userInfo?.id)}
                      className="hover:bg-[#f44336] border border-[#f44336] hover:text-[#fff]  text-gray-600 rounded shadow-sm hover:shadow px-3 py-1"
                    >
                      {delLoading ? "Removing..." : "Remove"}
                    </button>
                    <button
                      onClick={() => setDeleteConfirm(false)}
                      className="bg-gray-600  text-[#fff] rounded shadow-sm hover:shadow px-3 py-1"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setDeleteConfirm(true)}
                  className="bg-[#f44336]  text-[#fff] rounded shadow-sm hover:shadow px-3 py-1"
                >
                  Remove User
                </button>
              )}
            </div>
          </div>
          <div className="flex justify-end gap-4 mt-4">
            <button
              disabled={upLoading}
              onClick={handleUserUpdate}
              className="input-btn text-gray-100 px-4 bg-gray-700 w-fit"
            >
              {upLoading ? "Saving..." : "Save"}
            </button>
          </div>
        </DialogComponent>
      </div>
    </div>
  );
};

export default UserPage;
