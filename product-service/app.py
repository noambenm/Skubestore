from flask import Flask, request, jsonify
import mysql.connector
from db_info import db, cursor
import os

app = Flask(__name__)

def create_products_table():
    cursor.execute(
        """CREATE TABLE IF NOT EXISTS products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255),
        description VARCHAR(255),
        price DECIMAL(10, 2)
        );
        """)
    db.commit()

create_products_table()

@app.route('/products/add', methods=['POST'])
def add_product():
    data = request.get_json()
    cursor.execute("INSERT INTO products (name, description, price) VALUES (%s, %s, %s)", (data['name'], data['description'], data['price']))
    db.commit()
    return jsonify({'message': 'Product added successfully'})

@app.route('/products/delete/<int:product_id>', methods=['DELETE'])
def delete_product(product_id):
    cursor.execute("DELETE FROM products WHERE id=%s", (product_id,))
    db.commit()
    return jsonify({'message': 'Product deleted successfully'})

@app.route('/products/view', methods=['GET'])
def view_products():
    cursor.execute("SELECT * FROM products")
    products = cursor.fetchall()
    return jsonify([{'id': p[0], 'name': p[1], 'description': p[2], 'price': p[3]} for p in products])

if __name__ == '__main__':
    app.run()