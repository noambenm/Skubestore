#!/bin/sh

SKUBESTORE_APP_API_URL="http://localhost"
PRODUCT_SERVICE_PORT="5000"
USER_SERVICE_PORT="5001"
ORDER_SERVICE_PORT="5002"


sleep 30
# Function to handle curl requests and retry on failure
perform_request() {
  local data="$1"
  local url="$2"
  local max_retries=3
  local attempt=0

  while [ $attempt -lt $max_retries ]; do
    if curl --fail --silent --show-error --json "$data" "$url"; then
      return 0
    fi
    attempt=$((attempt + 1))
    echo "Retrying... ($attempt/$max_retries)"
    sleep 5
  done

  echo "Failed after $max_retries attempts: $url"
  exit 1
}

# Adding products to the store
perform_request '{"name": "Wetsuit", "description": "5mm Forth Element Wetsuit", "price": "1400"}' "$SKUBESTORE_APP_API_URL:$PRODUCT_SERVICE_PORT/products/add"
perform_request '{"name": "Regulator", "description": "ScubaPro MK25 Evo S260 Regulators", "price": "4500"}' "$SKUBESTORE_APP_API_URL:$PRODUCT_SERVICE_PORT/products/add"
perform_request '{"name": "Fins", "description": "ScubaPro Jetfins", "price": "800"}' "$SKUBESTORE_APP_API_URL:$PRODUCT_SERVICE_PORT/products/add"
perform_request '{"name": "Mask", "description": "Beuchat Mask", "price": "280"}' "$SKUBESTORE_APP_API_URL:$PRODUCT_SERVICE_PORT/products/add"

# Creating users
perform_request '{"name": "Alec Pierce", "email": "alec@scuba.com", "password": "anterio1234"}' "$SKUBESTORE_APP_API_URL:$USER_SERVICE_PORT/register"
perform_request '{"name": "Woody Alpine", "email": "woody@scuba.com", "password": "pink1234"}' "$SKUBESTORE_APP_API_URL:$USER_SERVICE_PORT/register"
perform_request '{"name": "Gus Gonzules", "email": "gus@scuba.com", "password": "knife1234"}' "$SKUBESTORE_APP_API_URL:$USER_SERVICE_PORT/register"

# User login
perform_request '{"email": "woody@scuba.com", "password": "pink1234"}' "$SKUBESTORE_APP_API_URL:$USER_SERVICE_PORT/login"

# Placing orders
perform_request '{"email": "woody@scuba.com", "product_name": "Wetsuit", "quantity": "1", "total_price": "1400"}' "$SKUBESTORE_APP_API_URL:$ORDER_SERVICE_PORT/orders/place"
perform_request '{"email": "gus@scuba.com", "product_name": "Regulator", "quantity": "2", "total_price": "9000"}' "$SKUBESTORE_APP_API_URL:$ORDER_SERVICE_PORT/orders/place"
perform_request '{"email": "alec@scuba.com", "product_name": "Mask", "quantity": "3", "total_price": "1400"}' "$SKUBESTORE_APP_API_URL:$ORDER_SERVICE_PORT/orders/place"

# Making payments
perform_request '{"order_id": "1"}' "$SKUBESTORE_APP_API_URL:$ORDER_SERVICE_PORT/orders/payment"
perform_request '{"order_id": "2"}' "$SKUBESTORE_APP_API_URL:$ORDER_SERVICE_PORT/orders/payment"
perform_request '{"order_id": "3"}' "$SKUBESTORE_APP_API_URL:$ORDER_SERVICE_PORT/orders/payment"

# Checking order status
perform_request '' "$SKUBESTORE_APP_API_URL:$ORDER_SERVICE_PORT/orders/status/1"
perform_request '' "$SKUBESTORE_APP_API_URL:$ORDER_SERVICE_PORT/orders/status/2"
perform_request '' "$SKUBESTORE_APP_API_URL:$ORDER_SERVICE_PORT/orders/status/3"

exit 0
