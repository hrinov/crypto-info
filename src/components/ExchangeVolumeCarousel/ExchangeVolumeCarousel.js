import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useSwipeable } from 'react-swipeable';
import { Transition } from 'react-transition-group';
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';
import ArrowLeft from '../Arrows/ArrowLeft';
import ArrowRight from '../Arrows/ArrowRight';
import { ReactComponent as BinanceLogo } from '../../icons/binance.svg';
import '../../fonts/fonts.css';
const GeneralWrapper = styled.div`
position: relative;
margin: 0 auto 50px auto;
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
  margin: 0 auto 40px auto;
  width: 400px;
};
@media (max-width: 424px) {
  width: 300px;
}
`
const DescotopCardSet = styled.div`
display: flex;
@media (max-width: 767px) {
display: none;
}
`
const MobileCardSet = styled.div`
display: none;
flex-direction: row;
@media (max-width: 767px) {
display: flex;
}
`
const CardWrapper = styled.div`
width: 334px;
display: flex;
justify-content: center;
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
background: radial-gradient(50.11% 174.69% at 100% 0%, rgba(${props => props.shadowColor}, 0.3) 0%, rgba(0, 0, 0, 0) 100%);
box-shadow: -4px -4px 10px rgba(51, 81, 102, 0.5), 3px 3px 4px rgba(0, 0, 0, 0.1), 10px 10px 15px rgba(0, 0, 0, 0.4);
border-radius: 18px;
@media (max-width: 1439px) {
  padding-top: 9px;
  width: 244px;
  height: 158px;
};
@media (max-width: 1023px) {
  padding-top: 6px;
  width: 187px;
  height: 133px;
};
@media (max-width: 767px) {
  padding-top: 12px;
  width: 400px;
  height: 217px;
};
@media (max-width: 424px) {
  width: 300px;
  height: 206px;
}
`
const ScaleHolder = styled.div`
display: flex;
align-items: center;
justify-content: center;
width: 110px;
height: 110px;
border-radius: 100%;
box-shadow: -4px -4px 5px rgba(51, 81, 102, 0.5), 3px 3px 4px rgba(0, 0, 0, 0.1), 10px 10px 15px rgba(0, 0, 0, 0.4), 0 0 0 10px rgba(255, 255, 255, 0.2) inset;
&::after {
  content: "";
  transform: rotate(45deg);
  position: absolute;
  width: 110px;
  height: 110px;
  border: 10px solid rgb(${props => props.scaleColor});
  border-radius: 50%;
  clip-path: polygon(${props => props.polygon.a});
  box-shadow: 0 0 6px 6px rgba(${props => props.scaleColor}, 0.4) inset;
}
&::before {
  content: "";
  transform: rotate(45deg);
  position: absolute;
  width: 110px;
  height: 110px;
  border: 10px solid rgb(${props => props.scaleColor});
  border-radius: 50%;
  clip-path: polygon(${props => props.polygon.b});
  box-shadow: 0 0 6px 6px rgba(${props => props.scaleColor}, 0.4) inset;
}
@media (max-width: 1439px) {
  width: 94px;
  height: 94px;
  &::after {
    width: 94px;
    height: 94px;
    border: 9px solid rgb(${props => props.scaleColor});
  };
  &::before {
    width: 94px;
    height: 94px;
    border: 9px solid rgb(${props => props.scaleColor});
  };
}
@media (max-width: 1023px) {
  margin-top: 3px;
  width: 73px;
  height: 73px;
  box-shadow: -4px -4px 5px rgba(51, 81, 102, 0.5), 3px 3px 4px rgba(0, 0, 0, 0.1), 10px 10px 15px rgba(0, 0, 0, 0.4), 0 0 0 7px rgba(255, 255, 255, 0.2) inset;
  &::after {
    width: 73px;
    height: 73px;
    border: 7px solid rgb(${props => props.scaleColor});
  };
  &::before {
    width: 68px;
    height: 68px;
    border: 7px solid rgb(${props => props.scaleColor});
  }
};
@media (max-width: 767px) {
  margin-top: 2px;
  width: 125px;
  height: 125px;
  box-shadow: -4px -4px 5px rgba(51, 81, 102, 0.5), 3px 3px 4px rgba(0, 0, 0, 0.1), 10px 10px 15px rgba(0, 0, 0, 0.4), 0 0 0 12px rgba(255, 255, 255, 0.2) inset;
  &::after {
    width: 125px;
    height: 125px;
    border: 12px solid rgb(${props => props.scaleColor});
  };
  &::before {
    width: 125px;
    height: 125px;
    border: 12px solid rgb(${props => props.scaleColor});
  };
  @media (max-width: 424px) {
  width: 110px;
  height: 110px;
  &::after {
    width: 110px;
    height: 110px;
  };
  &::before {
    width: 110px;
    height: 110px;
  };
};
}
`
const CurrentVolume = styled.div`
position: absolute;
color: rgba(250, 250, 250, 0.8);
font-family: 'Play', sans-serif;
font-size: 17px;
text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7), 2px 2px 2px rgba(0, 0, 0, 0.3);
@media (max-width: 1439px) {
  font-size: 16px;
};
@media (max-width: 1023px) {
  font-size: 13px;
};
@media (max-width: 767px) {
  font-size: 20px;
}
`
const TextHolder = styled.div`
position: relative;
padding: 0px 5px 5px 15px;
width: 150px;
display: flex;
flex-direction: column;
font-family: 'Play', sans-serif;
color: rgba(250, 250, 250, 0.8);
text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7), 2px 2px 2px rgba(0, 0, 0, 0.3);
@media (max-width: 1439px) {
  padding: 0px 4px 4px 13px;
  width: 129px;
};
@media (max-width: 1023px) {
  padding: 0px 4px 4px 13px;
  width: 103px;
};
@media (max-width: 767px) {
  height: 223px;
  padding: 0px 6px 6px 35px;
  width: 234px;
};
@media (max-width: 424px) {
  height: 223px;
  padding: 0px 6px 6px 30px;
  width: 165px;
}
`
const FirstTextBlock = styled.div`
font-size: 22px;
margin-bottom: 5px;
text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7), 2px 2px 2px rgba(0, 0, 0, 0.3);
@media (max-width: 1439px) {
  margin-bottom: 4px;
  font-size: 21px;
};
@media (max-width: 1023px) {
  margin-bottom: 2px;
  font-size: 18px;
};
@media (max-width: 767px) {
  font-size: 27px;
  margin-bottom: 10px;
};
@media (max-width: 424px) {
  font-size: 20px;
}
`
const SecondTextBlock = styled.div`
margin-top: 9px;
font-size: 14px;
text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7), 2px 2px 2px rgba(0, 0, 0, 0.3);
@media (max-width: 1439px) {
  margin-top: 7px;
  font-size: 12px;
};
@media (max-width: 1023px) {
  margin-top: 5px;
  font-size: 11px;
};
@media (max-width: 767px) {
  margin-top: 10px;
  font-size: 17px;
}
`
const ThirdTextBlock = styled.div`
position: relative;
height: 100%;
display: flex;
align-items: center;
margin-left: 15px;
font-size: 12px;
font-style: italic;
font-family: 'Play', sans-serif;
color: rgba(250, 250, 250, 0.8);
text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7), 2px 2px 2px rgba(0, 0, 0, 0.3);
    span{
      position: absolute;
      top: 20px;
      left: 70px;
      font-family: 'Orbitron', sans-serif;
      font-size: 16px;
      font-style: normal;
      text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7), 2px 2px 2px rgba(0, 0, 0, 0.3)
  };
@media (max-width: 1439px) {
  margin-left: 13px;
  span{
      top: 17px;
      left: 57px;
      font-size: 16px;
  };
  @media (max-width: 1023px) {
    font-size: 10px;
  span{
      top: 18px;
      left: 47px;
      font-size: 12px;
  };
  }
};
@media (max-width: 767px) {
  margin-left: 35px;
  font-size: 15px;
  span{
    font-size: 19px;
    top: 26px;
    left: 90px;}
};
@media (max-width: 424px) {
  font-size: 14px;
  span{
    font-size: 19px;
    top: 22px;
    left: 70px;}
}
`
const FoggingPart = styled.div`
position: absolute;
box-shadow: -4px -4px 10px rgba(255,255, 255, 0.1), 4px 5px 10px rgba(0, 0, 0, 0.2);
width: 103%;
height: 50px;
top: 132px;
@media (max-width: 1439px) {
  height: 43px;
  top: 113px;
};
@media (max-width: 1023px) {
  height: 40px;
  top: 92px;
};
@media (max-width: 767px) {
  height: 62px;
  top: 155px;
};
@media (max-width: 424px) {
  height: 55px;
  top: 150px;
}
`
const CardBlock = (props) => {
  return (
    <CardWrapper
      style={{ ...props.style }}>
      <Card shadowColor={props.colorSet}>
        <TextHolder>
          <FirstTextBlock>{props.symbol}</FirstTextBlock>
          <BinanceLogo style={{ width: '73%' }} />
          <SecondTextBlock>DAILY MARKET SHARE</SecondTextBlock>
        </TextHolder>
        <FoggingPart>
          <ThirdTextBlock>
            24h<br />VOLUME
            <span>{`${props.volumeUsd24Hr}$`}</span>
          </ThirdTextBlock>
        </FoggingPart>
        <ScaleHolder
          polygon={props.polygon}
          scaleColor={props.colorSet}>
          <CurrentVolume>
            {`${props.percentExchangeVolume}%`}
          </CurrentVolume>
        </ScaleHolder>
      </Card >
    </CardWrapper>
  )
}
const ExchangeVolumeCarousel = () => {
  const [scrollType, setScrollType] = useState();
  const [elementsData, setElementsData] = useState();
  const currencyList = useSelector(state => state.slice.currencyList);
  const binanceExchangeVolume = useSelector(state => state.slice.binanceExchangeVolume);
  const firstColorSet = '98, 126, 234';
  const secondColorSet = '191, 98, 234';
  const thirdColorSet = '0, 216, 206';
  const forthColorSet = '255, 106, 22';
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
          opacity: direction === 'right' ?
            1 : 1,
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
          opacity: direction === 'right' ?
            0 : 0,
          transform: 'translateX(0%)'
        }
      }
    ];
  }
  const getScale = (volume) => {
    let data = []
    if (volume >= 0 && volume < 25) {
      data.push(100 - (volume * 4), 100, 0, 0, 100, 0);
    }
    if (volume >= 25 && volume < 50) {
      data.push(0, 100 - ((volume - 25) * 4), 0, 0, 100, 0);
    }
    if (volume >= 50 && volume < 75) {
      data.push(0, 0, (volume - 50) * 4, 0, 100, 0);
    }
    if (volume >= 75) {
      data.push(0, 0, 0, 0, (volume - 75) * 4, 100);
    }
    return ({
      a: `${data[0]}% ${data[1]}%, 50% 50%, 100% 100%, 0% 100%`,
      b: `${data[2]}% ${data[3]}%, 50% 50%, 100% ${data[4]}%, ${data[5]}% 0%`
    })
  }
  const getElements = (transitionState, mobile) => {
    const cards = [];
    let j = 0;
    for (let i = 0; i < 5; i++) {
      const polygon = getScale(elementsData.percentExchangeVolume[i]);
      if (!mobile || i < 3) {
        if (mobile && j === 2) { j = 4 }
        cards.push(
          <CardBlock
            key={`chart-${i}`}
            colorSet={elementsData.colorSet[i]}
            polygon={polygon}
            symbol={elementsData.currencySymbol[i]}
            percentExchangeVolume={Number(elementsData.percentExchangeVolume[i]).toFixed(2)}
            volumeUsd24Hr={Number(elementsData.volumeUsd24Hr[i]).toFixed(0)}
            style={{
              ...defaultStyle,
              ...getTransitionData(scrollType?.direction)[j][transitionState]
            }} />
        );
      }
      j++
    }
    return cards
  }
  const getElementsData = (direction) => {
    let data = {
      firstIndex: '',
      lastIndex: '',
      percentExchangeVolume: [],
      volumeUsd24Hr: [],
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
        data.percentExchangeVolume.push(binanceExchangeVolume[i].percentExchangeVolume);
        data.volumeUsd24Hr.push(binanceExchangeVolume[i].volumeUsd24Hr);
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
        data.percentExchangeVolume.push(binanceExchangeVolume[i].percentExchangeVolume);
        data.volumeUsd24Hr.push(binanceExchangeVolume[i].volumeUsd24Hr);
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
        data.percentExchangeVolume.push(binanceExchangeVolume[i].percentExchangeVolume);
        data.volumeUsd24Hr.push(binanceExchangeVolume[i].volumeUsd24Hr);
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
        data.percentExchangeVolume.push(binanceExchangeVolume[i].percentExchangeVolume);
        data.volumeUsd24Hr.push(binanceExchangeVolume[i].volumeUsd24Hr);
        data.currencySymbol.push(currencyList[i].symbol);
        data.colorSet.push(colorSet[i]);
      }
      for (let i = 0; i <= newlastIndex; i++) {
        data.percentExchangeVolume.push(binanceExchangeVolume[i].percentExchangeVolume);
        data.volumeUsd24Hr.push(binanceExchangeVolume[i].volumeUsd24Hr);
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
    getElementsData(direction)
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
export default ExchangeVolumeCarousel;
