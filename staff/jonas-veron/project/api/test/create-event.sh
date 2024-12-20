curl -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NzVhZTRhZjZkY2E1ZGJjZjFkNGY1MGUiLCJyb2xlIjoib3JnYW5pemVyIiwicGVybWlzc2lvbiI6IndyaXRlIiwiaWF0IjoxNzM0MDc4MjY5LCJleHAiOjE3MzQxMjE0Njl9.jIVI30HeVvcvHQsTo0Y7gKtw1-Y5n31HeypUHUyKTME' \
     -H 'Content-Type: application/json' \
     -d '{"files":["https://www.salsero.es/images/events/2024-10-30-09-42-29_67229a35011f7.jpg"], "eventType":"Sociales","text":"PRUEBAAAAAeaaaaa!", "eventDate":"2024-12-31","location":{"address":"Barcelona", "province":"Barcelona","coordinates":[41.3870154,2.1700471]}}' \
     http://localhost:3000/events -v
