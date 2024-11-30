curl -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NzRiNGZlNTgwZDc5NmJlODY3NGIzN2UiLCJyb2xlIjoib3JnYW5pemVyIiwiaWF0IjoxNzMyOTkzODc3LCJleHAiOjE3MzI5OTc0Nzd9.niVlBWVVcf5WWqFCol2x-qb7lvxnjM8aoXYTpw_7OVE' \
     -H 'Content-Type: application/json' \
     -d '{"image":"https://www.salsero.es/images/events/2024-10-30-09-42-29_67229a35011f7.jpg", "text":"A BAILAR!", "date":"2024-12-04T10:30:00.000Z"}' \
     http://localhost:3000/events -v
