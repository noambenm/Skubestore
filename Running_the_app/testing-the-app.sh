#!/bin/sh

SKUBESTORE_APP_API_URL="http://localhost"
PRODUCT_SERVICE_PORT="5000"
USER_SERVICE_PORT="5001"
ORDER_SERVICE_PORT="5002"

#adding products to the store
echo "Adding products to store inventory" && sleep 1
echo "Adding 5mm Wetsuit" && sleep 1
curl --json '{"name": "Wetsuit", "description": "5mm Forth Element Wetsuit", "price": "1400"}' $SKUBESTORE_APP_API_URL:$PRODUCT_SERVICE_PORT/products/add && sleep 1
echo "Adding ScobaPro Regutaltor" && sleep 1
curl --json '{"name": "Regulator", "description": "ScubaPro MK25 Evo S260 Regulators", "price": "4500"}' $SKUBESTORE_APP_API_URL:$PRODUCT_SERVICE_PORT/products/add && sleep 1
echo "Adding ScubaPro Jetfins" && sleep 1
curl --json '{"name": "Fins", "description": "ScubaPro Jetfins", "price": "800"}' $SKUBESTORE_APP_API_URL:$PRODUCT_SERVICE_PORT/products/add && sleep 1
echo "Adding Beuchat Mask" && sleep 1
curl --json '{"name": "Mask", "description": "Beuchat Mask", "price": "280"}' $SKUBESTORE_APP_API_URL:$PRODUCT_SERVICE_PORT/products/add && sleep 2

#User Creation
echo "Creating 3 users" && sleep 1
echo "Creating Alec Pierce" && sleep 1
curl --json '{"name": "Alec Pierce", "email": "alec@scuba.com", "password": "anterio1234"}' $SKUBESTORE_APP_API_URL:$USER_SERVICE_PORT/register && sleep 1
echo "Creating Woody Alpine" && sleep 1
curl --json '{"name": "Woody Alpine", "email": "woody@scuba.com", "password": "pink1234"}' $SKUBESTORE_APP_API_URL:$USER_SERVICE_PORT/register && sleep 1
echo "Creating Gus Gonzules" && sleep 1
curl --json '{"name": "Gus Gonzules", "email": "gus@scuba.com", "password": "knife1234"}' $SKUBESTORE_APP_API_URL:$USER_SERVICE_PORT/register && sleep 2

#User Login
echo "Logging in as Woody Alpine" && sleep 1
curl --json '{"email": "woody@scuba.com", "password": "pink1234"}' $SKUBESTORE_APP_API_URL:$USER_SERVICE_PORT/login && sleep 2

#place order
echo "Placing order for 1 Wetsuits for Woody" && sleep 1
curl --json '{"email": "woody@scuba.com", "product_name": "Wetsuit", "quantity": "1", "total_price": "1400"}' $SKUBESTORE_APP_API_URL:$ORDER_SERVICE_PORT/orders/place && sleep 1
echo "Placing order for 2 Regulator for Gus" && sleep 1
curl --json '{"email": "gus@scuba.com", "product_name": "Regulator", "quantity": "2", "total_price": "9000"}' $SKUBESTORE_APP_API_URL:$ORDER_SERVICE_PORT/orders/place && sleep 1
echo "Placing order for 3 Masks for Alec" && sleep 1
curl --json '{"email": "alec@scuba.com", "product_name": "Mask", "quantity": "3", "total_price": "1400"}' $SKUBESTORE_APP_API_URL:$ORDER_SERVICE_PORT/orders/place && sleep 2

#order payment
echo "Paying for woody's order" && sleep 1
curl --json '{"order_id": "1"}' $SKUBESTORE_APP_API_URL:$ORDER_SERVICE_PORT/orders/payment && sleep 1
echo "Paying for gus's order" && sleep 1
curl --json '{"order_id": "2"}' $SKUBESTORE_APP_API_URL:$ORDER_SERVICE_PORT/orders/payment && sleep 1
echo "Paying for alec's order" && sleep 1
curl --json '{"order_id": "3"}' $SKUBESTORE_APP_API_URL:$ORDER_SERVICE_PORT/orders/payment && sleep 2

#order status
echo "Checking order status for woody" && sleep 1
curl $SKUBESTORE_APP_API_URL:$ORDER_SERVICE_PORT/orders/status/1 && sleep 1
echo "Checking order status for gus" && sleep 1
curl $SKUBESTORE_APP_API_URL:$ORDER_SERVICE_PORT/orders/status/2 && sleep 1
echo "Checking order status for alec" && sleep 1
curl $SKUBESTORE_APP_API_URL:$ORDER_SERVICE_PORT/orders/status/3 && sleep 2
echo "Thats it, Thank you for buying trom Skubestore, Goodbye"
sleep 3
