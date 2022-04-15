import { useState } from 'react'

import { DragDropContext, Droppable } from 'react-beautiful-dnd'

import List from './List'
import ListInput from './ListInput'

export default function Board () {
  const [lists, setList] = useState([])

  function addList (listname) {
    const list = {
      name: listname,
      id: String(Date.now()),
      cards: []
    }

    setList((lists) => [...lists, list])
  }

  function handleDragEnd (result) {
    console.log(result)

    const { source, destination } = result

    if (!destination) return

    const [sourceCard] = lists.filter(list => list.id === source.droppableId)[0].cards.splice(source.index, 1)

    setList(lists => {
      return lists.map(list => list.id !== source.droppableId
        ? list
        : { ...list, cards: list.cards.filter(card => card.id !== sourceCard.id) }
      )
    })

    const destinationCards = Array.from(lists.filter(list => list.id === destination.droppableId)[0].cards)

    destinationCards.splice(destination.index, 0, sourceCard)

    setList(lists => {
      return lists.map(list => list.id !== destination.droppableId
        ? list
        : { ...list, cards: destinationCards }
      )
    })
  }

  return (
    <div
      className='flex overflow-x-auto space-x-4'
    >
      <DragDropContext onDragEnd={handleDragEnd}>
        {lists.map((list, index) =>
          <List
            list={list}
            setList={setList}
            key={list.id}
            index={index}
          />
        )}
        <ListInput addList={addList} />
      </DragDropContext>
    </div>
  )
}
