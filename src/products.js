import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';


class Products extends React.Component {
    state = {
        products: [                                                     
        ]
    }
    render() {
       return this.props.products.map((product) => (
           <ListGroup.Item> { product.id}. { product.name} {product.symbol} - {product.beltCount} Belt Count - {product.cellsDepth} Cells Depth </ListGroup.Item>
       ));
    }
}

export default Products;