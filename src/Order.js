import React from 'react';

class Order extends React.Component {
    constructor(props) {
        super(props);
        this.state = {   
            order : this.props.order,
            products: this.props.products
        }
        console.log('productts',this.state.products);
        console.log('order', this.state.order)

    }
    sortOrder(order){
        /// order by bent count
        let products = this.state.products;
        let sortedOrder = [];
        order.forEach(function(item){
            console.log("item",item);
            console.log('Name', products[item.name.id - 1].name);
            console.log('Belt Count',products[item.name.id-1].beltCount);
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