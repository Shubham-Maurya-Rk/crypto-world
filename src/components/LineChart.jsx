import React from 'react';
import { Row, Col, Typography } from 'antd';
import millify from 'millify';
import { Line } from 'react-chartjs-2';
import {Chart, registerables } from "chart.js";
Chart.register(...registerables);

const {Text, Title}=Typography


const LineChart = ({coinHistory, coinName, currentPrice}) => {
  const coinPrice=[],coinTimeStamp=[];
  for(let i=0;i<coinHistory?.data.history.length;i++){
    coinPrice.push(coinHistory?.data.history[i].price)
    coinTimeStamp.push(new Date(coinHistory?.data.history[i].timestamp).toLocaleDateString())
  }
  const options={
    scales: {
        yAxes: [
            {
                ticks:{
                    beginAtZero:true
                }
            }
        ]
    }
  }

  const data={
    labels: coinTimeStamp,
    datasets:[
        {
            label: "Price in USD",
            data: coinPrice,
            fill: false,
            backgroundColor: '#0071bd',
            borderColor: '#0071bd'
        }
    ]
  }


  console.log(coinHistory)
  return (
    <>
        <Row className='chart-header'>
            <Title level={2} className='chart-title'>{coinName} Price Chart</Title>
            <Col className='price-container'>
                <Title level={5} className='price-change'>{coinHistory?.data?.change}</Title>
                <Title level={5} className='current-price'>Current {coinName} Price: ${millify(currentPrice)}</Title>
            </Col>
        </Row>
        <Line options={options} data={data}/>
    </>)
}

export default LineChart
