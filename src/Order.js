import React from 'react';

class Order extends React.Component {
    constructor(props) {
        super(props);
        //console.log('before everything', this.props.order);
        this.state = {   
            order : this.props.order,
            products: this.props.products
        }
    }

    render() {
        return this.props.order.map((product) => (
            <h5 key={product.name.id} > { product.name.name}  - { product.quantity} pcs - { product.name.dir}  - { product.name.beltCount}  - { product.name.cellsDepth} Depth </h5>
        ))
    };
}

export default Order;