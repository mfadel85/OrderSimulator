import React from 'react';

class Order extends React.Component {
    /*constructor(props) {
        super(props);
        //console.log('before everything', this.props.order);
        this.state = {   
            order : this.props.order,
            products: this.props.products
        }
    }*/
/*
             <h6 key={product.name.id} >{index+1}. { product.name.name}  - { product.quantity} pcs - { product.name.dir}  - { product.name.beltCount}  - { product.name.cellsDepth} Depth </h6>

*/
    render() {
        return this.props.order.map((product,index) => (
            <tr className='orderItem' key={product.name.id} >
                <td>{index + 1}</td>
                <td>{product.name.name}</td>
                <td>{product.quantity}</td>
                <td>{product.name.dir}</td>
                <td>{product.name.beltCount}</td>
                <td>{product.name.cellsDepth}</td>
                <td>{product.name.unitNo}</td>

            </tr>
        ))
    };
}

export default Order;