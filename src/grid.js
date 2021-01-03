import React from 'react';
import Cell from './Cell.js';

class Grid extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			cells: this.props.cells
		}
	}
	renderCell = (id) => {
		this.props.renderCell(id);
	}
	render() {
		return (

			<
			div className = "board-row" >

			<
			/div>
		);
	}

}


export default Grid;