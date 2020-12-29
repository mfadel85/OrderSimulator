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

    render() {
        return this.props.order.map((product) => (
            <h5 key={product.name.id} > { product.name.name}  - { product.quantity} pcs - { product.name.dir}  - { product.name.beltCount} </h5>
        ))
    };
}

export default Order;