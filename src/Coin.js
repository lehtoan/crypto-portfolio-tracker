import React from 'react';
import './Coin.css';

function updateTotal(){
    var list = document.querySelectorAll(".user-value");
    var total = 0;
    for (var i = 0; i < list.length; ++i){
        var toBeAdded = parseFloat(list[i].innerHTML.substring(1))
        if (!isNaN(toBeAdded)) total += toBeAdded;
    }
    document.getElementsByClassName("portfolio-total")[0].innerHTML = "total: $" + total.toFixed(2);
}

function updateInvested(){
    var list = document.querySelectorAll(".user-invested");
    var invested = 0;
    for (var i = 0; i < list.length; ++i){
        var toBeAdded = parseFloat(list[i].value)
        if (!isNaN(toBeAdded)) invested += toBeAdded;
    }
    document.getElementsByClassName("portfolio-invested")[0].innerHTML = "invested: $" + invested.toFixed(2);
}

function updateProfitAndROI(){
    var total = parseFloat(document.getElementsByClassName("portfolio-total")[0].innerHTML.substring(8));
    var invested = parseFloat(document.getElementsByClassName("portfolio-invested")[0].innerHTML.substring(11));
    var profit = (total - invested).toFixed(2);
    document.getElementsByClassName("portfolio-profit")[0].innerHTML = "profit: $" + profit;

    var roi = (profit / invested * 100).toFixed(2);
    document.getElementsByClassName("portfolio-roi")[0].innerHTML = "roi: %" + roi;
}

function investedChange(e, index) {
    if (!(e.target.value === "") && (!(isNaN(e.target.value)))){
        var owned = parseFloat(document.getElementsByClassName("user-owned")[index].value);
        var invested = parseFloat(e.target.value)
        var average = (invested / owned).toFixed(2);
        document.getElementsByClassName("user-average")[index].innerHTML = average;
        updateInvested();
        updateProfitAndROI();
        }
}

function ownChange(e, index) {
    if (!(e.target.value === "") && (!(isNaN(e.target.value)))){
        var coinValue = document.getElementsByClassName("coin-price")[index].innerHTML.substring(1);
        document.getElementsByClassName("user-value")[index].innerHTML = "$" + (parseFloat(coinValue) * parseFloat(e.target.value)).toFixed(2);
        document.getElementsByClassName("user-invested")[index].disabled = false;
        updateTotal();
    }
}

const Coin = ({ name, image, symbol, price, volume, priceChange, marketCap, index }) => {
    return (
        <div className='coin-container'>
            <div className='coin-row'>
                <div className='coin'>
                    <img src={image} alt='crypto'/>
                    <h1>{name}</h1>
                    <p className="coin-symbol">{symbol}</p>
                </div>
                <div className="coin-data">
                    <p className="coin-price">${price}</p>
                    <p className="coin-volume">${volume.toLocaleString()}</p>
                    {priceChange < 0 ? (
                        <p className="coin-percent red">{priceChange.toFixed(2)}%</p>
                    ) : (
                        <p className="coin-percent green">{priceChange.toFixed(2)}%</p>
                    )}
                    <p className="coin-marketcap">${marketCap.toLocaleString()}</p>
                </div>
                <div className="coin-portfolio">
                <form>
                    <input type="text" placeholder="" 
                      className="user-owned" 
                      onBlur={(e) => ownChange(e, index)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {e.preventDefault(); ownChange(e, index)}}}/>
                </form>
                <form>
                    <input type="text" placeholder="" disabled
                      className="user-invested" 
                      onBlur={(e) => investedChange(e, index)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {e.preventDefault(); investedChange(e, index)}}}/>
                </form>
                <p className="user-value"></p>
                <p className="user-average"></p>
                </div>
            </div>
        </div>

    );
};

export default Coin;