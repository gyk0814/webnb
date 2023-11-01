import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import AccomodationCard from '../Component/AccomodationCard/AccomodationCard';
import './AccomodationList.scss';

const AccomodationList = () => {
  const [searchParams] = useSearchParams();
  const [accomodations, setAccomodations] = useState([]);

  useEffect(() => {
    const hasCategory = searchParams.has('categoryId');

    if (!hasCategory) return;

    fetch(`http://10.58.52.153:3000/rooms?${searchParams}`)
      .then(res => res.json())
      .then(({ data }) => setAccomodations(data));
  }, [searchParams]);

  return (
    <div className="accomodationList">
      {accomodations.map(accomodation => (
        <AccomodationCard key={accomodation.roomId} data={accomodation} />
      ))}
    </div>
  );
};

export default AccomodationList;

// {
//   "roomId": 1,
//   "roomTitle": "room1",
//   "price": 100,
//   "beds_count": 2,
//   "images": [
//     "url1",
//     "url2",
//     "url3",
//     "url4",
//     "url5"
//   ],
//   "reviewCounts": "3",
//   "ratings": 4,
//   "isMyPost": 1,
//   "isLiked": 0
// }

// MOCK
// const ACCOMODATION_LIST = [
//   {
//     roomId: 1,
//     images: [
//       'https://a0.muscache.com/im/pictures/539b4b10-b32b-4360-985a-5e44820b0d9a.jpg?im_w=720',
//       'https://a0.muscache.com/im/pictures/e0a5736e-b719-4f9a-b9e1-2176c192b387.jpg?im_w=720',
//       'https://a0.muscache.com/im/pictures/3a788ad1-508f-41bd-8e1e-989369309631.jpg?im_w=720',
//       'https://a0.muscache.com/im/pictures/40a6ef7b-2b4c-4121-a175-421f907d3cbd.jpg?im_w=720',
//       'https://a0.muscache.com/im/pictures/539b4b10-b32b-4360-985a-5e44820b0d9a.jpg?im_w=720',
//       'https://a0.muscache.com/im/pictures/e0a5736e-b719-4f9a-b9e1-2176c192b387.jpg?im_w=720',
//       'https://a0.muscache.com/im/pictures/3a788ad1-508f-41bd-8e1e-989369309631.jpg?im_w=720',
//       'https://a0.muscache.com/im/pictures/40a6ef7b-2b4c-4121-a175-421f907d3cbd.jpg?im_w=720',
//     ],
//     roomTitle: 'asdf',
//     ratings: '4.49',
//     isLiked: false,
//     isMyPost: false,
//     price: 200000,
//   },
//   {
//     roomId: 2,
//     images: [
//       'https://a0.muscache.com/im/pictures/e0a5736e-b719-4f9a-b9e1-2176c192b387.jpg?im_w=720',
//     ],
//     roomTitle: 'asdf',
//     ratings: '4.49',
//     isLiked: false,
//     isMyPost: false,
//     price: 200000,
//   },
//   {
//     roomId: 3,
//     images: [
//       'https://a0.muscache.com/im/pictures/539b4b10-b32b-4360-985a-5e44820b0d9a.jpg?im_w=720',
//     ],
//     roomTitle: 'asdf',
//     ratings: '4.49',
//     isLiked: false,
//     isMyPost: false,
//     price: 200000,
//   },
//   {
//     roomId: 4,
//     images: [
//       'https://a0.muscache.com/im/pictures/539b4b10-b32b-4360-985a-5e44820b0d9a.jpg?im_w=720',
//     ],
//     roomTitle: 'asdf',
//     ratings: '4.49',
//     isLiked: false,
//     isMyPost: false,
//     price: 200000,
//   },
//   {
//     roomId: 5,
//     images: [
//       'https://a0.muscache.com/im/pictures/539b4b10-b32b-4360-985a-5e44820b0d9a.jpg?im_w=720',
//     ],
//     roomTitle: 'asdf',
//     ratings: '4.49',
//     isLiked: false,
//     isMyPost: false,
//     price: 200000,
//   },
//   {
//     roomId: 6,
//     images: [
//       'https://a0.muscache.com/im/pictures/539b4b10-b32b-4360-985a-5e44820b0d9a.jpg?im_w=720',
//     ],
//     roomTitle: 'asdf',
//     ratings: '4.49',
//     isLiked: false,
//     isMyPost: false,
//     price: 200000,
//   },
// ];
