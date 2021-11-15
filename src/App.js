import axios from 'axios'
import React, { useState, useEffect } from 'react';
import './App.css';
import Coin from './Coin';

function App() 
{
    const [coins, setCoins] = useState([])
    const [search] = useState('')

    useEffect(() => {
        axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&order=market_cap_desc&per_page=100&page=1&sparkline=false')
            .then(res => {
                setCoins(res.data);
            }).catch(error => console.log(error))
    }, []);


    const filteredCoins = coins.filter(coin =>
        coin.name.toLowerCase().includes(search.toLowerCase())
    )
    
    var count = 0;

  return (
      <div className="coin-app">
          <h1 className="coin-title"> crypto portfolio tracker </h1>
          <div className = "portfolio">
                <p className = "portfolio-invested">invested: $0</p>
                <p className = "portfolio-profit">profit: $0</p>
                <p className = "portfolio-roi">roi: %0</p>
                <p className = "portfolio-total">total: $0</p>
          </div>
          <div className="coin-categories">
              <p className="categories-name">name</p>
              <p className="categories-price">price</p>
              <p className="categories-volume">volume</p>
              <p className="categories-change">24h</p>
              <p className="categories-marketcap">market cap</p>
              <p className="categories-own">own</p>
              <p className="categories-invested">invested</p>
              <p className="categories-value">value</p>
              <p className="categories-average">average</p>
          </div>
          {filteredCoins.map(coin => {
              return <Coin
                  key={coin.id}
                  name={coin.name}
                  image={coin.image}
                  symbol={coin.symbol}
                  marketCap={coin.market_cap}
                  price={coin.current_price}
                  priceChange={coin.price_change_percentage_24h}
                  volume={coin.total_volume}
                  index={count++}
              />;
          })}
    </div>
  );


}

export default App;
