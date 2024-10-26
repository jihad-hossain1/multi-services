"use client";

import {
  useCallback,
  useEffect,
  useState,
  useLayoutEffect,
  useRef,
} from "react";
import gsap from "gsap";
import Link from "next/link";
import toast from "react-hot-toast";
import CodeShare from "@/app/service/code-share/_comp/CodeShare";
import DialogComponent from "@/components/modal/Modal";
import Loader from "@/components/svg/loader";
import PencilSVG from "@/components/svg/pencilsvg";
import TrashSVG from "@/components/svg/trashsvg";
import useAuth from "@/helpers/hook/useAuth";
import { useRouter } from "next/navigation";

const HomeIcon = () => <div>🏠</div>;
const ActiveFavIcon = () => <div title="InActive Favorite"> 🤎 </div>;
const InActiveFavIcon = () => <div title="Active Favorite"> 🤍 </div>;

export function LinkList() {
  const { auth } = useAuth();
  const [loading, setLoading] = useState(false);
  const [links, setLinks] = useState([]);
  const [confirmModal, setConfirmModal] = useState(false);
  const [confirmDLT, setConfirmDLT] = useState(false);
  const [linkId, setLinkID] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [pageSize, setPageSize] = useState(20);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const tableRef: any = useRef(null);
  const [favLoading, setFavLoading] = useState(false);
  const router = useRouter();
  const [ind, setInd] = useState<null | number>(null);

  const fetchLinks = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `/api/v1/code-share/all-links?userid=${auth?.userId}&page=${page}&pageSize=${pageSize}&searchTerm=${searchTerm}`
      );
      setLoading(false);
      const jsondata = await response.json();
      if (jsondata?.data) {
        setLinks(jsondata?.data);
        setTotal(jsondata?.meta?.total);
        setPage(jsondata?.meta?.page);
      }
    } catch (error) {
      console.error("Error fetching links:", error);
    }
  }, [auth?.userId, page, pageSize, searchTerm]);

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

  // GSAP animation on table rows
  useLayoutEffect(() => {
    if (tableRef.current && links.length > 0) {
      gsap.fromTo(
        tableRef?.current?.querySelectorAll("tbody tr"),
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.5 }
      );
    }
  }, [links]);

  const handleFav = async (id: string, isFav: string) => {
    try {
      setFavLoading(true);
      const response = await fetch(`/api/v1/code-share/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          active: isFav,
        }),
      });
      setFavLoading(false);
      const jsondata = await response.json();
      if (jsondata?.result) {
        toast.success("Link On Favorite");
        router.refresh();
        fetchLinks();
      }
    } catch (error) {
      setFavLoading(false);
      console.error(error);
    }
  };

  return (
    <div className="">
      <div className="">
        <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-muted/40 px-6">
          <Link href="#" className="lg:hidden">
            <HomeIcon />
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
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </form>
            <CodeShare />
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
          <div className=" shadow-sm rounded-lg p-2 max-sm:overflow-auto">
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
                        <div className="animate-pulse bg-primary_light_3 h-8 w-full"></div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <table className="w-full overflow-x-auto" ref={tableRef}>
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
                      <td className="text-start px-4 py-2">{i + 1}</td>
                      <td className="text-start">{link?.xname || "N/A"}</td>
                      <td className="text-start px-4 py-2">{link?.link}</td>
                      <td className="text-start px-4 py-2">
                        {new Date(link?.xdate).toLocaleDateString()}
                      </td>
                      <td className="text-start px-4 py-2">
                        {link?.status?.toLowerCase()}
                      </td>
                      <td className="text-start px-4 py-2 flex gap-2">
                        {link?.fav ? (
                          <button
                            disabled={favLoading}
                            onClick={() => {
                              setInd(i);
                              handleFav(link?.id, "");
                            }}
                          >
                            {favLoading && ind == i ? "..." : <ActiveFavIcon />}
                          </button>
                        ) : (
                          <button
                            disabled={favLoading}
                            onClick={() => {
                              setInd(i);
                              handleFav(link?.id, "active");
                            }}
                          >
                            {favLoading && ind == i ? (
                              "..."
                            ) : (
                              <InActiveFavIcon />
                            )}
                          </button>
                        )}
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

            {/* pagination  */}
            {Math.ceil(total / pageSize) > 0 && (
              <div className="flex justify-center items-center mt-4">
                <div>
                  <select
                    className="px-4 text-sm border-blue-100 border rounded shadow-sm"
                    onChange={(e) => setPageSize(Number(e.target.value))}
                  >
                    <option value="25">25</option>
                    <option value="30">30</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                  </select>
                </div>
                <div className="p-2">
                  <button
                    className={`${
                      page === 1
                        ? "bg-gray-200 border border-gray-200 text-gray-500"
                        : "bg-blue-200 border border-blue-200 text-blue-600"
                    } px-2 text-sm rounded shadow-sm hover:shadow`}
                    onClick={() => setPage(page - 1)}
                    disabled={page === 1}
                    type="button"
                  >
                    Previous
                  </button>
                  <span className="px-2 ">
                    {page} <strong>of</strong> {Math.ceil(total / pageSize)}
                  </span>
                  <button
                    className={`${
                      page === Math.ceil(total / pageSize)
                        ? "bg-gray-200 border border-gray-200 text-gray-500"
                        : "bg-blue-200 border border-blue-200 text-blue-600"
                    } px-2 text-sm rounded shadow-sm hover:shadow`}
                    onClick={() => setPage(page + 1)}
                    disabled={page === Math.ceil(total / pageSize)}
                    type="button"
                  >
                    Next
                  </button>
                </div>
              </div>
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
            onClick={() => {
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
            onClick={() => {
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
