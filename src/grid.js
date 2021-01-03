import React from 'react';
import Cell from './Cell.js';

class Grid extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			cells:this.props.cells
		}
	}
	renderCell = (id) => {
		this.props.renderCell(id);
	}	
	render(){
		return(
				
			<div className="board-row">

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

			</div>
		);
	}

}


export default Grid;