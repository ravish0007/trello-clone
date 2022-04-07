
import { useState } from 'react'

export default function ListHeader ({ name, changeListName }) {
  const [isEdit, setEdit] = useState(false)
  const [listname, setListName] = useState(name)

  if (isEdit) {
    return (

      <input
        onChange={(e) => setListName(e.target.value)}
        value={listname}
        // className='p-2 w-full text-black border-2 border-transparent rounded-sm focus:border-sky-600 focus:outline-none focus:rounded-sm'
        className='basis-3/4 p-2 font-[550] w-full text-black rounded-sm border-2 border-transparent focus:border-sky-600 focus:outline-none focus:rounded-sm'
        autoFocus
        onFocus={(e) => e.target.select()}
        onKeyUp={(e) => {
          if (e.keyCode === 13) {
            changeListName(listname)
            setEdit(false)
          }
        }}
      />
    )
  }

  return (
    <p
      className='cursor-pointer basis-3/4 font-[550] font-sans border-2 border-transparent p-2 inline'
      onClick={() => setEdit(true)}
    > {name}
    </p>
  )
}
