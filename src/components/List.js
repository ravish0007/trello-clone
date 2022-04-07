import { useState } from 'react'

import Card from './Card'
import CardInput from './CardInput'

export default function List ({ list }) {
  const [cards, setCard] = useState([])

  function addCard (cardname) {
    setCard((cards) => [...cards, cardname])
  }

  return (
    <div draggable className='w-72 h-fit space-y-3 bg-gray-200 shrink-0 rounded-md p-2'>
      <p className='font-[550] font-sans p-2'> {list}  </p>
      <div className='space-y-3 rounded-md'>
        {cards.map(card => <Card card={card} />)}
      </div>
      <CardInput addCard={addCard} />
    </div>
  )
}
