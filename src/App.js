import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import GoogleMapReact from "google-map-react";
import Pin from "./components/Pin";
import Layout from "./components/Layout";
import SpotAtom from "./atoms/SpotAtom";
import CurrentGeoAtom from "./atoms/CurrentGeoAtom";
import { fetchSpots } from "./utils/fetchSpots";

const DEFAULT_CENTER = {
  lat: 13.9141018,
  lng: 99.9432812,
};

const App = () => {
  const [spots, setSpots] = useRecoilState(SpotAtom);
  const [currentGeolocation, _] = useRecoilState(CurrentGeoAtom);

  useEffect(() => {
    const getSpots = async () => {
      const {
        data: {
          response: { groups },
        },
      } = await fetchSpots({});

      setSpots(groups[0].items);
    };

    getSpots();
  }, []);

  useEffect(() => {
    const getSpots = async () => {
      const {
        data: {
          response: { groups },
        },
      } = await fetchSpots({
        ll: `${currentGeolocation.lat},${currentGeolocation.lng}`,
      });

      setSpots(groups[0].items);
    };

    getSpots();
  }, [currentGeolocation]);

  return (
    <Layout>
      <GoogleMapReact
        bootstrapURLKeys={{
          key: process.env.REACT_APP_GMAP_API_KEY,
        }}
        defaultCenter={DEFAULT_CENTER}
        center={currentGeolocation ? currentGeolocation : DEFAULT_CENTER}
        defaultZoom={15}
      >
        {spots.map((spot) => {
          return (
            <Pin
              key={spot.venue.id}
              lat={spot.venue.location.lat}
              lng={spot.venue.location.lng}
            />
          );
        })}
      </GoogleMapReact>
    </Layout>
  );
};

export default App;
