import { useState } from 'react'

import { Droppable, Draggable } from 'react-beautiful-dnd'
import { BsThreeDots } from 'react-icons/bs'

import ListHeader from './ListHeader'
import ListPopover from './popovers/ListPopover'
import Card from './Card'
import CardInput from './CardInput'

import TodoService from '../trelloService'
import TrelloService from '../trelloService'

export default function List ({ list, setList }) {
  const [popoverVisibility, setPopoverVisibility] = useState(false)
  const [isEdit, setEdit] = useState(false)

  function addCard (cardName) {
    const card = {
      name: cardName.trim(),
      description: ''
    }

    TodoService.newCard(list.id, card).then(id =>
      setList((lists) => lists.map(list_ => list_.id !== list.id
        ? list_
        : { ...list, cards: [...list.cards, { ...card, id: id.toString() }] }
      )))
  }

  function updateCard (cardID, name) {
    TrelloService.updateCard({ id: cardID, name }).then(() =>

      setList((lists) => lists.map(list_ => list_.id !== list.id
        ? list_
        : {
            ...list,
            cards: list.cards.map(card => card.id !== cardID
              ? card
              : { ...card, name })
          })
      ))
  }

  function removeCard (cardID) {
    TodoService.deleteCard(cardID).then(() =>
      setList((lists) => lists.map(list_ => list_.id !== list.id
        ? list_
        : {
            ...list,
            cards: list.cards.filter(card => card.id !== cardID)
          })
      ))
  }

  function updateDescription (cardID, description) {
    TrelloService.updateCard({ id: cardID, description }).then(() =>

      setList((lists) => lists.map(list_ => list_.id !== list.id
        ? list_
        : {
            ...list,
            cards: list.cards.map(card => card.id !== cardID
              ? card
              : { ...card, description })
          })
      ))
  }

  function removeList () {
    TodoService.deleteList(list.id).then(() =>
      setList((lists) => lists.filter(list_ => list_.id !== list.id)))
  }

  function updateListName (name) {
    TodoService.updateList({ id: list.id, name }).then(() =>
      setList((lists) => lists.map(list_ => list_.id === list.id ? { ...list, name } : list_)))
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
              removeList={removeList}
            />
          : ''}
      </div>

      <div
        className='w-72 h-fit space-y-3 bg-gray-200 shrink-0 rounded-md p-2'
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
