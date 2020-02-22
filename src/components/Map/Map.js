import React, { useEffect } from 'react';
import ReactMapboxGl, { Marker } from 'react-mapbox-gl';

const MapInner = ReactMapboxGl({
  accessToken: 'pk.eyJ1IjoiYmxpbmRtYW4yMCIsImEiOiJjazVqbW92aHowNG5qM2txazM4MHR1b3o0In0.OBRzj-3gGUTHipAJbpClPw',
});

function Map(props) {
  const mapContainer = React.createRef();
  const { coords } = props;

  useEffect(() => {

  });

  return (
    <div>
      <MapInner
        style="mapbox://styles/mapbox/streets-v8"
        ref={mapContainer}
        center={[coords.lng, coords.lat]}
        zoom={coords.zoom}
        containerStyle={{
          position: 'absolute',
          bottom: 0,
          top: '50px',
          left: 0,
          width: '100%',
          height: 'auto',
        }}
      >
        {coords.address_value ? (
          <Marker
            coordinates={[coords.lng, coords.lat]}
            anchor="bottom"
            style={{
              textAlign: 'center',
              zIndex: 0,
            }}
          >
            <span style={{
              fontWeight: 500,
              fontSize: '26px',
              lineHeight: '30px',
              textTransform: 'uppercase',
              color: '#121212',
            }}
            >
              {coords.address_value}
            </span>
            <span style={{
              display: 'block',
              width: '15px',
              height: '15px',
              background: '#D95640',
              borderRadius: '50%',
              margin: '0 auto',
            }}
            />
            <span style={{
              display: 'inline-block',
              width: '5px',
              height: '20px',
              background: '#D95640',
              borderRadius: '0 0 20px 20px',
            }}
            />
          </Marker>
        )
          : <span />}
      </MapInner>
    </div>
  );
}

export default Map;
