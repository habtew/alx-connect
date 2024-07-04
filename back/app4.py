from flask import Flask, request, jsonify, session, redirect, url_for
from flask_cors import CORS
from flask_session import Session
from functools import wraps
from datetime import datetime
import pyrebase
from flask_socketio import SocketIO, join_room, leave_room, emit

app = Flask(__name__)
CORS(app)

# Configure server-side session
app.config['SESSION_TYPE'] = 'filesystem'
app.config['SECRET_KEY'] = 'supersecretkey'
Session(app)
socketio = SocketIO(app, manage_session=False)

# Firebase configuration
firebaseConfig = {
    
}

firebase = pyrebase.initialize_app(firebaseConfig)
auth = firebase.auth()
db = firebase.database()

@app.route('/')
def index():
    if 'user' in session:
        return f"Welcome {session['user']['email']} to the Messaging App!"
    return "Welcome to the Messaging App! Please log in."

@app.route('/signup', methods=['POST'])
def signup():
    email = request.json.get('email')
    password = request.json.get('password')
    if not email or not password:
        return jsonify({"message": "Email and password are required"}), 400
    
    try:
        user = auth.create_user_with_email_and_password(email, password)
        user_data = {"email": email, "localId": user['localId']}
        db.child("users").child(user['localId']).set(user_data)
        return jsonify({"message": "User created successfully", "user_id": user['localId']}), 201
    except Exception as e:
        print(e)
        return jsonify({"message": f"Failed to create user: {e}"}), 400

@app.route('/login', methods=['POST'])
def login():
    email = request.json.get('email')
    password = request.json.get('password')
    if not email or not password:
        return jsonify({"message": "Email and password are required"}), 400

    try:
        user = auth.sign_in_with_email_and_password(email, password)
        session['user'] = user
        return jsonify({"message": "Login successful"}), 200
    except Exception as e:
        print(e)
        return jsonify({"message": f"Failed to login: {e}"}), 401

@app.route('/logout')
def logout():
    session.pop('user', None)
    return redirect(url_for('index'))

def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if 'user' not in session:
            return jsonify({"message": "Authentication is required"}), 401
        return f(*args, **kwargs)
    return decorated_function

@app.route('/send_message', methods=['POST'])
@login_required
def send_message():
    user = session['user']
    recipient_email = request.json.get('recipient_email')
    content = request.json.get('content')
    
    recipient = db.child("users").order_by_child("email").equal_to(recipient_email).get()
    recipient_data = None
    for r in recipient.each():
        recipient_data = r.val()
        break

    if not recipient_data:
        return jsonify({"message": "Recipient not found"}), 404

    message = {
        "sender": user['localId'],
        "recipient": recipient_data['localId'],
        "content": content,
        "timestamp": datetime.now().isoformat()
    }
    db.child("messages").push(message)
    
    # Emit the message to the recipient's room
    socketio.emit('new_message', message, room=recipient_data['localId'])
    
    return jsonify({"message": "Message sent"}), 200

@app.route('/get_chat_history', methods=['POST'])
@login_required
def get_chat_history():
    user = session['user']
    other_user_email = request.json.get('email')
    
    other_user = db.child("users").order_by_child("email").equal_to(other_user_email).get()
    other_user_data = None
    for r in other_user.each():
        other_user_data = r.val()
        break

    if not other_user_data:
        return jsonify({"message": "User not found"}), 404

    sender_recipient = db.child("messages").order_by_child("sender").equal_to(user['localId']).get().val()
    recipient_sender = db.child("messages").order_by_child("recipient").equal_to(user['localId']).get().val()

    chat_history = []
    if sender_recipient:
        chat_history.extend([msg for msg in sender_recipient.values() if msg['recipient'] == other_user_data['localId']])
    if recipient_sender:
        chat_history.extend([msg for msg in recipient_sender.values() if msg['sender'] == other_user_data['localId']])

    chat_history = sorted(chat_history, key=lambda x: x['timestamp'])
    return jsonify({"chat_history": chat_history}), 200

@app.route('/get_contacts', methods=['GET'])
@login_required
def get_contacts():
    user = session['user']
    received_messages = db.child("messages").order_by_child("recipient").equal_to(user['localId']).get().val()
    
    contacts = set()
    if received_messages:
        for msg in received_messages.values():
            sender_id = msg['sender']
            sender = db.child("users").child(sender_id).get().val()
            if sender:
                contacts.add(sender['email'])
    
    return jsonify({"contacts": list(contacts)}), 200

@socketio.on('connect')
def handle_connect():
    if 'user' in session:
        join_room(session['user']['localId'])
        emit('status', {'message': 'Connected', 'user': session['user']['localId']})

@socketio.on('disconnect')
def handle_disconnect():
    if 'user' in session:
        leave_room(session['user']['localId'])
        emit('status', {'message': 'Disconnected', 'user': session['user']['localId']})

if __name__ == '__main__':
    socketio.run(app, debug=True)
