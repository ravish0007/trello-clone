import { useState } from 'react'

import List from './List'
import ListInput from './ListInput'

export default function Board () {
  const [lists, setList] = useState([])

  function addList (listname) {
    const list = {
      name: listname,
      id: Date.now()
    }
    setList((lists) => [...lists, list])
  }

  function removeList (id) {
    setList((lists) => lists.filter(list => list.id !== id))
  }

  return (
    <div className='flex overflow-x-auto space-x-4 '>
      {lists.map(list => <List list={list} key={list.id} removeList={removeList} />)}
      <ListInput addList={addList} />
    </div>
  )
}
