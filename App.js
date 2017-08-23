import React from 'react';
import TestScreenStyled from './src/test-screen-styled';
// import TestScreen from './src/test-screen';
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
`;

export default class App extends React.Component {
  render() {
    return (
      <Container>
        <TestScreenStyled />
      </Container>
    );
  }
}
