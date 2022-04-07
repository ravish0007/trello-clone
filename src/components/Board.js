import { useState } from 'react'

import List from './List'
import ListInput from './ListInput'

export default function Board () {
  const [lists, setList] = useState([])

  function addList (listname) {
    setList((lists) => [...lists, listname])
  }

  return (
    <div className='flex overflow-x-auto space-x-4 '>
      {lists.map(list => <List list={list} />)}
      <ListInput addList={addList} />
    </div>
  )
}
