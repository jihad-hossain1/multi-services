import React from 'react'

const Layout = ({children}: {children: React.ReactNode}) => {
  return (
    <div className='flex gap-3'>
      <nav className='p-4 min-h-[100vh] min-w-[100px] border-r-2 border-gray-200 max-w-[300px] '>
        <div className='flex flex-col gap-3'>
          <a href='/xdashboard'>Dashboard</a>
          <ul className='flex flex-col gap-1'>
            <li>
              <a href='/xdashboard/users'>Users</a>
            </li>
          </ul>
        </div>
      </nav>
        <main className='p-4 min-h-[100vh] w-11/12 mx-auto'>
            {children}
        </main>
    </div>
  )
}

export default Layout