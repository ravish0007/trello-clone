import { useState } from 'react'
import { VscChromeClose } from 'react-icons/vsc'

export default function DescriptionInput (props) {
  const [isEdit, setEdit] = useState(false)
  const [description, setDescription] = useState(props.description)

  function handleAddDescription () {
    props.addDescription(description.trim())
    setEdit(false)
  }

  function resetDescription () {
    setDescription(props.description)
    setEdit(false)
  }

  if (isEdit) {
    return (
      <div className='space-y-2'>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className='p-2 w-full h-20 text-black border-2 rounded border-sky-600 rounded-sm focus:border-sky-600 focus:outline-none focus:rounded'
          placeholder='Add a more detailed description...'
          autoFocus
          onKeyUp={(e) => {
            if (e.key === 'Enter') handleAddDescription()
          }}
        />

        <div className='space-x-2'>
          <button
            className='py-2 px-4 text-gray-50 rounded bg-sky-600 hover:bg-sky-700'
            onClick={resetDescription}
          >
            Save
          </button>

          <VscChromeClose
            className='cross'
            size='1.6rem'
            onClick={() => { setEdit(false); setDescription(props.description) }}
          />
        </div>

      </div>
    )
  }

  if (description) {
    return (
      <p
        className='cursor-pointer text-slate-900 hover:underline'
        onClick={() => setEdit(true)}
      > {description}
      </p>
    )
  }

  return (
    <div
      className='w-full h-20 text-gray-50 bg-gray-100 p-2 font-normal rounded hover:bg-gray-200'
      onClick={() => setEdit(true)}
    >
      <p className='text-gray-700'>Add a more detailed description</p>
    </div>
  )
}
