import { FC, useState } from 'react'
import ListingRow from './components/ListingRow'
import { CartIcon, CartOffIcon, CategoryIcon, ExchangeDollarIcon } from './components/icons'
import useInventoryData from './hooks/useInventoryData'
import useInventoryStats from './hooks/useInventoryStats'

function App() {
  const [isAdmin, setIsAdmin] = useState(true)

  const { data } = useInventoryData()
  const { data: stats } = useInventoryStats()

  return (
    <main className='bg-[#161718] min-h-screen w-full'>
      {/* --------------------------------- Toggle --------------------------------- */}
      <div className='flex items-center justify-end w-full py-4 px-20 gap-4'>
        <h3 className='text-white font-medium tracking-widest uppercase text-lg'>Admin</h3>
        <Toggle checked={isAdmin} onChange={() => setIsAdmin(!isAdmin)} />
        <h3 className='text-white font-medium tracking-widest uppercase text-lg'>User</h3>
      </div>
      <div className='flex flex-col gap-4 p-20'>
        {/* ---------------------------------- Stats --------------------------------- */}
        <h1 className='text-white text-4xl'>Inventory Stats</h1>
        <div className='flex items-center justify-between gap-4'>
          {[
            {
              icon: <CartIcon className='w-10 h-10 text-white' />,
              title: 'Total Product',
              value: stats?.totalProduct,
            },
            {
              icon: <ExchangeDollarIcon className='w-10 h-10 text-white' />,
              title: 'Total store value',
              value: stats?.totalStoreValue,
            },
            {
              icon: <CartOffIcon className='w-10 h-10 text-white' />,
              title: 'Out of stock',
              value: stats?.outOfStock,
            },
            {
              icon: <CategoryIcon className='w-10 h-10 text-white' />,
              title: 'No of Category',
              value: stats?.noOfCategory,
            },
          ].map((item, i) => (
            <div className='bg-[#243325] rounded-xl p-6 flex gap-6 w-1/4' key={i}>
              {item.icon}
              <div className='flex flex-col gap-4'>
                <h3 className='text-white text-xl'>{item.title}</h3>
                <h2 className='text-white font-semibold text-4xl'>{item.value}</h2>
              </div>
            </div>
          ))}
        </div>
        {/* ----------------------------- Inventory List ----------------------------- */}
        <div className='w-full bg-[#212124] flex flex-col rounded-lg divide-y divide-gray-700'>
          <div className='w-full grid grid-cols-7'>
            {['Name', 'Category', 'Price', 'Quantity', 'Value', 'Action'].map((item, i) => (
              <div className={`p-4 ${i === 0 ? 'col-span-2' : 'col-span-1'}`} key={i}>
                <h2 className='bg-[#161718] rounded-md px-2 py-1 text-green-500 w-min h-min'>{item}</h2>
              </div>
            ))}
          </div>
          {data?.map((item, i) => <ListingRow data={item} key={i} isAdmin={isAdmin} />)}
        </div>
      </div>
    </main>
  )
}

const Toggle: FC<{
  checked?: boolean
  onChange?: () => void
}> = ({ checked, onChange }) => {
  return (
    <button
      type='button'
      onClick={onChange}
      className={`relative w-10 bg-slate-700 rounded-full h-5 px-1 flex items-center transition-all ${checked ? 'justify-start' : 'justify-end'}`}
    >
      <div className='w-4 h-4 bg-white left-0 rounded-full' />
    </button>
  )
}

export default App
