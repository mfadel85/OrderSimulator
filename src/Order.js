import React from 'react';

class Order extends React.Component {
    state = {
        order : this.props.order,
        products: this.props.products
    }
    render() {
        return this.props.order.map((product) => (
            <h5 key={product.name.id} > { product.name.name} { product.quantity} pcs</h5>
        ))
    };
}

export default Order;