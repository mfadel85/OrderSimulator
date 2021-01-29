import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Board from './Board';
//import ResultGrid from './ResultGrid';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Alert from 'react-bootstrap/Alert'
class Simulator extends React.Component {

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

/*class Results extends React.Component {

  render(){
    return(
      <Container fluid>
        <Alert variant='danger'>
          Results
        </Alert>
        <ResultGrid />
        <Row>

        </Row>
      </Container>
    )
  }
}
*/
ReactDOM.render(
  <Simulator />,
  document.getElementById('root')
);
