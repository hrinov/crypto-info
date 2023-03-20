import { useState, useEffect, Fragment } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import useGetDropdownElements from '../../hooks/useGetDropdownElements';
import { TransitionGroup, SwitchTransition, Transition } from 'react-transition-group';
import '../../fonts/fonts.css';
const ChartBlock = styled.div`
position: relative;
z-index: 1000;
margin-top: 40px;
padding-top: 30px;
width: 600px;
height: 300px;
background: radial-gradient(88.82% 114.41% at 49.93% 97.82%, rgba(0, 176, 206, 0.25) 0%, rgba(0, 111, 130, 0.175) 56.77%, rgba(0, 0, 0, 0) 100%), #182630;
box-shadow: -4px -4px 10px rgba(51, 81, 102, 0.5), 3px 3px 4px rgba(0, 0, 0, 0.1), 10px 10px 15px rgba(0, 0, 0, 0.4);
border-radius: 18px;
@media (max-width: 1023px) {
  margin-top: 30px;
  padding-top: 22px;
  width: 450px;
  height: 233px;
};
@media (max-width: 767px) {
  padding-top: 27px;
  width:400px;
  height: 222px;
  margin: 40px auto 0 auto;
};
@media (max-width: 424px) {
  padding-top: 27px;
  width:300px;
  height: 186px;
}
`
const CurveHolder = styled.div`
margin-left: 25px;
height: 200px;
width: 500px;
@media (max-width: 1023px) {
  margin-left: 18px;
  height: 150px;
  width: 375px;
};
@media (max-width: 767px) {
  height: 132px;
  width: 330px;
};
@media (max-width: 424px) {
  height: 99px;
  width: 247px;
}
`
const AxisX = styled.div`
margin: 0 auto;
height: 3px;
width: 550px;
background-color: white;
@media (max-width: 1023px) {
  height: 2px;
  width: 414px;
};
@media (max-width: 767px) {
  width: 364px;
};
@media (max-width: 424px) {
  width: 264px;
}
`
const AxisY = styled.div`
position: absolute;
height: 200px;
width: 3px;
background-color: white;
@media (max-width: 1023px) {
  height: 150px;
  width: 2px;
};
@media (max-width: 767px) {
  height: 133px;
};
@media (max-width: 424px) {
  height: 99px;
}
`
const CurrentRateHolder = styled.div`
position: absolute;
display: flex;
justify-content: center;
align-items: center;
width: 110px;
height: 33px;
left: 470px;
top:  251px;
background: rgba(30, 30, 30, 0.8);
border-radius: 30px;
color: rgba(255, 255, 255, 0.95);
font-size: 12px;
font-family: 'Orbitron', sans-serif;
box-shadow: -4px -4px 5px rgba(51, 81, 102, 0.1), 3px 3px 4px rgba(0, 0, 0, 0.1), 5px 5px 15px rgba(0, 0, 0, 0.4);
@media (max-width: 1023px) {
  font-size: 11px;
  width: 91px;
  height: 31px;
  left: 347px;
  top:  188px;
};
@media (max-width: 767px) {
  font-size: 11px;
  width: 90px;
  height: 38px;
  left: 300px;
  top:  173px;
};
@media (max-width: 424px) {
  width: 92px;
  left: 198px;
  top:  137px;
}
`
const DropdownList = styled.div`
z-index: 3000;
opacity: 97%;
position: absolute;
bottom: 15px;
left: 24px;
font-size: 10px;
font-family: 'Play', sans-serif;
border-radius: 7px;
box-shadow: -4px -4px 5px rgba(51, 81, 102, 0.1), 3px 3px 4px rgba(0, 0, 0, 0.1), 5px 5px 15px rgba(0, 0, 0, 0.4);
@media (max-width: 1023px) {
  bottom: 12px;
  left: 18px;
};
@media (max-width: 767px) {
  bottom: 11px;
};
`
const MainRateChart = () => {
  const [curveCoordinates, setCurveCoordinates] = useState();
  const [circleElements, setCircleElements] = useState();
  const [stripElements, setStripElements] = useState();
  const [btn, setBtn] = useState('bitcoin');
  const { dropdownElements, getDropdownElements } = useGetDropdownElements();
  const { oneMonthData } = useSelector(state => state.slice);
  const defaultStyle = {
    transition: 'all 400ms ease-in-out',
    opacity: 0
  }
  const transitionStyles = {
    entering: { opacity: 0, },
    entered: { opacity: 1 }
  };
  const btnController = (activeBtn) => {
    setBtn(activeBtn);
  }
  const getChart = () => {
    const curveCoordinates = getCurveCoordinates();
    getCircles(curveCoordinates);
    getStrips(curveCoordinates);
  }
  const getCurveCoordinates = () => {
    const rate = oneMonthData[btn];
    let gapBetweenPrices = '';
    let lowerPriceElement = '';
    let higherPriceElement = '';
    let historySortedByPrice = [];
    let coordinates = [];
    rate.forEach((unsortedElement) => {
      historySortedByPrice.push(unsortedElement.price);
    });
    historySortedByPrice.sort((a, b) => a - b);
    rate.forEach((unsortedElement, oldIndex) => {
      if (historySortedByPrice[0] === unsortedElement.price) {
        lowerPriceElement = oldIndex;
      }
      if (historySortedByPrice[29] === unsortedElement.price) {
        higherPriceElement = oldIndex;
      }
    })
    gapBetweenPrices = rate[higherPriceElement].price - rate[lowerPriceElement].price;
    rate.forEach((unsortedElement, index) => {
      coordinates.push(
        `${(100 / 29) * (index)}, ${40 - ((unsortedElement.price - rate[lowerPriceElement].price) * (40 / gapBetweenPrices))}`
      );
    });
    setCurveCoordinates(coordinates);
    return coordinates;
  }
  const getCircles = (curveCoordinates) => {
    const circles = [];
    curveCoordinates.forEach((element, index) => {
      const data = element.split(',');
      circles.push(
        index !== (curveCoordinates.length - 1) ?
          <circle key={uuidv4()} cx={data[0]} cy={data[1]} r={1.1} fill="rgb(0, 216, 206)" filter="drop-shadow(0px 0px 15px rgba(0, 176, 206, 0.6))" /> :
          <Fragment key={uuidv4()}>
            <circle cx={data[0]} cy={data[1]} r={1.9} fill="rgba(0, 176, 206, 0.5)" filter="drop-shadow(0px 0px 15px rgba(0, 176, 206, 1))" />
            <circle cx={data[0]} cy={data[1]} r={1.13} fill="white" filter="drop-shadow(0px 0px 15px rgba(0, 176, 206, 1))" />
            <circle cx={data[0]} cy={data[1]} r={2.4} fill="none" stroke="rgba(0, 176, 206, 0.8)" strokeWidth="0.25" strokeDasharray="0.3 0.3" />
          </Fragment>
      );
      setCircleElements(circles)
    });
  }
  const getStrips = (curveCoordinates) => {
    const strips = [];
    curveCoordinates.forEach((element, index) => {
      const coordinates = element.split(',');
      if (index !== 0) {
        strips.push(
          <line key={uuidv4()} x1={coordinates[0]} y1={coordinates[1].substring(1)} x2={coordinates[0]} y2={(index + 1) !== curveCoordinates.length ? 39.7 : 44} stroke="rgba(0, 176, 206, 1)" strokeWidth="0.2" strokeDasharray={(index + 1) !== curveCoordinates.length ? '0.3 1.4' : 'none'} />
        );
      }
      setStripElements(strips)
    });
  }
  useEffect(() => {
    if (oneMonthData && dropdownElements) {
      getChart();
    }
  }, [dropdownElements]);
  useEffect(() => {
    getDropdownElements(btn, btnController);
  }, [btn]);
  return (
    <ChartBlock>
      {(curveCoordinates && circleElements && stripElements) ?
        <>
          <CurveHolder>
            <AxisY />
            <TransitionGroup>
              <SwitchTransition >
                <Transition timeout={200} key={curveCoordinates} appear>
                  {state => (
                    <>
                      <svg
                        width='100%'
                        height='100%'
                        overflow='visible'
                        viewBox='0 0 100 40'
                        style={{
                          position: 'relative',
                          zIndex: '1000',
                          transform: 'translate(1px, 1px)',
                          ...defaultStyle,
                          ...transitionStyles[state]
                        }}>
                        <linearGradient id="price-chart-linear-gradient" x1="1" y1="0" x2="1" y2="1" >
                          <stop offset="0%" stopColor="rgba(0, 176, 206, 0.25)" />
                          <stop offset="100%" stopColor="rgba(0, 111, 130, 0.175)" />
                        </linearGradient>
                        {stripElements}
                        <polyline
                          fill="url(#price-chart-linear-gradient)"
                          filter="drop-shadow(0px 0px 15px rgba(0, 176, 206, 0.6))"
                          stroke="none"
                          strokeWidth="0"
                          points={`${curveCoordinates.join(" ")},  100, 40  0, 40`} />
                        <polyline
                          fill="none"
                          stroke="rgb(0, 176, 206)"
                          strokeWidth="0.7"
                          points={curveCoordinates.join(" ")} />
                        {circleElements}
                      </svg>
                    </>
                  )}
                </Transition>
              </SwitchTransition>
            </TransitionGroup>
          </CurveHolder>
          <AxisX />
          <DropdownList>
            {dropdownElements}
          </DropdownList>
          <CurrentRateHolder>
            <TransitionGroup>
              <SwitchTransition>
                <Transition timeout={200} key={btn}>
                  {state => (
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        ...defaultStyle,
                        ...transitionStyles[state]
                      }}>
                      {`${Number(oneMonthData[btn][29].price).toFixed(2)}$`}
                    </div>
                  )}
                </Transition>
              </SwitchTransition>
            </TransitionGroup>
          </CurrentRateHolder>
        </>
        :
        null
      }
    </ChartBlock >
  )
}
export default MainRateChart;
