import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import store from '../store';
import {
  addCurrencyList,
  addCurrentRates,
  addBinanceExchangeVolume,
  addTwentyFourHoursData,
  addOneMonthData
} from '../components/App/AppSlice';
const useFetchData = () => {
  const [fetchingStatus, setFetchingStatus] = useState(false);
  const dispatch = useDispatch();
  store.subscribe(() => {
    const {
      currencyList,
      currentRates,
      twentyFourHoursData,
      oneMonthData,
      binanceExchangeVolume
    } = store.getState().slice;
    if (
      currencyList &&
      currentRates &&
      twentyFourHoursData &&
      oneMonthData &&
      binanceExchangeVolume
    ) {
      setFetchingStatus('ok');
    }
  })
  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();
    if (month < 10) {
      month = '0' + month;
    }
    if (day < 10) {
      day = '0' + day;
    }
    return year + '.' + month + '.' + day;
  }
  const dateConverter = (dateInfo) => {
    return dateInfo.slice(0, 10).replace(/-/g, '.')
  }
  const fetchData = async () => {
    const currentRates = await fetch(`https://api.coincap.io/v2/assets`)
      .then((result) => { return result.json() })
      .then((result) => {
        let currencyList = [];
        let currentRates = [];
        result.data.forEach((element, i) => {
          if (i <= 31) {
            currencyList.push({ id: element.id, symbol: element.symbol })
          }
        });
        result.data.forEach((element, i) => {
          if (i <= 31) {
            currentRates.push(element)
          }
        });
        dispatch(addCurrencyList(currencyList));
        dispatch(addCurrentRates(currentRates));
        return currentRates
      })
      .catch(() => {
        setFetchingStatus('error');
      });
    fetch(`https://api.coincap.io/v2/markets?exchangeId=binance`)
      .then((result) => { return result.json() })
      .then((result) => {
        let binanceExchangeVolume = [];
        result.data.forEach((element, i) => {
          if (i <= 31) {
            binanceExchangeVolume.push(element)
          }
        })
        dispatch(addBinanceExchangeVolume(binanceExchangeVolume))
      })
      .catch(() => {
        setFetchingStatus('error');
      });
    const fetchHistory = (period) => {
      const promises = currentRates.map((element) => {
        return fetch(`https://api.coincap.io/v2/assets/${element.id}/history?interval=${period}`)
          .then((result) => { return result.json() })
          .then((result) => {
            const todayRate =
            {
              date: getTodayDate(),
              price: element.priceUsd
            }
            let rateHistory = [];
            for (let i = (period === 'd1' ? 28 : 22); i >= 0; i--) {
              rateHistory.push(
                {
                  date: dateConverter(result.data[(result.data.length - 1) - i].date),
                  price: result.data[(result.data.length - 2) - i].priceUsd
                }
              )
            }
            rateHistory.push(todayRate);
            return { id: element.id, data: rateHistory };
          })
          .catch(() => {
            setFetchingStatus('error');
          });
      });
      Promise.all(promises)
        .then((results) => {
          const history = {};
          results.forEach((result) => {
            history[result.id] = result.data;
          });
          if (period === 'd1') {
            dispatch(addOneMonthData(history));
          }
          if (period === 'h1') {
            dispatch(addTwentyFourHoursData(history));
          }
        })
    }
    fetchHistory('d1');
    fetchHistory('h1');
  }
  useEffect(() => {
    if (!fetchingStatus) {
      fetchData();
    }
  }, [])
  return { fetchingStatus }
}
export default useFetchData;
