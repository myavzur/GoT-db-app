import React, {Component} from 'react';
import './itemDetails.css';

import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/errorMessage';

function Field({item, field, label}) {
    return(
        <li className="list-group-item d-flex justify-content-between">
            <span className="term"> {label} </span>
            <span> {item[field] ? item[field] : '???'} </span>
        </li>
    )
}

export {Field} 


export default class ItemDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            item: null,
            loading: true,
            error: false
        }
    }

    componentDidUpdate(prevProps) {
        const {itemId} = this.props;

        if (prevProps.itemId !== itemId) {
            this.setState({
                loading: true,
                error: false
            })
    
            this.updateItem(itemId)
        }
    }


    updateItem(id) {
        this.props.getData(id)
            .then(item => {
                this.onSuccess(item);
            })
            .catch(() => {
                this.onError();
            })
    }

    onSuccess(item) {
        this.setState({
            item,
            loading: false,
            error: false
        })
    }

    onError() {
        this.setState({
            item: undefined,
            loading: false,
            error: true
        })
    }

    render() {
        const {item, loading, error} = this.state;

        if (item === null) {
            return <span className="select-error"> {this.props.nullText} </span>
        }

        const spinner = loading ? <Spinner/> : null;
        const errorMessage = error ? <ErrorMessage text={"An error occurred while getting the item :("}/> : null;
        const content = (!loading && !error) ? <Content item={item} context={this.props}/> : null;

        return (
            <div className="item-details rounded">
                {spinner}
                {errorMessage}
                {content}
            </div>
        );
    }
}

ItemDetails.defaultProps = {
    nullText: 'Please! Select any item'
}

function Content({item, context}) {
    const {name} = item;

    return (
        <>
            <h4 className="name"> {name ? name : '???'} </h4>
            <ul className="list-group list-group-flush">
                {
                    React.Children.map(context.children, (child) => {
                        return React.cloneElement(child, {item: item})
                    })
                }
            </ul>
        </>
    )
}