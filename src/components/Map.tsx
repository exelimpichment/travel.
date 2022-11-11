import React from 'react';
import GoogleMapReact from 'google-map-react';
import styled from 'styled-components';

let center = { lat: 0, lng: 0 };

function Map() {
  return (
    <Wrapper>
      {/* map */}
      <div className='map' style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyA74mseU6zIQdvYJimqzGyizKhHkzu379s' }}
          defaultCenter={center}
          center={center}
          defaultZoom={14}
          margin={[50, 50, 50, 50]}
          // options={}
          // onChange={}
          // onChildClick={}
        ></GoogleMapReact>
      </div>
    </Wrapper>
  );
}

export default Map;

const Wrapper = styled.main`
  .map {
    height: 90%;
    width: 100%;
  }
`;
