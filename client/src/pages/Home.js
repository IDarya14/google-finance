import React, { useEffect, useState } from 'react';
import './home.scss';
import io from 'socket.io-client';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Switch from '@mui/material/Switch';

export const Home = () => {
  const [tickers, setTickers] = useState([]);
  const [checked, setChecked] = useState(true);
  const [socket, setSocket] = useState();

  const handleClick = () => {
    if (checked) {
      socket.emit('start');
      setChecked(false);
    } else {
      socket.close('start');
      setChecked(true);
    }
  };

  useEffect(() => {
    const socket = io('http://localhost:4000/');
    setSocket(socket);
    socket.on('ticker', function (quotes) {
      setTickers((prev) => {
        if (prev.length === 0) return quotes;
        const arr = [];
        quotes.forEach((element, i) => {
          if (element.price > prev[i].price) {
            element.className = true;
            arr.push(element);
          } else {
            element.className = false;
            arr.push(element);
          }
        });
        return arr;
      });
    });
    socket.emit('start');
  }, []);

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  return (
    <div className="home__wrapper">
      <div className="home__container">
        <div className="home__title">Google Finance</div>
        <div className="home__body">
          <div className="home__list">
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Ticker</StyledTableCell>
                    <StyledTableCell align="right">Exchange</StyledTableCell>
                    <StyledTableCell align="right">Price</StyledTableCell>
                    <StyledTableCell align="right">Yield</StyledTableCell>
                    <StyledTableCell align="right">Change</StyledTableCell>
                    <StyledTableCell align="right">Dividend</StyledTableCell>
                    <StyledTableCell align="right">
                      Change percentge
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      Last trade timenge
                    </StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tickers?.map((elem) => (
                    <StyledTableRow key={elem.ticker}>
                      <StyledTableCell component="th" scope="row">
                        {elem.ticker}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {elem.exchange}
                      </StyledTableCell>

                      {elem.className === true ? (
                        <StyledTableCell align="right" style={{ color: 'red' }}>
                          {elem.price}$
                        </StyledTableCell>
                      ) : (
                        <StyledTableCell
                          align="right"
                          style={{ color: 'green' }}
                        >
                          {elem.price}$
                        </StyledTableCell>
                      )}
                      <StyledTableCell align="right">
                        {elem.yield}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {elem.change}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {elem.dividend}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {elem.change_percent}%
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {elem.last_trade_time}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>

          <Switch defaultChecked value={checked} onChange={handleClick} />
        </div>
      </div>
    </div>
  );
};
