import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Cell(props) {
  return (
    <button className="cell" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  constructor(props){
    super(props);
    this.state= {
      cells: Array(110).fill(null),
      xIsNext: true,

    };
  }
    handleClick(i) {
      const cells = this.state.cells.slice();
      cells[i] = this.state.xIsNext ? 'X' : 'O';
      this.setState({
        cells: cells,
      });
    }
  renderCell(i) {
    return <Cell 
      value={this.state.cells[i]} 
      onClick={()=> this.handleClick(i)}

    />;
  }

  render() {
    const status = 'Next player: X' + (this.state.xIsNext ? 'X' : 'O');

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderCell(0)}
          {this.renderCell(1)}
          {this.renderCell(2)}
          {this.renderCell(3)}
          {this.renderCell(4)}          
        </div>
        <div className="board-row">
          {this.renderCell(5)}
          {this.renderCell(6)}
          {this.renderCell(7)}
          {this.renderCell(8)}
          {this.renderCell(9)}            
        </div>
        <div className="board-row">
          {this.renderCell(10)}
          {this.renderCell(11)}
          {this.renderCell(12)}
          {this.renderCell(13)}
          {this.renderCell(14)}          
        </div>
        <div className="board-row">
          {this.renderCell(15)}
          {this.renderCell(16)}
          {this.renderCell(17)}
          {this.renderCell(18)}
          {this.renderCell(19)}            
        </div>
        <div className="board-row">
          {this.renderCell(20)}
          {this.renderCell(21)}
          {this.renderCell(22)}
          {this.renderCell(23)}
          {this.renderCell(24)}          
        </div>
        <div className="board-row">
          {this.renderCell(25)}
          {this.renderCell(26)}
          {this.renderCell(27)}
          {this.renderCell(28)}
          {this.renderCell(29)}            
        </div>
        <div className="board-row">
          {this.renderCell(30)}
          {this.renderCell(31)}
          {this.renderCell(32)}
          {this.renderCell(33)}
          {this.renderCell(34)}          
        </div>
        <div className="board-row">
          {this.renderCell(35)}
          {this.renderCell(36)}
          {this.renderCell(37)}
          {this.renderCell(38)}
          {this.renderCell(39)}            
        </div>
        <div className="board-row">
          {this.renderCell(40)}
          {this.renderCell(41)}
          {this.renderCell(42)}
          {this.renderCell(43)}
          {this.renderCell(44)}          
        </div>
        <div className="board-row">
          {this.renderCell(45)}
          {this.renderCell(46)}
          {this.renderCell(47)}
          {this.renderCell(48)}
          {this.renderCell(49)}            
        </div>
        <div className="board-row">
          {this.renderCell(50)}
          {this.renderCell(51)}
          {this.renderCell(52)}
          {this.renderCell(53)}
          {this.renderCell(54)}          
        </div>
        <div className="board-row">
          {this.renderCell(55)}
          {this.renderCell(56)}
          {this.renderCell(57)}
          {this.renderCell(58)}
          {this.renderCell(59)}            
        </div>
        <div className="board-row">
          {this.renderCell(60)}
          {this.renderCell(61)}
          {this.renderCell(62)}
          {this.renderCell(63)}
          {this.renderCell(64)}          
        </div>
        <div className="board-row">
          {this.renderCell(65)}
          {this.renderCell(66)}
          {this.renderCell(67)}
          {this.renderCell(68)}
          {this.renderCell(69)}            
        </div>
        <div className="board-row">
          {this.renderCell(70)}
          {this.renderCell(71)}
          {this.renderCell(72)}
          {this.renderCell(73)}
          {this.renderCell(74)}          
        </div>
        <div className="board-row">
          {this.renderCell(75)}
          {this.renderCell(76)}
          {this.renderCell(77)}
          {this.renderCell(78)}
          {this.renderCell(79)}            
        </div>
        <div className="board-row">
          {this.renderCell(80)}
          {this.renderCell(81)}
          {this.renderCell(82)}
          {this.renderCell(83)}
          {this.renderCell(84)}          
        </div>
        <div className="board-row">
          {this.renderCell(85)}
          {this.renderCell(86)}
          {this.renderCell(87)}
          {this.renderCell(88)}
          {this.renderCell(89)}            
        </div>
        <div className="board-row">
          {this.renderCell(90)}
          {this.renderCell(91)}
          {this.renderCell(92)}
          {this.renderCell(93)}
          {this.renderCell(94)}          
        </div>
        <div className="board-row">
          {this.renderCell(95)}
          {this.renderCell(96)}
          {this.renderCell(97)}
          {this.renderCell(98)}
          {this.renderCell(99)}            
        </div>
        <div className="board-row">
          {this.renderCell(100)}
          {this.renderCell(101)}
          {this.renderCell(102)}
          {this.renderCell(103)}
          {this.renderCell(104)}          
        </div>
        <div className="board-row">
          {this.renderCell(105)}
          {this.renderCell(106)}
          {this.renderCell(107)}
          {this.renderCell(108)}
          {this.renderCell(109)}            
        </div>


      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
