import React, { useState, useRef, useEffect } from 'react';
import setAllTrickers from '../src/store/actions/trickersAction';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Home } from './pages/Home';
import io from 'socket.io-client';
import './App.css';
let socket = null;

function App() {
  const [isConnect, setIsConnect] = useState(true);

  const dispatch = useDispatch();
  const tickers = useSelector((state) => state.trickersReducer.trickers);
  const prevTickers = useRef(tickers);

  const handleConnect = () => {
    socket = io('http://localhost:4000/');
    socket.on('ticker', function (quotes) {
      dispatch(setAllTrickers(quotes));
    });
    socket.emit('start');
  };

  useEffect(() => {
    prevTickers.current = tickers;
  }, [tickers]);

  useEffect(() => {
    if (isConnect) {
      handleConnect();
    } else {
      socket?.disconnect();
    }
  }, [isConnect]);

  return (
    <>
      <Home
        isConnect={isConnect}
        setIsConnect={setIsConnect}
        prevTickers={prevTickers}
      />
    </>
  );
}

export default App;
