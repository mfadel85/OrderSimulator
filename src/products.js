import React from 'react';

class Products extends React.Component {
    state = {
        products: [                                                     
        ]
    }
    render() {
       return this.props.products.map((product) => (
           <h5 key={product.id} > { product.id}. { product.name }</h5>
       ));
    }
}

export default Products;