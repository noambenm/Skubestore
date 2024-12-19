from flask import Flask, request, jsonify
from flask_cors import CORS
from database import SessionLocal, Base, engine
from models import User

app = Flask(__name__)
CORS(app)

# Create all tables if they don't exist
Base.metadata.create_all(bind=engine)

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    session = SessionLocal()

    try:
        user = session.query(User).filter_by(email=data['email'], password=data['password']).first()
        if user:
            return jsonify({'message': 'Logged in successfully', 
                            'user': {'id': user.id, 'name': user.name, 'email': user.email}})
        else:
            return jsonify({'message': 'Invalid login credentials'}), 401
    finally:
        session.close()

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    session = SessionLocal()
    try:
        # Check if user already exists
        existing_user = session.query(User).filter_by(email=data['email']).first()
        if existing_user:
            return jsonify({'message': 'User already exists'}), 400

        new_user = User(name=data['name'], email=data['email'], password=data['password'])
        session.add(new_user)
        session.commit()
        return jsonify({'message': 'User registered successfully'})
    finally:
        session.close()

if __name__ == '__main__':
    app.run()
