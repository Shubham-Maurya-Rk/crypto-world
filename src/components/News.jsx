import React, { useState } from 'react';
import { useGetCryptoNewsQuery } from '../services/NewsApi';
import { useGetCryptosQuery } from '../services/cryptoApi';
import { Row, Col, Card, Typography, Avatar, Select } from 'antd';
import moment from 'moment';

const { Text, Title } = Typography;
const { Option } = Select;
const demoImage = "https://fortune.com/img-assets/wp-content/uploads/2024/06/AP24163814965248-e1718183315260.jpg?resize=1200,600"

const News = ({ simplified }) => {
  const [newsCategory, setnewsCategory] = useState('cryptocurrency')
  const { data: cryptos} = useGetCryptosQuery(100);
  const { data: cryptoNews, isFetching } = useGetCryptoNewsQuery({ newsCategory, count: simplified ? 6 : 12 });
  if (isFetching) return <p>Loading...</p>
  console.log(cryptoNews)

  return (
    <>
      <Row gutter={[24, 24]}>
        {!simplified &&
          <Col span={24}>
            <Select
              showSearch
              className='select-news'
              placeholder="Select a Crypto"
              optionFilterProp='children'
              onChange={(value) => setnewsCategory(value)}
              filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
            >
              <Option value="cryptocurrency">Cryptocurrency</Option>
              {
                cryptos?.data.coins.map((currency)=>(
                  <Option value={currency.name}>{currency.name}</Option>
                ))
              }
            </Select>
          </Col>}
        {
          cryptoNews && cryptoNews?.articles.map((news, i) => (
            <Col xs={24} sm={12} lg={8} key={i}>
              <Card hoverable className='news-card'>
                <a href={news.url} target='_blank' rel="noreferrer">
                  <div className="news-image-container">
                    <Title className='news-title' level={4}>{news.title}</Title>
                    <img src={news.urlToImage} alt={news.source.name} />
                  </div>
                  <p>
                    {
                      news.description.length > 100 ? news.description.substring(0, 100) + '...' : news.description
                    }
                  </p>
                  <div className="provider-container">
                    <div>
                      <Avatar src={news.urlToImage} alt={news.author} />
                      <Text className='provider-name'>{news.author ? news.author : "Author"}</Text>
                    </div>
                    <Text>{moment(news.publishedAt).startOf('ss').fromNow()}</Text>
                  </div>
                </a>
              </Card>
            </Col>
          ))
        }
      </Row>
    </>
  )
}

export default News
