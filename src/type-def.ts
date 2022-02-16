import { gql } from 'apollo-server';

export default gql`
  type Author {
    _id: ID!
    bioLink: String
    img: String
    name: String!
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
    title: String!
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
    auctions: [Auction]
    auction(id: ID): Auction
  }

  type Mutation {
    setAsset(
      title: String
      description: String
      price: Int
      category: Category
      token: Token
    ): AssetSetResponse
    setAuthor(bioLink: String, img: String, name: String): AuthorSetResponse
    setAuction(
      nftID: String!
      auctionURL: String!
      currentPrice: Int
      endDate: Category
      token: Token
    ): AssetSetResponse
  }
`;
