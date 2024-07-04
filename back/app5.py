from flask import Flask, request, jsonify, make_response
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///messages2.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'your_secret_key_here'  # Used for session management
db = SQLAlchemy(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

class Message(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user = db.Column(db.String(80), nullable=False)
    message = db.Column(db.String(120), nullable=False)
    recipient = db.Column(db.String(80), nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)

# Create database tables
with app.app_context():
    db.create_all()

@app.route('/signup', methods=['POST'])
def signup():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    if not username or not password:
        return jsonify({'error': 'Username and password are required'}), 400
    
    if User.query.filter_by(username=username).first():
        return jsonify({'error': 'Username already exists'}), 400
    
    new_user = User(username=username)
    new_user.set_password(password)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message': 'User created successfully'}), 201

@app.route('/signin', methods=['POST'])
def signin():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    if not username or not password:
        return jsonify({'error': 'Username and password are required'}), 400
    
    user = User.query.filter_by(username=username).first()
    if not user or not user.check_password(password):
        return jsonify({'error': 'Invalid username or password'}), 401
    
    # Here you can implement session management, token creation (JWT), or set a cookie
    # For simplicity, we'll return a message indicating successful login
    return jsonify({'message': 'Login successful'})

@app.route('/messages', methods=['GET'])
def get_messages():
    user1 = request.args.get('user1', default=None, type=str)
    user2 = request.args.get('user2', default=None, type=str)
    query = Message.query
    if user1 and user2:
        query = query.filter(
            ((Message.user == user1) & (Message.recipient == user2)) |
            ((Message.user == user2) & (Message.recipient == user1))
        )
    messages = query.all()
    return jsonify([{
        'id': msg.id,
        'user': msg.user,
        'message': msg.message,
        'recipient': msg.recipient,
        'timestamp': msg.timestamp
    } for msg in messages])

@app.route('/messages', methods=['POST'])
def post_message():
    data = request.json
    message = Message(user=data['user'], message=data['message'], recipient=data['recipient'])
    db.session.add(message)
    db.session.commit()
    return jsonify({
        'id': message.id,
        'user': message.user,
        'message': message.message,
        'recipient': message.recipient,
        'timestamp': message.timestamp
    }), 201

if __name__ == '__main__':
    app.run(debug=True)
