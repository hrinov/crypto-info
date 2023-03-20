import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Transition } from 'react-transition-group';
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';
import { useSwipeable } from 'react-swipeable';
import '../../fonts/fonts.css';
import ArrowLeft from '../Arrows/ArrowLeft';
import ArrowRight from '../Arrows/ArrowRight';
const GeneralWrapper = styled.div`
position: relative;
margin: 0 auto;
display: flex;
justify-content: center;
align-items: center;
width: 952px;
@media (max-width: 1439px) {
  width: 824px;
};
@media (max-width: 1023px) {
  width: 623px;
};
@media (max-width: 767px) {
  width: 400px;
};
@media (max-width: 424px) {
  width: 300px;
}
`
const DescotopCardSet = styled.div`
display: flex;
flex-direction: row;
@media (max-width: 767px) {
display: none;
};
`
const MobileCardSet = styled.div`
display: none;
flex-direction: row;
@media (max-width: 767px) {
display: flex
}
`
const CardWrapper = styled.div`
width: 334px;
display: flex;
justify-content: center;
align-items: center;
@media (max-width: 1439px) {
  width: 287px;
};
@media (max-width: 1023px) {
  width: 212px;
};
@media (max-width: 767px) {
  width: 430px;
};
@media (max-width: 424px) {
  width: 322px;
}
`
const Card = styled.div`
overflow: hidden;
position: relative;
display: flex;
flex-direction: row;
padding-top: 10px;
width: 284px;
height: 183px;
background: ${props => props.colorSet};
box-shadow: -4px -4px 10px rgba(51, 81, 102, 0.5), 3px 3px 4px rgba(0, 0, 0, 0.1), 10px 10px 15px rgba(0, 0, 0, 0.4);
border-radius: 18px;
@media (max-width: 1439px) {
  padding-top: 9px;
  width: 244px;
  height: 157px;
};
@media (max-width: 1023px) {
  padding-top: 6px;
  width: 187px;
  height: 122px;
};
@media (max-width: 767px) {
  width: 400px;
  height: 217px;
};
@media (max-width: 424px) {
  width: 300px;
  height: 190px;
}
`
const CurveHolder = styled.div`
margin-top: 15px;
height: 105px;
width: 168px;
@media (max-width: 1439px) {
  margin-top: 13px;
  height: 90px;
  width: 144px;
};
@media (max-width: 1023px) {
  margin-top: 10px;
  height: 64px;
  width: 102px;
};
@media (max-width: 767px) {
  margin-top: 18px;
  height: 128px;
  width: 204px;
};
@media (max-width: 424px) {
  margin-top: 18px;
  height: 98px;
  width: 174px;
}
`
const AxisX = styled.div`
height: 2px;
width: 185px;
background-color: rgba(250, 250, 250, 0.7);
@media (max-width: 1439px) {
  width: 159px;
};
@media (max-width: 1023px) {
  width: 123px;
};
@media (max-width: 767px) {
  width: 215px;
}
`
const AxisY = styled.div`
position: absolute;
height: 105px;
width: 2px;
background-color: rgba(250, 250, 250, 0.7);
@media (max-width: 1439px) {
  height: 90px;
};
@media (max-width: 1023px) {
  height: 64px;
};
@media (max-width: 767px) {
  height: 128px;
};
@media (max-width: 424px) {
  height: 110px;
}
`
const TextHolder = styled.div`
padding: 0px 5px 5px 15px;
width: 100px;
display: flex;
flex-direction: column;
text-align: left;
font-family: 'Play', sans-serif;
color: rgba(250, 250, 250, 0.8);
text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.4), 2px 2px 2px rgba(0, 0, 0, 0.2);
@media (max-width: 1439px) {
  height: 157px;
  padding: 0px 4px 4px 13px;
  width: 86px;
};
@media (max-width: 1023px) {
  height: 122px;
  padding: 0px 4px 4px 13px;
  width: 79px;
};
@media (max-width: 767px) {
  height: 223px;
  padding: 0px 6px 6px 35px;
  width: 125px;
};
@media (max-width: 424px) {
  height: 167px;
  padding: 0px 6px 6px 30px;
  width: 100px;
}
`
const FirstTextBlock = styled.div`
font-size: 22px;
text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.4), 2px 2px 2px rgba(0, 0, 0, 0.2);
@media (max-width: 1439px) {
  font-size: 21px;
};
@media (max-width: 1023px) {
  font-size: 18px;
};
@media (max-width: 767px) {
  font-size: 27px;
};
@media (max-width: 424px) {
  font-size: 20px;
}
`
const SecondTextBlock = styled.div`
margin-top: 18px;
font-size: 14px;
text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.4), 2px 2px 2px rgba(0, 0, 0, 0.2);
@media (max-width: 1439px) {
  margin-top: 11px;
  font-size: 12px;
};
@media (max-width: 1023px) {
  margin-top: 4px;
  font-size: 11px;
};
@media (max-width: 767px) {
  margin-top: 17px;
  font-size: 17px;
};
@media (max-width: 424px) {
  font-size: 16px;
}
`
const ThirdTextBlock = styled.div`
position: relative;
margin-left: 15px;
font-size: 12px;
font-family: 'Play', sans-serif;
font-style: italic;
color: rgba(250, 250, 250, 0.8);
text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.4), 2px 2px 2px rgba(0, 0, 0, 0.2);
span{
      position: absolute;
      top: 14px;
      left: 85px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-family: 'Orbitron', sans-serif;
      font-style: normal;
      font-size: 16px;
      letter-spacing: 0.1rem;
  }
@media (max-width: 1439px) {
  margin-left: 13px;
  span{
    top: 13px;
    left: 74px;}
};
@media (max-width: 1023px) {
  margin-left: 12px;
  font-size: 10px;
  span{
    font-size: 12px;
    top: 13px;
    left: 68px;}
};
@media (max-width: 767px) {
  margin-left: 35px;
  font-size: 15px;
  span{
    font-size: 19px;
    top: 17px;
    left: 92px;}
};
@media (max-width: 424px) {
  margin-left: 30px;
  font-size: 14px;
  span{
    top: 16px;
    left: 70px;}
}
`
const FoggingPart = styled.div`
display: flex;
align-items: center;
position: absolute;
box-shadow: -4px -3px 10px rgba(255, 255, 255, 0.4), 3px 3px 4px rgba(0, 0, 0, 0.3);
width: 103%;
height: 50px;
top: 132px;
@media (max-width: 1439px) {
  height: 43px;
  top: 114px;
};
@media (max-width: 1023px) {
  height: 40px;
  top: 82px;
};
@media (max-width: 767px) {
  height: 62px;
  top: 154px;
};
@media (max-width: 424px) {
  height: 55px;
  top: 135px;
}
`
const CardBlock = (props) => {
  return (
    <CardWrapper
      style={{ ...props.style }}>
      <Card colorSet={props.colorSet}>
        <TextHolder>
          <FirstTextBlock>{props.symbol}</FirstTextBlock>
          <SecondTextBlock>24h <br /> PRICE</SecondTextBlock>
        </TextHolder>
        <FoggingPart>
          <ThirdTextBlock>
            CURRENT
            <br />
            PRICE
            <span>{`${Number(props.currentRate).toFixed(2)}$`}</span>
          </ThirdTextBlock>
        </FoggingPart>
        <CurveHolder >
          <AxisY />
          <svg overflow="visible"
            viewBox="0 0 160 100"
            style={{
              position: 'relative',
              zIndex: '100',
              transform: 'translate(1px, 1px)'
            }}>
            <linearGradient id={props.mobile ? 'volume-chart-linear-gradient-mobile' : 'volume-chart-linear-gradient'} x1="1" y1="0" x2="1" y2="1" >
              <stop offset="50%" stopColor="rgba(225, 225, 225, 1)" />
              <stop offset="100%" stopColor="rgba(225, 225, 225, 0)" />
            </linearGradient> :
            <polyline
              fill={props.mobile ?
                'url(#volume-chart-linear-gradient-mobile)' :
                'url(#volume-chart-linear-gradient)'}
              stroke="none"
              strokeWidth="0"
              points={props.coordinates}
            />
          </svg>
          <AxisX />
        </CurveHolder>
      </Card >
    </CardWrapper>
  )
}
const RateChartsCarousel = () => {
  const [scrollType, setScrollType] = useState();
  const [elementsData, setElementsData] = useState();
  const currencyList = useSelector(state => state.slice.currencyList);
  const twentyFourHoursData = useSelector(state => state.slice.twentyFourHoursData);
  const firstColorSet = 'radial-gradient(74.05% 80.47% at 0% 100%, rgba(24, 38, 48, 0.3) 0%, rgba(24, 38, 48, 0) 100%), linear-gradient(0deg, rgba(98, 126, 234, 0.6), rgba(98, 126, 234, 0.6)), #182630';
  const secondColorSet = 'radial-gradient(47.16% 91.71% at 2.84% 100%, rgba(24, 38, 48, 0.3) 0%, rgba(24, 38, 48, 0) 100%), linear-gradient(0deg, rgba(255, 148, 22, 0.8), rgba(255, 148, 22, 0.8)), #182630';
  const thirdColorSet = 'radial-gradient(50% 106.03% at 0% 100%, rgba(24, 38, 48, 0.3) 0%, rgba(0, 0, 0, 0) 100%), linear-gradient(0deg, rgba(121, 98, 234, 0.6), rgba(121, 98, 234, 0.6)), #182630';
  const forthColorSet = 'radial-gradient(52.69% 104.24% at 0% 100%, rgba(24, 38, 48, 0.3) 0%, rgba(24, 38, 48, 0) 100%), linear-gradient(0deg, rgba(255, 120, 31, 0.8), rgba(255, 120, 31, 0.8)), #182630';
  const defaultStyle = {
    transition: 'all 500ms',
  }
  const getTransitionData = (direction = 'right') => {
    return [
      {
        entering: {
          opacity: direction === 'right' ?
            1 : 0,
          transform: direction === 'right' ?
            'translateX(100%)' : 'translateX(-100%)'
        },
        entered: {
          opacity: 0,
          transform: 'translateX(0%)'
        }
      },
      {
        entering: {
          opacity: direction === 'right' ?
            1 : 0,
          transform: direction === 'right' ?
            'translateX(100%)' : 'translateX(-100%)'
        },
        entered: {
          opacity: 1,
          transform: 'translateX(0%)'
        }
      },
      {
        entering: {
          transform: direction === 'right' ?
            'translateX(100%)' : 'translateX(-100%)'
        },
        entered: {
          transform: 'translateX(0%)'
        }
      },
      {
        entering: {
          transform: direction === 'right' ?
            'translateX(100%)' : 'translateX(-100%)'
        },
        entered: {
          transform: 'translateX(0%)'
        }
      },
      {
        entering: {
          opacity: direction === 'right' ?
            0 : 1,
          transform: direction === 'right' ?
            'translateX(100%)' : 'translateX(-100%)'
        },
        entered: {
          opacity: 0,
          transform: 'translateX(0%)'
        }
      }
    ];
  }
  const getChart = (rate) => {
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
      if (historySortedByPrice[23] === unsortedElement.price) {
        higherPriceElement = oldIndex;
      }
    })
    gapBetweenPrices = rate[higherPriceElement].price - rate[lowerPriceElement].price;
    rate.forEach((unsortedElement, index) => {
      coordinates.push(
        `${(160 / 23) * (index)} ${100 - ((unsortedElement.price - rate[lowerPriceElement].price) * (100 / gapBetweenPrices))}`
      );
    });
    coordinates.push(`${160}, ${100}  0, ${100}`);
    return coordinates;
  }
  const getElements = (transitionState, mobile) => {
    const cards = [];
    let j = 0;
    for (let i = 0; i < 5; i++) {
      const coordinates = getChart(elementsData.rates[i])
      if (!mobile || i < 3) {
        if (mobile && j === 2) { j = 4 }
        cards.push(
          <CardBlock
            mobile={mobile}
            key={`chart-${i}`}
            colorSet={elementsData.colorSet[i]}
            coordinates={coordinates}
            symbol={elementsData.currencySymbol[i]}
            currentRate={elementsData.rates[i][23].price}
            style={{
              ...defaultStyle,
              ...getTransitionData(scrollType?.direction)[j][transitionState]
            }
            } />
        )
      }
      j++
    }
    return cards
  }
  const getElementsData = (direction) => {
    let data = {
      firstIndex: '',
      lastIndex: '',
      rates: [],
      currencySymbol: [],
      colorSet: []
    };
    let newfirstIndex;
    let newlastIndex;
    let colorSet = [];
    for (let i = 0; i < 8; i++) {
      colorSet.push(firstColorSet, secondColorSet, thirdColorSet, forthColorSet);
    }
    if (!elementsData) {
      newfirstIndex = 0;
      newlastIndex = 4;
      for (let i = newfirstIndex; i <= newlastIndex; i++) {
        data.rates.push(twentyFourHoursData[currencyList[i].id]);
        data.currencySymbol.push(currencyList[i].symbol);
        data.colorSet.push(colorSet[i]);
      }
    } else if (direction === 'right' ?
      elementsData.firstIndex === 29 :
      elementsData.lastIndex === 0) {
      newfirstIndex = direction === 'right' ?
        0 : 25;
      newlastIndex = direction === 'right' ?
        4 : 29;
      for (let i = newfirstIndex; i <= newlastIndex; i++) {
        data.rates.push(twentyFourHoursData[currencyList[i].id]);
        data.currencySymbol.push(currencyList[i].symbol);
        data.colorSet.push(colorSet[i]);
      }
    }
    else if (direction === 'right' ?
      elementsData.firstIndex + 1 <= 25 :
      elementsData.lastIndex - 1 >= 4) {
      newfirstIndex = direction === 'right' ?
        elementsData.firstIndex + 1 :
        elementsData.firstIndex - 1;
      newlastIndex = direction === 'right' ?
        elementsData.lastIndex + 1 :
        elementsData.lastIndex - 1;

      for (let i = newfirstIndex; i <= newlastIndex; i++) {
        data.rates.push(twentyFourHoursData[currencyList[i].id]);
        data.currencySymbol.push(currencyList[i].symbol);
        data.colorSet.push(colorSet[i]);
      }
    }
    else {
      direction === 'right' ?
        newfirstIndex = elementsData.firstIndex + 1 :
        newlastIndex = elementsData.lastIndex - 1;
      direction === 'right' ?
        newlastIndex = 4 - (29 - (newfirstIndex - 1)) :
        newfirstIndex = 29 - (4 - (newlastIndex + 1));
      for (let i = newfirstIndex; i <= 29; i++) {
        data.rates.push(twentyFourHoursData[currencyList[i].id]);
        data.currencySymbol.push(currencyList[i].symbol);
        data.colorSet.push(colorSet[i]);
      }
      for (let i = 0; i <= newlastIndex; i++) {
        data.rates.push(twentyFourHoursData[currencyList[i].id]);
        data.currencySymbol.push(currencyList[i].symbol);
        data.colorSet.push(colorSet[i]);
      }
    }
    data.firstIndex = newfirstIndex;
    data.lastIndex = newlastIndex;
    setElementsData(elementsData => data)
  }
  const swipeHandler = useSwipeable({
    onSwipedLeft: () => scroll('right'),
    onSwipedRight: () => scroll('left')
  });

  const scroll = (direction) => {
    getElementsData(direction);
    if (direction) { setScrollType({ direction: direction }) }
  }
  useEffect(() => {
    scroll()
  }, []);
  return (
    <GeneralWrapper {...swipeHandler}>
      <ArrowLeft width='50px' scroll={scroll} />
      <DescotopCardSet>
        {elementsData ?
          <Transition timeout={50} key={uuidv4()} in appear={scrollType ? true : false}>
            {transitionState => (getElements(transitionState))}
          </Transition >
          : null}
      </DescotopCardSet>
      <MobileCardSet>
        {elementsData ?
          <Transition timeout={50} key={uuidv4()} in appear={scrollType ? true : false}>
            {transitionState => (getElements(transitionState, true))}
          </Transition >
          : null}
      </MobileCardSet>
      <ArrowRight color='rgba(255, 255, 255, 0.7)' scroll={scroll} />
    </GeneralWrapper >
  )
}
export default RateChartsCarousel;
