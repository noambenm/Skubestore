from flask import Flask, request, jsonify
from flask_cors import CORS
from database import SessionLocal, Base, engine
from models import User, Product, Order

app = Flask(__name__)
CORS(app)

# Create tables if they don't exist
Base.metadata.create_all(bind=engine)

@app.route('/orders/place', methods=['POST'])
def place_order():
    data = request.get_json()
    session = SessionLocal()
    try:
        # Find the user by email
        user = session.query(User).filter(User.email == data['email']).first()
        if not user:
            return jsonify({'message': 'User not found'}), 404

        # Find the product by name
        product = session.query(Product).filter(Product.name == data['product_name']).first()
        if not product:
            return jsonify({'message': 'Product not found'}), 404

        # Create the new order
        new_order = Order(
            user_id=user.id,
            product_id=product.id,
            quantity=data['quantity'],
            total_price=data['total_price'],
        )
        session.add(new_order)
        session.commit()
        return jsonify({'message': 'Order placed successfully', 'order_id': new_order.id})
    except Exception as e:
        session.rollback()
        return jsonify({'error': str(e)}), 500
    finally:
        session.close()

@app.route('/orders/payment', methods=['POST'])
def handle_payment():
    data = request.get_json()
    session = SessionLocal()
    try:
        order = session.query(Order).filter(Order.id == data['order_id']).first()
        if not order:
            return jsonify({'message': 'Order not found'}), 404

        order.paid = True
        session.commit()
        return jsonify({'message': 'Payment processed successfully'})
    except Exception as e:
        session.rollback()
        return jsonify({'error': str(e)}), 500
    finally:
        session.close()

@app.route('/orders/status/<int:order_id>', methods=['GET'])
def get_order_status(order_id):
    session = SessionLocal()
    try:
        order = session.query(Order).filter(Order.id == order_id).first()
        if order:
            return jsonify({
                'id': order.id,
                'user_email': order.user.email,
                'product_name': order.product.name,
                'quantity': order.quantity,
                'total_price': str(order.total_price),
                'paid': order.paid
            })
        else:
            return jsonify({'message': 'Order not found'}), 404
    finally:
        session.close()

if __name__ == '__main__':
    app.run()
