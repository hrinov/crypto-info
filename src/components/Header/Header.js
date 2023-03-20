import styled from 'styled-components';
import { ReactComponent as Logo } from '../../icons/logoColor.svg';
import '../../fonts/fonts.css';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { useSpring, a } from '@react-spring/web';

const Wrapper = styled.div`
width: 280px;
position: absolute;
display: flex;
justify-content: space-between;
align-items: center;
top: -50px;
color: rgba(255, 255, 255, 0.8);
font-family: 'Play', cursive;
font-weight: 700;
font-size: 24px;
text-shadow: -2px -1px 5px rgba(51, 81, 102, 0.5), 3px 3px 3px rgba(0, 0, 0, 0.7), 10px 10px 15px rgba(0, 0, 0, 0.4);
@media (max-width: 1023px) {
  font-size: 22px;
};
@media (max-width: 767px) {
  top: 40px;
  left: 300px;
  height: 320px;
  width: 100px;
  writing-mode: vertical-lr;
  text-orientation: upright;
  font-size: 24px;
  font-weight: 900;
  letter-spacing: -0.2rem;
  text-shadow: 3px 1px 1px rgba(0, 176, 206, 0.5), 10px 10px 15px rgba(0, 0, 0, 0.4);
};
@media (max-width: 424px) {
  top: 30px;
  left: 224px;
  height: 250px;
  width: 76px;
  writing-mode: vertical-lr;
  text-orientation: upright;
  font-size: 19px;
  font-weight: 900;
  letter-spacing: -0.2rem;
}
`
const FirstTextBlock = styled.div`
margin: 0 auto
`
const SecondTextBlock = styled.div`
margin: 0 auto
`
const FirstImgBlock = styled.div`
height: '50px';
position: absolute;
left: 134px;
@media (max-width: 767px) {
  top: 160px;
  left: 28px
};
@media (max-width: 424px) {
  height: 44px;
  top: 124px;
  left: 18px
}
`
const SecondImgBlock = styled.div`
height: '50px';
position: absolute;
left: 134px;
@media (max-width: 767px) {
  height: '35px';
  top: 160px;
  left: 28px;
  transform: rotateY(180deg)
};
@media (max-width: 424px) {
  height: 44px;
  top: 124px;
  left: 18px;
}
`
const Header = () => {
  const [flip, setFlip] = useState(false);
  const animationState = useSelector(state => state.slice.animationState)
  const animation = useSpring({
    opacity: flip ? 1 : 0,
    transform: `rotateY(${flip ? 180 : 0}deg)`,
    config: { mass: 15, tension: 350, friction: 50 },
  });
  useEffect(() => {
    setFlip((state) => !state);
  }, [animationState]);
  return (
    <Wrapper>
      <FirstTextBlock>CRYPTO</FirstTextBlock>
      <FirstImgBlock>
        <a.div
          style={{
            opacity: animation.opacity.to((opacity) => 1 - opacity),
            transform: animation.transform
          }}>
          <Logo style={{ width: '100%', height: '100%' }} />
        </a.div>
      </FirstImgBlock>
      <SecondImgBlock>
        <a.div
          style={{
            opacity: animation.opacity.to((opacity) => opacity),
            transform: animation.transform
          }}>
          <Logo style={{ width: '100%', height: '100%' }} />
        </a.div>
      </SecondImgBlock>
      <SecondTextBlock>INFO</SecondTextBlock>
    </Wrapper >
  )
}
export default Header;
