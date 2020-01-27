import React, {useEffect} from 'react'
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

function Map(props) {
	const mapContainer = React.createRef();

	useEffect(() => {
		const map = new mapboxgl.Map({
			container: mapContainer.current,
			style: 'mapbox://styles/mapbox/streets-v11',
			center: [props.coords.lng, props.coords.lat],
			zoom: props.coords.zoom
		});
		const marker = new mapboxgl.Marker();
		marker
			.setLngLat([props.coords.lng, props.coords.lat])
			.addTo(map);
	});

	return (
  <div>
    <MapContainer ref={mapContainer} />
  </div>
	)
}

export default Map
