import { useState, useEffect } from 'react'

import { DragDropContext } from 'react-beautiful-dnd'

import List from './List'
import ListInput from './ListInput'

import TrelloService from '../trelloService'

export default function Board ({ board }) {
  const [lists, setList] = useState([])

  // useEffect(() => {
  //   async function fetchData () {
  //     const result = await TrelloService.getLists(board.boardID)
  //     setList(result.data.lists.sort((a, b) => (a.list_id - b.list_id)).map(x => {
  //       return { id: x.list_id.toString(), name: x.name, cards: x.cards }
  //     }))
  //   }
  //   fetchData()
  // }, [])

  useEffect(() => {
    TrelloService.getLists(board.boardID).then(result => {
      setList(result.data.lists.sort((a, b) => (a.list_id - b.list_id)).map(x => {
        return { id: x.list_id.toString(), name: x.name, cards: x.cards }
      }))
    })
  }, [])

  function addList (listname) {
    const list = {
      name: listname
    }
    TrelloService.newList({ boardID: board.boardID, ...list }).then((id) => {
      setList((lists) => [...lists, { cards: [], ...list, id: id.toString() }])
    })
  }

  function handleDragEnd (result) {
    const { source, destination } = result

    console.log(result)
    if (!destination) return

    const sourceCard_ = lists.filter(list => list.id === source.droppableId)[0].cards[source.index]
    const destinationCard = lists.filter(list => list.id === destination.droppableId)[0].cards[destination.index]

    // TrelloService.moveCard(source.droppableId, destination.droppableId, sourceCard_.id, destinationCard?.id, source.index, destination.index).then(() => {})

    if (sourceCard_.id === destinationCard?.id) return

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

    // })
  }

  return (
    <div
      className='p-6 flex overflow-x-auto space-x-4'
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
