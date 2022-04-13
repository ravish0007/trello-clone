import { useState } from 'react'

import { BsThreeDots } from 'react-icons/bs'

import ListHeader from './ListHeader'
import ListPopover from './popovers/ListPopover'
import Card from './Card'
import CardInput from './CardInput'

export default function List ({ list, setList }) {
  const [cards, setCards] = useState([])
  const [popoverVisibility, setPopoverVisibility] = useState(false)
  const [isEdit, setEdit] = useState(false)

  function addCard (cardName) {
    const card = {
      id: Date.now(),
      name: cardName,
      description: ''
    }
    setCards((cards) => [...cards, card])
  }

  function removeList () {
    setList((lists) => lists.filter(xlist => xlist.id !== list.id))
  }

  function updateListName (name) {
    setList((lists) => lists.map(xlist => xlist.id === list.id ? { ...list, name } : xlist
    ))
  }

  function updateCard (id, name) {
    setCards((cards) => cards.map(card => card.id === id ? { ...card, name } : card
    ))
  }

  function removeCard (id) {
    setCards((cards) => cards.filter(card => card.id !== id))
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
              archiveList={removeList}

            />
          : ''}

      </div>

      <div className='w-72 h-fit space-y-3 bg-gray-200 shrink-0 rounded-md p-2'>
        <div className='flex flex-row justify-around'>
          <ListHeader
            name={list.name}
            changeListName={updateListName}
          />
          <span
            className='p-2 h-fit rounded text-gray-600 hover:text-black hover:bg-gray-300'
            onClick={() => setPopoverVisibility(popoverVisibility => !popoverVisibility)}
          >
            <BsThreeDots />
          </span>
        </div>

        <div className='space-y-3 rounded-md'>
          {cards.map(card => <Card card={card} updateCard={updateCard} removeCard={removeCard} listname={list.name} key={list.id} />)}
          {/* {cards.map(card => <Card {...{ card, updateCard, listname: list.name }} key={list.id} />)} */}
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
