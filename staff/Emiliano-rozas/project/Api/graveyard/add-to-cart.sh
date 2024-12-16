curl -X POST http://localhost:7000/cart/add \
-H "Content-Type: application/json" \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NzRiNDFlMzFkNDkzZTZlYTFkMjU0ZWYiLCJyb2xlIjoibW9kZXJhdG9yIiwiaWF0IjoxNzMzMzMxNzI1LCJleHAiOjE3MzMzMzUzMjV9.TuBj6FGOp00mIcY0SPJI5SCF5Y7-tspk2uTe2dSn8ao" \
-d '{
    "productId": "674b3627f5a3f200a06f4173",
    "quantity": 2
}'
