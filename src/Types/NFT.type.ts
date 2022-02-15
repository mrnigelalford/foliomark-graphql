import { Auction } from './Auction.type';

enum Token {
  XTZ = 'XTZ',
  WXTZ = 'WXTZ',
  CTEZ = 'CTEZ',
}

interface Author {
  id: string;
  bioLink: string;
  img: string;
  name: string;
}

export interface NFT {
  _id: string;
  url: string;
  auction?: Auction[];
  Author: Author;
  previewImg?: string;
  fullImg: string;
  title: string;
  price?: number;
  token?: Token;
  likes?: number;
  category: string;
  views?: number;
  description: string;
}
