import { FC, useState } from 'react'
import { useQueryClient } from 'react-query'
import EditModal from './EditModal'
import { EditIcon, EyeIcon, EyeOffIcon, TrashIcon } from './icons'
import { Data } from './interface'

const ListingRow: FC<{ data: Data; isAdmin: boolean }> = ({ data, isAdmin }) => {
  const queryClient = useQueryClient()
  const [isOpen, setIsOpen] = useState(false)
  const [isDisabled, setIsDisabled] = useState(false)
  console.log('data', data)

  const handleDelete = () => {
    queryClient.setQueryData<Data[]>(
      'inventory-data',
      (oldData) => oldData?.filter((item) => item.name !== data.name) as Data[]
    )
  }

  const handleDisable = () => {
    setIsDisabled((prev) => !prev)
  }

  return (
    <div className='w-full grid grid-cols-7'>
      {[data.name, data.category, data.price, data.quantity, data.value].map((value, i) => (
        <div className={`p-4 ${i === 0 ? 'col-span-2' : 'col-span-1'}`} key={i}>
          <h2 className={`pl-1 text-sm ${isDisabled ? 'text-slate-400' : 'text-white'}`}>{value}</h2>
        </div>
      ))}
      <div className='flex items-center gap-4 col-span-1 p-4'>
        <button type='button' onClick={() => isAdmin && setIsOpen(true)}>
          <EditIcon className={`w-4 h-4 ${isAdmin ? 'text-green-500' : 'text-slate-500 cursor-not-allowed'}`} />
        </button>
        <button type='button' onClick={isAdmin ? handleDisable : void 0}>
          {isDisabled ? (
            <EyeOffIcon className={`w-4 h-4 ${isAdmin ? 'text-purple-400' : 'text-slate-500 cursor-not-allowed'}`} />
          ) : (
            <EyeIcon className={`w-4 h-4 ${isAdmin ? 'text-purple-400' : 'text-slate-500 cursor-not-allowed'}`} />
          )}
        </button>
        <button type='button' onClick={isAdmin ? handleDelete : void 0}>
          <TrashIcon className={`w-4 h-4 ${isAdmin ? 'text-red-600' : 'text-slate-500 cursor-not-allowed'}`} />
        </button>
      </div>
      {isOpen ? <EditModal isOpen={isOpen} setIsOpen={setIsOpen} data={data} /> : null}
    </div>
  )
}

export default ListingRow
