import styled from 'styled-components';
import { ReactComponent as ArrowLeftImg } from '../../icons/arrow-left.svg';
import { useState } from 'react';
import { Transition } from 'react-transition-group';
const Wrapper = styled.div`
position: absolute;
left: -100px;
z-index: 1000;
border-radius: 25%;
box-shadow:  3px 3px 4px rgba(0, 0, 0, 0.1), 10px 10px 15px rgba(0, 0, 0, 0.6);
cursor: pointer;
@media (max-width: 1439px) {
  left: -60px;
};
@media (max-width: 1023px) {
  left: -46px;
};
@media (max-width: 767px) {
left: -12px;
background: linear-gradient(270deg, rgba(0, 0, 0, 0) 50%, rgba(0, 176, 206, 0.5) 100%);
};
@media (max-width: 424px) {
  left: -10px;
}
`
const Button = styled.div`
width: 50px;
height: 50px;
border-radius: inherit;
@media(pointer: fine) {
  &:hover {
  background-color: rgba(255, 255, 255, 0.1)}
};
@media (max-width: 1439px) {
  width: 43px;
  height: 43px;
};
@media (max-width: 1023px) {
  width: 34px;
  height: 34px;
};
@media (max-width: 424px) {
  width: 30px;
  height: 30px;
}
`
const ArrowLeft = (props) => {
  const [trigger, setTrigger] = useState();
  const defaultStyle = {
    transition: 'all 500ms'
  }
  const transitionStyle = {
    entering: {
      transform: 'translateX(-30%)',
      backgroundColor: 'rgb(255, 255, 255)'
    },
    entered: {
      transform: 'translateX(0%)',
      backgroundColor: 'rgba(255, 255, 255, 0)'
    },
    exiting: {
      transform: 'translateX(-30%)',
      backgroundColor: 'rgb(255, 255, 255)'
    },
    exited: {
      transform: 'translateX(0%)',
      backgroundColor: 'rgba(255, 255, 255, 0)'
    }
  }
  const onClick = () => {
    setTrigger(!trigger);
    props.scroll('left');
  }
  return (
    <Transition timeout={200} in={trigger}>
      {transitionState => (
        <Wrapper
          onClick={() => { onClick(); }}
          style={{
            ...defaultStyle,
            ...transitionStyle[transitionState]
          }}>
          <Button>
            <ArrowLeftImg />
          </Button>
        </Wrapper>
      )}
    </Transition>
  )
}
export default ArrowLeft;
