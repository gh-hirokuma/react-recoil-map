import React from "react";
import { useRecoilState } from "recoil";
import Header from "./Header";
import { jsx } from "@emotion/core";
import tw from "twin.macro";
import SpotAtom from "../atoms/SpotAtom";
import Spot from "./Spot";

const ActionFrame = tw.section`grid grid-cols-10`;
const LeftFrame = tw.section`col-span-3 bg-indigo-800`;
const RightFrame = tw.main`col-span-7 w-full`;

const Layout = ({ children }) => {
  const [spots, setSpots] = useRecoilState(SpotAtom);

  return (
    <>
      <Header />
      <ActionFrame>
        <LeftFrame style={{ height: "94vh" }}>
          {spots.map((spot) => (
            <Spot spot={spot} />
          ))}
        </LeftFrame>
        <RightFrame style={{ height: "94vh" }}>{children}</RightFrame>
      </ActionFrame>
    </>
  );
};

export default Layout;
