import { useState } from 'react'

import { Droppable, Draggable } from 'react-beautiful-dnd'
import { BsThreeDots } from 'react-icons/bs'

import ListHeader from './ListHeader'
import ListPopover from './popovers/ListPopover'
import Card from './Card'
import CardInput from './CardInput'

// export default function List ({ list, innerRef, provided, setList }) {
export default function List ({ list, setList }) {
  const [popoverVisibility, setPopoverVisibility] = useState(false)
  const [isEdit, setEdit] = useState(false)

  function addCard (cardName) {
    const card = {
      id: String(Date.now()),
      name: cardName,
      description: ''
    }

    setList((lists) => lists.map(list_ => list_.id !== list.id
      ? list_
      : { ...list, cards: [...list.cards, card] }
    ))
  }

  function updateCard (cardId, name) {
    setList((lists) => lists.map(list_ => list_.id !== list.id
      ? list_
      : {
          ...list,
          cards: list.cards.map(card => card.id !== cardId
            ? card
            : { ...card, name })
        })
    )
  }

  function removeCard (cardId) {
    setList((lists) => lists.map(list_ => list_.id !== list.id
      ? list_
      : {
          ...list,
          cards: list.cards.filter(card => card.id !== cardId)
        })
    )
  }

  function updateDescription (cardId, description) {
    setList((lists) => lists.map(list_ => list_.id !== list.id
      ? list_
      : {
          ...list,
          cards: list.cards.map(card => card.id !== cardId
            ? card
            : { ...card, description })
        })
    )
  }

  function removeList () {
    setList((lists) => lists.filter(list_ => list_.id !== list.id))
  }

  function updateListName (name) {
    setList((lists) => lists.map(list_ => list_.id === list.id ? { ...list, name } : list_))
  }

  // function handleDragEnd (result) {
  //   if (!result.destination) return

  //   const cardsArray = Array.from(cards)
  //   const [reorderedCard] = cardsArray.splice(result.source.index, 1)
  //   cardsArray.splice(result.destination.index, 0, reorderedCard)

  //   setCards(cardsArray)
  // }

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
              removeList={removeList}
            />
          : ''}
      </div>

      <div
        className='w-72 h-fit space-y-3 bg-gray-200 shrink-0 rounded-md p-2'
        // ref={innerRef}
        // {...provided.droppableProps}
        // {...provided.dragHandleProps}
      >
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

        <Droppable droppableId={list.id}>
          {(provided) => {
            return (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className='space-y-3 rounded-md'
              >

                {list.cards.map((card, index) =>
                  <Draggable key={card.id} index={index} draggableId={card.id}>
                    {
                        (provided) => {
                          return (
                            <Card
                              innerRef={provided.innerRef}
                              provided={provided}
                              // listID={list.id}
                              card={card}
                              updateCard={updateCard}
                              removeCard={removeCard}
                              listname={list.name}
                              updateDescription={updateDescription}
                            />
                          )
                        }

                      }
                  </Draggable>
                )}
                {provided.placeholder}
              </div>
            )
          }}
        </Droppable>

        <CardInput
          addCard={addCard}
          isEdit={isEdit}
          setEdit={setEdit}
        />
      </div>
    </div>
  )
}
