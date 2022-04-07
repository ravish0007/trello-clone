import { useState } from 'react'

import { BsThreeDots } from 'react-icons/bs'

import Card from './Card'
import CardInput from './CardInput'
import ListPopover from './popovers/ListPopover'

export default function List ({ list }) {
  const [cards, setCard] = useState([])
  const [popoverVisibility, setPopoverVisibility] = useState(false)
  const [isEdit, setEdit] = useState(false)

  function addCard (cardname) {
    setCard((cards) => [...cards, cardname])
  }

  return (
    <div className='relative min-h-screen'>
      <div>
        {popoverVisibility
          ? <ListPopover
              closeMenu={() => setPopoverVisibility(false)}
              enableCardEditing={() => {
                setEdit(true)
                setPopoverVisibility(false)
              }}
            />
          : ''}

      </div>

      <div draggable className='w-72 h-fit space-y-3 bg-gray-200 shrink-0 rounded-md p-2'>
        <div className='flex flex-row justify-around'>
          <p className='basis-3/4 font-[550] font-sans p-2 inline'> {list} </p>
          <span
            className='p-2 h-fit rounded text-gray-600 hover:text-black hover:bg-gray-300'
            onClick={() => setPopoverVisibility(popoverVisibility => !popoverVisibility)}
          >
            <BsThreeDots />
          </span>
        </div>

        <div className='space-y-3 rounded-md'>
          {cards.map(card => <Card card={card} />)}
        </div>

        <CardInput
          addCard={addCard}
          isEdit={isEdit}
          setEdit={setEdit}
        />
      </div>
    </div>
  )
}
