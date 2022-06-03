import React, { useState } from 'react';
import Table from '../components/Table';
import Switch from '@mui/material/Switch';
import './home.scss';

export const Home = ({ setIsConnect, isConnect, prevTickers }) => {
  const [isTickersOpen, setIsTickersOpen] = useState({});

  return (
    <div className="home__container">
      <div className="home__wrap">
        <div className="home__title">Google Finance</div>
        <div className="home__refresh_btn" onClick={() => setIsTickersOpen({})}>
          Refresh list
        </div>
      </div>
      <div className="home__list">
        <Table
          setIsTickersOpen={setIsTickersOpen}
          isTickersOpen={isTickersOpen}
          prevTickers={prevTickers}
        />
      </div>
      <Switch
        defaultChecked
        value={isConnect}
        onChange={() => setIsConnect((prev) => !prev)}
      />
    </div>
  );
};
