import React from 'react';
import Products from './products.js';
import Order from './Order.js';
import Cell from './Cell.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { allProducts,lovelyOrder } from './data.js';

class Board extends React.Component {

    constructor(props) {
        super(props);
        let products = allProducts;
        let order1 = lovelyOrder;
        console.log('pure order is : ', order1);
        let orderStorted = [];
        order1.forEach(function (item) {
            orderStorted.push([item.id - 1, item.quantity]);
        });
        console.log('SOrted', orderStorted);
        let order2 = [];
        let that = products;
        orderStorted.forEach((product) => {
            let id = product[0];
            let quantity = product[1];
            let name = that[id];
            let  productName= name.name;
            let beltCount = name.beltCount;
            let cellsDepth = name.cellsDepth;
            let symobl = name.symbol;
            order2.push({ id, quantity, name, productName, symobl, beltCount, cellsDepth })
        });        
        let cells = Array(110).fill(null); 
        this.state = {
            cells: cells,
            xIsNext: true,
            products: products,
            order: order2
        };         
        cells = this.fillBoard(this.state.order, cells);
    }
    handleOneProduct(item,cells,startIndex){
        // check the situation of the cells to decide which startIndex
        if (startIndex + item.beltCount > 5 || item.beltCount > 3)
            startIndex = 0;
        if (item.beltCount === 3)
            startIndex = 2;
        if (item.beltCount === 2 && startIndex % 2 === 1)
            startIndex = startIndex + 1;
        let dir = item.name.dir;
        //console.log('item', item,'dir',dir);

        this.shiftCells(item.beltCount, item.cellsDepth, dir, startIndex, item.symobl, cells);
        startIndex = startIndex + item.beltCount;
        return startIndex;
    }
    fillBoard(order2,cells){
        //console.log('The order is : ',order2)
        let startIndex = 0;
        let that = this;
        order2.forEach(function(item){ 
            for(let m = 0;m<item.quantity;m++)
                startIndex = that.handleOneProduct(item,cells,startIndex);
        });
        return cells;
    }
    fillCellsFromRight(startingPoint,beltCount,cellDepth,cells,symbol){
        console.log('Right Product: ',startingPoint, beltCount, cellDepth);
        for(let i=0; i<cellDepth;i++){
            for(let j=0;j<beltCount;j++){
                let index = i * 5+j;
                cells[startingPoint + index] = symbol;
            }
            
        }
        let startPoint = startingPoint +5;
        return cells;
    }
    shiftCells(beltCount, cellDepth, direction, startIndex, symbol, cells) {
        //console.log('symbol', symbol);
        const cellsInRow = 5;
        let count = 0;
        if (direction === 'left') {
            for (let i = 0; i < cellDepth; i++) {
                //let i=0;
                for (let j = 21; j > 0; j--) {
                    for (let k = 0; k < beltCount; k++) {
                        let index = startIndex + (j * cellsInRow) + k;                       
                        count = count + 1;
                        cells[index] = cells[index - 5];
                        cells[index - 5] = symbol;
                    }
                }
            }
        }
        else if (direction === 'right') {
            console.log('right side');
            //for (let i = 0; i < cellDepth; i++) {
                let i= 0;
                for(let j =21;j>=0;j--){
                    //for(let k=0;k<beltCount;k++){
                        let k=0
                        let startingPoint = startIndex + (j * cellsInRow);
                        let lastEmptyCell = -1;
                        let index = startIndex + (j*cellsInRow) +k;
                        console.log('cell index', cells[index],'i', i, 'j', j,'index', index, 'startingPoint', startingPoint, 'last empty cell', lastEmptyCell);
                        // if beltCount is more than one check all the cells and then decide
                        let valid = true;
                        for(let m =0; m < beltCount; m++){
                            if (cells[index+m] === null)
                                valid = true;
                            else {
                                valid = false;
                                break;
                            } 
                        }
                        if ( valid && startingPoint < 5)
                            cells = this.fillCellsFromRight(startingPoint, beltCount, cellDepth, cells,symbol);
                        else if (!valid || startingPoint <5){                            
                            startingPoint = startingPoint +5;
                            cells = this.fillCellsFromRight(startingPoint,beltCount,cellDepth,cells,symbol);
                            break;
                        }
                   // }
                }

            //}
        }
        console.log('swap count', count);
        //console.log('after', cells);
    }

    renderCell(i) {
        return <Cell
            value={this.state.cells[i]}
        />;
    }


    render() {
        console.log('I am being rendered');
        return (
            <Row>
                <Col> 
                    <h2>Products </h2>
                    <Products products={ this.state.products } />
                </Col>
                <Col>
                    <h2>Order Sorted</h2>
                    <Order order={this.state.order} products={this.state.products} />
                </Col>
                
                <Col xs={6}>
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
                </Col>
            </Row>
        );
    }
}
export default Board;