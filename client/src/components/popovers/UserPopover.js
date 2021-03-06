import { VscChromeClose } from 'react-icons/vsc'

import ListMenuItem from './ListMenuItem'

export default function UserPopover ({ open, closeMenu, logOut, user }) {
  if (!open) return null

  return (
    <div className='z-10 rounded bg-white border border-slate-300 w-64 h-fit absolute top-16 right-2'>
      <div className='p-2 divide-y'>
        <div className='pb-2 flex flex-row justify-between'>
          <span className='basis-3/4 text-slate-500 text-center'>  Account </span>
          <span className='px-px'>
            <VscChromeClose
              className='cross'
              size='1.3rem'
              onClick={closeMenu}
            />
          </span>
        </div>
        <div />
      </div>

      {/* <div className='flex flex-row p-2 border-b-0.5 border-slate-300'> */}
      <div className='p-2 border-b-0.5 border-slate-300'>

        {user.picture

          ? <img
              className='h-14 w-14 rounded-full mx-auto'
              src={user.picture}
            />

          : <p
              className='mx-auto cursor-pointer h-10 w-10 p-2 rounded-full text-red-900 bg-gray-200 text-center text-lg'
            >
            {user.name[0].toUpperCase()}
          </p>}

        <p className='text-center py-2 px-6 text-slate-700'>
          {user.name}
        </p>
      </div>

      <div className='m-0 space-y-1 py-2'>
        <ListMenuItem
          name='Log Out'
          handleClick={logOut}
        />
      </div>

    </div>

  )
}
