import React from 'react';
import Products from './products.js';
import Order from './Order.js';
import Cell from './Cell.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

import { allProducts, allOrders } from './data.js';

class Board extends React.Component {

    constructor(props) {
        super(props);
        let order = [];
        //order = this.initOrder(allOrders[0]).sortProduct(this.sortProduct);
        let cells = Array(110).fill(null); 
        const initialCells = JSON.parse(JSON.stringify(cells));

        this.state = {
            cellsInRow:5,
            cellsInBent:22,
            cells: cells,
            xIsNext: true,
            products: allProducts,
            order: order,
            history:[{
                cells: initialCells
            }],
            nextPatchProducts:[],
            beltIndices :[0,0,0,0,0],
            myOrder:[]
        }; 
        //this.fillBoard = this.fillBoard.bind(this);
    }
    sortProduct(a, b) {
            //console.log('Result: Name',a.name.name,a.beltCount - b.beltCount)
            return a.beltCount - b.beltCount;         
    }
    setOrder(orderID){
        let orderReady = this.initOrder(allOrders[orderID]);
        console.log('order is ready??', orderReady);
        orderReady.sort(this.sortProduct);
        this.setState({
            cells: Array(110).fill(null),
            order:orderReady
        }, () => { this.fillBoard();});
        
    }
    initOrder(order){
        let orderStorted = [];
        order.forEach(function (item) {
            orderStorted.push([item.id - 1, item.quantity]);
        });
        let finalOrder = [];
        orderStorted.forEach((product) => {
            let id = product[0];
            let quantity = product[1];
            let name = allProducts[id];
            let productName = name.name;
            let beltCount = name.beltCount;
            let cellsDepth = name.cellsDepth;
            let symbol = name.symbol;
            finalOrder.push({ id, quantity, name, productName, symbol, beltCount, cellsDepth })
        });

        return finalOrder;
    }
    handleOneProduct(item,startIndex){
        let originalStartIndex = startIndex;
        //let currentcells = this.state.cells.slice();
        let currentcells = [...this.state.cells];
        console.log('History now ', this.state.history);


        if (startIndex + item.beltCount >= this.state.cellsInRow || item.beltCount > 3)
            startIndex = 0;
        if (item.beltCount === 3)
            startIndex = 2;
        if (item.beltCount === 2 && startIndex % 2 === 1)
            startIndex = startIndex + 1;
        console.log('startIndex is ', startIndex);
        let available = this.checkSpace(startIndex, item.beltCount, item.cellsDepth);
        if(available){
            this.shiftCells(startIndex, item);
            startIndex = startIndex + item.beltCount;
            this.setState({
                cells: this.state.cells,
                index: startIndex,
                history: [...this.state.history, { cells: currentcells }, { cells: this.state.cells }]
            });
            console.log('History after now ', this.state.history);
        }
        else {
            this.setState({
                nextPatchProducts: [...this.state.nextPatchProducts,item]
            });
            alert('No space for ' + item.productName + ' will be added in the next patch.');
            console.log('no space for ', item,);
            startIndex = originalStartIndex;
        }
           
        
        return startIndex;
    }

    fillBoard(){
        // this is to refactored soon!!
        let startIndex = 0;
        let that = this;
        this.state.order.forEach(function(item){ 
            for(let m = 0;m<item.quantity;m++)
            {
                startIndex = that.handleOneProduct(item, startIndex);
            }
        });
        console.log('History after now ', this.state.history);
    }
    updateIndices(index){
        let indices = this.state.beltIndices;
        let startIndex = index%5;
        let rowNumber = (index-startIndex)/5;
        indices[startIndex] = rowNumber;
        this.setState({
            beltIndices:indices
        })
    }
    fillCellsFromRight(startingPoint,item){
        let currentCells = this.state.cells;
        for(let i=0; i<item.cellsDepth;i++)
            for(let j=0;j<item.beltCount;j++){
                let index = i * this.state.cellsInRow+j;
                currentCells[startingPoint + index] = item.symbol+": Right";
                this.updateIndices(startingPoint+index);
            }
        return currentCells;
    }

