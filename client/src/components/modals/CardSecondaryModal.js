import { useState, useEffect } from 'react'

import CardModalMenuItem from './CardModalMenuItem'

// icons
import { VscArchive, VscArrowRight } from 'react-icons/vsc'
import { BsCardHeading } from 'react-icons/bs'
import '../../styles/modal.css'

export default function CardSecondaryModal ({ open, openCard, card, onClose, updateCard, removeCard }) {
  const [cardName, setCardName] = useState(card.name)

  useEffect(() => setCardName(card.name), [card]) // manual update

  if (!open) return null

  return (
    <>
      <div
        className='overlay'
        onClick={(e) => {
          e.stopPropagation()
          onClose()
        }}
      />
      <div
        className='z-50 space-y-4  h-fit absolute inset-0 '
        onClick={(e) => e.stopPropagation()}
      >
        <textarea
          value={cardName}
          className='p-2 w-full h-20 text-black rounded resize-none focus:outline-none'
          autoFocus
          onFocus={(e) => e.target.select()}
          onChange={(e) => {
            setCardName(e.target.value)
          }}
          onKeyUp={(e) => {
            if (e.keyCode === 13) {
              updateCard(card.id, cardName)
            }
          }}
        />

        <button
          className='py-2 px-6 text-gray-50 rounded bg-sky-600 hover:bg-sky-700'
          onClick={(e) => { e.stopPropagation(); updateCard(card.id, cardName); onClose() }}
        >
          Save
        </button>

      </div>
      <div className='z-50 absolute space-y-5 inset-y-0 inset-x-72 w-full'>
        <CardModalMenuItem
          Icon={<BsCardHeading className='card-modal-menu-item' />}
          name='Open card'
          onClick={openCard}
        />

        {/* <CardModalMenuItem */}
        {/*   Icon={<VscArrowRight className='card-modal-menu-item' />} */}
        {/*   name='Move' */}
        {/* /> */}

        {/* <CardModalMenuItem */}
        {/*   Icon={<VscArrowRight className='card-modal-menu-item' />} */}
        {/*   name='Move' */}
        {/* /> */}

        <CardModalMenuItem
          Icon={<VscArchive className='card-modal-menu-item' />}
          name='Delete'
          onClick={() => { removeCard(card.id); onClose() }}
        />
      </div>
    </>
  )
}
