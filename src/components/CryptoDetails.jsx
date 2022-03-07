import { useState } from 'react';
import { useGetCryptoDetailsQuery } from '../services/cryptoApi';
import HTMLReactParser from 'html-react-parser';
import { useParams } from 'react-router-dom';
import millify from 'millify';
import { Col, Row, Typography, Select } from 'antd';
import { MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, 
  StopOutlined, TrophyOutlined, CheckOutlined, NumberOutlined, ThunderboltOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;
const { Option } = Select;

const CryptoDetails = () => {
      const { coinId } = useParams();
      const [timePeriod, setTimePeriod] = useState('7d');
      const { data, isFetching } = useGetCryptoDetailsQuery(coinId);
      const cryptoDetails = data?.data?.coin;
      console.log(cryptoDetails);

    if (isFetching) return "Loading...";

    const time = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];

    const stats = [
      { title: 'Price (USD)', value: `$ ${cryptoDetails.price && millify(Number(cryptoDetails.price))}`, icon: <DollarCircleOutlined /> },
      { title: 'Rank', value: cryptoDetails.rank, icon: <NumberOutlined /> },
      { title: '24-Hour Volume', value: `$ ${cryptoDetails["24hVolume"] && millify(Number(cryptoDetails["24hVolume"]))}`, icon: <ThunderboltOutlined /> },
      { title: 'Market Cap', value: `$ ${cryptoDetails.marketCap && millify(Number(cryptoDetails.marketCap))}`, icon: <DollarCircleOutlined /> },
      { title: 'All-Time-High (Daily Avg)', value: `$ ${millify(Number(cryptoDetails.allTimeHigh.price))}`, icon: <TrophyOutlined /> },
    ];
  
    const genericStats = [
      { title: 'Number of Markets', value: cryptoDetails.numberOfMarkets, icon: <FundOutlined /> },
      { title: 'Number of Exchanges', value: cryptoDetails.numberOfExchanges, icon: <MoneyCollectOutlined /> },
      { title: 'Approved Supply', value: cryptoDetails.approvedSupply ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
      { title: 'Total Supply', value: `$ ${millify(Number(cryptoDetails.supply.total))}`, icon: <ExclamationCircleOutlined /> },
      { title: 'Circulating Supply', value: `$ ${millify(Number(cryptoDetails.supply.circulating))}`, icon: <ExclamationCircleOutlined /> },
    ];

    return (
      <Col className='coin-detail-container'>
        <Col className='coin-heading-container'>
          <Title level={2} className="coin-name">
            {cryptoDetails.name} ({cryptoDetails.symbol}) Price
          </Title>
          <p>
            {cryptoDetails.name} live price in US Dollars.
            View value statistics, market cap, and supply.
          </p>
        </Col>
        <Select 
          defaultValue="7d" 
          className='select-timeperiod' 
          placeholder="Select Time Period" 
          onChange={(value) => setTimePeriod(value)}>
            {time.map((date) => <Option key={date}>{date}</Option>)}
        </Select>
        <Col className='stats-container'>
          <Col className='coin-value-statistics'>
            <Col className='coin-value-statistics-heading'>
              <Title level={3} className="coin-details-heading">
                {cryptoDetails.name} Value Statistics
              </Title>
              <p>
                An overview showing the stats of {cryptoDetails.name}.
              </p>
            </Col>
            {stats.map(({ icon, title, value }) => (
              <Col className='coin-stats'>
                <Col className='coin-stats-name'>
                  <Text>{icon}</Text>
                  <Text>{title}</Text>
                </Col>
                <Text className='stats'>{value}</Text>
              </Col>
            ))}
          </Col>
          <Col className='other-stats-info'>
            <Col className='coin-value-statistics-heading'>
              <Title level={3} className="coin-details-heading">
                Other Statistics
              </Title>
              <p>
                An overview showing the stats of all cryptocurrencies.
              </p>
            </Col>
            {genericStats.map(({ icon, title, value }) => (
              <Col className='coin-stats'>
                <Col className='coin-stats-name'>
                  <Text>{icon}</Text>
                  <Text>{title}</Text>
                </Col>
                <Text className='stats'>{value}</Text>
              </Col>
            ))}
          </Col>
        </Col>
      </Col>
    )
  }
  
  export default CryptoDetails;