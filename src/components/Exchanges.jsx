import React from 'react'
import { useGetExchangesQuery } from '../services/cryptoApi'

const Exchanges = () => {
  const {data:exchanges ,isFetching} = useGetExchangesQuery();
  console.log(exchanges)
  if(isFetching)return <p>Loading...</p>
  return (
    <div>
      Exchanges
    </div>
  )
}

export default Exchanges
