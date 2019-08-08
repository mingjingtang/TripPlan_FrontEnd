import React, { Component } from 'react';
import PlaceList from '../PlaceList/PlaceList';
import '../PlaceResult/PlaceResult.css';


class PlaceResult extends Component{
    render(){
        return(
            <div className = "result">
                <div className = "placeResult">
                    <PlaceList 
                        places={this.props.places}
                        trips = {this.props.trips}
                        onClick1 = {this.props.onClick1}
                    />
                </div>
            </div>
        )
    }
}
export default PlaceResult