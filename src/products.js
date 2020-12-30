import React from 'react';

class Products extends React.Component {
    state = {
        products: [                                                     
        ]
    }
    render() {
       return this.props.products.map((product) => (
           <h5 key={product.id} > { product.id}. { product.name} {product.symbol} - {product.beltCount} Belt Count - {product.cellsDepth} Cells Depth </h5>
       ));
    }
}

export default Products;