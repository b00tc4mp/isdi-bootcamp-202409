curl -X POST -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NzYwNzA1N2RhZmM2N2ZhNmE4ODBkODYiLCJyb2xlIjoiZGFuY2VyIiwicGVybWlzc2lvbiI6InJlYWQiLCJpYXQiOjE3MzQzNzM1MjksImV4cCI6MTczNDQxNjcyOX0.fjD1yRRctn7SrP0v7gLa3-CAOVxet_xQy5qZ8Q3d5nA' -H 'Content-Type: application/json' -d '{"oldPassword":"456456456", "newPassword":"123123123","newPasswordRepeat":"123123123"}' http://localhost:3000/users/changePassword -v