import styled from 'styled-components';
import { Transition } from 'react-transition-group';
import useFetchData from '../../hooks/useFetchData';
import Header from '../Header/Header';
import CurrencyConverter from '../CurrencyConverter/CurrencyConverter';
import MainRateChart from '../MainRateChart/MainRateChart';
import RateChartsCarousel from '../RateChartsCarousel/RateChartsCarousel';
import RateTrends from '../RateTrends/RateTrends';
import ExchangeVolumeCarousel from '../ExchangeVolumeCarousel/ExchangeVolumeCarousel';
import { ReactComponent as Spinner } from '../../icons/spinner.svg';
import { ReactComponent as ErrorImg } from '../../icons/error.svg';
import Footer from '../Footer/Footer';
const GeneralWrapper = styled.div`
min-height: 100vh;
overflow-x: hidden;
z-index: 1000;
display: flex;
flex-direction: column;
padding-top: 80px;
background-color: rgb(30, 30, 30);
@media (max-width: 767px) {
  padding-top: 0px;
}
`
const FirstSectionWrapper = styled.div`
position: relative;
display: flex;
justify-content: center;
@media (max-width: 767px) {
  margin: 0 auto;
  width: 400px;
  flex-direction: column
};
@media (max-width: 424px) {
  width: 300px;
}
`
const ErrorText = styled.div`
text-align: center;
font-family: 'Play', sans-serif;
color: rgb(217, 69, 86);
font-size: 32px;
@media (max-width: 1439px) {
  font-size: 28px;
};
@media (max-width: 1023px) {
  font-size: 24px;
};
@media (max-width: 767px) {
  font-size: 18px;
};
@media (max-width: 424px) {
  font-size: 14px;
}
`
const App = () => {
  const { fetchingStatus } = useFetchData();
  const defaultStyle = {
    transition: 'all 400ms ease-in-out',
    opacity: 0,
  }
  const transitionStyles = {
    entering: { opacity: 0, },
    entered: { opacity: 1 },
    exiting: { opacity: 0 },
    exited: { opacity: 1 },
  };
  const content = fetchingStatus === 'ok' ?
    <>
      <FirstSectionWrapper>
        <Header />
        <CurrencyConverter />
        <MainRateChart />
      </FirstSectionWrapper>
      <RateTrends firstAnimation={false} loopStartPoint={16} />
      <RateChartsCarousel />
      <RateTrends firstAnimation={true} loopStartPoint={0} />
      <ExchangeVolumeCarousel />
      <Footer />
    </> : null;
  const error = fetchingStatus === 'error' ?
    <>
      <ErrorImg style={{ display: 'block', margin: '0 auto', width: '30%' }} />
      <ErrorText>check internet connection</ErrorText>
    </> : null;
  const spinner = !fetchingStatus ?
    <Spinner style={{ display: 'block', margin: '0 auto', width: '30%' }} /> :
    null;
  return (
    <GeneralWrapper style={{ justifyContent: fetchingStatus === 'ok' ? 'start' : 'center' }}>
      {content ?
        < Transition timeout={200} in appear >
          {state => (
            <div
              style={{
                ...defaultStyle,
                ...transitionStyles[state]
              }}>
              {content}
            </div>
          )}
        </Transition > : error || spinner
      }
    </GeneralWrapper >
  );
}
export default App;
