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
