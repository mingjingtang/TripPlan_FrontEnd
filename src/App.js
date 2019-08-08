import React, { Component } from 'react';
import { Route, Link, Switch} from 'react-router-dom';
import PlaceResult from './components/PlaceResult/PlaceResult'
import TripResult from './components/TripResult/TripResult'
import Home from './components/Home/Home'
import Login from './components/Login/Login'
import axios from 'axios'
import './App.css';
import { Menu } from 'semantic-ui-react'


class App extends Component {
  constructor() {
    super();
    this.state = {
      placesData: [],
      apiDataLoaded: false,

      tripsData: [],
      apiDataLoadedTrips: false,

      placesUnderTripsData:[],
      apiDataLoadedPlacesUnderTrips: false,

      activeItem: 'home',

      tripName: "",
      tripCategory: "",
      tripRegion: "",


      allTrip: [],
    };

    this.onClickShowPlaces = this.onClickShowPlaces.bind(this)
  }

  componentDidMount = async () => {
    //get places data
    const places = await axios.get('https://trip-plan-ga.herokuapp.com/allplaces');
    console.log(places)
    this.setState({ placesData: places.data, apiDataLoaded: true });

    //get trips data
    const trips = await axios.get('https://trip-plan-ga.herokuapp.com/users/1/trips');
    console.log(trips)
    this.setState({ tripsData: trips.data, apiDataLoadedTrips: true });
  }


  handleItemClick = (e, { name }) => this.setState({ activeItem: name })


  handleDelete = async (event, id) => {
    console.log(this.props.id)
    event.preventDefault()

    await axios.delete(
      `https://trip-plan-ga.herokuapp.com/users/1/trips/${id}`
    )
    this.rerenderStuff()
  }

  handleUpdate = async (event, id, data) => {
    console.log(this.props.id)
    event.preventDefault()

    await axios.put(
      `https://trip-plan-ga.herokuapp.com/users/1/trips/${id}`, data)
    this.rerenderStuff()
  }

  editTrip = (name, category, region) => {
    console.log(name, category, region)
    this.setState({
      tripName: name,
      tripCategory: category,
      tripRegion: region
    })
  }

  rerenderStuff = async () => {
    let getTripData = await axios.get(
      `https://trip-plan-ga.herokuapp.com/users/1/trips/`
    )
    this.setState({
      tripsData: getTripData.data
    })
  }


  rerenderTrip = async (tripId) =>{
    let getTripData = await axios.get(
      `https://trip-plan-ga.herokuapp.com/users/1/trips/${tripId}/places`
    )
    this.setState(prevState => ({
      allTrip: [...prevState.allTrip, getTripData]
    }))
  }



  onClickShowPlaces = async (tripId) => {
      console.log('this button is clicked')
      console.log(tripId)
    
      const placeUnderTrips =await axios.get(
        `https://trip-plan-ga.herokuapp.com/users/1/trips/${tripId}/places`)
  
      this.rerenderTrip(tripId)

      this.setState({placeUnderTrips: placeUnderTrips.data, apiDataLoadedPlacesUnderTrips: true })
  }

  handleItemClick1 = async (tripId,newPlace) => {
    console.log('this trip is clicked')
    console.log("tripId is " + tripId)
    console.log("newPlace is " + newPlace)
    
    await axios.post(
      `https://trip-plan-ga.herokuapp.com/users/1/trips/${tripId}/places`,newPlace)
 
    this.rerenderTrip(tripId)
  }



  handleDeletePlace = async (tripId, placeId) => {
    console.log(tripId)
    console.log(placeId)

    await axios.delete(
      `https://trip-plan-ga.herokuapp.com/users/1/trips/${tripId}/places/${placeId}`
    )

    this.rerenderTrip(tripId)

  }


  render() {
    const { activeItem } = this.state
    return (
      <div>
        <Menu pointing secondary>
          <Link to="/">
            <Menu.Item
              name='Home'
              active={activeItem === 'Home'}
              onClick={this.handleItemClick} />
          </Link>

          <Link to="/PlaceResult">
            <Menu.Item
              name='Places'
              active={activeItem === 'Places'}
              onClick={this.handleItemClick}
            />
          </Link>


          <Link to="/TripResult">
            <Menu.Item
              name='Your Trips'
              active={activeItem === 'Your Trips'}
              onClick={this.handleItemClick}
            />
          </Link>


          <Menu.Menu position='right'>
            <Link to="Login">
              <Menu.Item
                name='login'
                active={activeItem === 'login'}
                onClick={this.handleItemClick}
              />
            </Link>
          </Menu.Menu>
        </Menu>


        <main>
          <Switch>
            <Route
              exact path="/placeresult"
              render={() => <PlaceResult
                places={this.state.placesData}
                trips={this.state.tripsData}
                onClick1={this.handleItemClick1}
                onClick2={this.handleItemClick2}
              />}
            />

            <Route
              path="/tripresult"
              render={() => <TripResult
                trips={this.state.tripsData}
                placesUnderTrips={this.state.placeUnderTrips}
                onClickShowPlaces={this.onClickShowPlaces}
                onClick2={this.handleItemClick2}
                render={this.rerenderStuff}
                update={this.handleUpdate}
                editTrip={this.editTrip}
                handleDelete={this.handleDelete}
                handleDeletePlace={this.handleDeletePlace}
              />}
            />

            <Route
              exact path="/login"
              render={() => <Login
              />}
            />

            <Route
              path="/"
              render={() => <Home
              />}
            />
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;