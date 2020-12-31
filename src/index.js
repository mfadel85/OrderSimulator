import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Board from './Board';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Alert from 'react-bootstrap/Alert'
class Simulator extends React.Component {
  sayHello(){
    alert('Hello!');
  }
  render() {
    return (
      <Container fluid>
        <Alert  variant='primary'>
          Order Simulator
        </Alert>

        <Board />
        <Row>

        </Row>
      </Container>    
      );
  }
}

ReactDOM.render(
  <Simulator />,
  document.getElementById('root')
);
