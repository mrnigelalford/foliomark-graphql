import { gql } from 'apollo-server';

export default gql`
  input Source {
    tools: [String]
    location: String
  }

  input License {
    name: String
  }

  input Metadata {
    name: String
    description: String
    homepage: String
    authors: [String]
    version: String
    license: License
    interfaces: [String]
    source: Source
  }

  input TransferProps {
    contractAddress: String
    tokenId: Int
    to: String
  }

  input TokenMetadataInternal {
    id: Int
    uri: String
  }

  type Author {
    _id: ID!
    bioLink: String
    img: String
    name: String!
    sales: Int!
  }

  type Auction {
    _id: String!
    nftID: String!
    url: String
    startingPrice: Int
    currentPrice: Int
    endDate: String
    token: Token
    bids: Int
    asset: [Asset]
  }

  type Asset {
    _id: ID!
    url: String
    auctionID: String
    author: Author
    previewImg: String!
    fullImg: String!
    title: String
    price: Int
    token: Token!
    likes: Int
    category: String
    views: Int!
    description: String
  }

  type AssetSetResponse {
    success: Boolean!
    id: String
    title: String
  }

  type AuthorSetResponse {
    success: Boolean!
    id: String
    name: String
  }

  type Collection {
    _id: String
    title: String!
    description: String
    img: String
    views: Int!
    likes: Int!
    assetIDs: [String]
    assets: [Asset]
  }

  type MintReceipt {
    kind: String
    source: String
    fee: String
    counter: String
    gas_limit: String
    storage_limit: String
    amount: String
    destination: String
  }

  type TranferReceipt {
    from_: String
      txs: [{ to_: string, token_id: string, amount: int }]
  }

  type RPC {
    url: String
    chain: String
  }

  type OriginationReceipt {
    address: String
    rpc: RPC
  }

  enum Token {
    XTZ
    WXTZ
    CTEZ
  }

  enum Category {
    Art
    Website
    Mobile
    Game
    Print
    illustration
    study
    Template
    Product
    Design
    Typography
  }

  type Query {
    asset(id: ID): Asset
    assets: [Asset]
    author(id: ID): Author
    authors: [Author]
    auctions: [Auction]
    auction(id: ID): Auction
    collections: [Collection]
    collection(id: ID): Collection
  }

  type Mutation {
    setAsset(
      title: String
      description: String
      price: Int
      category: Category
      token: Token
      fullImg: String
      previewImg: String
    ): AssetSetResponse
    setAuthor(
      bioLink: String
      img: String
      name: String
      sales: Int
    ): AuthorSetResponse
    setAuction(
      nftID: String!
      auctionURL: String!
      currentPrice: Int
      endDate: Category
      token: Token
    ): AssetSetResponse
    setCollection(
      name: String!
      description: String
      img: String
      views: Int!
      likes: Int!
      assetIDs: [String]
    ): AssetSetResponse
    Mint(
      ownerAddress: String
      contractAddress: String
      tokens: [TokenMetadataInternal]
    ): MintReceipt
    Originate(jsonMetadata: Metadata, owner: String): OriginationReceipt
    Transfer(TransferProps): TransferReceipt
  }
`;
