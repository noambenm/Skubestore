from flask import Flask, request, jsonify
import mysql.connector
from db_info import db, cursor
import os

app = Flask(__name__)

def create_order_table():
    cursor.execute(
        """CREATE TABLE IF NOT EXISTS orders (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT, 
        product_id INT,
        quantity INT, 
        total_price DECIMAL(10, 2),
        paid BOOLEAN DEFAULT FALSE
        );
        """)                
    db.commit()

create_order_table()

@app.route('/orders/place', methods=['POST'])
def place_order():
    data = request.get_json()
    
    cursor.execute("SELECT id FROM users WHERE email = %s", (data['email'],))
    user_id = cursor.fetchone()[0]
    
    cursor.execute("SELECT id FROM products WHERE name = %s", (data['product_name'],))
    product_id = cursor.fetchone()[0]
    
    cursor.execute("""INSERT INTO orders (user_id, product_id, quantity, total_price) 
                     VALUES (%s, %s, %s, %s)""", 
                  (user_id, product_id, data['quantity'], data['total_price']))
    db.commit()

    return jsonify({'message': 'Order placed successfully', 'order_id': cursor.lastrowid})

@app.route('/orders/payment', methods=['POST'])
def handle_payment():
    data = request.get_json()
    cursor.execute("UPDATE orders SET paid=1 WHERE id=%s", (data['order_id'],))
    db.commit()
    return jsonify({'message': 'Payment processed successfully'})

@app.route('/orders/status/<int:order_id>', methods=['GET'])
def get_order_status(order_id):
    cursor.execute("""
        SELECT orders.id, 
               users.email as user_email, 
               products.name as product_name,
               orders.quantity, 
               orders.total_price, 
               orders.paid 
        FROM orders
        JOIN products ON orders.product_id = products.id
        JOIN users ON orders.user_id = users.id
        WHERE orders.id = %s
    """, (order_id,))
    order = cursor.fetchone()
    
    if order:
        return jsonify({
            'id': order[0],
            'user_email': order[1],
            'product_name': order[2],
            'quantity': order[3],
            'total_price': order[4],
            'paid': order[5]
        })
    else:
        return jsonify({'message': 'Order not found'}), 404

if __name__ == '__main__':
    app.run()