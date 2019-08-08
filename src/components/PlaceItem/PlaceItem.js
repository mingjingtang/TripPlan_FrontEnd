import React, { Component } from 'react';
import '../PlaceItem/PlaceItem.css'
import { Card } from 'semantic-ui-react'
import { Button, Popup, Grid } from 'semantic-ui-react'
import PlaceItemTripChoice from '../PlaceItemTripChoice/PlaceItemTripChoice';

class PlaceItem extends Component {
    render() {
        return (
            <div className="placeItem">
                <Card>
                    <img src={this.props.placeImage} style={{ width: '20.8em', height: '12em' }} />
                    <Card.Content>
                        <Card.Header>{this.props.placeName}</Card.Header>
                        <Card.Meta>region: {this.props.placeRegion}</Card.Meta>
                    </Card.Content>
                    <Card.Content extra>


                        <Popup trigger={<Button>Add</Button>} flowing hoverable>
                            <Grid centered divided columns={3}>
                               
                                <PlaceItemTripChoice 
                                    trips = {this.props.trips} 
                                    onClick1 = {this.props.onClick1} 
                                    placeName = {this.props.placeName}
                                    placeRegion = {this.props.placeRegion}
                                    placeImage = {this.props.placeImage}
                                 />
                                
                            </Grid>
                        </Popup>
                    </Card.Content>
                </Card>
            </div>
        )
    }
}
export default PlaceItem