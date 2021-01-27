import React from "react";
import Products from "./products.js";
import Grid from "./grid.js";
import NextPatch from "./nextPatch";
import Order from "./Order.js";
import Cell from "./Cell.js";
import "bootstrap/dist/css/bootstrap.min.css";
import { Table, Card, Row, Col, ListGroup, ButtonToolbar, ButtonGroup, Button } from "react-bootstrap";
import { results, allOrders, testingOrders } from "./data.js";
class ResultGrid extends React.Component {
    constructor(props) {
        super(props);

    }
    render(){
        return(
            <Row>
                <Col xs={12} md={12}>

                </Col>                            
            </Row>
        );
    }
}

export default ResultGrid;