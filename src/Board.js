import React from "react";
import Products from "./products.js";
import Grid from "./grid.js";

import Order from "./Order.js";
import Cell from "./Cell.js";
import "bootstrap/dist/css/bootstrap.min.css";
import { Table, Card, Row, Col, ListGroup, ButtonToolbar,ButtonGroup,Button } from "react-bootstrap";
import { allProducts, allOrders } from "./data.js";
class Board extends React.Component {
	constructor(props) {
		super(props);
		let cellsInBelt = 22;
		let cellsInRow = 5;

		let order = [];
		let cells = Array(cellsInBelt * cellsInRow).fill(null);
		const initialCells = JSON.parse(JSON.stringify(cells));

		this.state = {
			cellsInRow: cellsInRow,
			cellsInBent: cellsInBelt,
			cells: cells,
			xIsNext: true,
			products: allProducts,
			order: order,
			history: [
				{
					cells: initialCells,
				},
			],
			nextPatchProducts: [],
			beltIndices: [0, 0, 0, 0, 0],
			myOrder: [],
			myOrderWithName: [],
			fillingPercent: 0,
			time:0,
			lastPosition:1,
			twicy: 0,
			lastUnitPos:1,
			algorithm:1
		};
	}
	sortProduct(a, b) {
		if (a.beltCount != b.beltCount) 
			return a.beltCount - b.beltCount;
		else 
			return a.unitNo - b.unitNo;
	}
	sortProduct2(a,b){
		if (a.beltCount < 3 && b.beltCount < 3 ||  a.beltCount == b.beltCount)
			return a.unitNo - b.unitNo;
		else
			return a.beltCount - b.beltCount;

		// if a has 1 belt count  or 2 belt couts then 
	}
	sortProduct3(a, b) {
	}
	getSortFunction(){
		let sorterFunction;
		console.log('Algorithm: ',this.state.algorithm);
		switch (this.state.algorithm) {
			case '1':
				sorterFunction = this.sortProduct;
				break;
			case '2':

				sorterFunction = this.sortProduct2;
				break;
			case '3':
				sorterFunction = this.sortProduct3;
				break;				
			default:

				sorterFunction = this.sortProduct;
				break;	
		}
		console.log('Sorter Function: ', sorterFunction);

		return sorterFunction;
	}
	setOrder(orderID) {
		
		let orderReady = [];
		if (orderID == -1) 
			orderReady = this.initOrder(this.state.myOrder);
		else 
			orderReady = this.initOrder(allOrders[orderID]);
		console.log("setOrder:", orderReady);
		const sorterFunction = this.getSortFunction();
		orderReady.sort(sorterFunction); /// changing sorting function based on the algorithm

		let time = 0;
		let position = 1;
		orderReady.forEach(element => {
			time += 3 + Math.abs(element.name.unitNo -position)*2;
			position = element.name.unitNo;
		});
		this.setState(
			{
				cells: Array(this.state.cellsInBent * this.state.cellsInRow).fill(null),
				order: orderReady,
				time:time,
				twicy: 0,
				beltIndices: [0, 0, 0, 0, 0],

				/*lastPosition:1*/
			},
			() => {

				this.fillBoard();/// changing algorithm
			}
		);
	}

