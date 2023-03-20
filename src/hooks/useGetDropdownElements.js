import { useState } from 'react';
import { useSelector } from 'react-redux';
import Dropdown from 'react-bootstrap/Dropdown';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
const Wrapper = styled.div`
 overflow: auto;
 max-height: 400px;
@media (max-width: 767px) {
 max-height: 180px
};
 @media (max-width: 424px) {
  max-height: 155px
 }
`
const useGetDropdownElements = () => {
  const [dropdownElements, setDropdownElements] = useState();
  const currencyList = useSelector(state => state.slice.currencyList)
  const getDropdownElements = (btn, btnController) => {
    let elements = [];
    currencyList.forEach((listElement) => {
      elements.push(
        btn === listElement.id ?
          <Dropdown.Item key={uuidv4()} onClick={() => { btnController(listElement.id) }} active>
            {listElement.id}
          </Dropdown.Item> :
          <Dropdown.Item key={uuidv4()} onClick={() => { btnController(listElement.id) }}>
            {listElement.id}
          </Dropdown.Item>
      );
    });
    setDropdownElements(
      <Dropdown drop="down">
        <Dropdown.Toggle variant="dark" >
          {btn}
        </Dropdown.Toggle>
        <Dropdown.Menu
          variant="dark"
        >
          <Wrapper>
            {elements}
          </Wrapper>
        </Dropdown.Menu>
      </Dropdown>
    )
  }
  return { dropdownElements, getDropdownElements }
}
export default useGetDropdownElements;
