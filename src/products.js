import React from 'react';

class Products extends React.Component {
    state = {
        products: [                                                     
        ]
    }
    render() {
       return this.props.products.map((product) => (
           <h6 key={product.id} > { product.id}. { product.name} {product.symbol} - {product.beltCount} Belt Count - {product.cellsDepth} Cells Depth </h6>
       ));
    }
}

export default Products;