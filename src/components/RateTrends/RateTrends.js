import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { addAnimationState } from '../App/AppSlice';
import { ReactComponent as Spinner } from '../../icons/spinner.svg';
import risingArrow from '../../icons/rising-arrow.svg';
import fallingArrow from '../../icons/falling-arrow.svg';
import { useSpring, a } from '@react-spring/web';
import { Transition } from 'react-transition-group';
import '../../fonts/fonts.css';
const GeneralWrapper = styled.div`
position: relative;
width: 950px;
height: 90px;
margin: 50px auto;
@media (max-width: 1023px) {
  width: 719px;
  height: 75px;
  margin: 45px auto;
};
@media (max-width: 767px) {
  width: 400px;
  height: 180px;
};
@media (max-width: 424px) {
  width: 300px;
}
`
const FirstCard = styled.div`
position: absolute;
`
const SecondCard = styled.div`
position: absolute;
left: 250px;
@media (max-width: 1023px) {
  left: 187px
};
@media (max-width: 767px) {
  left: 215px
};
@media (max-width: 424px) {
left: 162px
}
`
const ThirdCard = styled.div`
position: absolute;
left: 500px;
@media (max-width: 1023px) {
  left: 374px
};
@media (max-width: 767px) {
  left: 0px;
  top: 105px
}
`
const FourthCard = styled.div`
position: absolute;
left: 750px;
@media (max-width: 1023px) {
  left: 561px
};
@media (max-width: 767px) {
  left: 215px;
  top: 105px
};
@media (max-width: 424px) {
left: 162px
}
`
const CardBlock = styled.div`
display: flex;
justify-content: space-between;
padding-left: 15px;
padding-right: 15px;
width: 203px;
height: 90px;
background: radial-gradient(60% 174.69% at 0% 0%, rgba(${props => props.color}, 0.2) 0%, rgba(0, 0, 0, 0) 100%);
box-shadow: -4px -4px 10px rgba(51, 81, 122, 0.25), 3px 3px 4px rgba(0, 0, 0, 0.1), 10px 10px 15px rgba(0, 0, 0, 0.4);
border-radius: 18px;
@media (max-width: 1023px) {
  padding-left: 9px;
  padding-right: 9px;
  width: 157px;
  height: 75px;
};
@media (max-width: 767px) {
  padding-left: 13px;
  padding-right: 13px;
  width: 185px;
};
@media (max-width: 424px) {
  padding-left: 7px;
  padding-right: 7px;
  width: 138px;
}
`
const FirstTextBlock = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
width: 50px;
font-family: 'Play', sans-serif;
line-height: 1.9rem;
font-size: 19px;
color: rgba(250,250,250,0.8);
text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7), 2px 2px 2px rgba(0, 0, 0, 0.3);
@media (max-width: 1023px) {
  font-size: 15px;
  line-height: 1.5rem;
  span {
    font-size: 15px;
  }
};
@media (max-width: 767px) {
  width: 50px;
  font-size: 15px;
  span {
    font-size: 15px;
  }
};
`
const Arrow = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
width: 40px;
height: 100%;
span {
font-family: 'Play', sans-serif;
font-size: 12px;
font-style: italic;
color: rgb(${props => props.color});
filter: drop-shadow(0px 0px 5px rgba(${props => props.color}, 0.6));
}
@media (max-width: 1023px) {
  width: 40px;
  span {
    font-size: 11px;
  }
};
@media (max-width: 424px) {
  span {
    font-size: 12px;
  }
  width: 40px;
}
`
const SecondTextBlock = styled.div`
display: flex;
align-items: center;
height: 100%;
font-family: 'Play', sans-serif;
line-height: 0.95rem;
font-size: 14px;
color: rgba(250,250,250,0.8);
text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7), 2px 2px 2px rgba(0, 0, 0, 0.3);
@media (max-width: 1023px) {
  font-size: 13px;
};
@media (max-width: 424px) {
  font-size: 12px;
}
`
const RateTrends = (props) => {
  const { currentRates } = useSelector(state => state.slice);
  const [firstFlip, setFirstFlip] = useState(false);
  const [secondFlip, setSecondFlip] = useState(false);
  const [thirdFlip, setThirdFlip] = useState(false);
  const [fourthFlip, setFourthFlip] = useState(false);
  const [elementsData, setElementsData] = useState(null);
  const dispatch = useDispatch();
  const animationState = useSelector(state => state.slice.animationState)
  const defaultStyle = {
    transition: 'all 400ms ease-in-out',
    opacity: 0,
  }
  const transitionStyles = {
    entering: { opacity: 0, },
    entered: { opacity: 1 }
  };
  const firstAnimation = useSpring({
    opacity: firstFlip ? 1 : 0,
    transform: `rotateX(${firstFlip ? 180 : 0}deg)`,
    config: { mass: 10, tension: 500, friction: 90 },
  });
  const secondAnimation = useSpring({
    opacity: secondFlip ? 1 : 0,
    transform: `rotateX(${secondFlip ? 180 : 0}deg)`,
    config: { mass: 10, tension: 500, friction: 90 },
  });
  const thirdAnimation = useSpring({
    opacity: thirdFlip ? 1 : 0,
    transform: `rotateX(${thirdFlip ? 180 : 0}deg)`,
    config: { mass: 10, tension: 500, friction: 90 },
  });
  const fourthAnimation = useSpring({
    opacity: fourthFlip ? 1 : 0,
    transform: `rotateX(${fourthFlip ? 180 : 0}deg)`,
    config: { mass: 10, tension: 500, friction: 90 },
  });
  const changeElementsData = () => {
    const loopStartPoint = props.loopStartPoint;
    let data = [];
    if (!elementsData || elementsData[7].loopIndex === 4) {
      for (let i = 0; i < 8; i++) {
        data.push({
          arrow: currentRates[loopStartPoint + i].changePercent24Hr > 0 ? risingArrow : fallingArrow,
          color: currentRates[loopStartPoint + i].changePercent24Hr > 0 ? '0, 176, 206' : '255, 106, 22',
          symbol: currentRates[loopStartPoint + i].symbol,
          averagePrice: Number(currentRates[loopStartPoint + i].changePercent24Hr).toFixed(2)
        });
      }
      data.forEach(element => { element.loopIndex = 1 });
      setElementsData(data);
    } else if (fourthFlip && elementsData[7].loopIndex === 1) {
      for (let i = 0; i < 8; i++) {
        (i === 1 || i === 3 || i === 5 || i === 7) ? data.push(elementsData[i]) :
          data.push({
            arrow: currentRates[loopStartPoint + i + 8].changePercent24Hr > 0 ? risingArrow : fallingArrow,
            color: currentRates[loopStartPoint + i + 8].changePercent24Hr > 0 ? '0, 176, 206' : '255, 106, 22',
            symbol: currentRates[loopStartPoint + i + 8].symbol,
            averagePrice: Number(currentRates[loopStartPoint + i + 8].changePercent24Hr).toFixed(2)
          });
      }
      data.forEach(element => { element.loopIndex = 2 });
      setElementsData(data);
    } else if (!fourthFlip && elementsData[7].loopIndex === 2) {
      for (let i = 0; i < 8; i++) {
        (i === 0 || i === 2 || i === 4 || i === 6) ? data.push(elementsData[i]) :
          data.push({
            arrow: currentRates[loopStartPoint + i + 8].changePercent24Hr > 0 ? risingArrow : fallingArrow,
            color: currentRates[loopStartPoint + i + 8].changePercent24Hr > 0 ? '0, 176, 206' : '255, 106, 22',
            symbol: currentRates[loopStartPoint + i + 8].symbol,
            averagePrice: Number(currentRates[loopStartPoint + i + 8].changePercent24Hr).toFixed(2)
          });
      }
      data.forEach(element => { element.loopIndex = 3 });
      setElementsData(data);
    } else {
      for (let i = 0; i < 8; i++) {
        (i === 1 || i === 3 || i === 5 || i === 7) ? data.push(elementsData[i]) :
          data.push({
            arrow: currentRates[loopStartPoint + i].changePercent24Hr > 0 ? risingArrow : fallingArrow,
            color: currentRates[loopStartPoint + i].changePercent24Hr > 0 ? '0, 176, 206' : '255, 106, 22',
            symbol: currentRates[loopStartPoint + i].symbol,
            averagePrice: Number(currentRates[loopStartPoint + i].changePercent24Hr).toFixed(2)
          });
      }
      data.forEach(element => { element.loopIndex = 4 });
      setElementsData(data)
    }
  }
  const newFlip = () => {
    setTimeout(() => {
      new Promise((resolve) => {
        setFirstFlip((state) => !state);
        resolve();
      })
        .then(() => new Promise((resolve) => {
          setTimeout(() => {
            setSecondFlip((state) => !state);
            resolve();
          }, 250);
        }))
        .then(() => new Promise((resolve) => {
          setTimeout(() => {
            setThirdFlip((state) => !state);
            resolve();
          }, 250);
        }))
        .then(() => new Promise((resolve) => {
          setTimeout(() => {
            setFourthFlip((state) => !state);
            resolve();
            dispatch(addAnimationState(!animationState))
          }, 250);
        }));
    }, 5500);
  }
  useEffect(() => {
    changeElementsData()
    if (props.firstAnimation) { newFlip() }
  }, [])
  useEffect(() => {
    if (elementsData && animationState === (props.firstAnimation ? false : true)) { changeElementsData(); newFlip() };
  }, [animationState]);
  return (
    <GeneralWrapper>
      {elementsData ?
        <Transition timeout={50} in appear>
          {state => (
            <div style={{ ...defaultStyle, ...transitionStyles[state] }}>
              <FirstCard>
                <a.div
                  style={{
                    opacity: firstAnimation.opacity.to((opacity) => 1 - opacity),
                    transform: firstAnimation.transform,
                  }}>
                  <CardBlock
                    color={elementsData[0].color}
                  >
                    <FirstTextBlock>
                      {elementsData[0].symbol}
                      <span>{elementsData[0].averagePrice}</span>
                    </FirstTextBlock>
                    <Arrow
                      color={elementsData[0].color}
                      filter='drop-shadow(0px 0px 5px rgba(0, 206, 206, 0.6));'
                    >
                      <img src={elementsData[0].arrow} style={{ width: '100%' }}></img>
                      <span>24h</span>
                    </Arrow>
                    <SecondTextBlock>
                      Сhange
                      <br />
                      in the rate
                    </SecondTextBlock>
                  </CardBlock>
                </a.div>
              </FirstCard>
              <FirstCard>
                <a.div
                  style={{
                    opacity: firstAnimation.opacity.to((opacity) => opacity),
                    transform: firstAnimation.transform,
                    rotateX: "180deg"
                  }}
                >
                  <CardBlock
                    color={elementsData[1].color}
                  >
                    <FirstTextBlock>
                      {elementsData[1].symbol}
                      <span>{elementsData[1].averagePrice}</span>
                    </FirstTextBlock>
                    <Arrow
                      color={elementsData[1].color}
                      filter='drop-shadow(0px 0px 5px rgba(0, 206, 206, 0.6));'
                    >
                      <img src={elementsData[1].arrow} style={{ width: '100%' }}></img>
                      <span>24h</span>
                    </Arrow>
                    <SecondTextBlock>
                      Сhange
                      <br />
                      in the rate
                    </SecondTextBlock>
                  </CardBlock>
                </a.div>
              </FirstCard>
              <SecondCard>
                <a.div
                  style={{
                    opacity: secondAnimation.opacity.to((opacity) => 1 - opacity),
                    transform: secondAnimation.transform
                  }}>
                  <CardBlock
                    color={elementsData[2].color}
                  >
                    <FirstTextBlock>
                      {elementsData[2].symbol}
                      <span>{elementsData[2].averagePrice}</span>
                    </FirstTextBlock>
                    <Arrow
                      color={elementsData[2].color}
                      filter='drop-shadow(0px 0px 5px rgba(0, 206, 206, 0.6));'
                    >
                      <img src={elementsData[2].arrow} style={{ width: '100%' }}></img>
                      <span>24h</span>
                    </Arrow>
                    <SecondTextBlock>
                      Сhange
                      <br />
                      in the rate
                    </SecondTextBlock>
                  </CardBlock>
                </a.div>
              </SecondCard>
              <SecondCard>
                <a.div
                  style={{
                    opacity: secondAnimation.opacity.to((opacity) => opacity),
                    transform: secondAnimation.transform,
                    rotateX: "180deg"
                  }}
                >
                  <CardBlock
                    color={elementsData[3].color}
                  >
                    <FirstTextBlock>
                      {elementsData[3].symbol}
                      <span>{elementsData[3].averagePrice}</span>
                    </FirstTextBlock>
                    <Arrow
                      color={elementsData[3].color}
                      filter='drop-shadow(0px 0px 5px rgba(0, 206, 206, 0.6));'
                    >
                      <img src={elementsData[3].arrow} style={{ width: '100%' }}></img>
                      <span>24h</span>
                    </Arrow>
                    <SecondTextBlock>
                      Сhange
                      <br />
                      in the rate
                    </SecondTextBlock>
                  </CardBlock>
                </a.div>
              </SecondCard>
              <ThirdCard>
                <a.div
                  style={{
                    opacity: thirdAnimation.opacity.to((opacity) => 1 - opacity),
                    transform: thirdAnimation.transform
                  }}>
                  <CardBlock
                    color={elementsData[4].color}
                  >
                    <FirstTextBlock>
                      {elementsData[4].symbol}
                      <span>{elementsData[4].averagePrice}</span>
                    </FirstTextBlock>
                    <Arrow
                      color={elementsData[4].color}
                      filter='drop-shadow(0px 0px 5px rgba(0, 206, 206, 0.6));'
                    >
                      <img src={elementsData[4].arrow} style={{ width: '100%' }}></img>
                      <span>24h</span>
                    </Arrow>
                    <SecondTextBlock>
                      Сhange
                      <br />
                      in the rate
                    </SecondTextBlock>
                  </CardBlock>
                </a.div>
              </ThirdCard>
              <ThirdCard>
                <a.div
                  style={{
                    opacity: thirdAnimation.opacity.to((opacity) => opacity),
                    transform: thirdAnimation.transform,
                    rotateX: "180deg"
                  }}
                >
                  <CardBlock
                    color={elementsData[5].color}
                  >
                    <FirstTextBlock>
                      {elementsData[5].symbol}
                      <span>{elementsData[5].averagePrice}</span>
                    </FirstTextBlock>
                    <Arrow
                      color={elementsData[5].color}
                      filter='drop-shadow(0px 0px 5px rgba(0, 206, 206, 0.6));'
                    >
                      <img src={elementsData[5].arrow} style={{ width: '100%' }}></img>
                      <span>24h</span>
                    </Arrow>
                    <SecondTextBlock>
                      Сhange
                      <br />
                      in the rate
                    </SecondTextBlock>
                  </CardBlock>
                </a.div>
              </ThirdCard>
              <FourthCard>
                <a.div
                  style={{
                    opacity: fourthAnimation.opacity.to((opacity) => 1 - opacity),
                    transform: fourthAnimation.transform
                  }}>
                  <CardBlock
                    color={elementsData[6].color}
                  >
                    <FirstTextBlock>
                      {elementsData[6].symbol}
                      <span>{elementsData[6].averagePrice}</span>
                    </FirstTextBlock>
                    <Arrow
                      color={elementsData[6].color}
                      filter='drop-shadow(0px 0px 5px rgba(0, 206, 206, 0.6));'
                    >
                      <img src={elementsData[6].arrow} style={{ width: '100%' }}></img>
                      <span>24h</span>

                    </Arrow>
                    <SecondTextBlock>
                      Сhange
                      <br />
                      in the rate
                    </SecondTextBlock>
                  </CardBlock>
                </a.div>
              </FourthCard>
              <FourthCard>
                <a.div
                  style={{
                    opacity: fourthAnimation.opacity.to((opacity) => opacity),
                    transform: fourthAnimation.transform,
                    rotateX: "180deg"
                  }}
                >
                  <CardBlock
                    color={elementsData[7].color}
                  >
                    <FirstTextBlock>
                      {elementsData[7].symbol}
                      <span>{elementsData[7].averagePrice}</span>
                    </FirstTextBlock>
                    <Arrow
                      color={elementsData[7].color}
                      filter='drop-shadow(0px 0px 5px rgba(0, 206, 206, 0.6));'
                    >
                      <img src={elementsData[7].arrow} style={{ width: '100%' }}></img>
                      <span>24h</span>
                    </Arrow>
                    <SecondTextBlock>
                      Сhange
                      <br />
                      in the rate
                    </SecondTextBlock>
                  </CardBlock>
                </a.div>
              </FourthCard>
            </div>
          )}
        </Transition >
        : <Spinner />}
    </GeneralWrapper >
  )
}
export default RateTrends;
