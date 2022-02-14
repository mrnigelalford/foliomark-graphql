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

interface Auction {
  id: string;
  auctionUrl: string;
  startingPrice: number;
  currentPrice: number;
  endDate: string;
  token: Token;
  bids: number;
}

export interface NFT {
  id: string;
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
