
import { useState, useEffect } from 'react'
import { VscChromeClose } from 'react-icons/vsc'

export default function CardInput ({ addCard, isEdit, setEdit }) {
  const [cardName, setCardName] = useState('')

  function handleAddCard () {
    addCard(cardName)
    setCardName('')
  }

  if (isEdit) {
    return (
      <div className='space-y-1 h-fit bg-gray-200 font-normal rounded'>

        <div className='p-2 font-normal border-b-[1px] border-slate-400 bg-white shadow rounded'>
          <textarea
            onChange={(e) => setCardName(e.target.value)}
            value={cardName}
            className='px-px h-6 resize-none w-full text-black border-2 border-transparent rounded hover:resize-y focus:outline-none focus:rounded-sm'
            placeholder='Enter a title for this card'
            autoFocus
            onKeyUp={(e) => {
              if (e.keyCode === 13) handleAddCard()
            }}
          />
        </div>

        <div className='space-x-2'>
          <button
            className='py-2 px-4 text-gray-50 border-2 rounded-md bg-sky-600 hover:bg-sky-700'
            onClick={handleAddCard}
          >
            Add card
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
    <div
      className='w-full h-fit text-slate-600 bg-transparent p-2 font-normal rounded hover:bg-gray-300'
      onClick={() => setEdit(true)}
    >
      <p>+ Add a card</p>
    </div>
  )
}
