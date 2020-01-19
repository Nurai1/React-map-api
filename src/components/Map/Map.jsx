import React from 'react'
import mapboxgl from 'mapbox-gl'
import styled from 'styled-components'

const MapContainer = styled.div`
	position: absolute;
	bottom: 0;
	top: 50px;
	left: 0;
	width: 100%;
	height: auto;
`;

const Sidebar = styled.div`
	display: inline-block;
	position: absolute;
	top: 0;
	left: -500px;
	margin: 12px;
	background-color: #404040;
	color: #ffffff;
	z-index: 1 !important;
	padding: 6px;
	font-weight: bold;
`;

class Map extends React.Component{
	constructor(props) {
	  super(props);
	  this.state = {
	    lng: 30.3,
	    lat: 59.95,
	    zoom: 10.5
	  };
}

componentDidMount() {
  const map = new mapboxgl.Map({
    container: this.mapContainer,
    style: 'mapbox://styles/mapbox/streets-v9',
    center: [this.state.lng, this.state.lat],
    zoom: this.state.zoom
  });

	map.on('move', () => {
  this.setState({
    lng: map.getCenter().lng.toFixed(4),
    lat: map.getCenter().lat.toFixed(4),
    zoom: map.getZoom().toFixed(2)
  });
});
}

render() {
	return (
		<div>
			<MapContainer ref={el => this.mapContainer = el} />
			<Sidebar>
				<div>Longitude: {this.state.lng} | Latitude: {this.state.lat} | Zoom: {this.state.zoom}</div>
			</Sidebar>
    </div>
		)
	}
}

export default Map
