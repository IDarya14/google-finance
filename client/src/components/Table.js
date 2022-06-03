import React from 'react';
import { useSelector } from 'react-redux';
import './table.scss';

const Table = ({ setIsTickersOpen, isTickersOpen, prevTickers }) => {
  const tickers = useSelector((state) => state.tickersReducer?.trickers);

  const isOpenItem = (id) => {
    const obj = { ...isTickersOpen };
    obj[id] = !obj[id];
    setIsTickersOpen(obj);
  };

  const getClassforPrice = (id) => {
    if (prevTickers.current.length) {
      const index = tickers.findIndex((elem) => elem.ticker === id);
      const indexPrev = prevTickers.current.findIndex(
        (elem) => elem.ticker === id
      );
      if (prevTickers.current[indexPrev].price > tickers[index].price) {
        return 'table__price-down';
      } else {
        return 'table__price-up';
      }
    }
  };

  const getClassForItem = (id) => {
    const item = tickers.find((elem) => elem.ticker === id);
    const key = item.ticker;
    if (Object.keys(isTickersOpen).length) {
      if (key in isTickersOpen) {
        if (isTickersOpen[key] === true) {
          return 'table__close-item';
        } else {
          return '';
        }
      }
    }
  };

  const hideAllTickers = () => {
    const newArray = tickers
      .map((elem) => elem.ticker)
      .reduce((acc, current) => {
        return {
          ...acc,
          [current]: true,
        };
      }, {});
    return setIsTickersOpen(newArray);
  };

  return (
    <>
      <div className="table">
        <div className="table__head">
          <div className="table__row">
            <div className="table__title">Ticker</div>
            <div className="table__title">Exchange</div>
            <div className="table__title">Price</div>
            <div className="table__title">Yield</div>
            <div className="table__title">Change</div>
            <div className="table__title">Dividend</div>
            <div className="table__title">Change percentge</div>
            <div className="table__title">Last trade timenge</div>
            <div
              className="table__title table__closeallbtn"
              onClick={hideAllTickers}
            >
              &times;
            </div>
          </div>
        </div>
        {tickers.length > 0 && (
          <ul className="table__body" data-testid="list">
            {tickers?.map((elem) => (
              <li
                key={elem.ticker}
                className={`table__item ${getClassForItem(elem.ticker)}`}
              >
                <div className="table__elem">{elem.ticker}</div>
                <div className="table__elem">{elem.exchange}</div>
                <div className={`table__elem ${getClassforPrice(elem.ticker)}`}>
                  {elem.price}$
                </div>
                <div className="table__elem">{elem.yield}%</div>
                <div className="table__elem">{elem.change}</div>
                <div className="table__elem">{elem.dividend}%</div>
                <div className="table__elem">{elem.change_percent}%</div>
                <div className="table__elem">{elem.last_trade_time}</div>
                <div className="table__elem">
                  <div
                    className="table__delete-btn"
                    onClick={() => isOpenItem(elem.ticker)}
                  >
                    &times;
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default React.memo(Table);
