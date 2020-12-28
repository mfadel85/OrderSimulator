import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Board from './Board';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

class Simulator extends React.Component {
  render() {
    return (
      <Container>
        <Row>
        Test
        </Row>
        <Board />
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </Container>    
      );
  }
}

ReactDOM.render(
  <Simulator />,
  document.getElementById('root')
);
