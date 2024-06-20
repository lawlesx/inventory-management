import { useQuery } from 'react-query'
import { Data } from '../components/interface'

const useInventoryData = () => {
  return useQuery<Data[]>(
    'inventory-data',
    async () => {
      const res = await fetch('https://dev-0tf0hinghgjl39z.api.raw-labs.com/inventory')
      return await res.json()
    },
    {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5, // 5 minutes
      cacheTime: 1000 * 60 * 30, // 30 minutes
      retry: false,
    }
  )
}

export default useInventoryData
