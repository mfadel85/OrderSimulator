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
        products: [
            {
                id:1,
                name:'Pepsi',
                symbol:'P',
                dir:'left',
                width:10,
                depth:10,
                beltCount:2,
                cellsDepth:4,
                unitNo:1
            },
            {
                id: 2,
                name: 'Browni',
                symbol: 'B',
                dir: 'right',
                width: 12,
                depth: 6,
                beltCount: 2,
                cellsDepth: 3,
                unitNo: 2
            },
            {
                id: 3,
                name:       'Jucy',
                symbol:     'J',
                dir:        'right',
                width:      6.2,
                depth:      9.3,
                beltCount:  1,
                cellsDepth: 4,
                unitNo:     1
            },            
            {
                id: 4,
                name: 'Milk',
                symbol: 'M',
                dir: 'right',
                width: 6.6,
                depth: 5,
                beltCount: 1,
                cellsDepth: 2,
                unitNo: 2
            },    
            {
                id: 5,
                name: 'Islak Mendil',
                symbol: 'I',
                dir: 'left',
                width: 9.5,
                depth: 25,
                beltCount: 2,
                cellsDepth: 10,
                unitNo: 3
            },  
            {
                id: 6,
                name: 'Tooth Paste',
                symbol: 'T',
                dir: 'left',
                width: 20,
                depth: 3.6,
                beltCount: 3,
                cellsDepth: 2,
                unitNo: 3
            },    
            {
                id: 7,
                name: 'Cafe Crown',
                symbol: 'C',
                dir: 'right',
                width: 7,
                depth: 10.5,
                beltCount: 1,
                cellsDepth: 5,
                unitNo: 4
            },                                             
            {
                id: 8,
                name: 'Gofret',
                symbol: 'G',
                dir: 'left',
                width: 18,
                depth: 3.5,
                beltCount: 3,
                cellsDepth: 2,
                unitNo: 1
            },  
            {
                id: 9,
                name: 'Çıkolata',
                symbol: 'Ç',
                dir: 'left',
                width: 13,
                depth: 9.2,
                beltCount: 2,
                cellsDepth: 4,
                unitNo: 3
            }, 
            {
                id: 10,
                name: 'Domates Salçası',
                symbol: 'D',
                dir: 'right',
                width: 10,
                depth: 10,
                beltCount: 2,
                cellsDepth: 4,
                unitNo: 4
            },   
            {
                id: 11,
                name: 'Ülker Laviva',
                symbol: 'Ü',
                dir: 'left',
                width: 15,
                depth: 2.6,
                beltCount: 3,
                cellsDepth: 2,
                unitNo: 1
            },  
            {
                id: 12,
                name: 'Coka Cola',
                symbol: 'K',
                dir: 'left',
                width: 5.8,
                depth: 5.8,
                beltCount: 1,
                cellsDepth: 3,
                unitNo: 1
            },                                                     
        ]
    }
    render() {
       return this.props.products.map((product) => (
        <h5>{ product.name }</h5>
       ));
    }
}

export default Products;