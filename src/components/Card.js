
import { useState } from 'react'
import { BiPencil } from 'react-icons/bi'

import CardPrimaryModal from './modals/CardPrimaryModal'
import CardSecondaryModal from './modals/CardSecondaryModal'

export default function Card ({ card, listname, updateCard, removeCard, updateDescription }) {
  const [description, setDescription] = useState('') // description not into card model

  const [primaryModalVisibility, setPrimaryModalVisibility] = useState(false)
  const [secondaryModalVisibility, setSecondaryModalVisibility] = useState(false)

  function openCard () {
    setSecondaryModalVisibility(false)
    setPrimaryModalVisibility(true)
  }

  return (

    <div
      className='card relative cursor-pointer font-normal border-b-[1px] border-slate-400 bg-white shadow rounded hover:bg-gray-100'
      onClick={(e) => { e.stopPropagation(); setPrimaryModalVisibility(true) }}
    >
      <p className='break-words p-2'> {card.name} </p>

      <span
        className='pencil-wrapper p-px px-1.5 h-fit absolute right-1 top-1.5 rounded text-gray-600 bg-gray-100/75 hover:text-black hover:bg-gray-200'
        onClick={(e) => {
          e.stopPropagation()
          setSecondaryModalVisibility(true)
        }}
      >
        <BiPencil className='card-pencil' />
      </span>

      <CardPrimaryModal
        open={primaryModalVisibility}
        listname={listname}
        card={card}
        updateDescription={setDescription}
        description={description}
        updateCard={updateCard}
        onClose={() => setPrimaryModalVisibility(false)}
      />

      <CardSecondaryModal
        open={secondaryModalVisibility}
        openCard={openCard}
        card={card}
        removeCard={removeCard}
        updateCard={updateCard}
        onClose={() => setSecondaryModalVisibility(false)}
      />

    </div>
  )
}
