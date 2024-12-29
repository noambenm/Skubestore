from flask import Flask, request, jsonify
from flask_cors import CORS
from database import SessionLocal, Base, engine
from models import Product

app = Flask(__name__)
CORS(app)

# Create tables if they don't exist
Base.metadata.create_all(bind=engine)

@app.route('/products/add', methods=['POST'])
def add_product():
    data = request.get_json()
    session = SessionLocal()
    try:
        new_product = Product(
            name=data['name'],
            description=data.get('description', ''),  # Default empty string if not provided
            price=data['price']
        )
        session.add(new_product)
        session.commit()
        return jsonify({'message': 'Product added successfully'})
    except Exception as e:
        session.rollback()
        return jsonify({'error': str(e)}), 500
    finally:
        session.close()

@app.route('/products/delete/<int:product_id>', methods=['DELETE'])
def delete_product(product_id):
    session = SessionLocal()
    try:
        product = session.query(Product).filter(Product.id == product_id).first()
        if not product:
            return jsonify({'message': 'Product not found'}), 404

        session.delete(product)
        session.commit()
        return jsonify({'message': 'Product deleted successfully'})
    except Exception as e:
        session.rollback()
        return jsonify({'error': str(e)}), 500
    finally:
        session.close()

@app.route('/products/view', methods=['GET'])
def view_products():
    session = SessionLocal()
    try:
        products = session.query(Product).all()
        return jsonify([{
            'id': p.id,
            'name': p.name,
            'description': p.description,
            'price': str(p.price)
        } for p in products])
    finally:
        session.close()

if __name__ == '__main__':
    app.run()
