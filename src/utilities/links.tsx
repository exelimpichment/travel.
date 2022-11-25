import { Component } from 'react';
import { BiTrip } from 'react-icons/bi';
import { GrGroup } from 'react-icons/gr';
import { BsMusicNote } from 'react-icons/bs';
import { BsFillBookmarkHeartFill } from 'react-icons/bs';
import { GoSignOut } from 'react-icons/go';

interface ILink {
  id: number;
  text: string;
  path: string;
  icon: JSX.Element;
}

const links: ILink[] = [
  {
    id: 1,
    text: 'NewJourney',
    path: 'new-journey/attractions',
    icon: <BiTrip />,
  },
  {
    id: 2,
    text: 'Friends',
    path: 'new-journey/friends',
    icon: <GrGroup />,
  },
  {
    id: 3,
    text: 'Bookmarks',
    path: 'new-journey/bookmarks',
    icon: <BsFillBookmarkHeartFill />,
  },

  {
    id: 4,
    text: 'Music',
    path: '/music-player',
    icon: <BsMusicNote />,
  },
  {
    id: 5,
    text: 'SignOut',
    path: '/',
    icon: <GoSignOut />,
  },
];

export default links;
