import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';


class Products extends React.Component {
    constructor(props) {
        super(props);
    }
    onClick = (event) => {
        this.props.addProduct(event.target.id);
        event.preventDefault();
    }
    render() {
       return this.props.products.map((product) => (
           <ListGroup.Item key={product.id} id={product.id}
               onClick={this.onClick}> 
           { product.id}. { product.name} {product.symbol} 
           - {product.beltCount} Belt Count 
           - {product.cellsDepth} Cells Depth
            </ListGroup.Item>
       ));
    }
}

export default Products;