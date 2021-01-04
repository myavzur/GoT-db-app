import React, {Component} from 'react';
import './itemList.css';

import Spinner from '../spinner/spinner'
export default class ItemList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            itemList: null
        }
    }

    componentDidMount() {
        this.props.getData()
            .then(items => this.setState({
                itemList: items
            }))
    }

    renderItemList(arr) {
        return arr.map(item => {
            const label = this.props.renderItem(item)

            return (
                <li 
                    className="list-group-item"
                    key={item.url}
                    onClick={() => this.props.onChangeItem(item.url)}
                >
                    {label}
                </li>
            )
        })
    }

    render() {
        const {itemList} = this.state;

        if (!itemList) {
            return <Spinner/>
        }

        const items = this.renderItemList(itemList);

        return (
            <ul className="item-list list-group">
                {items}
            </ul>
        );
    }
}