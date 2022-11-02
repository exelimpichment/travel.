import { Component } from 'react';
import { BiTrip } from 'react-icons/bi';
import { GrGroup } from 'react-icons/gr';
import { BsMusicNote } from 'react-icons/bs';
import { BsFillBookmarkHeartFill } from 'react-icons/bs';
// import { GrGroup } from 'react-icons/gr';

interface ILink {
  id: number;
  text: string;
  path: string;
  icon: JSX.Element;
}

const links: ILink[] = [
  {
    id: 1,
    text: 'Start new trip',
    path: '/',
    icon: <BiTrip />,
  },
  {
    id: 2,
    text: 'Friends',
    path: 'all-jobs',
    icon: <GrGroup />,
  },
  {
    id: 3,
    text: 'Friends journeys',
    path: 'add-job',
    icon: <BsFillBookmarkHeartFill />,
  },

  {
    id: 4,
    text: 'Music',
    path: 'music',
    icon: <BsMusicNote />,
  },
];

export default links;
