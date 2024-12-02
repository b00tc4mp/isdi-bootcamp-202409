curl -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NzRlMTAxY2IwN2VhYzllZGE3NzYwMDciLCJyb2xlIjoiZGFuY2VyIiwiaWF0IjoxNzMzMTY5MTg5LCJleHAiOjE3MzMxNzI3ODl9.InmoHmYpvf8z1VOtYqEHj_gJ4HG8Y4ssAcRhN5CTo9k' \
     -H 'Content-Type: application/json' \
     -d '{"image":"https://www.salsero.es/images/events/2024-10-30-09-42-29_67229a35011f7.jpg", "text":"PRUEBAAAAAeaaaaa!", "date":"2024-12-07","location":{"address":"Barcelona","coordinates":[41.3870154,2.1700471]}}' \
     http://localhost:3000/events -v
