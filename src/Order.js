import React from 'react';

class Order extends React.Component {
    state = {
        order : this.props.order,
        products: this.props.products
    }
    sortOrder(order){
        return order;
    }
    render() {
        let orderSorted = this.props.order;
        let finalOrder = this.sortOrder(orderSorted);
        return finalOrder.map((product) => (
            <h5 key={product.name.id} > { product.name.name} { product.quantity} pcs</h5>
        ))
    };
}

export default Order;