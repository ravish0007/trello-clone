
export default function CardModalMenuItem ({ name, onClick, Icon }) {
  return (
    <div className=''>
      <p
        className='inline space-x-2 p-2 bg-black/50 text-slate-300 w-fit hover:text-slate-200 hover:px-4'
        onClick={(e) => {
          e.stopPropagation()
          onClick()
        }}
      >
        <span>
          {Icon}
        </span>
        <span>
          {name}
        </span>
      </p>
    </div>
  )
}
