curl -X POST http://localhost:3000/payments/intent \
-H "Content-Type: application/json" \
-d '{
  "orderId": "",
  "paymentMethodId": "",
  "provider": "stripe"
}'
