import React from 'react';

class Products extends React.Component {
    /*const products = [
      ['Pepsi', 'P', 'Left', '10', '10', '2', '4', '1'],
      ['Browni', 'P', 'Right', '12', '6', '2', '3', '2'],
      ['Jucy', 'P', 'Left', '6.2', '9.3', '1', '4', '1'],
      ['Milk', 'M', 'Right', '6.6', '5', '1', '2', '2'],
      ['Islak Mendil', 'I', 'Left', '9.5', '25', '2', '10', '3'],
      ['Tooth Paste', 'T', 'Left', '20', '3.6', '3', '2', '3'],
      ['Cafe Crown', 'C', 'Right', '7', '10.5', '1', '5', '4'],
      ['Gofret', 'G', 'Left', '18', '3.5', '3', '2.4', '1'],
      ['Çıkolata', 'Ç', 'Left', '13', '9.2', '2', '4', '3'],
      ['Domates Salçası', 'D', 'Right', '10', '10', '2', '4', '4'],
      ['Ülker Laviva', 'Ü', 'Left', '15', '2.6', '3', '2', '1'],
      ['Coka Cola', 'K', 'Left', '5.8', '5.8', '1', '3', '1']
    ];*/
    state = {
        title: "Products"
    }
    render() {
        return (
            <div>
                <h3>{this.state.title}</h3>
                <ul>
                    <li> I love you </li>
                </ul>
            </div>
        )
    }
}

export default Products;