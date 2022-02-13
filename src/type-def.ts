import { gql } from 'apollo-server';

export default gql`
  type Author {
    id: ID!
    bioLink: String
    img: String
    name: String!
  }

  type Auction {
    id: ID!
    auctionUrl: String!
    startingPrice: Float!
    currentPrice: Float!
    endDate: String!
    token: Token!
    bids: Int
  }

  type Asset {
    id: ID!
    url: String!
    auction: [Auction]
    Author: [Author]!
    previewImg: String!
    fullImg: String!
    title: String!
    price: Int,
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
    Product Design
    Typography
  }

  type Query {
    asset(id: ID): Asset
    assets: [Asset]
    author(id: ID): Author
  }

  type Mutation {
    setAsset(title: String, description: String, price: Int, category: Category, token: Token): AssetSetResponse
    setAuthor( bioLink: String img: String name: String ): AuthorSetResponse
   }

`;