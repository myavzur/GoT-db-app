import React, {Component} from 'react';
import './randomChar.css';

import GotService from '../../services/gotService';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/errorMessage';

export default class RandomChar extends Component {
    constructor (props) {
        super(props)

        this.GotService = new GotService();
        this.state = {
            char: {},
            loading: true,
            error: false
        }

        this.updateChar = this.updateChar.bind(this)
    }

    componentDidMount() {
        this.updateChar();
        this.updateInterval = setInterval(this.updateChar, 6000);
    }

    componentWillUnmount() {
        clearInterval(this.updateInterval);
    }

    updateChar() {
        const id = Math.floor(Math.random()*580 + 25) // 25-580

        this.GotService.getCharacter(id)
            .then(char => {
                this.setState({
                    char: char,
                    loading: false,
                    error: false
                })
            })
            .catch(() => {
                this.setState({
                    loading: false,
                    error: true
                })
            })
    }

    render() {
        const { char, loading, error } = this.state;

        const spinner = loading ? <Spinner/> : null;
        const errorMessage = error ? <ErrorMessage text={'An error occurred while getting the character...'}/> : null;
        const content = !(loading || error) ? <Content char={char}/> : null;

        return (
            <div className="random-block rounded">
                {errorMessage}
                {content}
                {spinner}
            </div>
        );
    }
}

function Content({char}) {
    const {name, gender, born, died, culture} = char;

    return (
        <>
            <h4>Random Character: <span className="name"> {name ? name : '???'} </span></h4>
            <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Gender </span>
                    <span>{gender ? gender : '???'}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Born </span>
                    <span>{born ? born : '???'}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Died </span>
                    <span>{died ? died : '???'}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Culture </span>
                    <span>{culture ? culture : '???'}</span>
                </li>
            </ul>
        </>
    )
}