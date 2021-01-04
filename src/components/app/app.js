import React, { Component } from 'react';
import {Col, Row, Container} from 'reactstrap';

import Header from '../header/header';
import RandomChar from '../randomChar/randomChar';

import {CharacterPage, HousePage, BookPage, NullPage} from '../pages'

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import './app.css'

export default class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            showRandomChar: true
        }

        this.toggleRandomChar = this.toggleRandomChar.bind(this);
    }

    toggleRandomChar() {
        this.setState(state => {
            return {
                showRandomChar: !state.showRandomChar
            }
        })
    }

    render() {
        const { showRandomChar } = this.state;

        const character = showRandomChar ? <RandomChar/> : null;

        return (
            <Router>
                <div className="app">
                    <Container>
                        <Header/>
                    </Container>
        
                    <Container>
                        <Row>
                            <Col lg={{size: 5, offset: 0}}>
                                {character}
        
                                <button onClick={this.toggleRandomChar} className="toggle-btn">
                                    {showRandomChar ? 'Hide' : 'Show'} random character  
                                </button>
                            </Col>
                        </Row>
        
                        <Switch>
                            <Route path="/characters" component={CharacterPage}/>   
                        
                            <Route path="/houses" component={HousePage}/>

                            <Route path="/books" component={BookPage}/>        

                            <Route component={NullPage}/>
                        </Switch>
                    </Container>
                </div>
            </Router>
        );
    }
};