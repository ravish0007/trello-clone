
import { useState, useEffect } from 'react'
import { VscChromeClose } from 'react-icons/vsc'

export default function ListInput ({ addList }) {
  const [isEdit, setEdit] = useState(false)
  const [listname, setListname] = useState('')

  function handleAddList () {
    addList(listname)
    setListname('')
    // setEdit(false)
  }

  if (isEdit) {
    return (
      <div className='w-72 shrink-0 space-y-1 h-fit bg-gray-200 p-2 font-normal rounded'>
        <input
          onChange={(e) => setListname(e.target.value)}
          value={listname}
          className='px-px w-full text-black border-2 border-sky-600 rounded-sm focus:border-sky-600 focus:outline-none focus:rounded-sm'
          placeholder='Enter list title...'
          autoFocus
          onKeyUp={(e) => {
            if (e.keyCode === 13) handleAddList()
          }}
        />

        <div className='space-x-2'>
          <button
            className='py-2 px-4 text-gray-50 border-2 rounded-md bg-sky-600 hover:bg-sky-700'
            onClick={handleAddList}
          >
            Add list
          </button>

          <VscChromeClose
            className='cross'
            size='1.6rem'
            onClick={() => setEdit(false)}
          />
        </div>

      </div>
    )
  }

  return (
    <button
      className='shrink-0 w-72 h-fit text-gray-50 bg-sky-800/50 p-2 font-normal rounded hover:bg-sky-800'
      onClick={() => setEdit(true)}
    >
      <p>+ Add another list</p>
    </button>
  )
}
