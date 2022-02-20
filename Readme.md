[1-ABOUT] 
Implemented user modules as createUser,signin,getuser.
&
Implemented news feed modules as addNewsFeed,getNewsFeed.

[2-REQUIREMENT]
node v16.13.2 with setup
npm 8.1.2 with setup
monogdb v5.0.5 with setup

[3-HOW_TO_SETUP]
npm init
npm install
Please change the .env.sample file name to .env
Please change the configSample.json file name to config.json

[4-HOW_TO_RUN]
node server.js

[5-API_END_POINTS]

[5.1-CREATE_USER]

curl --location --request PATCH 'http://localhost:2022/INDIA_TODAY/users/createUser' \
--header 'Content-Type: application/json' \
--form 'userName="akash123"' \
--form 'email="akashkumar@gmail.com"' \
--form 'password="12345678"' \
--form 'profileImage=@"/C:/Users/conne/Desktop/Company Project/dir/photo-1604605152447-1fcea1a333f3.jpg"' \
--form 'gender="male"' \
--form 'langauge="english"' \
--form 'dateOfBirth="2000-02-16"' \
--form 'timeOfBirth="10:59"' \
--form 'maritalStatus="no"' \
--form 'phoneNumber="918211234500"'
  
[5.2-SIGNIN]

curl --location --request POST 'http://localhost:2022/INDIA_TODAY/users/signin' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email":"akash@gmail.com",
    "password":"12345678"
}'

[5.3-GET_USER]

curl --location --request GET 'http://localhost:2022/INDIA_TODAY/users/getUser' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFrYXNoQGdtYWlsLmNvbSIsImlhdCI6MTY0NTM2NzA4MCwiZXhwIjoxNjQ1NDUzNDgwfQ.0Ib60rOC7866yTUIJ5dbLFnAOR5UHtVyjd0p8k233t0'

[5.4-ADD_NEWS_FEED]

curl --location --request POST 'http://localhost:2022/INDIA_TODAY/news_feed/addNewsFeed' \
--form 'author_name="akash kumar"' \
--form 'headline="This is for Testing"' \
--form 'category="AI"' \
--form 'thumbnail_url=@"/C:/Users/conne/Desktop/Company Project/dir/videoplayback.mp4"'

[5.5-GET_NEWS_FEED]

curl --location -g --request GET 'http://localhost:2022/INDIA_TODAY/news_feed/getNewsFeed?author_name=["nitesh kumar","akash kumar"]&category=["Tech","AI"]'

[5.6-GET_USER_PROFILE_IMAGE]

http://localhost:2022/getimage/{imagename}

