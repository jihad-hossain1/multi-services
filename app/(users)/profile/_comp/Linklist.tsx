import Link from "next/link"

export function LinkList() {
  return (
    <div className="grid min-h-screen w-full overflow-hidden lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 lg:block">
        <div className="flex flex-col gap-2">
          <div className="flex h-[60px] items-center px-6">
            <Link href="#" className="flex items-center gap-2 font-semibold" >
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
                Orders{" "}
                <button className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">12</button>
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
              <div className="relative">
                <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <input
                  type="search"
                  placeholder="Search orders..."
                  className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
                />
              </div>
            </form>
            <Link href={`/service/code-share/`} className="text-nowrap">
            New Link
            </Link>
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
          <div className="border shadow-sm rounded-lg p-2">
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
                {
                  [...Array(5)].map((_, i) => (
                    <tr key={i} className="border-b hover:bg-gray-100">
                      <td className="text-start ">
                        {"table"}
                      </td>
                      <td className="text-start px-4 py-2 ">
                        {"table"}
                      </td>
                      <td className="text-start px-4 py-2 ">
                        {"table"}
                      </td>
                      <td className="text-start px-4 py-2 ">
                        {"table"}
                      </td>
                      <td className="text-start px-4 py-2 ">
                        {"table"}
                      </td>
                      <td className="text-start px-4 py-2 ">
                        {"table"}
                      </td>
                    </tr>
                  ))
                }

              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  )
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
  )
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
  )
}


function MoveHorizontalIcon(props: any) {
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
      <polyline points="18 8 22 12 18 16" />
      <polyline points="6 8 2 12 6 16" />
      <line x1="2" x2="22" y1="12" y2="12" />
    </svg>
  )
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
  )
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
  )
}


function SearchIcon(props: any) {
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
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
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
  )
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
  )
}