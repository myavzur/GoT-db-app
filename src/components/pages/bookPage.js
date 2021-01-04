import React, { Component } from "react";

import GotService from '../../services/gotService';
import ItemList from '../itemList/itemList';
import ItemDetails, {Field} from '../itemDetails/itemDetails';
import ErrorMessage from "../errorMessage/errorMessage";
import RowBlock from '../rowBlock/rowBlock';

export default class BookPage extends Component {
    constructor(props) {
        super(props)

        this.GotService = new GotService();

        this.state = {
            bookId: null,
            error: false
        }

        this.onChangeItem = this.onChangeItem.bind(this)
    }

    componentDidCatch() {
        this.setState({
            bookId: null,
            error: true
        })
    }

    onChangeItem(id) {
        this.setState({
            bookId: id
        })
    }

    render() {
        const {bookId, error} = this.state;

        if (error) {
            return <ErrorMessage/>
        }

        const bookList = (
            <ItemList 
                onChangeItem={this.onChangeItem}
                getData={this.GotService.getAllBooks}
                renderItem={(item) => item.name}
            />
        );

        const bookDetails = (
            <ItemDetails 
                itemId={bookId}
                getData={this.GotService.getBook}
                nullText={'Please! Choose any book'}
            >
                <Field label={'Authors'} field={'authors'}/>
                <Field label={'Number Of Pages'} field={'numberOfPages'}/>
                <Field label={'Publisher'} field={'publisher'}/>
                <Field label={'Released'} field={'released'}/>
            </ItemDetails>
        );

        return(   
            <RowBlock left={bookList} right={bookDetails}/>
        )
    }
}