import React from 'react';

class Order extends React.Component {
    state = {
        products: [
        ]
    }
    render() {
        return this.props.order.map((product) => (
            <h5 key={product.id} > { product.id}</h5>
        ));
    }
}

export default Order;