    modifyIndex(startIndex, beltCount) {
        let index = 0;
        if (startIndex + beltCount > 5 || beltCount > 3)
            index = 0;
        if (beltCount === 3)
            index = 2;
        if (beltCount === 2 && startIndex % 2 === 1)
            index = startIndex + 1;
        else
            index = startIndex;
        console.log('index is ', index, 'start', startIndex, 'belt count', beltCount);
        return index;
    }
    checkSpace(startIndex,beltCount,cellsDepth){
        let startRow = this.state.cellsInBent - cellsDepth;
        for (let i = startRow; i < this.state.cellsInBent;i++){
            for (let l=0;l<beltCount;l++){
                const index = i*5+startIndex+l;
                if(this.state.cells[index] !== null)
                    return false;
                    
            }
        }
        return true;
    }
    shiftCells(  startIndex, item) {
        this.checkSpace(startIndex, item.beltCount, item.cellsDepth);
        let indicesUpdated = [];
        for(let m=0; m<item.beltCount; m++)
            indicesUpdated.push(false);
        console.log('indices updated: ',indicesUpdated);
        let currentCells = this.state.cells;
        const cellsInRow = this.state.cellsInRow;
        let count = 0;
        let direction = item.name.dir;
        if (direction === 'left'){ 
            for (let i = 0; i < item.cellsDepth; i++) 
                for (let j = this.state.cellsInBent-1; j > 0; j--) 
                    for (let k = 0; k < item.beltCount; k++) {
                        let index = startIndex + (j * cellsInRow) + k;                       
                        count = count + 1;
                        if (!indicesUpdated[k + startIndex] && currentCells[index] === null && currentCells[index - cellsInRow] !== null) {
                            this.updateIndices(index - cellsInRow);
                        }
                        currentCells[index] = currentCells[index - cellsInRow];
                        currentCells[index - cellsInRow] = "Left " + item.symbol ;
                        
                        
                    } 
        }
        else if (direction === 'right') {
            console.log('right side');
            for(let j =21;j>=0;j--){
                let k=0
                let startingPoint = startIndex + (j * cellsInRow);
                let index = startIndex + (j*cellsInRow) +k;
                let valid = true;
                for (let m = 0; m < item.beltCount; m++){
                    if (currentCells[index+m] === null)
                        valid = true;
                    else {
                        valid = false;
                        break;
                    } 
                }
                if ( valid && startingPoint < 5)
                    currentCells = this.fillCellsFromRight(startingPoint, item);
                else if (!valid || startingPoint < cellsInRow){                            
                    startingPoint = startingPoint + cellsInRow;
                    currentCells = this.fillCellsFromRight(startingPoint, item);
                    break;
                }
            }
        }
        console.log('swap count', count);
        this.setState({
            cells:currentCells,
            history: [...this.state.history, { cells: currentCells }]
        });

        return currentCells;
    }

    renderCell(i) {
        return <Cell
            value={this.state.cells[i]}
        />;
    }
    addProduct(id){
        
        let name = allProducts[id].name;
        let item = { id:id - 1,quantity: 1, name:name}
        this.setState({
            myOrder: [...this.state.myOrder,item],
        });
    }
    render() {
        return (
            <Row>
                <Col xs={3}> 
                    <h3>Products </h3>
                    <ListGroup variant="flush">
                        <Products products={this.state.products} addProduct={(id)=>this.addProduct(id)}/>
                    </ListGroup>
                </Col>
                <Col xs={3}>
                    <Card>
                        <Card.Title>Order</Card.Title>

                    <Order order={this.state.order} products={this.state.products}  />
                    <button onClick={() => this.setOrder(0)}>
                        Order 1
                    </button>
                    <button onClick={() => this.setOrder(1)}>
                        Order 2
                    </button>
                    <button onClick={() => this.setOrder(2)}>
                        Order 3
                    </button>
                    <button onClick={() => this.setOrder(3)}>
                        Order 4
                    </button>
                    <button onClick={() => this.setOrder(4)}>
                        Order 5
                    </button>
                    <button onClick={() => this.setOrder(5)}>
                        Order 6
                    </button>
                    <button onClick={() => this.setOrder(6)}>
                        Order 7
                    </button>
                    <button onClick={() => this.setOrder(7)}>
                        Order 8
                    </button>
                    <button onClick={() => this.setOrder(8)}>
                        Order 9
                    </button>
                    </Card>
                </Col>
                
                <Col xs={4}>
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
                <Col xs={2}>
                    <Card>
                        <Card.Title>My Order </Card.Title>
                        <Card.Body>
                        
                            {this.state.myOrder.map((product) => (
                                <ListGroup.Item key={product.id} >
                                    {product.id}. 
                                     {product.name} - quantity: {product.quantity} 
                                 </ListGroup.Item>
                            ))}
                        </Card.Body>
                    </Card>
                
                </Col>
            </Row>
        );
    }
}
export default Board;