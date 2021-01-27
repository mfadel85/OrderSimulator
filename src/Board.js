import React from "react";
import Products from "./products.js";
import Grid from "./grid.js";
import NextPatch from "./nextPatch";
import Order from "./Order.js";
import Cell from "./Cell.js";
import "bootstrap/dist/css/bootstrap.min.css";
import { Table, Card, Row, Col, ListGroup, ButtonToolbar,ButtonGroup,Button } from "react-bootstrap";
import { allProducts, allOrders, testingOrders } from "./data.js";
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
			nextPatchProducts: 0,
			fillingGuide: [['SE', 1], ['SE', 1], ['SE', 1], ['SE', 1], ['SE', 1]],
			beltIndices: [0, 0, 0, 0, 0],
			myOrder: [],
			orderID:-1,
			myOrderWithName: [],
			fillingPercent: 0,
			time:0,
			lastPosition:1,
			twicy: 0,
			lastUnitPos:1,
			algorithm:1,
			threeBeltsIndex:-1,
			counter:24,
			orderCellsCount:0,
			orderCoverage:0,
			axesLastPosition:1,
			results:[],
		};
	}
	sortProduct(a, b) {
		if (a.beltCount != b.beltCount) 
			return a.beltCount - b.beltCount;
		else {
			if (a.beltCount == 2 || a.beltCount == 4) 
				return b.unitNo - a.unitNo;	
			else 
				return a.unitNo - b.unitNo;
		}
	}
	sortProduct2(a,b){
		if (a.beltCount < 3 && b.beltCount < 3 ||  (a.beltCount == b.beltCount  == 4 ) )
			return a.unitNo - b.unitNo;
		else{
			if (a.beltCount != b.beltCount)
				return a.beltCount - b.beltCount;
			else 
				return b.unitNo - a.unitNo;	
				
		}

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
				sorterFunction = this.sortProduct2;
				break;				
			default:

				sorterFunction = this.sortProduct;
				break;	
		}
		console.log('Sorter Function: ', sorterFunction);
		return sorterFunction;
	}
	getFillFunction() {
		let fillFunction;
		console.log('Algorithm: ', this.state.algorithm);
		switch (this.state.algorithm) {
			case '1':
				fillFunction = this.fillBoard;
				break;
			case '2':
				fillFunction = this.fillBoard2;
				break;
			case '3':
				fillFunction = this.fillBoard3;
				break;
			default:

				fillFunction = this.fillBoard;
				break;
		}
		//console.log('Filler Function: ', fillFunction);
		return fillFunction;
	}
	setOrder(orderID) {
		this.clearMyOrder();
		var t0 = performance.now()
		let orderReady = [];
		if (orderID == -1) 
			orderReady = this.initOrder(this.state.myOrder);
		else 
			orderReady = this.initOrder(testingOrders[orderID]);
		console.log("setOrder:", orderReady);
		const sorterFunction = this.getSortFunction();
		orderReady.sort(sorterFunction); /// changing sorting function based on the algorithm
		var t1 = performance.now()
		let time = 0;
		let position = 1;
		orderReady.forEach(element => {
			time += 3 + Math.abs(element.name.unitNo -position)*2;
			position = element.name.unitNo;
		});
		let fillBoardFunction = this.getFillFunction();
		this.setState(
			{
				cells: Array(this.state.cellsInBent * this.state.cellsInRow).fill(null),
				order: orderReady,
				orderID:orderID+1,
				time:time,
				twicy: 0,
				beltIndices: [0, 0, 0, 0, 0],
				nextPatchProducts:0,
				threeBeltsIndex:-1,
				fillingGuide: [['SE', 1], ['SE', 1], ['SE', 1], ['SE', 1], ['SE', 1]],
				/*orderCellsCount:0*/
			},
			() => {
				fillBoardFunction(this);/// changing algorithm
			}
		);
		var t2 = performance.now();
		
	/*	const newResult = [this.state.algorithm,this.state.order,this.state.orderID,this.state.fillingPercent,this.state.time,t2-t0];
		const result = [this.state.orderID, this.state.algorithm, this.state.time, this.state.fillingPercent, this.state.orderCellsCount, this.state.orderCoverage];
		var clonedArr1 = result.slice();

		const immutableResult = JSON.stringify(clonedArr1);
		this.setState({
			results: [...this.state.results, immutableResult]
		});*/
		

		document.getElementById('log').innerHTML += 
			"<br>Order"+orderID+
			" alogorithm "+ this.state.algorithm+
			" TIME:"+ this.state.time +
			',Execution Time :' + (t2 - t0) + " milliseconds.";
	}

	initOrder(order) {
		console.log("initOrder:");
		let cellsCount = 0;
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
			cellsCount = cellsCount + beltCount*cellsDepth;
			let symbol = name.symbol;
			let unitNo = name.unitNo;
			finalOrder.push({id,quantity,name,productName,symbol,beltCount,cellsDepth,unitNo});
		});
		this.setState({
			orderCellsCount:cellsCount,
			orderCoverage: cellsCount/110
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
			threeBeltsIndex:-2,
			beltIndices: [0, 0, 0, 0, 0],
		},
		()=>console.log('after cleraing',this.state.order));
	}
	detectThreeBeltIndex(){
		let result = -1;
		const fillingGuide = this.state.fillingGuide;
		for(let i=0;i<=2;i++){
			let results = [3, 5, 9].filter(x => x == fillingGuide[i][1] + fillingGuide[i+1][1] + fillingGuide[i+2][1]);
			if (results.length > 0)
			 	return i;
		}
		return result;
	}
	decideStartIndex2(startIndex,beltCount){// startIndex for Algorithm2
		/// fix this
		let index = this.updateBeltsStatus();
		console.log('decideStartIndex2()0: StartIndex:', startIndex, 'Belt Count:', beltCount);
		if (startIndex > 4 || startIndex + beltCount > this.state.cellsInRow)
			startIndex = 0;
		switch (beltCount) {
			case 5:
				startIndex = 0;
				break;
			case 4:
				let max = this.getMaxnBelt();
				if (max == 0)
					startIndex = 1;
				else
					startIndex = 0;
				break;
			case 3: // a bug in order 9
				let result = this.detectThreeBeltIndex();
				if (this.state.threeBeltsIndex!= -1)
					startIndex = this.state.threeBeltsIndex;
				if(result != -1)
					startIndex = result;

				//startIndex = 2; 
				//the cases to be handle  [1 2 2], [2 2 1],[131] ,[311],[113]
				/*if (this.state.fillingGuide[0][1] == 2)
					startIndex = 2; 
				else if (this.state.fillingGuide[startIndex][0] == 'E')
				   startIndex = startIndex -1;*/
			break;
			case 2:// check filling guide whether this startIndex is S or SE or E startIndex should not exceed 4
				if(this.state.fillingGuide[startIndex][0] == 'E' )
					if(startIndex>2)
						startIndex--;
					else
						startIndex++;
				else if (this.state.fillingGuide[startIndex][0] == 'SE' 
					&& this.state.fillingGuide[startIndex+1][0] == 'S')
						startIndex++;
			break;
			case 1:
				const min = this.getMinBelt();
				//console.log('decideStartIndex2()0: beltIndices:', this.state.beltIndices, 'Min:', min);
				startIndex = min;
			break;
			default:
			break;
		}

		
		return startIndex;
	}
	decideStartIndex3(startIndex,beltCount,cellsDepth=1){
		console.log('decideStartIndex3()0: StartIndex:', startIndex, 'Belt Count:', beltCount);
		let index = this.updateBeltsStatus();
		if (startIndex > 4 || startIndex + beltCount >= this.state.cellsInRow)
			startIndex = 0;
		switch(beltCount){
			case 5:
				startIndex =0;
			break;
			case 4:
				let max = this.getMaxnBelt();
				if (max == 0)
					startIndex = 0;
				else
					startIndex = 0;
			break;		
			case 3:
				startIndex = 2;
			break;
			case 1:
				startIndex = this.getAlgo3ProductsWith1BeltIndex(startIndex,cellsDepth);
			break;
			case 2:
				startIndex = this.getAlgo3ProductsWith2BeltIndex(startIndex,cellsDepth);
			break;
			default:
			break;
		}
		return startIndex;

	} 
	getAlgo3ProductsWith1BeltIndex(startIndex,cellsDepth){
		
		const thirdBeltIndex = this.getBeltCurrentDepth(2);
		const fourthBeltIndex = this.getBeltCurrentDepth(3);
		const fifthBeltIndex = this.getBeltCurrentDepth(4);

		let threeDepth = this.nBeltProductsDepth(3);
		let fourDepth = this.nBeltProductsDepth(4);
		if (this.state.orderCellsCount > 110){
			fourDepth = 0;
			//threeDepth = 0;
		}
		if(startIndex> 2)
			startIndex =2;
		if (thirdBeltIndex + fourDepth + threeDepth + cellsDepth <= 22 )
			startIndex =2;
		else{
			if(fourthBeltIndex >= fifthBeltIndex)
				startIndex = 3;
			else 
				startIndex = 4;
		} 
			

		return startIndex;
	}
	getAlgo3ProductsWith2BeltIndex(startIndex,cellsDepth){
		const firstBeltIndex = this.getBeltCurrentDepth(0);
		let threeDepth = this.nBeltProductsDepth(3);
		let fourDepth = this.nBeltProductsDepth(4);
		if (this.state.orderCellsCount > 110) {
			fourDepth = 0;
			threeDepth = 0;
		}
		if (firstBeltIndex + fourDepth + cellsDepth <= 22 )
			return 0;
		else
		   return 3;
	}
	nBeltProductsDepth(n){
		let depth = 0;
		this.state.order.forEach(item => {
			if(item.beltCount == n)
				depth= depth+item.cellsDepth;
		});
		return depth;
	}

	decideStartIndex(startIndex,beltCount){
		console.log('decideStartIndex()0: StartIndex:',startIndex,'Belt Count:',beltCount);
		let index = this.updateBeltsStatus();
		if (startIndex > 4 || startIndex + beltCount >= this.state.cellsInRow)
			startIndex = 0;
		switch (beltCount) {
			case 5:
				startIndex=0;
			break;
			case 4:
				let max = this.getMaxnBelt();
				if(max == 0)
					startIndex =1;
				else
					startIndex =0;
			break;
			case 3:
				startIndex = 2;
				break;
			case 2:
				if (this.state.twicy !== -1) {
					startIndex = index;
				}
				else 
					if (startIndex % 2 === 1)
						startIndex = startIndex + 1;
			break;
			case 1:
				startIndex = this.getMinBelt();
				break;
			default:
				break;
		}
		console.log('decideStartIndex()1: beltIndices', ...this.state.beltIndices, 'twicy is', this.state.twicy, 'current twicy', index,'startIndex',startIndex);
		return startIndex;
	}
	handleProduct3(item,startIndex){
		let filledCount =0;
		const originalStartIndex = startIndex;
		let currentcells = [...this.state.cells];
		console.log("handleProduct3 0: startIndex is ", startIndex, 'product is:', item);
		startIndex = this.decideStartIndex3(startIndex, item.beltCount,item.cellsDepth);
		console.log("handleProduct3 1: startIndex is ", startIndex);
		let available = this.checkSpace(
			startIndex,
			item.beltCount,
			item.cellsDepth
		);		
		if (available) {
			startIndex = this.shiftCells(startIndex, item); // returns startIndexed changed, 
			this.state.cells.forEach((cell) => {
				if (cell != null) filledCount++;
			});
			this.setState({
				cells: this.state.cells,
				index: startIndex,
				fillingPercent: (filledCount * 1.0) / (this.state.cellsInBent * this.state.cellsInRow * 1.0),
				history: [
					...this.state.history, { cells: currentcells }, { cells: this.state.cells }
				],
				lastPosition: item.unitNo			
			}, () => {
			});
		} else {
			this.setState({
				nextPatchProducts: this.state.nextPatchProducts+1,
			});
			console.log("no space for ", item, 'Next Patch Products', this.state.nextPatchProducts);
			startIndex = originalStartIndex;
		}
		return startIndex;
	}
	handleNextProduct(item,startIndex){
		let filledCount = 0;

		const originalStartIndex = startIndex;
		let currentcells = [...this.state.cells];
		console.log("handleNextProduct0: startIndex is ", startIndex, 'product is:', item);
		startIndex = this.decideStartIndex2(startIndex,item.beltCount);
		console.log("handleNextProduct: startIndex is ", startIndex);
		let available = this.checkSpace(
			startIndex,
			item.beltCount,
			item.cellsDepth
		);
		if (available) {
			const threeBeltsIndex = startIndex;
			startIndex = this.shiftCells(startIndex, item); // returns startIndexed changed, 
			
			this.state.cells.forEach((cell) => {
				if (cell != null) filledCount++;
			});
			this.setState({
				cells: this.state.cells,
				index: startIndex,
				fillingPercent: (filledCount * 1.0) / (this.state.cellsInBent * this.state.cellsInRow * 1.0),
				history: [
					...this.state.history, { cells: currentcells }, { cells: this.state.cells }
				],
				lastPosition: item.unitNo,
				threeBeltsIndex: threeBeltsIndex
			}, () => {
			});
		} else {
			//alert("no space for " + item.productName);

			this.setState({
				nextPatchProducts: this.state.nextPatchProducts+1,
			});
			console.log("no space for ", item,'Next Patch Products',this.state.nextPatchProducts);
			startIndex = originalStartIndex;
		}
		return startIndex;
	}
	handleOneProduct(item, startIndex) {
		let filledCount = 0;
		const originalStartIndex = startIndex;
		let currentcells = [...this.state.cells];
		console.log("handleOneProduct0: startIndex is ", startIndex,'product is:',item);

		startIndex = this.decideStartIndex(startIndex,item.beltCount);

		console.log("handleOneProduct1: startIndex is ", startIndex);
		let available = this.checkSpace(
			startIndex,
			item.beltCount,
			item.cellsDepth
		);
		let nextPatch;
		if (available) {
			nextPatch = false;
			startIndex = this.shiftCells(startIndex, item); // returns startIndexed changed, 

			this.state.cells.forEach((cell) => {
				if (cell != null) filledCount++;
			});
			this.setState({
				cells: this.state.cells,
				index: startIndex,
				fillingPercent: (filledCount * 1.0) /(this.state.cellsInBent * this.state.cellsInRow * 1.0),
				history: [
					...this.state.history,{cells: currentcells},{cells: this.state.cells}
				],
				lastPosition: item.unitNo,
			});
		} else {
			nextPatch = true;
			//alert("no space for " + item.productName);
			this.setState({
				nextPatchProducts: this.state.nextPatchProducts+1,
			});
			console.log("no space for ", item, 'Next Patch Products', this.state.nextPatchProducts);
			startIndex = originalStartIndex;
		}
		/// this could return nextPatchProducts also,the count of them and many other things
		return [startIndex,nextPatch];
	}
	getMinBelt(){
		let currentBeltIndices = [0, 0, 0, 0, 0];
		for (let i = 0; i < this.state.cellsInRow; i++)
			for (let j = 21; j >= 0; j--) {
				if (this.state.cells[j * 5 + i] != null) {
					currentBeltIndices[i] = j + 1;
					break;
				}
			}

		const min = currentBeltIndices.indexOf(Math.min(...currentBeltIndices));
		return min;
	}
	getBeltCurrentDepth(n){
		let currentBeltIndex = 0;
		for (let j = 21; j >= 0; j--) {
			if (this.state.cells[j * 5 + n] != null) {
				currentBeltIndex = j + 1;
				break;
			}
		}
		return currentBeltIndex;
	}
	getMaxnBelt() {
		let currentBeltIndices = [0, 0, 0, 0, 0];
		for (let i = 0; i < this.state.cellsInRow; i++)
			for (let j = 21; j >= 0; j--) {
				if (this.state.cells[j * 5 + i] != null) {
					currentBeltIndices[i] = j + 1;
					break;
				}
			}

		const max = currentBeltIndices.indexOf(Math.max(...currentBeltIndices));
		return max;
	}	
	updateBeltsStatus(cells = this.state.cells) {
		let currentBeltIndices = [0,0,0,0,0];
		let beltIndices = this.state.beltIndices;
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
			}
		);
		return twicy;
	}

	fillBoard(context) {// this is to refactored soon!!
		let nextPatchCount = 0;
		console.log('fillBoard algo 1');
		let startIndex = 0;
		let that = context;
		context.state.order.forEach(function (item) {
			for (let m = 0; m < item.quantity; m++) {
				let result = that.handleOneProduct(item, startIndex);
				startIndex = result[0];
				if(result[1])
				  nextPatchCount++;
			}
		});
		context.setState({ nextPatchProducts:nextPatchCount});
		console.log("Exec State", context.state,"Next Patch",nextPatchCount);

	}
	fillBoard3(context){
		console.log('4 belts depth: ', context.nBeltProductsDepth(4));
		console.log('Fillboard algo 3');
		let startIndex = 0;
		let that = context;
		context.state.order.forEach(function(item){
			for (let m = 0; m < item.quantity; m++) {
				startIndex = that.handleProduct3(item, startIndex);
				console.log("context : startIndex is ", startIndex, 'beltIndices:', that.state.beltIndices);
			}
		});
		console.log("Exec State", context.state);

	}
	fillBoard2(context) {
		console.log('fillBoard algo 2');
		let startIndex = 0;
		let that = context;
		context.state.order.forEach(function (item) {
			for (let m = 0; m < item.quantity; m++) {
				startIndex = that.handleNextProduct(item, startIndex);
				console.log("context : startIndex is ", startIndex, 'beltIndices:', that.state.beltIndices);
			}
		});
		console.log("Exec State", context.state);

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
	updateFillingGuide(startIndex,beltCount){
		let fillingGuide = this.state.fillingGuide;
		switch (beltCount) {
			case 2:// check if the second one is a part of  another 2
				if (fillingGuide[startIndex][1] == 1)
				{
					for(let i=0;i<beltCount;i++)
					{
						fillingGuide[startIndex] = ['S', 2];
						fillingGuide[startIndex + 1] = ['E', 2];
					}
				}	
				break;
			case 3:
				if(fillingGuide[startIndex][1]<3){ // handle case of  1 2 2? then 
					fillingGuide[startIndex] = ['S', 3];
					fillingGuide[startIndex + 1] = ['S', 3];
					fillingGuide[startIndex + 2] = ['E', 3];
				}
			default:
				break;
		}
		this.setState({
			fillingGuide:fillingGuide
		})
	}
	shiftCells(startIndex, item) {
		// if the item is one belt product and in that index there is a two belt product what to do
		// how to detect this?? mmmm                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
		let indicesUpdated = [];
		for (let m = 0; m < item.beltCount*item.cellsDepth; m++) 
			indicesUpdated.push(false);
		this.updateFillingGuide(startIndex,item.beltCount);
		let currentCells = this.state.cells;
		const cellsInRow = this.state.cellsInRow;
		let count = 0;
		const direction = item.name.dir;
		let beltCount;
		if(item.beltCount>3)
		   beltCount = 5;
		else 
			beltCount = item.beltCount;
		
		if (direction === "left") {
			for (let i = 0; i < item.cellsDepth; i++)
				for (let j = this.state.cellsInBent-1 ; j > 0; j--)
					for (let k = 0; k < beltCount; k++) {
						let index = startIndex + (j) * cellsInRow + k;
						count = count + 1;
						currentCells[index] = currentCells[index - cellsInRow];//
						currentCells[index - cellsInRow] = "(L) " + item.symbol;
						// to be tested
						if (item.beltCount == 1 && this.state.fillingGuide[startIndex][1] == 2 && currentCells[index] != null)
							if (this.state.fillingGuide[startIndex][0]=='S'){
								currentCells[index+1] = currentCells[index+1 - cellsInRow];//
								currentCells[index+1 - cellsInRow] = '';								
							}
							else if (this.state.fillingGuide[startIndex][0] == 'E') {
								currentCells[index -1] = currentCells[index-1 - cellsInRow];//
								currentCells[index - 1 - cellsInRow] = '';
							}
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
		startIndex = startIndex + item.beltCount;
		return startIndex;
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
			
	}
	exportResult(){
		///prepare the data first
		// orderID,algorithm, time,fillingPercentage, order cell count, order coverage
		const result = { 
			orderID:this.state.orderID, 
			algorithm:this.state.algorithm, 
			timing:this.state.time, 
			filling:this.state.fillingPercent, 
			orderSize:this.state.orderCellsCount, 
			coverage:this.state.orderCoverage
		};
		var clonedArr1 = Object.assign({}, result);

		const immutableResult = JSON.stringify(clonedArr1);
		this.setState({
			results:[...this.state.results,immutableResult]
		})
		console.log(immutableResult);
		this.clearMyOrder();
	}
	compare(){
		this.setState(
			{
				algorithm: 1
			},
			() => {
				this.setOrder(allOrders.length - 1);
				console.log("Automated TEST", this.state.fillingPercent, this.state.time);
				this.exportResult();

			}
		);
		this.setState(
			{
				algorithm: 2
			},
			() => {
				this.setOrder(allOrders.length - 1);
				console.log("Automated TEST", this.state.fillingPercent, this.state.time);
				this.exportResult();

			}
		);
		this.setState(
			{
				algorithm: 3
			},
			() => {
				this.setOrder(allOrders.length - 1);
				console.log("Automated TEST", this.state.fillingPercent, this.state.time);
				this.exportResult();

			}
		);			
	}
	chooseAlgorithm(event){
		console.log('key: ', event.target.attributes.getNamedItem('data-key').value);
		const key = event.target.attributes.getNamedItem('data-key').value;
		if(key == 4){
			// choose a random number between 1 and 50 and 
			// this.setOrder(5) for the three algorithms and have the results
		}
		else
			this.setState({
				algorithm: key
			},
				() => { console.log('chooseAlgorithm : algo', this.state.algorithm) }
			);
	}
	saveJson(){
		var myJson = JSON.stringify(allOrders);
		//console.log(myJson);
	}
	readOrders(that) {
		that.clearMyOrder();
		console.log(allOrders);
		console.log(testingOrders);
		that.setOrder(this.state.counter);
		let newCounter = this.state.counter +1;
		if(newCounter > 49)
			newCounter = 0;
		that.setState({
			counter:newCounter
		});
	}	

	onKeyDownHandler = e => {
		if (e.keyCode === 70) {
			this.readOrders();
		}
	};
	render() {	
		return (
			<Row onKeyDown={this.onKeyDownHandler}>
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
					<Button onClick={() => this.compare()} >Compare</Button>

				</Col>
				<Col xs={4} md={4}>
					<Card>
						<Card.Title> 
							Order  {this.state.orderID} 
							Algorithm: {this.state.algorithm} 							
							<button onClick={() => this.exportResult()}>Export Result </button>
						</Card.Title>
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
							<button onClick={() => this.setOrder(9)}>Order 10 </button>
							<button onClick={() => this.setOrder(10)}>Order 11 </button>
							<button onClick={() => this.setOrder(11)}>Order 12 </button>
							<button onClick={() => this.setOrder(12)}>Order 13 </button>
							<button onClick={() => this.setOrder(13)}>Order 14 </button>
							<button onClick={() => this.setOrder(14)}>Order 15 </button>
							<button onClick={() => this.setOrder(15)}>Order 16 </button>
							<button onClick={() => this.setOrder(16)}>Order 17 </button>
							<button onClick={() => this.setOrder(17)}>Order 18 </button>
							<button onClick={() => this.setOrder(18)}>Order 19 </button>
							<button onClick={() => this.setOrder(19)}>Order 20 </button>
							<button onClick={() => this.setOrder(20)}>Order 21 </button>
							<button onClick={() => this.setOrder(21)}>Order 22 </button>
							<button onClick={() => this.setOrder(22)}>Order 23 </button>
							<button onClick={() => this.setOrder(23)}>Order 24 </button>

							<div>
								<span>No Space For: {this.state.nextPatchProducts} Products.</span>
								<Table striped bordered hover>
									<tbody>
										{/*<NextPatch order={this.state.nextPatchProducts}>
									</NextPatch>*/}
									</tbody>
								</Table>
							</div>
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
							
							<button onClick={() => this.readOrders(this)}>Get Orders</button>  
							<button onClick={() => this.clearMyOrder()}> Clear Order </button>
							<button onClick={() => this.setOrder(-1)}> Pick Order </button>
							<button onClick={this.saveJson()}>Export Orders</button>
							<button onClick={() => this.generateRandom()}>Random Order </button>

							<div>
								<span>Order Cells: {this.state.orderCellsCount} / 110 - Order Cover: {this.state.orderCoverage }</span>
							</div>
						</Card.Body>
						
					</Card>
					<Card id= "log">

					</Card>
				</Col>
			</Row>
		);
	}
}
export default Board;