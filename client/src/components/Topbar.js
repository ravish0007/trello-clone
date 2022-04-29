import { useState } from 'react'

import UserPopover from './popovers/UserPopover'

export default function Topbar ({ user, logOut }) {
  const [showMenu, setShowMenu] = useState(false)
  return (

    <div className='p-3 bg-sky-700 relative'>
      <UserPopover
        user={user}
        open={showMenu}
        logOut={logOut}
        closeMenu={() => setShowMenu(false)}
      />

      <div className='flex justify-between'>
        <span className='text-white text-2xl italic'> Trello </span>

        <span
          className='cursor-pointer h-10 w-10 p-2 rounded-full text-red-900 bg-gray-200 text-center text-lg'
          onClick={(e) => setShowMenu(true)}
        >
          {user.name[0].toUpperCase()}
        </span>

      </div>
    </div>
  )
}
