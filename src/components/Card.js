
export default function Card ({ card }) {
  return (

    <div draggable className='cursor-pointer p-2 font-normal border-b-[1px] border-slate-400 bg-white shadow rounded'>
      <p className='break-words'> {card} </p>
    </div>

  )
}
