import React, { useEffect, useState } from "react";
import axios from "axios";
import { jsx } from "@emotion/core";
import tw, { styled } from "twin.macro";

const SpotCard = tw.section`p-8 bg-indigo-100 border-b`;
const SpotCardLayout = tw.section`flex flex-row`;
const SpotImage = tw.img`rounded`;
const SpotContents = tw.div`px-4 flex justify-between w-full`;
const SpotValues = tw.div`flex flex-col`;
const SpotTitle = tw.h2`text-lg text-indigo-700 font-semibold`;
const SpotValue = tw.p`text-xs text-indigo-400`;
const SpotRating = styled.div(({ color }) => [
  color,
  tw`p-2 text-xs text-white font-semibold w-8 h-8 flex justify-center items-center`,
]);

const SpotPhotoOwner = tw.div`flex items-center py-4`;
const SpotPhotoOwnerImage = tw.img`rounded`;
const SpotPhotoOwnerName = tw.h2`px-4 text-indigo-600`;

const Spot = ({ spot }) => {
  const [imageUrl, setImageUrl] = useState([]);
  const [venue, setVenue] = useState(null);
  const [photoOwner, setPhotoOwner] = useState(null);

  useEffect(() => {
    const getImages = async () => {
      const {
        data: {
          response: {
            photos: { items },
          },
        },
      } = await axios.get(
        `https://api.foursquare.com/v2/venues/${spot.venue.id}/photos`,
        {
          params: {
            client_id: process.env.REACT_APP_FOURSQUARE_CLIENT_ID,
            client_secret: process.env.REACT_APP_FOURSQUARE_CLIENT_SECRET,
            v: "20180323",
          },
        }
      );

      const { prefix, suffix } = items[0];

      const {
        data: {
          response: { venue },
        },
      } = await axios.get(
        `https://api.foursquare.com/v2/venues/${spot.venue.id}`,
        {
          params: {
            client_id: process.env.REACT_APP_FOURSQUARE_CLIENT_ID,
            client_secret: process.env.REACT_APP_FOURSQUARE_CLIENT_SECRET,
            v: "20180323",
          },
        }
      );

      setVenue(venue);
      setPhotoOwner(items[0].user);
      setImageUrl(`${prefix}100x100${suffix}`);
    };

    getImages();
  }, []);

  return (
    <SpotCard>
      <SpotCardLayout>
        <SpotImage src={imageUrl} />
        <SpotContents>
          <SpotValues>
            <SpotTitle>{spot.venue.name}</SpotTitle>
            <SpotValue>{spot.venue.categories[0].name}</SpotValue>
            <SpotValue>{spot.venue.location.address}</SpotValue>
          </SpotValues>
          <div>
            <SpotRating
              color={venue && `background-color: #${venue.ratingColor};`}
            >
              {venue && venue.rating}
            </SpotRating>
          </div>
        </SpotContents>
      </SpotCardLayout>
      <SpotPhotoOwner>
        <SpotPhotoOwnerImage
          src={
            photoOwner &&
            `${photoOwner.photo.prefix}40x40${photoOwner.photo.suffix}`
          }
        />
        <SpotPhotoOwnerName>
          {photoOwner && photoOwner.firstName}
        </SpotPhotoOwnerName>
      </SpotPhotoOwner>
    </SpotCard>
  );
};

export default Spot;
