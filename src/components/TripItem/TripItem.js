import React, { Component } from 'react';
import '../TripItem/TripItem.css';
import { Button, Image, List } from 'semantic-ui-react'
import axios from 'axios'
import { Divider } from 'semantic-ui-react'
import { Header } from 'semantic-ui-react'
import { Card } from 'semantic-ui-react'
import { Form } from 'semantic-ui-react'


class TripItem extends Component {
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



    updateTrip = (e, name, category, region) => {
        console.log(e.target.name)

        let data = {
            "name": this.state.name,
            "category": this.state.category,
            "region": this.state.region
        }

        this.props.update(e, this.props.id, data)
        this.props.editTrip(name, category, region)
        this.props.render()

    }

    componentDidMount = () => {
        this.setState({
            name: this.props.tripName,
            category: this.props.tripCategory,
            region: this.props.tripRegion
        })
    }



    newFunction = () => {
        console.log(this.props.placesUnderTrips)
        let renderPlacesUnderTrips = this.props.placesUnderTrips.map((place) => (
            <div>
                <Card>
                    <Card.Content>
                        <Image floated='right' src={place.image} style={{ width: '20.8em', height: '12em' }} />
                        <Card.Header>Name : {place.name}</Card.Header>
                        <Card.Meta>Region : {place.region}</Card.Meta>
                    </Card.Content>
                    <Card.Content extra>
                        <div className='ui two buttons'>
                            <Button basic color='red' onClick={(e) => this.props.handleDeletePlace(this.props.id, place.id)}>
                                Delete From This Trip
                            </Button>
                        </div>
                    </Card.Content>
                </Card>
            </div>
        ))
        return renderPlacesUnderTrips
    }



    render() {
        console.log(this.props.id)

        return (
            <div className="tripItem">
                <div>
                    <br></br>
                    <Header as='h2'>{this.props.tripName}</Header>
                    <p>category: {this.props.tripCategory}</p>
                    <p>region: {this.props.tripRegion}</p>
                    <br></br>
                </div>


                {/* <form onSubmit={e => this.updateTrip(e, this.state.name, this.state.category, this.state.region)}>
                    <label>
                        Name:
                    <input type="text" name="name" value={this.state.name} onChange={this.handleChange} />
                        <input type="text" name="category" value={this.state.category} onChange={this.handleChange} />
                        <input type="text" name="region" value={this.state.region} onChange={this.handleChange} />
                    </label>
                    <button type="submit" name="Edit">Edit</button>
                </form> */}

                <Form onSubmit={e => this.updateTrip(e, this.state.name, this.state.category, this.state.region)}>
                    <Form.Group widths='equal'>
                        <Form.Input
                            fluid
                            id='form-subcomponent-shorthand-input-first-name'
                            label='title'
                            placeholder='title'
                            type="text" name="name" value={this.state.name} onChange={this.handleChange}

                        />
                        <Form.Input
                            fluid
                            id='form-subcomponent-shorthand-input-last-name'
                            label='category'
                            placeholder='category'
                            type="text" name="category" value={this.state.category} onChange={this.handleChange}
                        />
                        <Form.Input
                            fluid
                            id='form-subcomponent-shorthand-input-last-name'
                            label='region'
                            placeholder='region'
                            type="text" name="region" value={this.state.region} onChange={this.handleChange}
                        />
                        {/* <button type="submit" name="Edit">Edit</button>
                        <button className="button is-rounded"
                            onClick={(e) => this.props.handleDelete(e, this.props.id)} >
                            Delete
                    </button> */}

                        
                        <Button basic color='yellow' color='orange' type="submit" name="Edit">
                            Edit
                        </Button>
                        <Button basic color='red' onClick={(e) => this.props.handleDelete(e, this.props.id)} >
                            Delete
                         </Button>
                    </Form.Group>
                </Form>

                <button
                    onClick={(e) => (this.props.onClickShowPlaces(this.props.id))}
                >Show all the places</button>


                {this.props.placesUnderTrips && this.newFunction()}


                <Divider />
            </div>
        )
    }
}

export default TripItem