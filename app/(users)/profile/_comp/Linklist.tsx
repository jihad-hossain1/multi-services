"use client";

import CodeShare from "@/app/service/code-share/_comp/CodeShare";
import DialogComponent from "@/components/modal/Modal";
import EyeSVG from "@/components/svg/eyesvg";
import Loader from "@/components/svg/loader";
import PencilSVG from "@/components/svg/pencilsvg";
import TrashSVG from "@/components/svg/trashsvg";
import useAuth from "@/helpers/hook/useAuth";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

export function LinkList() {
  const { auth } = useAuth();
  const [loading, setLoading] = useState(false);
  const [links, setLinks] = useState([]);
  const [confirmModal, setConfirmModal] = useState(false);
  const [confirmDLT, setConfirmDLT] = useState(false);
  const [linkId, setLinkID] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(false);

  const fetchLinks = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `/api/v1/code-share/all-links?userid=${auth?.userId}`
      );

      setLoading(false);
      const jsondata = await response.json();
      if (jsondata?.result) setLinks(jsondata?.result);
    } catch (error) {
      console.error("Error fetching links:", error);
    }
  }, [auth?.userId]);

  useEffect(() => {
    if (auth) fetchLinks();
  }, [auth, fetchLinks]);

  const openModal = () => setConfirmModal(true);
  const closeModal = () => setConfirmModal(false);
  const deleteLink = async (id: string) => {
    try {
      setDeleteLoading(true);
      const response = await fetch(`/api/v1/code-share/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          authorId: auth?.userId,
        }),
      });
      setDeleteLoading(false);
      const jsondata = await response.json();

      if (jsondata?.result) {
        toast.success(jsondata?.result, {
          duration: 3000,
          position: "top-right",
          style: { padding: "10px", borderRadius: "5px" },
        });
        setConfirmDLT(false);
        setDeleteLoading(false);
        closeModal();
        fetchLinks();
      }
      if (jsondata?.error) {
        toast.error(jsondata?.error, {
          duration: 3000,
          position: "top-right",
          style: {
            background: "red",
            color: "white",
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid yellow",
          },
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="grid min-h-screen w-full overflow-hidden lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 lg:block">
        <div className="flex flex-col gap-2">
          <div className="flex h-[60px] items-center px-6">
            <Link href="#" className="flex items-center gap-2 font-semibold">
              <Package2Icon className="h-6 w-6" />
              <span className="">Link List</span>
            </Link>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-4 text-sm font-medium">
              <Link
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <HomeIcon className="h-4 w-4" />
                Home
              </Link>
              <Link
                href="#"
                className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary  transition-all hover:text-primary"
              >
                <ShoppingCartIcon className="h-4 w-4" />
                Links{" "}
                <button className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                  {links?.length || 0}
                </button>
              </Link>
              <Link
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <PackageIcon className="h-4 w-4" />
                Products
              </Link>
              <Link
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <UsersIcon className="h-4 w-4" />
                Customers
              </Link>
              <Link
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <LineChartIcon className="h-4 w-4" />
                Analytics
              </Link>
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-muted/40 px-6">
          <Link href="#" className="lg:hidden">
            <Package2Icon className="h-6 w-6" />
            <span className="sr-only">Home</span>
          </Link>
          <div className="flex-1">
            <h1 className="font-semibold text-lg">Recent Lists</h1>
          </div>
          <div className="flex flex-1 items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
            <form className="ml-auto flex-1 sm:flex-initial">
              <input
                type="search"
                placeholder="Search orders..."
                className="border p-2 sm:w-[300px] md:w-[200px] lg:w-[300px]"
              />
            </form>
            <CodeShare />
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
          <div className="border shadow-sm rounded-lg p-2 max-sm:overflow-auto">
            {loading ? (
              <table className="w-full overflow-auto">
                <thead>
                  <tr className="border-b">
                    <th className="text-start px-4 py-2 ">#</th>
                    <th className="text-start px-4 py-2 ">Link</th>
                    <th className="text-start px-4 py-2 ">Url</th>
                    <th className="text-start px-4 py-2 ">Date</th>
                    <th className="text-start px-4 py-2 ">Status</th>
                    <th className="text-start px-4 py-2 ">Actions</th>
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
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <table className="w-full overflow-x-auto">
                <thead>
                  <tr className="border-b">
                    <th className="text-start px-4 py-2 ">#</th>
                    <th className="text-start px-4 py-2 ">Link</th>
                    <th className="text-start px-4 py-2 ">Url</th>
                    <th className="text-start px-4 py-2 ">Date</th>
                    <th className="text-start px-4 py-2 ">Status</th>
                    <th className="text-start px-4 py-2 ">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {links?.map((link: any, i: number) => (
                    <tr
                      key={i}
                      className="border-b hover:bg-primary_light relative"
                    >
                      <td className="text-start px-4 py-2 ">{i + 1}</td>
                      <td className="text-start ">{link?.xname || "N/A"}</td>
                      <td className="text-start px-4 py-2 ">{link?.link}</td>
                      <td className="text-start px-4 py-2 ">
                        {new Date(link?.xdate).toLocaleDateString()}
                      </td>
                      <td className="text-start px-4 py-2 ">
                        {link?.status?.toLowerCase()}
                      </td>
                      <td className="text-start px-4 py-2 flex gap-2">
                        <Link href={`/service/code-share/${link?.link}`}>
                          <PencilSVG className="w-6 h-6" stroke="green" />
                        </Link>
                        <button
                          onClick={() => {
                            openModal();
                            setLinkID(link?.id);
                          }}
                        >
                          <TrashSVG className="w-6 h-6" stroke="red" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </main>
      </div>

      <DialogComponent
        isOpen={confirmModal}
        onClose={closeModal}
        title="Are you sure delete this link?"
        size="sm"
        closeOnOverlayClick={true}
      >
        <div className="flex gap-2 items-center justify-center">
          <button
            onClick={(e) => {
              setConfirmDLT(true);
              deleteLink(linkId);
            }}
            className="bg-red-500 text-white px-2 py-1 rounded-md"
            disabled={deleteLoading}
          >
            {deleteLoading ? (
              <Loader className="w-6 h-6 animate-spin" stroke="white" />
            ) : (
              "Delete"
            )}
          </button>
          <button
            onClick={(e) => {
              setConfirmDLT(false);
              closeModal();
            }}
            className="bg-blue-500 text-white px-2 py-1 rounded-md"
          >
            Cancel
          </button>
        </div>
      </DialogComponent>
    </div>
  );
}

function HomeIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function LineChartIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 3v18h18" />
      <path d="m19 9-5 5-4-4-3 3" />
    </svg>
  );
}

function Package2Icon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
      <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9" />
      <path d="M12 3v6" />
    </svg>
  );
}

function PackageIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m7.5 4.27 9 5.15" />
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
      <path d="m3.3 7 8.7 5 8.7-5" />
      <path d="M12 22V12" />
    </svg>
  );
}

function ShoppingCartIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="8" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
    </svg>
  );
}

function UsersIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}
