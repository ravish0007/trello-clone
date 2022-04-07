
import List from './List'
import ListInput from './ListInput'

export default function Board () {
  return (
    // <div className='flex flex-row overflow-x-auto space-x-4 '>
    <div className='flex flex-row overflow-x-auto space-x-4 '>
      <List />
      <List />
      <List />
      <ListInput />
    </div>
  )
}
