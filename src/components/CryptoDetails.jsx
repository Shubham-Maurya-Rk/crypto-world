import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetCryptoDetailsQuery, useGetCryptoHistoryQuery } from '../services/cryptoApi';
import { Row, Typography, Select, Col } from 'antd';
import millify from 'millify';
import { MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined, TrophyOutlined, CheckOutlined, NumberOutlined, ThunderboltOutlined } from '@ant-design/icons';
import HTMLReactParser from 'html-react-parser/lib/index';
import LineChart from './LineChart';


const { Text, Title } = Typography
const { Option } = Select

const CryptoDetails = () => {
  const { coinId } = useParams();
  const { data: coinDetails, isFetching } = useGetCryptoDetailsQuery(coinId);
  const [timePeriod, settimePeriod] = useState('7d')
  const {data:coinHistory}=useGetCryptoHistoryQuery({coinId,timePeriod})
  const coin = coinDetails?.data.coin;
  const time = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];
  const stats = [
    { title: 'Price to USD', value: `$ ${coin?.price && millify(coin?.price)}`, icon: <DollarCircleOutlined /> },
    { title: 'Rank', value: coin?.rank, icon: <NumberOutlined /> },
    { title: '24h Volume', value: `$ ${coin?.volume && millify(coin?.volume)}`, icon: <ThunderboltOutlined /> },
    { title: 'Market Cap', value: `$ ${coin?.marketCap && millify(coin?.marketCap)}`, icon: <DollarCircleOutlined /> },
    { title: 'All-time-high(daily avg.)', value: `$ ${coin?.allTimeHigh?.price && millify(coin?.allTimeHigh?.price)}`, icon: <TrophyOutlined /> },
  ];
  const genericStats = [
    { title: 'Number Of Markets', value: coin?.numberOfMarkets, icon: <FundOutlined /> },
    { title: 'Number Of Exchanges', value: coin?.numberOfExchanges, icon: <MoneyCollectOutlined /> },
    { title: 'Aprroved Supply', value: coin?.supply?.confirmed ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
    { title: 'Total Supply', value: `$ ${coin?.supply?.total && millify(coin?.supply?.total)}`, icon: <ExclamationCircleOutlined /> },
    { title: 'Circulating Supply', value: `$ ${coin?.supply?.circulating && millify(coin?.supply?.circulating)}`, icon: <ExclamationCircleOutlined /> },
  ];

  if (isFetching) return <p>Loading...</p>
  console.log(coinDetails)
  return (
    <Col className='coin-detail-container'>
      <Col className='coin-heading-container'>
        <Title level={2} className='coin-name'>{coin.name} ({coin.symbol}) Price</Title>
        <p>
          {coin.name} live price in US dollars.
          View value statistics, market cap and supply.
        </p>
      </Col>
      <Select
        placeholder="Select Time Period"
        className='select-timeperiod'
        defaultValue="7d"
        onChange={(value) => settimePeriod(value)}
      >
        {
          time.map((t) => (
            <Option value={t} key={t}>{t}</Option>
          ))
        }
      </Select>
 
      <LineChart coinName={coin.name} currentPrice={coin.price} coinHistory={coinHistory}/>

      <Col className='stats-container'>
        <Col className='coin-value-statistics'>
          <Col className='coin-value-statistics-heading'>
            <Title level={3} className='coin-details-heading'>
              {coin.name} Value Statistics
            </Title>
            <p>
              An overview showing the stats of {coin.name}
            </p>
            {
              stats.map(({ icon, title, value }) => (
                <Col className='coin-stats' key={title}>
                  <Col className='coin-stats-name'>
                    <Text>{icon}</Text>
                    <Text>{title}</Text>
                  </Col>
                  <Text className='stats'>{value}</Text>
                </Col>
              ))
            }
          </Col>
        </Col>
        <Col className='other-stats-info'>
          <Col className='coin-value-statistics-heading'>
            <Title level={3} className='coin-details-heading'>
              Other Statistics
            </Title>
            <p>
              An overview showing the stats of all cryptocurrency
            </p>
            {
              genericStats.map(({ icon, title, value }) => (
                <Col className='coin-stats' key={title}>
                  <Col className='coin-stats-name'>
                    <Text>{icon}</Text>
                    <Text>{title}</Text>
                  </Col>
                  <Text className='stats'>{value}</Text>
                </Col>
              ))
            }
          </Col>
        </Col>
      </Col>
      <Col className='coin-desc-link'>
        <Row className='coin-desc'>
          <Title level={3} className='coin-details-heading'>
            What is {coin.name}?
          </Title>
          <Title level={4} className='coin-details-heading'>{HTMLReactParser(coin.description)}</Title>
        </Row>
        <Col className='coin-links'>
            <Title level={3} className='coin-details-heading'>
              {coin.name} Links
            </Title>
            {
              coin.links.map((link)=>(
                <Row className='coin-link' key={link.name}>
                  <Title level={5} className='link-name'>
                    {link.type}
                  </Title>
                  <a href={link.url} rel='noreferrer' target='_blank'>
                    {link.name}
                  </a>
                </Row>
              ))
            }
        </Col>
      </Col>
    </Col>
  )
}

export default CryptoDetails
