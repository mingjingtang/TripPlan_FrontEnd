import React, { Component } from 'react';
import TripItem from '../TripItem/TripItem'
import '../TripList/TripList.css'
import axios from 'axios'
import { Form, Input } from 'semantic-ui-react'
import { Button, Header } from 'semantic-ui-react'

class TripList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            category: '',
            region: ''
        };
    }


    handleChange = (event) => {
        console.log(event.target.value)
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleAdd = async (event) => {
        event.preventDefault();
        await axios.post(
            "http://localhost:4567/users/1/trips",
            {
                name: this.state.name,
                category: this.state.category,
                region: this.state.region,
                user_id: 1
            }
        )
        this.props.render();
    }


    render() {
        console.log(this.props.placesUnderTrips);

        let renderTrips = this.props.trips ? this.props.trips.map((trip, index) => {
            return <TripItem
                onClick2={this.props.onClick2}
                handleDelete={this.props.handleDelete}
                handleDeletePlace={this.props.handleDeletePlace}
                render={this.props.render}
                update={this.props.update}
                editTrip={this.props.editTrip}
                placesUnderTrips={this.props.placesUnderTrips}
                onClickShowPlaces={this.props.onClickShowPlaces}

                key={index}
                id={trip.id}
                tripName={trip.name}
                tripCategory={trip.category}
                tripRegion={trip.region}
            />
        }) : null;


        return (
            <div className="TripList">
                <Header as='h2' color = "green">Create a new trip</Header>
                <Form onSubmit={this.handleAdd}>
                    <Form.Group widths='equal'>
                        <Form.Field>
                            <label>Name</label>
                            <Input fluid placeholder='name' type="text" name="name" value={this.state.value} onChange={this.handleChange}/>
                        </Form.Field>
                        <Form.Field>
                            <label>Category</label>
                            <Input fluid placeholder='category' type="text" name="category" value={this.state.value} onChange={this.handleChange}/>
                        </Form.Field>
                        <Form.Field>
                            <label>Region</label>
                            <Input fluid placeholder='region' type="text" name="region" value={this.state.value} onChange={this.handleChange} />
                        </Form.Field>
                       
                             <Button primary type="submit" name="submit">Add</Button>
                        
                        
                    </Form.Group>
                </Form>


                <Header as='h2' color = "green">All your trips</Header>
                {renderTrips}


            </div>
        )
    }
}

export default TripList