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

  return (
    <div>
      {error && <h1 className="text-red-500 text-center">{error}</h1>}

      <div className="flex justify-center max-w-[500px] mb-4">
        <input
          type="text"
          placeholder="Search"
          className="border border-primary_light_4 focus:outline-primary_dark rounded-lg px-4 py-2 w-full"
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
                  <td className="px-4 py-2 text-left border-b border-primary_light_4">
                    <div className="h-4 bg-primary_light_4 rounded w-3/4"></div>
                  </td>
                  <td className="px-4 py-2 text-left border-b border-primary_light_4">
                    <div className="h-4 bg-primary_light_4 rounded w-2/4"></div>
                  </td>
                  <td className="px-4 py-2 text-left border-b border-primary_light_4">
                    <div className="h-4 bg-primary_light_4 rounded w-1/4"></div>
                  </td>
                  <td className="px-4 py-2 text-left border-b border-primary_light_4">
                    <div className="h-4 bg-primary_light_4 rounded w-1/4"></div>
                  </td>
                  <td className="px-4 py-2 text-left border-b border-primary_light_4">
                    <div className="h-4 bg-primary_light_4 rounded w-1/4"></div>
                  </td>
                  <td className="px-4 py-2 text-left border-b border-primary_light_4">
                    <div className="h-4 bg-primary_light_4 rounded w-1/4"></div>
                  </td>
                  <td className="px-4 py-2 text-left border-b border-primary_light_4">
                    <div className="h-4 bg-primary_light_4 rounded w-1/4"></div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <table className="w-full border border-primary_light_3 border-t-none rounded-md ">
            <thead>
              <tr className="shadow-[0_1px_2px_rgba(0,0,0,0.1)]">
                <th className="px-4 py-2 text-left bg-primary_light_3">Name</th>
                <th className="px-4 py-2 text-left bg-primary_light_3">
                  Email
                </th>
                <th className="px-4 py-2 text-left bg-primary_light_3">Role</th>
                <th className="px-4 py-2 text-left bg-primary_light_3">
                  Status
                </th>
                <th className="px-4 py-2 text-left bg-primary_light_3">
                  Count
                </th>
                <th className="px-4 py-2 text-left bg-primary_light_3">
                  Verified
                </th>
                <th className="px-4 py-2 text-left bg-primary_light_3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {users?.map((user: any) => (
                <tr key={user?.id}>
                  <td className="px-4 py-2 text-left border-b border-primary_light_2">
                    {user?.name}
                  </td>
                  <td className="px-4 py-2 text-left border-b border-primary_light_2">
                    {user?.email}
                  </td>
                  <td className="px-4 py-2 text-left border-b border-primary_light_2">
                    {user?.xrole}
                  </td>
                  <td className="px-4 py-2 text-left border-b border-primary_light_2">
                    {user?.status}
                  </td>
                  <td className="px-4 py-2 text-left border-b border-primary_light_2">
                    {user?.count}
                  </td>
                  <td className="px-4 py-2 text-left border-b border-primary_light_2">
                    {user?.verify}
                  </td>
                  <td className="px-4 py-2 text-left border-b border-primary_light_2">
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
            <div className="bg-primary_light_2 px-3">Total {totals}</div>
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
                    ? "bg-primary_light_2 border border-primary_light_2 text-primary_dark"
                    : "bg-primary_light_2 border border-primary_light_2 text-blue-600"
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
                    ? "bg-primary_light_2 border border-primary_light_2 text-primary_dark"
                    : "bg-primary_light_2 border border-primary_light_2 text-blue-600"
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
                  className="p-2 w-full border border-primary_light_5"
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
                  className="p-2 w-full border border-primary_light_5"
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
          </div>
          <div className="flex justify-end gap-4 mt-4">
            <button
              disabled={upLoading}
              onClick={handleUserUpdate}
              className="input-btn text-primary_light px-4 bg-primary_dark_deep w-fit"
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
