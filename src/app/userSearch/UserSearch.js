/*global google*/
import React from 'react';
import firebase from 'firebase';
import { compose, withProps, lifecycle } from "recompose";
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import _ from 'lodash';

//Components
import SearchBox from 'react-google-maps/lib/components/places/SearchBox';
import MarkerWithLabel from "react-google-maps/lib/components/addons/MarkerWithLabel";

//Style
require('./UserSearch.scss');

//Map component
const MyMapComponent = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `667px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  lifecycle({
    componentWillMount() {
      const refs = {}

      this.setState({
        bounds: null,
        places: {},
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
        handleInput: (e) => {
          firebase.database().ref('parking_lots').endAt(e.target.value)
          .on('value', snap => {
            this.setState({points: snap.val()})
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
                    position={{ lat: element.lat, lng: element.lng }}
                    labelAnchor={new google.maps.Point(0, 0)}
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
        />
      </div>
    );
  }
}