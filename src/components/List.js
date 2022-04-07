import Card from './Card'
import CardInput from './CardInput'

export default function List () {
  return (
    <div draggable className='w-72 bg-gray-200 shrink-0 rounded-md p-2'>
      <p className='font-[550] font-sans p-2'> List Name </p>
      <div className='space-y-3 rounded-md'>
        <Card />
        <Card />
        <Card />
      </div>
      <CardInput />
    </div>
  )
}
