import React from "react";
import { useRecoilState } from "recoil";
import axios from "axios";
import SpotAtom from "../atoms/SpotAtom";
import CurrentGeoAtom from "../atoms/CurrentGeoAtom";
/** @jsx jsx */
import { jsx } from "@emotion/core";
import tw from "twin.macro";
import { fetchSpots } from "../utils/fetchSpots";

const HeaderComp = tw.header`flex justify-between bg-indigo-900 py-4 px-8`;
const HeaderLeft = tw.div`flex flex-row`;
const HeaderTitle = tw.h1`text-white text-lg font-mono tracking-wider font-bold`;

const DEFAULT_CENTER = {
  lat: 13.7116379,
  lng: 100.601702,
};

const Header = () => {
  const [spots, setSpots] = useRecoilState(SpotAtom);
  const [currentGeolocation, setCurrentGeolocation] = useRecoilState(
    CurrentGeoAtom
  );

  const onChange = async (ev) => {
    const keyword = ev.target.value;

    const {
      data: {
        response: { groups },
      },
    } = await await fetchSpots({
      keyword,
      ll: `${currentGeolocation.lat},${currentGeolocation.lng}`,
    });

    setSpots(groups[0].items);
  };

  return (
    <HeaderComp>
      <HeaderLeft>
        <HeaderTitle>OreSquare</HeaderTitle>
        <div css={[tw`relative ml-4`]}>
          <select
            css={[
              tw`block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-1 px-2 pr-8 text-sm rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500`,
            ]}
            id="grid-state"
            onChange={onChange}
          >
            <option value="coffee">カフェ</option>
            <option value="restaurant">レストラン</option>
            <option value="shopping">ショッピング</option>
          </select>
          <div
            css={[
              tw`pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700`,
            ]}
          >
            <svg
              css={[tw`fill-current h-4 w-4`]}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
        <button
          css={[tw`bg-pink-700 text-white text-sm ml-4 px-2`]}
          onClick={() =>
            navigator.geolocation.getCurrentPosition(async (position) => {
              const { latitude, longitude } = position.coords;

              setCurrentGeolocation({
                lat: latitude,
                lng: longitude,
              });
            })
          }
        >
          現在地から近くのスポットを取得
        </button>
      </HeaderLeft>
    </HeaderComp>
  );
};

export default Header;
