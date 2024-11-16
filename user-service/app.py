from flask import Flask, request, jsonify
import mysql.connector
from db_info import db, cursor
import os

app = Flask(__name__)

def create_users_table():
    cursor.execute(
        """CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255),
        email VARCHAR(255),
        password VARCHAR(255)
        );
        """)
                
    db.commit()

create_users_table()

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    cursor.execute("SELECT * FROM users WHERE email=%s AND password=%s", (data['email'], data['password']))
    user = cursor.fetchone()
    if user:
        return jsonify({'message': 'Logged in successfully', 'user': {'id': user[0], 'name': user[1], 'email': user[2]}})
    else:
        return jsonify({'message': 'Invalid login credentials'}), 401

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    cursor.execute("INSERT INTO users (name, email, password) VALUES (%s, %s, %s)", (data['name'], data['email'], data['password']))
    db.commit()
    return jsonify({'message': 'User registered successfully'})

if __name__ == '__main__':
    app.run()