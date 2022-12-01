import { Component } from 'react';

interface ISmallLink {
  id: number;
  text: string;
  // disabled: boolean;
}

export const smallLinks: ISmallLink[] = [
  {
    id: 1,
    text: 'All places',
    // disabled: !allPlacesShown,
  },
  {
    id: 2,
    text: 'Bookmarks',
    // disabled: allPlacesShown,
  },
];
