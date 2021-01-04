import React, { Component } from "react";

import GotService from '../../services/gotService';
import ItemList from '../itemList/itemList';
import ItemDetails, {Field} from '../itemDetails/itemDetails';
import ErrorMessage from "../errorMessage/errorMessage";
import RowBlock from '../rowBlock/rowBlock';

export default class HousePage extends Component {
    constructor(props) {
        super(props)

        this.GotService = new GotService();

        this.state = {
            houseId: null,
            error: false
        }

        this.onChangeItem = this.onChangeItem.bind(this)
    }

    componentDidCatch() {
        this.setState({
            houseId: null,
            error: true
        })
    }

    onChangeItem(id) {
        this.setState({
            houseId: id
        })
    }

    render() {
        const {houseId, error} = this.state;

        if (error) {
            return <ErrorMessage/>
        }

        const houseList = (
            <ItemList 
                onChangeItem={this.onChangeItem}
                getData={this.GotService.getAllHouses}
                renderItem={(item) => item.name}
            />
        );

        const houseDetails = (
            <ItemDetails 
                itemId={houseId}
                getData={this.GotService.getHouse}
                nullText={'Please! Choose any house'}
            >
                <Field label={'Region'} field={'region'}/>
                <Field label={'Words'} field={'words'}/>
                <Field label={'Titles'} field={'titles'}/>
                <Field label={'Ancestral Weapons'} field={'ancestralWeapons'}/>
            </ItemDetails>
        );

        return(   
            <RowBlock left={houseList} right={houseDetails}/>
        )
    }
}