	initOrder(order) {
		console.log("initOrder:");

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
			let unitNo = name.unitNo;
			finalOrder.push({id,quantity,name,productName,symbol,beltCount,cellsDepth,unitNo});
		});

		return finalOrder;
	}
	clearMyOrder() {
		//alert('order cleared');
		this.setState({
			myOrder: [],
			myOrderWithName: [],
			cells: [],
			fillingPercent: 0,
			order: [],
			twicy:0,
			beltIndices: [0, 0, 0, 0, 0],
		},
		()=>console.log('after cleraing',this.state.order));
	}
	decideStartIndex(startIndex,beltCount){
		console.log('decideStartIndex()0: StartIndex:',startIndex,'Belt Count:',beltCount);
		let index = this.updateBeltsStatus();
		if (startIndex > 4 || startIndex + beltCount >= this.state.cellsInRow)
			startIndex = 0;
		switch (beltCount) {
			case 4,5:
				startIndex=0;
			case 3:
				startIndex = 2;
				break;
			case 1:
				if ( startIndex == 4)
					startIndex = 4;
			case 2:
				if (startIndex % 2 === 1)
					startIndex = startIndex + 1;
				else if (this.state.twicy !== -1) {
					startIndex = index;
				}
			default:
				break;
		}
		console.log('decideStartIndex()1: beltIndices', ...this.state.beltIndices, 'twicy is', this.state.twicy, 'current twicy', index,'startIndex',startIndex);
		return startIndex;
	}
	handleOneProduct(item, startIndex) {
		let filledCount = 0;
		let originalStartIndex = startIndex;
		let currentcells = [...this.state.cells];
		console.log("handleOneProduct0: startIndex is ", startIndex,'product is:',item);

		startIndex = this.decideStartIndex(startIndex,item.beltCount);

		console.log("handleOneProduct1: startIndex is ", startIndex);
		let available = this.checkSpace(
			startIndex,
			item.beltCount,
			item.cellsDepth
		);
		if (available) {
			this.shiftCells(startIndex, item);
			startIndex = startIndex + item.beltCount;

			this.state.cells.forEach((cell) => {
				if (cell != null) filledCount++;
			});
			this.setState({
				cells: this.state.cells,
				index: startIndex,
				fillingPercent:(filledCount * 1.0) /(this.state.cellsInBent * this.state.cellsInRow * 1.0),
				history: [
					...this.state.history,{cells: currentcells},{cells: this.state.cells}
				],
				lastPosition:item.unitNo,
				/*time:time*/
			},()=> {

					//console.log("handleOneProduct1: startIndex is ", startIndex, 'beltIndices:', this.state.beltIndices);

					//this.updateBeltsStatus();
			});
			//console.log("History after now ", this.state.history);
		} else {
			this.setState({
				nextPatchProducts: [...this.state.nextPatchProducts, item],
			});
			//alert("No space for " + item.productName + " will be added in the next patch.");
			console.log("no space for ", item);
			startIndex = originalStartIndex;
		}

		return startIndex;
	}
	updateBeltsStatus(cells = this.state.cells) {
		let currentBeltIndices = [0,0,0,0,0];
		let beltIndices = this.state.beltIndices;
		console.log('updateBeltsStatus()0', beltIndices);
		for (let i = 0; i < this.state.cellsInRow; i++)
			for (let j = 21; j >= 0; j--) {
				if (cells[j * 5 + i] != null) {
					currentBeltIndices[i] = j + 1;
					break;
				}
			}
		let max1 = Math.max(...currentBeltIndices.slice(0, 2));
		let max2 = Math.max(...currentBeltIndices.slice(2, 4));
		let twicy = (max1+4 <= max2 ? currentBeltIndices.indexOf(max1) : currentBeltIndices.indexOf(max2));
		if(twicy%2 !==0)
			twicy = twicy-1;
		this.setState({
			beltIndices: currentBeltIndices,
			twicy: twicy
		}, 
			() => console.log('updateBeltsStatus()1', currentBeltIndices)
		);
		return twicy;
	}

	fillBoard() {// this is to refactored soon!!
		console.log('fillBoard algo 1');
		let startIndex = 0;
		let that = this;
		this.state.order.forEach(function (item) {
			for (let m = 0; m < item.quantity; m++) {
				startIndex = that.handleOneProduct(item, startIndex);
				console.log("fillBoard : startIndex is ", startIndex, 'beltIndices:', that.state.beltIndices);

			}
		});

	}
	updateIndices(index) {
		let indices = this.state.beltIndices;
		let startIndex = index % 5;
		let rowNumber = (index - startIndex) / 5;
		indices[startIndex] = rowNumber;
		this.setState({
			beltIndices: indices,
		});
	}
	fillCellsFromRight(startingPoint, item) {
		let currentCells = this.state.cells;
		for (let i = 0; i < item.cellsDepth; i++)
			for (let j = 0; j < item.beltCount; j++) {
				let index = i * this.state.cellsInRow + j;
				currentCells[startingPoint + index] = item.symbol + ": (R)";
				//this.updateIndices(startingPoint + index);
			}

		this.updateBeltsStatus();
		return currentCells;
	}


	checkSpace(startIndex, beltCount, cellsDepth) {
		let startRow = this.state.cellsInBent - cellsDepth;
		for (let i = startRow; i < this.state.cellsInBent; i++) {
			for (let l = 0; l < beltCount; l++) {
				const index = i * 5 + startIndex + l;
				if (this.state.cells[index] !== null) 
					return false;
			}
		}
		return true;
	}
	shiftCells(startIndex, item) {
		let indicesUpdated = [];
		for (let m = 0; m < item.beltCount*item.cellsDepth; m++) 
			indicesUpdated.push(false);
		let currentCells = this.state.cells;
		const cellsInRow = this.state.cellsInRow;
		let count = 0;
		const direction = item.name.dir;
		if (direction === "left") {
			for (let i = 0; i < item.cellsDepth; i++)
				for (let j = this.state.cellsInBent ; j > 0; j--)
					for (let k = 0; k < item.beltCount; k++) {
						let index = startIndex + (j) * cellsInRow + k;
						count = count + 1;
						currentCells[index] = currentCells[index - cellsInRow];
						currentCells[index - cellsInRow] = "(L) " + item.symbol;
						//this.updateIndices(index);
					}
		} 
		else if (direction === "right") {
			for (let j = 21; j >= 0; j--) {
				let startingPoint = startIndex + j * cellsInRow;
				let valid = true;
				for (let m = 0; m < item.beltCount; m++) {
					if (currentCells[startIndex + j * cellsInRow + m] !== null) {
						valid = false;
						break;
					}
				}
				if (valid && startingPoint < cellsInRow)
					currentCells = this.fillCellsFromRight(startingPoint, item);
				else if (!valid || startingPoint < cellsInRow) {
					startingPoint = startingPoint + cellsInRow;
					currentCells = this.fillCellsFromRight(startingPoint, item);
					break;
				}
			}
		}
		this.setState({
			cells: currentCells,
			history: [...this.state.history,{cells: currentCells}],
		});
		return currentCells;
	}

	renderCell(i) {
		return <Cell value={this.state.cells[i]} />;
	}

	addProduct(id) {
		let item = {id: id,quantity: 1,};
		let itemWithName = {id: id - 1,quantity: 1,name: allProducts[id - 1].name};
		this.setState(
			{
				myOrder: [...this.state.myOrder, item],
				myOrderWithName: [...this.state.myOrderWithName, itemWithName],
				
			},
			() => {this.setOrder(-1);}
		);
	}
	generateRandom(){
		this.clearMyOrder();
		let randomOrder=[];
		for(let i =0;i<14;i++){
			let newItem = { id: Math.floor(Math.random() * 14+1),quantity:1};
			randomOrder.push(newItem);
		}
		allOrders.push(randomOrder);
		this.setOrder(allOrders.length-1);
		console.log(randomOrder);
		/*this.setState({
			myOrder:randomOrder,
			order:randomOrder
		});*/
	}
	chooseAlgorithm(event){
		console.log('key: ', event.target.attributes.getNamedItem('data-key').value);
		this.setState({
			algorithm: event.target.attributes.getNamedItem('data-key').value
		},
			() => { console.log('chooseAlgorithm : algo', this.state.algorithm)});
	}
	render() {	
		return (
			<Row>
				<Col xs={2} md={2}>
					<h3> Products </h3>
					<ListGroup variant="flush">
						<Products
							products={this.state.products}
							addProduct={(id) => this.addProduct(id)}
						/>
					</ListGroup>
					<ButtonGroup aria-label="Basic example" onClick={this.chooseAlgorithm.bind(this)}>
						<Button data-key='1' >Algorithm 1</Button>
						<Button data-key='2'>Alogrithm 2</Button>
						<Button data-key='3' >Alogrithm 3</Button>
					</ButtonGroup>
				</Col>
				<Col xs={4} md={4}>
					<Card>
						<Card.Title> Order </Card.Title>
						<Card.Body>
							<Table striped bordered hover>
								<tbody><tr><th> # </th><th> Name </th><th> Qn </th><th> Dir </th><th> BeltCo </th><th> Cells </th><th>Unit</th></tr>
									<Order
										order={this.state.order}
										products={this.state.products}
									/>
								</tbody>
							</Table>
							{/*{allButtons.map((value) => {
								return <button onclick={() => this.setOrder({ value })}> Order {value+1} </button>
							}) 
							}*/}
							<button onClick={() => this.setOrder(0)}>Order 1 </button>
							<button onClick={() => this.setOrder(1)}>Order 2 </button>
							<button onClick={() => this.setOrder(2)}>Order 3 </button>
							<button onClick={() => this.setOrder(3)}>Order 4 </button>
							<button onClick={() => this.setOrder(4)}>Order 5 </button>
							<button onClick={() => this.setOrder(5)}>Order 6 </button>
							<button onClick={() => this.setOrder(6)}>Order 7 </button>
							<button onClick={() => this.setOrder(7)}>Order 8 </button>
							<button onClick={() => this.setOrder(8)}>Order 9 </button>
							<button onClick={() => this.generateRandom()}>Random Order </button>
							<button onClick={() => this.setOrder(9)}>Order S1 </button>
							<button onClick={() => this.setOrder(10)}>Order S2 </button>
							<button onClick={() => this.setOrder(11)}>Order S3 </button>
							<button onClick={() => this.setOrder(12)}>Order S4 </button>
							<button onClick={() => this.setOrder(13)}>Order S5 </button>
							<button onClick={() => this.setOrder(14)}>Order S6 </button>
							<button onClick={() => this.setOrder(15)}>Order S7 </button>


						</Card.Body>
					</Card>
				</Col>

				<Col xs={3} ms={4}>
					<Cell value={this.state.cells[0]} />
					<Cell value={this.state.cells[1]} />
					<Cell value={this.state.cells[2]} />
					<Cell value={this.state.cells[3]} />
					<Cell value={this.state.cells[4]} />
					<Cell value={this.state.cells[5]} />
					<Cell value={this.state.cells[6]} />
					<Cell value={this.state.cells[7]} />
					<Cell value={this.state.cells[8]} />
					<Cell value={this.state.cells[9]} />
					<Cell value={this.state.cells[10]} />
					<Cell value={this.state.cells[11]} />
					<Cell value={this.state.cells[12]} />
					<Cell value={this.state.cells[13]} />
					<Cell value={this.state.cells[14]} />
					<Cell value={this.state.cells[15]} />
					<Cell value={this.state.cells[16]} />
					<Cell value={this.state.cells[17]} />
					<Cell value={this.state.cells[18]} />
					<Cell value={this.state.cells[19]} />
					<Cell value={this.state.cells[20]} />
					<Cell value={this.state.cells[21]} />
					<Cell value={this.state.cells[22]} />
					<Cell value={this.state.cells[23]} />
					<Cell value={this.state.cells[24]} />
					<Cell value={this.state.cells[25]} />
					<Cell value={this.state.cells[26]} />
					<Cell value={this.state.cells[27]} />
					<Cell value={this.state.cells[28]} />
					<Cell value={this.state.cells[29]} />
					<Cell value={this.state.cells[30]} />
					<Cell value={this.state.cells[31]} />
					<Cell value={this.state.cells[32]} />
					<Cell value={this.state.cells[33]} />
					<Cell value={this.state.cells[34]} />
					<Cell value={this.state.cells[35]} />
					<Cell value={this.state.cells[36]} />
					<Cell value={this.state.cells[37]} />
					<Cell value={this.state.cells[38]} />
					<Cell value={this.state.cells[39]} />
					<Cell value={this.state.cells[40]} />
					<Cell value={this.state.cells[41]} />
					<Cell value={this.state.cells[42]} />
					<Cell value={this.state.cells[43]} />
					<Cell value={this.state.cells[44]} />
					<Cell value={this.state.cells[45]} />
					<Cell value={this.state.cells[46]} />
					<Cell value={this.state.cells[47]} />
					<Cell value={this.state.cells[48]} />
					<Cell value={this.state.cells[49]} />
					<Cell value={this.state.cells[50]} />
					<Cell value={this.state.cells[51]} />
					<Cell value={this.state.cells[52]} />
					<Cell value={this.state.cells[53]} />
					<Cell value={this.state.cells[54]} />
					<Cell value={this.state.cells[55]} />
					<Cell value={this.state.cells[56]} />
					<Cell value={this.state.cells[57]} />
					<Cell value={this.state.cells[58]} />
					<Cell value={this.state.cells[59]} />
					<Cell value={this.state.cells[60]} />
					<Cell value={this.state.cells[61]} />
					<Cell value={this.state.cells[62]} />
					<Cell value={this.state.cells[63]} />
					<Cell value={this.state.cells[64]} />
					<Cell value={this.state.cells[65]} />
					<Cell value={this.state.cells[66]} />
					<Cell value={this.state.cells[67]} />
					<Cell value={this.state.cells[68]} />
					<Cell value={this.state.cells[69]} />
					<Cell value={this.state.cells[70]} />
					<Cell value={this.state.cells[71]} />
					<Cell value={this.state.cells[72]} />
					<Cell value={this.state.cells[73]} />
					<Cell value={this.state.cells[74]} />
					<Cell value={this.state.cells[75]} />
					<Cell value={this.state.cells[76]} />
					<Cell value={this.state.cells[77]} />
					<Cell value={this.state.cells[78]} />
					<Cell value={this.state.cells[79]} />
					<Cell value={this.state.cells[80]} />
					<Cell value={this.state.cells[81]} />
					<Cell value={this.state.cells[82]} />
					<Cell value={this.state.cells[83]} />
					<Cell value={this.state.cells[84]} />
					<Cell value={this.state.cells[85]} />
					<Cell value={this.state.cells[86]} />
					<Cell value={this.state.cells[87]} />
					<Cell value={this.state.cells[88]} />
					<Cell value={this.state.cells[89]} />
					<Cell value={this.state.cells[90]} />
					<Cell value={this.state.cells[91]} />
					<Cell value={this.state.cells[92]} />
					<Cell value={this.state.cells[93]} />
					<Cell value={this.state.cells[94]} />
					<Cell value={this.state.cells[95]} />
					<Cell value={this.state.cells[96]} />
					<Cell value={this.state.cells[97]} />
					<Cell value={this.state.cells[98]} />
					<Cell value={this.state.cells[99]} />
					<Cell value={this.state.cells[100]} />
					<Cell value={this.state.cells[101]} />
					<Cell value={this.state.cells[102]} />
					<Cell value={this.state.cells[103]} />
					<Cell value={this.state.cells[104]} />
					<Cell value={this.state.cells[105]} />
					<Cell value={this.state.cells[106]} />
					<Cell value={this.state.cells[107]} />
					<Cell value={this.state.cells[108]} />
					<Cell value={this.state.cells[109]} />
					<span> Percentage: {this.state.fillingPercent} </span>
					<span> Time: {this.state.time} Seconds </span>
					<span> Twicy: {this.state.twicy}</span>

				</Col>
				<Col xs={2} md={2} >
					<Card>
						<Card.Title> My Order </Card.Title>
						<Card.Body>
							
							{this.state.myOrderWithName.map((product) => (
								<ListGroup.Item className="itemProductCustom" key={product.id}>
									{product.name} - qn: {product.quantity}
								</ListGroup.Item>
							))}
						</Card.Body>
						<button onClick={() => this.setOrder(-1)}> Pick Order </button>
						<button onClick={() => this.clearMyOrder()}> Clear Order </button>
					</Card>
				</Col>
			</Row>
		);
	}
}
export default Board;
