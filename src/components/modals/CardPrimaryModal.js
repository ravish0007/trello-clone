import ReactDom from 'react-dom'

import { VscChromeClose } from 'react-icons/vsc'

import '../../styles/modal.css'

import DescriptionInput from '../inputs/DescriptionInput'
import CardNameInput from './CardNameInput'

export default function CardPrimaryModal ({ open, card, updateCard, onClose, listname, description, updateDescription }) {
  if (!open) return null

  return ReactDom.createPortal(
    <>
      <div
        className='overlay'
        onClick={(e) => { e.stopPropagation(); onClose() }}
      />

      <div className='z-50 rounded bg-white border border-slate-300 w-1/3 h-fit fixed inset-x-1/3 inset-y-1/4'>
        <div className='w-full relative'>
          <span
            className='p-2 absolute top-2 right-2 hover:bg-gray-200 hover:rounded-full'
            onClick={(e) => {
              e.stopPropagation()
              onClose()
            }}
          >
            <VscChromeClose
              className='cross'
              size='1.3rem'
            />
          </span>
        </div>

        <div className='px-6 py-4'>
          <CardNameInput card={card} updateCard={updateCard} />
          <p className='text-slate-500 px-1'>in list <span className='underline'> {listname}</span>
          </p>
        </div>

        <div className='space-y-2 px-6 py-4'>
          <p className='font-[550] text-lg text-gray-700'>Description</p>
          <DescriptionInput
            description={description}
            addDescription={updateDescription}
          />
        </div>
      </div>
    </>, document.getElementById('portal')
  )
}
