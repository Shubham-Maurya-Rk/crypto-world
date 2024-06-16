import React, { useState, useEffect } from 'react'
import { useGetCryptosQuery } from '../services/cryptoApi'
import { Row, Col, Card, Input } from 'antd';
import millify from 'millify';
import { Link } from 'react-router-dom';

const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  const { data, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setcryptos] = useState(data?.data?.coins);
  const [searchTerm, setsearchTerm] = useState('');

  
  const filterCurrency=(e)=>{
    const filteredData=data?.data?.coins.filter((currency)=>currency?.name.toLowerCase().includes(e.target.value.toLowerCase()))
    setcryptos(filteredData)
  }

  if (isFetching) return <p>Loading...</p>
  return (
    <>
      {!simplified && <div className="search-crypto">
        <Input placeholder='Search Cryptocurrencies' onChange={filterCurrency} />
      </div>}
      <Row gutter={[32, 32]} className='crypto-card-container'>
        {
          cryptos?.map((currency) => (
            <Col xs={24} sm={12} lg={6} className='crypto-card' key={currency.uuid}>
              <Link to={`/crypto/${currency.uuid}`}>
                <Card title={`${currency.rank}. ${currency.name}`} extra={<img className='crypto-image' src={currency.iconUrl} alt={currency.name} />} hoverable>
                  <p>Price: {millify(currency.price)}</p>
                  <p>Market Cap: {millify(currency.marketCap)}</p>
                  <p>Daily change: {millify(currency.change)}%</p>
                </Card>
              </Link>
            </Col>
          ))
        }
      </Row>
    </>
  )
}

export default Cryptocurrencies
