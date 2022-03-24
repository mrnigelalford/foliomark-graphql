import { Auction } from '../Types/Auction.type';
import { Collection } from '../Types/Collection.type';
import { FA2Receipt, TezosNode } from './TezosInterface';

const tezosNode = new TezosNode('http://0.0.0.0:20000');
export interface Metadata {
  name: string;
  description: string;
  homepage: string;
  authors: string[];
  version: string;
  license: License;
  interfaces: string[];
  source: Source;
}

export interface License {
  name: string;
}

export interface Source {
  tools: string[];
  location: string;
}

export interface OriginationProps {
  jsonMetadata: Metadata;
  ownerAddress: string;
}

export interface MintProps {
  ownerAddress: string;
  tokens: { id: number; uri: string }[];
  contractAddress: string;
}
export interface BurnProps {
  contractAddress: string;
  tokenId: number;
  ownerAddress: string;
}

export interface TransferProps extends BurnProps {
  from: string;
  to: string;
}

export default {
  Query: {
    asset: (_, { id }, { dataSources }) => dataSources.assets.getAssetByID(id),
    assets: (_, __, { dataSources }) => dataSources.assets.getAllAssets(),
    auctions: (_, __, { dataSources }) => dataSources.auctions.getAllAuctions(),
    auction: (_, { id }, { dataSources }) =>
      dataSources.auctions.getAuctionByID({ id }),
    authors: (_, __, { dataSources }) => dataSources.authors.getAllAuthors(),
    author: (_, { id }, { dataSources }) =>
      dataSources.authors.getAuthorByID({ id }),
    collections: (_, __, { dataSources }) =>
      dataSources.collections.getAllCollections(),
    collection: (_, { id }, { dataSources }) =>
      dataSources.collections.getCollectionByID({ id }),
  },
  Mutation: {
    setAsset: async (
      _,
      { title, description, price, category, token, fullImg, previewImg },
      { dataSources }
    ) => {
      return await dataSources.assets.setAsset({
        title,
        description,
        price,
        category,
        token,
        fullImg,
        previewImg,
      });
    },
    setAuction: (_, props: Auction, { dataSources }) =>
      dataSources.auction.setAuction(props),
    setAuthor: (_, props: Auction, { dataSources }) =>
      dataSources.authors.setAuthor(props),
    setCollection: (_, props: Collection, { dataSources }) =>
      dataSources.collections.setCollection(props),
    Mint: (_, args: MintProps): Promise<FA2Receipt> => tezosNode.mint(args),
    Originate: async (_, args: OriginationProps) => tezosNode.originate(args),
    Transfer: async (_, transferProps: TransferProps): Promise<FA2Receipt> =>
      tezosNode.transfer(transferProps),
    Burn: (_, burnProps: BurnProps): Promise<FA2Receipt> =>
      tezosNode.burn(burnProps),
    Pause: (_, contractAddress: string) => tezosNode.pause(contractAddress),
  },
};
