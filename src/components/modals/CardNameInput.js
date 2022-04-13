
import { useState } from 'react'

export default function CardNameInput ({ card, updateCard }) {
  const [isEdit, setEdit] = useState(false)
  const [cardName, setCardName] = useState(card.name)

  if (isEdit) {
    return (
      <input
        className='w-10/12 font-[550] text-2xl text-gray-700 px-py rounded border-2 border-transparent focus:border-sky-600 focus:outline-none'
        onChange={(e) => setCardName(e.target.value)}
        value={cardName}
        autoFocus
        onFocus={(e) => e.target.select()}
        onKeyUp={(e) => {
          if (e.key === 'Enter') {
            updateCard(card.id, cardName)
            setEdit(false)
          }
        }}
      />
    )
  }

  return (
    <p
      className='cursor-pointer font-[550] text-2xl text-gray-700 border-2 border-transparent'
      onClick={(e) => { e.stopPropagation(); setEdit(true) }}
    >{card.name}
    </p>
  )
}
