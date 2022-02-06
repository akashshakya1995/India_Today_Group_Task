[1-ABOUT] 
Implemented user modules as signup,signin,getuserdetails,updateuserdetails.

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

[5.1-SIGNUP]

curl --location --request POST 'http://localhost:2022/SIMFORMtest/users/signup' \
--header 'Content-Type: application/json' \
--form 'firstName="akash"' \
--form 'lastName="kumar"' \
--form 'email="akash@gmail.com"' \
--form 'password="12345"' \
--form 'profileImage=@"/C:/Users/conne/Desktop/dir/photo-1533450718592-29d45635f0a9.jpg"'
  
[5.2-SIGNIN]

 curl --location --request POST 'http://localhost:2022/SIMFORMtest/users/signin' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email":"akash@gmail.com",
    "password":"12345"
}'

[5.3-GET_USER_DETAILS]

curl --location --request GET 'http://localhost:2022/SIMFORMtest/users/getUser' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFrYXNoQGdtYWlsLmNvbSIsImlhdCI6MTY0NDE2NDYzNCwiZXhwIjoxNjQ0MjUxMDM0fQ.-iBMJEqMxfhA1gaGmcMrMTuLmbURe4g336eB2216f94'

[5.4-UPDATE_USER_DETAILS]

curl --location --request PATCH 'http://localhost:2022/SIMFORMtest/users/updateDetails' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFrYXNoQGdtYWlsLmNvbSIsImlhdCI6MTY0NDE2NDkwNywiZXhwIjoxNjQ0MjUxMzA3fQ.nbii6tjQwChEznW4KdJS_yVgprhCuxdL5_hKZabFtMI' \
--form 'firstName="akash"' \
--form 'lastName="kumar"' \
--form 'email="akashkumar@gmail.com"' \
--form 'password="123456"' \
--form 'profileImage=@"/C:/Users/conne/Desktop/dir/photo-1604605152447-1fcea1a333f3.jpg"'

[5.5-GET_PROFILE_IMAGE]

http://localhost:2022/getimage/{imagename}

