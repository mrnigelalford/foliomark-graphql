depoloy to gcloud

```
    gcloud functions deploy web --entry-point handler --runtime nodejs14 --trigger-http
```

or

```
    gcloud functions deploy web
```

Build for prod

```
 NODE_ENV=production npm run build
```

### Welcome to the GraphQL middle layer

This middle layer uses Apollo GraphQL hosted on Google Cloud Functions

[ApolloGraphQL](https://www.apollographql.com/docs/tutorial) has a great learning tutorial to walk through the basics of setting up GraphQL

LocalTesting:
https://studio.apollographql.com/sandbox/explorer

File uploading is happening outside of Apollo. A single URL is provided here for storage.

### Workflow

#### definition of profile

    - collection
    - for sale
    - owned
    - offers
    - likes
    - comments
    - assets
    - auctions

### Using a faucet to create a test account

- Use the `tezos-client`
- Setup a new faucet account via the network appropriate [testnet](https://teztnets.xyz/hangzhounet-faucet)

#### Test User Info

```
// private key: edsk47JmoRXUujaKZTRp7P1AVpdUaQE2nTBzWhd85gPjeFgPWaXpUJ
// address: tz1d6fz2wSVhHirKYsbRjpgVfHXJMzDUScR8
// test smart contract: KT1AKo12GNP3VF7t9z4CXi8WooLBph9EXzPN
```
