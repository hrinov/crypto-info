import styled from 'styled-components';
import { ReactComponent as Logo } from '../../icons/logo.svg';
import '../../fonts/fonts.css';
const Wrapper = styled.div`
margin: 10px auto 40px auto;
display: flex;
justify-content: center;
align-items: center;
color: rgba(255, 255, 255, 0.8);
font-family: 'Play', cursive;
font-weight: 700;
font-size: 24px;
text-shadow: -2px -1px 5px rgba(51, 81, 102, 0.5), 3px 3px 3px rgba(0, 0, 0, 0.7), 10px 10px 15px rgba(0, 0, 0, 0.4);
@media (max-width: 1023px) {
  font-size: 22px;
  margin: 10px auto 30px auto;
};
@media (max-width: 767px) {
  margin: 0px auto 30px auto;
};
@media (max-width: 424px) {
  font-size: 19px;
}
`
const LogoWrapper = styled.div`
height: 50px;
margin: 0 10px 0 10px;
@media (max-width: 424px) {
  margin: 0 8px 0 8px;
  height: 44px;
}
`
const Footer = () => {
  return (
    <Wrapper>
      CRYPTO
      <LogoWrapper>
        <Logo style={{ width: '100%', height: '100%' }} />
      </LogoWrapper>
      INFO
    </Wrapper>
  )
}
export default Footer;
