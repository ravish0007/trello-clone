import { VscChromeClose } from 'react-icons/vsc'

import ListMenuItem from './ListMenuItem'

export default function ListPopover ({ closeMenu, enableCardEditing, archiveList }) {
  return (
    <div className='z-10 rounded bg-white border border-slate-300 w-64 h-fit absolute inset-x-60 inset-y-14 '>
      <div className='p-2 divide-y'>
        <div className='pb-2 flex flex-row justify-between'>
          <span className='basis-3/4 text-slate-500 text-center'> list actions </span>
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

      <div className='m-0 space-y-1 py-2'>
        <ListMenuItem
          name='Add a card...'
          handleClick={enableCardEditing}
        />
        <ListMenuItem
          name='Delete this list'
          handleClick={archiveList}
        />
      </div>

    </div>
  )
}
