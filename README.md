# README


```
rails g devise:views
```


## Setup
### First Time
```
bundle install
```


* start postgresql if it not active below
```
bin/setup
```


* create database seed
```
bundle exec rails db:seed
```
### Update
```
bundle exec rails db:reset
# This will automatically reset the database and create seeds.
```
```
bin/setup
```
## start:

```
bundle exec rails s
```

```
bin/webpacker-dev-server
```

## User info

```
email:'golfer@test.com', password:'123456'
email:'creator@test.com', password:'123456'
email:'admin@test.com', password:'123456'
```

