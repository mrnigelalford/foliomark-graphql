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