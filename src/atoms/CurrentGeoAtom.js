import { atom } from "recoil";

const SpotAtom = atom({
  key: "CurrentGeo",
  default: {
    lat: 13.9141018,
    lng: 99.9432812,
  },
});

export default SpotAtom;
