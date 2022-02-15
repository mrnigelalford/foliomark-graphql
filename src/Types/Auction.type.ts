import { Token } from 'graphql';

export interface Auction {
  _id: string;
  nftID: string; //_id of the NFT in auction
  auctionURL: string;
  startingPrice?: number;
  currentPrice: number;
  endDate?: string;
  token: Token;
  bids?: number;
}
