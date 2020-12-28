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
    sortProduct(a,b){
        if(a.beltCount > b.beltCount)
            return 0;
        else 
            return 1;
    }
    sortOrder(order){
        //console.log('Before?  ', this.props.order);
        let sortedOrder = order.sort(function(a, b){  return  a.beltCount - b.beltCount});
        //console.log('is this sorted?  ', order);
        return order;
    }
    render() {
        let orderSorted = this.props.order;
        let finalOrder = this.sortOrder(orderSorted);
        return this.props.order.map((product) => (
            <h5 key={product.name.id} > { product.name.name} { product.quantity} pcs</h5>
        ))
    };
}

export default Order;