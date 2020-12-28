import React from 'react';
import ReactDOM from 'react-dom';
import Products from './products.js';
import Order from './Order.js';

import Cell from './Cell.js';

import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


class Board extends React.Component {

    constructor(props) {
        super(props);
        let products = [
            {
                id: 1,
                name: 'Pepsi',
                symbol: 'P',
                dir: 'left',
                width: 10,
                depth: 10,
                beltCount: 2,
                cellsDepth: 4,
                unitNo: 1
            },
            {
                id: 2,
                name: 'Browni',
                symbol: 'B',
                dir: 'right',
                width: 12,
                depth: 6,
                beltCount: 2,
                cellsDepth: 3,
                unitNo: 2
            },
            {
                id: 3,
                name: 'Jucy',
                symbol: 'J',
                dir: 'right',
                width: 6.2,
                depth: 9.3,
                beltCount: 1,
                cellsDepth: 4,
                unitNo: 1
            },
            {
                id: 4,
                name: 'Milk',
                symbol: 'M',
                dir: 'right',
                width: 6.6,
                depth: 5,
                beltCount: 1,
                cellsDepth: 2,
                unitNo: 2
            },
            {
                id: 5,
                name: 'Islak Mendil',
                symbol: 'I',
                dir: 'left',
                width: 9.5,
                depth: 25,
                beltCount: 2,
                cellsDepth: 10,
                unitNo: 3
            },
            {
                id: 6,
                name: 'Tooth Paste',
                symbol: 'T',
                dir: 'left',
                width: 20,
                depth: 3.6,
                beltCount: 3,
                cellsDepth: 2,
                unitNo: 3
            },
            {
                id: 7,
                name: 'Cafe Crown',
                symbol: 'C',
                dir: 'right',
                width: 7,
                depth: 10.5,
                beltCount: 1,
                cellsDepth: 5,
                unitNo: 4
            },
            {
                id: 8,
                name: 'Gofret',
                symbol: 'G',
                dir: 'left',
                width: 18,
                depth: 3.5,
                beltCount: 3,
                cellsDepth: 2,
                unitNo: 1
            },
            {
                id: 9,
                name: 'Çıkolata',
                symbol: 'Ç',
                dir: 'left',
                width: 13,
                depth: 9.2,
                beltCount: 2,
                cellsDepth: 4,
                unitNo: 3
            },
            {
                id: 10,
                name: 'Domates Salçası',
                symbol: 'D',
                dir: 'right',
                width: 10,
                depth: 10,
                beltCount: 2,
                cellsDepth: 4,
                unitNo: 4
            },
            {
                id: 11,
                name: 'Ülker Laviva',
                symbol: 'Ü',
                dir: 'left',
                width: 15,
                depth: 2.6,
                beltCount: 3,
                cellsDepth: 2,
                unitNo: 1
            },
            {
                id: 12,
                name: 'Coka Cola',
                symbol: 'K',
                dir: 'left',
                width: 5.8,
                depth: 5.8,
                beltCount: 1,
                cellsDepth: 3,
                unitNo: 1
            },
        ];
        let order1 = [
            { id: 12, quantity: 1 },
            { id: 1, quantity: 2 },
            { id: 7, quantity: 1 },
            { id: 10, quantity: 1 },
            { id: 4, quantity: 1 },
            { id: 5, quantity: 1 },
            { id: 6, quantity: 1 },
            { id: 8, quantity: 1 },
            { id: 3, quantity: 1 },
            { id: 11, quantity: 1 },
        ];
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
            let productName = name.name;
            let beltCount = name.beltCount;
            let cellsDepth = name.cellsDepth;
            let symobl = name.symbol;
            //console.log('ProductID ', id, 'quan', quantity, 'name', name.name);

            order2.push({ id, quantity, name, productName, symobl, beltCount, cellsDepth })
        });        
        let cells = Array(110).fill(1); 
        cells = this.fillBoard(order2,cells);
        this.state = {
            cells: cells,
            xIsNext: true,
            products: products,
            order: order2
        };

    }
    fillBoard(order2,cells){
        cells[1]=3;
        return cells;
    }
    handleClick(i) {
    }
    renderCell(i) {
        return <Cell
            value={this.state.cells[i]}
            onClick={() => this.handleClick(i)}
        />;
    }

    render() {


        console.log('I am sending this', this.state.order);
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
                
                <Col>

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