import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import useGetDropdownElements from "../../hooks/useGetDropdownElements";
import styled from "styled-components";
import { Transition } from 'react-transition-group';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ReactComponent as ErrorImg } from '../../icons/error.svg';
import '../../fonts/fonts.css';
const MainBlock = styled.div`
z-index: 2000;
margin-top: 40px;
width: 302px;
height: 300px;
margin-right: 50px;
display: flex;
flex-direction: column;
justify-content: space-between;
align-items: center;
background: radial-gradient(88.82% 114.41% at 49.93% 97.82%, rgba(0, 176, 206, 0.25) 0%, rgba(0, 111, 130, 0.175) 56.77%, rgba(0, 0, 0, 0) 100%), #182630;
box-shadow: -4px -4px 10px rgba(51, 81, 102, 0.5), 3px 3px 4px rgba(0, 0, 0, 0.1), 10px 10px 15px rgba(0, 0, 0, 0.4);
border-radius: 18px;
@media (max-width: 1023px) {
  margin-top: 30px;
  margin-right: 32px;
  width: 236px;
  height: 233px;
};
@media (max-width: 767px) {
  width:300px;
  height: 320px;
  margin: 40px auto 0 0;
};
@media (max-width: 424px) {
  width:224px;
  height: 250px;
  margin: 30px auto 0 0;
}
`
const ResultWrapper = styled.div`
position: relative;
display: flex;
justify-content: center;
height: 145px;
margin-top: 22px;
@media (max-width: 1023px) {
  height: 108px;
  margin-top: 16px;
};
@media (max-width: 767px) {
  height: 170px;
  margin-top: 25px;
};
@media (max-width: 424px) {
  height: 127px;
  margin-top: 18px;
}
`
const OuterResultBlock = styled.div`
width: 250px;
height: 145px;
border-radius: 8px;
background-color: rgba(255,255,255, 0.5);
display: flex;
justify-content: center;
align-items: center;
@media (max-width: 1023px) {
  width: 195px;
  height: 108px;
};
@media (max-width: 767px) {
  width: 250px;
  height: 165px;
};
@media (max-width: 424px) {
  width: 187px;
  height: 123px;
}
`
const InnerResultBlock = styled.div`
position: relative;
width: 185px;
height: 90px;
border-radius: 8px;
background-color: rgb(230, 230, 230);
display: flex;
flex-direction: column;
justify-content: center;
padding: 7px;
transform: translateY(5px);
color: rgba(80, 89, 89, 0.95);
font-size: 29px;
font-family: 'Orbitron', sans-serif;
@media (max-width: 1023px) {
  width: 144px;
  height: 62px;
  padding: 8px;
  transform: translateY(3px);
  font-size: 22px;
};
@media (max-width: 767px) {
  width: 185px;
  height: 100px;
  padding: 9px;
  transform: translateY(4px);
  font-size: 29px;
};
@media (max-width: 424px) {
  width: 138px;
  height: 75px;
  padding: 6px;
  transform: translateY(3px);
  font-size: 22px;
}
`
const BrightShadow = styled.div`
position: absolute;
top: 0;
width: 250px;
height: 38px;
background-color: rgba(230, 230, 230, 0.5);
clip-path: polygon(0% 0%, 100% 0%, 86% 100%, 14% 100%);
border-top-left-radius: 7px;
border-top-right-radius: 7px;
@media (max-width: 1023px) {
  width: 195px;
  height: 29px;
};
@media (max-width: 767px) {
  width: 250px;
  height: 42px;
};
@media (max-width: 424px) {
  width: 187px;
  height: 31px;
}
`
const Dollar = styled.div`
font-family: 'Play', sans-serif;
font-size: 20px;
color: rgba(33,37,41,0.95);
@media (max-width: 1023px) {
  font-size: 16px;
};
@media (max-width: 767px) {
  font-size: 20px;
};
@media (max-width: 424px) {
  font-size: 17px;
}
`
const InputHolder = styled.div`
width: 250px;
height: 40px;
@media (max-width: 1023px) {
  width: 195px;
  height: 34px;
};
@media (max-width: 767px) {
  width: 250px;
  height: 44px;
};
@media (max-width: 424px) {
  width: 187px;
  height: 35px;
}
`
const DropdownList = styled.div`
opacity: 97%;
margin-bottom: 20px;
font-family: 'Play', sans-serif;
border-radius: 7px;
box-shadow: -4px -4px 5px rgba(51, 81, 102, 0.1), 3px 3px 4px rgba(0, 0, 0, 0.1), 5px 5px 15px rgba(0, 0, 0, 0.4);
@media (max-width: 1023px) {
  margin-bottom: 13px;
};
@media (max-width: 767px) {
  margin-bottom: 13px;
};
`
const ErrorWrapper = styled.div`
height: 50px;
margin: 2px auto 0 auto;
@media (max-width: 1023px) {
  margin: 1px auto 0 auto;
  height: 35px;
};
@media (max-width: 767px) {
  height: 50px;
};
@media (max-width: 424px) {
  height: 43px;
}
`
const ErrorText = styled.div`
margin: 0 auto;
text-align: center;
font-family: 'Play', sans-serif;
font-style: italic;
font-size: 14px;
color: rgba(255, 0, 0, 0.92);
text-shadow: 1px 1px 1px rgba(0,0,0,0.1), 1px 1px 1px rgba(0,0,0,0.12);
@media (max-width: 1023px) {
  font-size: 12px;
};
@media (max-width: 767px) {
  font-size: 15px;
};
@media (max-width: 424px) {
  font-size: 12px;
}
`
const CurrencyConverter = () => {
  const [btn, setBtn] = useState('bitcoin');
  const [result, setResult] = useState(null);
  const { register, formState: { errors }, setValue, getValues } = useForm();
  const { dropdownElements, getDropdownElements } = useGetDropdownElements();
  const { currentRates } = useSelector(state => state.slice);
  const defaultStyle = {
    transition: 'all 150ms ease-in-out',
    opacity: 0,
  }
  const transitionStyles = {
    entering: { opacity: 0, },
    entered: { opacity: 1 },
    exiting: { opacity: 0 },
    exited: { opacity: 1 },
  };
  const btnController = (activeBtn) => {
    setBtn(activeBtn);
  }
  const resultCreator = () => {
    const rate = currentRates.find((element) => { return element.id === btn }).priceUsd
    const value = getValues('number') ? getValues('number') : 0;
    return (
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }} >
        <div style={{ height: '40%', display: 'flex', alignItems: 'center' }}>
          {String(value / rate).split('.')[0]}
          <span style={{ color: 'rgb(214,0,80)', fontWeight: '900' }}>.</span>
        </div>
        <div style={{ height: '40%', display: 'flex', alignItems: 'center' }}>
          {String((value / rate).toFixed(7)).split('.')[1]}
        </div>
      </div >)
  }
  useEffect(() => {
    getDropdownElements(btn, btnController)
  }, [btn])
  useEffect(() => {
    if (currentRates) {
      setResult(resultCreator())
    }
  }, [getValues('number'), btn]);
  return (
    <MainBlock>
      {dropdownElements ?
        <>
          <ResultWrapper>
            <OuterResultBlock >
              <BrightShadow />
              <InnerResultBlock>
                {errors.number?.type === 'pattern' ?
                  < Transition timeout={0} in appear >
                    {state => (
                      <div
                        style={{
                          margin: '0 auto',
                          ...defaultStyle,
                          ...transitionStyles[state]
                        }}>
                        <ErrorWrapper>
                          <ErrorImg />
                        </ErrorWrapper>
                        <ErrorText>{
                          /^\d*(\.\d{0,2})?$/.test(getValues('number')) ?
                            'too long number'
                            : 'incorrect value'
                        }</ErrorText>
                      </div>
                    )}</Transition >
                  :
                  result}
              </InnerResultBlock>
            </OuterResultBlock>
          </ResultWrapper>
          <InputHolder>
            <InputGroup style={{ height: '100%' }}>
              <InputGroup.Text style={{ height: '100%' }}>
                <Dollar>$</Dollar>
              </InputGroup.Text>
              <Form.Control
                aria-label='Dollar amount (with dot and two decimal places)'
                style={{
                  backgroundColor: 'rgb(230, 230, 230)',
                  height: '100%'
                }}
                {
                ...register('number', { pattern: /^\d{0,6}(\.\d{0,2})?$/ })}
                isInvalid={errors.number?.type ? true : false}
                onChange={(event) => { setValue("number", event.target.value, { shouldValidate: true }) }}
              />
            </InputGroup>
          </InputHolder>
          <DropdownList>
            {dropdownElements}
          </DropdownList>
        </> :
        null
      }
    </MainBlock >
  )
}
export default CurrencyConverter;
