import { AnimatePresence, motion } from 'framer-motion'
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { useQueryClient } from 'react-query'
import { Data } from './interface'

interface Props {
  isOpen: boolean
  setIsOpen: (state: boolean) => void
  data: Data
}

const backdropVariant = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
      delayChildren: 0.2,
    },
  },
}

const modalVariant = {
  hidden: {
    y: '-100vh',
  },
  visible: {
    y: 0,
    transition: {
      type: 'tween',
    },
  },
}

const EditModal: FC<Props> = ({ isOpen, setIsOpen, data: inventoryData }) => {
  console.log('inventoryData', inventoryData)

  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm({
    defaultValues: {
      category: inventoryData.category,
      price: inventoryData.price.replace('$', ''),
      quantity: inventoryData.quantity,
      value: inventoryData.value.replace('$', ''),
    },
  })

  const queryClient = useQueryClient()

  const onSubmit = handleSubmit((data) => {
    queryClient.setQueryData<Data[]>(
      'inventory-data',
      (oldData) =>
        oldData?.map((item) => {
          if (item.name === inventoryData.name) {
            return {
              ...item,
              ...data,
              value: '$' + Number(data.price.replace('$', '')) * Number(data.quantity),
            }
          }
          return item
        }) as Data[]
    )
    setIsOpen(false)
  })

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className='bg-[#00000080] w-full h-full fixed top-0 left-0 z-50 flex justify-center items-center'
          variants={backdropVariant}
          initial='hidden'
          animate='visible'
          exit='hidden'
          onClick={() => setIsOpen(false)}
        >
          <motion.form
            onSubmit={onSubmit}
            className='bg-[#292B27] w-[500px] rounded-2xl p-6 flex flex-col gap-4'
            variants={modalVariant}
            onClick={(e) => e.stopPropagation()}
          >
            <h1 className='text-white text-2xl'>Edit Product</h1>
            <h2 className='text-base text-white'>{inventoryData.name}</h2>
            <div className='grid grid-cols-2 gap-4'>
              <div className='flex flex-col gap-2'>
                <label className='text-white'>Category</label>
                <input {...register('category')} type='text' className='bg-[#3F413D] text-white p-2 rounded-xl' />
              </div>
              <div className='flex flex-col gap-2'>
                <label className='text-white'>Price</label>
                <input
                  {...register('price')}
                  type='tel'
                  className='bg-[#3F413D] text-white p-2 rounded-xl'
                  inputMode='numeric'
                />
              </div>
              <div className='flex flex-col gap-2'>
                <label className='text-white'>Quantity</label>
                <input
                  {...register('quantity')}
                  type='tel'
                  className='bg-[#3F413D] text-white p-2 rounded-xl'
                  inputMode='numeric'
                />
              </div>
              <div className='flex flex-col gap-2'>
                <label className='text-white'>Value</label>
                <input
                  {...register('value')}
                  type='tel'
                  className='bg-[#3F413D] text-white p-2 rounded-xl'
                  inputMode='numeric'
                />
              </div>
            </div>
            <div className='flex items-center gap-4 justify-end'>
              <button type='button' onClick={() => setIsOpen(false)} className='text-green-500'>
                Cancel
              </button>
              <button
                type='submit'
                disabled={!isValid}
                className='bg-green-500 px-2 py-1 rounded-lg disabled:cursor-not-allowed disabled:bg-gray-600'
              >
                Save
              </button>
            </div>
          </motion.form>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default EditModal
