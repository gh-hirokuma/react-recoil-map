import axios from "axios";

const DEFAULT_CENTER = {
  lat: 13.9141018,
  lng: 99.9432812,
};

export const fetchSpots = ({ keyword, ll }) => {
  return axios.get(`https://api.foursquare.com/v2/venues/explore`, {
    params: {
      client_id: process.env.REACT_APP_FOURSQUARE_CLIENT_ID,
      client_secret: process.env.REACT_APP_FOURSQUARE_CLIENT_SECRET,
      v: "20180323",
      ll: ll ? ll : `${DEFAULT_CENTER.lat},${DEFAULT_CENTER.lng}`,
      query: keyword ? keyword : "coffee",
      limit: 4,
    },
  });
};
