/*global google*/
import React from 'react';
import firebase from 'firebase';
import { compose, withProps, lifecycle } from "recompose";
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import _ from 'lodash';

//Components
import SearchBox from 'react-google-maps/lib/components/places/SearchBox';
import MarkerWithLabel from "react-google-maps/lib/components/addons/MarkerWithLabel";
import SearchDetailsModal from '../components/searchDetailsModal/SearchDetailsModal';
import FooterNavbar from '../reservationConfirm/FooterNavbar';

//Style
require('./UserSearch.scss');

//Map component
const MyMapComponent = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `92vh` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  lifecycle({
    componentWillMount() {
      const refs = {}
      this.trigguerButton = null;

      this.setState({
        bounds: null,
        places: {},
        hourSelcted: '',
        modalDisabled: false,
        placeSelected: {},
        points: {},
        center: {
          lat: 20.9678151, lng: -89.6231869
        },
        markers: [],
        onMapMounted: ref => {
          refs.map = ref;
        },
        onBoundsChanged: () => {
          this.setState({
            bounds: refs.map.getBounds(),
            center: refs.map.getCenter(),
          })
        },
        onSearchBoxMounted: ref => {
          refs.searchBox = ref;
        },
        onPlacesChanged: () => {
          const places = refs.searchBox.getPlaces();
          const bounds = new google.maps.LatLngBounds();

          places.forEach(place => {
            if (place.geometry.viewport) {
              bounds.union(place.geometry.viewport)
            } else {
              bounds.extend(place.geometry.location)
            }
          });
          const nextMarkers = places.map(place => ({
            position: place.geometry.location,
          }));
          const nextCenter = _.get(nextMarkers, '0.position', this.state.center);

          this.setState({
            center: nextCenter,
            markers: nextMarkers,
          });
          // refs.map.fitBounds(bounds);
        },
        setHour: (hour) => {
          this.setState({hourSelcted: hour});
        },
        getPlaceDetails: ()=>{
          const {placeSelected, modalDisabled, hourSelcted} = this.state
          let {owner, place, price, address, spotsNumber, startHour, finishHour} = placeSelected

          const user = localStorage.getItem("user")
          const email = `${user}@correo.com`
          const userRef = firebase.database().ref(`users/borrowers/${user}/history`)

          owner = owner || ""
          place = place || ""
          price = price || ""
          address = address || ""
          spotsNumber = spotsNumber || ""
          startHour = startHour || ""
          finishHour = finishHour || ""

          return (
            <SearchDetailsModal 
              visible={modalDisabled}
              entranceHour={hourSelcted}
              price={price}
              place={place}
              address={address}
              startHour={startHour}
              finishHour={finishHour}
              spotsNumber={spotsNumber}
              owner={owner}
              email={email}
              ownerRef={userRef}
            />
          )
        },
        handleInput: (e) => {
          firebase.database().ref('parking_lots').endAt(e.target.value)
          .on('value', snap => {
            this.setState({points: snap.val(), modalDisabled: false})
          } )
        },
        getAllPoints: () => {
          const marks = [];

          firebase.database().ref(`parking_lots`).once('value')
            .then( snap => {
              console.log( snap.val() );
              const points = snap.val();
              this.setState({points})
            } )
        },
        getPoints: () => {
          const {points} = this.state
          const marks = [];

          for (var key in points) {
            if (points.hasOwnProperty(key)) {
                console.log(points[key]);
                const element = points[key]
                marks.push( 
                  (<MarkerWithLabel
                    onClick={ ()=>{ this.setState({placeSelected: element, modalDisabled: true}) } }
                    key={`${element.lat}/${element.lng}`}
                    position={{ lat: element.lat, lng: element.lng }}
                    labelAnchor={new google.maps.Point(0, 0)}
                    data-toggle="modal" 
                    data-target="#myModal"
                    labelStyle={{
                      backgroundColor: "#0069d9", 
                      fontSize: "20px", 
                      padding: "4px",
                      borderRadius: `3px`,
                      color: "white",
                      width:"90px"
                    }}
                  >
                    <div>{element.price} p/hr</div>
                   
                  </MarkerWithLabel>) 
                )
            }
          }
          
          //this.setState({center: {lat: lat, lng: lng}})
          return marks;
        }
      })
    },
  }),
  withScriptjs,
  withGoogleMap
)((props) =>
  <GoogleMap
    ref={props.onMapMounted}
    defaultZoom={16.5}
    center={props.center}
  >
    <SearchBox
        ref={props.onSearchBoxMounted}
        bounds={props.bounds}
        controlPosition={google.maps.ControlPosition.TOP_CENTER}
        onPlacesChanged={props.onPlacesChanged}
      >
        <input
          type="text"
          placeholder="Encuentra un lugar"
          name="search"
          onChange={props.handleInput}
          style={{
            boxSizing: `border-box`,
            border: `1px solid transparent`,
            width: `240px`,
            height: `50px`,
            marginTop: `50px`,
            padding: `0 12px`,
            borderRadius: `3px`,
            boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
            fontSize: `16px`,
            outline: `none`,
            textOverflow: `ellipses`,
            color: '#484b4d'
          }}
        />
      </SearchBox>

      {props.getPoints()}
      {props.getPlaceDetails()}

      <div className="hours">
        <span onClick={ () => { props.setHour('20:00') } }>20:00</span>
        <span onClick={ () => { props.setHour('21:00') } }>21:00</span>
        <span onClick={ () => { props.setHour('22:00') } }>22:00</span>
        <span onClick={ () => { props.setHour('23:00') } }>23:00</span>
      </div>
      
    {props.markers.map((marker, index) => <Marker key={index} position={marker.position} />)}
  </GoogleMap>
);

export default class UserSearch extends React.Component {
  state = {
    isMarkerShown: false,
  }

  componentDidMount() {
    this.delayedShowMarker()
  }

  delayedShowMarker = () => {
    setTimeout(() => {
      this.setState({ isMarkerShown: true })
    }, 3000)
  }

  handleMarkerClick = () => {
    this.setState({ isMarkerShown: false })
    this.delayedShowMarker()
  }

  render() {
    return (
      <div className="user-search">
        
        <MyMapComponent
          isMarkerShown={this.state.isMarkerShown}
          onMarkerClick={this.handleMarkerClick}
          style={{height: '95vh'}}
        />

        <div className="footer">
          <FooterNavbar />
        </div>
      </div>
    );
  }
}