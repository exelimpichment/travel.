import { Component } from 'react';

interface ISmallLink {
  id: number;
  text: string;
}

export const smallLinks: ISmallLink[] = [
  {
    id: 1,
    text: 'All places',
  },
  {
    id: 2,
    text: 'Bookmarks',
  },
];
