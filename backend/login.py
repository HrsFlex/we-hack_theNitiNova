import sqlite3
from werkzeug.security import generate_password_hash, check_password_hash
import streamlit as st

# Initialize database
def init_db():
    conn = sqlite3.connect('users.db')
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS users
                 (id INTEGER PRIMARY KEY AUTOINCREMENT,
                  email TEXT UNIQUE NOT NULL,
                  password TEXT NOT NULL)''')
    conn.commit()
    conn.close()

# Database operations
def get_user(email):
    conn = sqlite3.connect('users.db')
    c = conn.cursor()
    c.execute("SELECT * FROM users WHERE email=?", (email,))
    user = c.fetchone()
    conn.close()
    return user

def create_user(email, password):
    hashed_password = generate_password_hash(password)
    try:
        conn = sqlite3.connect('users.db')
        c = conn.cursor()
        c.execute("INSERT INTO users (email, password) VALUES (?, ?)", (email, hashed_password))
        conn.commit()
        conn.close()
        return True, "Account created successfully!"
    except sqlite3.IntegrityError:
        return False, "Email already exists!"

def login_component():
    st.title("Welcome to Ai Waqeel")

    # Tabs
    tab1, tab2 = st.tabs(["Login", "Sign Up"])

    # Login Tab
    with tab1:
        if "login_status" not in st.session_state:
            st.session_state.login_status = False
            st.session_state.email = None

        st.header("Login to Existing Account")
        email = st.text_input("Email", key="login_email")
        password = st.text_input("Password", type="password", key="login_password")
        
        if st.button("Login"):
            if email and password:
                user = get_user(email)
                if user and check_password_hash(user[2], password):
                    st.session_state.login_status = True
                    st.session_state.email = email
                    st.success("Login successful!")
                else:
                    st.error("Invalid email or password")
            else:
                st.warning("Please fill in all fields")

    # Sign Up Tab
    with tab2:
        st.header("Create New Account")
        new_email = st.text_input("Email", key="signup_email")
        new_password = st.text_input("Password", type="password", key="signup_password")
        confirm_password = st.text_input("Confirm Password", type="password")
        
        if st.button("Sign Up"):
            if new_email and new_password and confirm_password:
                if new_password == confirm_password:
                    success, message = create_user(new_email, new_password)
                    if success:
                        st.success(message)
                    else:
                        st.error(message)
                else:
                    st.error("Passwords don't match!")
            else:
                st.warning("Please fill in all fields")

