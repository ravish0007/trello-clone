
export default function ListMenuItem ({ name, handleClick }) {
  return (
    <p
      className='text-center py-2 px-4 text-slate-700 rounded-sm hover:bg-gray-200'
      onClick={handleClick}
    >
      {name}
    </p>
  )
}
