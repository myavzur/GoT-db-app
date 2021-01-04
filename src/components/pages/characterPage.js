import React, { Component } from "react";

import GotService from '../../services/gotService';
import ItemList from '../itemList/itemList';
import ItemDetails, {Field} from '../itemDetails/itemDetails';
import ErrorMessage from "../errorMessage/errorMessage";
import RowBlock from '../rowBlock/rowBlock';

export default class CharacterPage extends Component {
    constructor(props) {
        super(props)

        this.GotService = new GotService();

        this.state = {
            charId: null,
            error: false
        }

        this.onChangeItem = this.onChangeItem.bind(this)
    }

    componentDidCatch() {
        this.setState({
            charId: null,
            error: true
        })
    }

    onChangeItem(id) {
        this.setState({
            charId: id
        })
    }

    render() {
        const {charId, error} = this.state;

        if (error) {
            return <ErrorMessage/>
        }

        const charList = (
            <ItemList 
                onChangeItem={this.onChangeItem}
                getData={this.GotService.getAllCharacters}
                renderItem={(item) => item.name}
            />
        );

        const charDetails = (
            <ItemDetails 
                itemId={charId}
                getData={this.GotService.getCharacter}
                nullText={'Please! Choose any character'}
            >
                <Field label={'Gender'} field={'gender'}/>
                <Field label={'Born'} field={'born'}/>
                <Field label={'Died'} field={'died'}/>
                <Field label={'Culture'} field={'culture'}/>
            </ItemDetails>
                
        
        );

        return(   
            <RowBlock left={charList} right={charDetails}/>
        )
    }
}