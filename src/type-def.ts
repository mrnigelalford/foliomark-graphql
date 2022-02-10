import { gql } from 'apollo-server';

export default gql`
  type Author {
      id: ID!
      bioLink: String!
      img: String!
      name: String!
  }

  type Auction {
      id: ID!
      auctionUrl: String!
      startingPrice: Float!
      currentPrice: Float!
      endDate: String!
      token: String!
      bids: Int!
  }

  type Asset {
      id: ID!
      url: String!
      auction: [Auction]!
      Author: [Author]!
      previewImg: String!
      fullImg: String!
      title: String!
      price: Int,!
      token: String!
      likes: Int!
      category: String!
      views: Int!
      description: String!
  }

  type Query {
    asset(id: ID): Asset
  }
`;