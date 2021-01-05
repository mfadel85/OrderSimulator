import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';


class Products extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            quantity:0
        }
    }
    onClick = (event) => {
        this.props.addProduct(event.target.id);
        event.preventDefault();
    }
    
    setQuantity(e){
        alert(e.target.value);
        /*this.setState({
            quantity : e.target.value
        })*/
        e.stopPropagation();
    }
    render() {
       return this.props.products.map((product) => (
           <ListGroup.Item className='itemProduct' key={product.id} id={product.id}
               onClick={this.onClick}> 
           { product.id}. { product.name} {product.symbol} 
           - {product.beltCount} Belt Count 
           - {product.cellsDepth} Cells Depth
            {/*<input className='quantity' onClick={ this.setQuantity} ></input>*/}
            </ListGroup.Item>
       ));
    }
}

export default Products;