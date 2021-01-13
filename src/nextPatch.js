import React from 'react';

class NextPatch extends React.Component {
    render() {
        return this.props.order.map((product, index) => (
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
export default NextPatch;