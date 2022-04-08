
import { useState } from 'react'
import { BiPencil } from 'react-icons/bi'

import CardPrimaryModal from './modals/CardPrimaryModal'

export default function Card ({ card, listname }) {
  const [secondaryModalVisibility, setSecondaryModalVisibility] = useState(false)
  const [description, setDescription] = useState('') // description not into card model

  return (

    <div
      draggable
      className='card relative cursor-pointer font-normal border-b-[1px] border-slate-400 bg-white shadow rounded hover:bg-gray-100'
      onClick={() => setSecondaryModalVisibility(true)}
    >
      <p className='break-words p-2'> {card} </p>

      <span
        className='pencil-wrapper p-px px-1.5 h-fit absolute right-1 top-1.5 rounded text-gray-600 bg-gray-100/75 hover:text-black hover:bg-gray-200'
        onClick={(e) => {
          e.stopPropagation()
          console.log('propogation test')
        }}
      >
        <BiPencil className='card-pencil' />
      </span>

      <CardPrimaryModal
        open={secondaryModalVisibility}
        children={{ listname, card, setDescription, description }}

        onClose={() => setSecondaryModalVisibility(false)}

      />

    </div>

  )
}
