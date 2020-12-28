import React from 'react';

class Order extends React.Component {
    constructor(props) {
        super(props);
        this.state = {   
            order : this.props.order,
            products: this.props.products
        }
    }
    sortOrder(order){
        /// order by bent count
        //let products = this.state.products;
        let sortedOrder = [];
        order.forEach(function(item){
            console.log("item",item);
        });
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