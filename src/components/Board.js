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

  return (
    <div className='flex overflow-x-auto space-x-4 '>
      {lists.map(list => <List list={list} setList={setList} key={list.id} />)}
      <ListInput addList={addList} />
    </div>
  )
}
