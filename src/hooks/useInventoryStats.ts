import { useQuery } from 'react-query'
import { InventoryStats } from '../components/interface'
import useInventoryData from './useInventoryData'

const useInventoryStats = () => {
  const { data } = useInventoryData()

  return useQuery(
    ['inventory-stats', data],
    () => {
      const totalProduct = data?.length
      const totalStoreValue = '$' + data?.reduce((acc, item) => acc + Number(item.value.replace('$', '')), 0)
      const outOfStock = data?.filter((item) => item.quantity === 0).length
      const noOfCategory = new Set(data?.map((item) => item.category)).size

      return { totalProduct, totalStoreValue, outOfStock, noOfCategory } as InventoryStats
    },
    {
      enabled: !!data,
      staleTime: 1000 * 60 * 5,
      cacheTime: 1000 * 60 * 30,
      retry: false,
      refetchOnWindowFocus: false,
    }
  )
}

export default useInventoryStats
