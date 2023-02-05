from flask import Blueprint, render_template

auth = Blueprint('auth',__name__)


@auth.route('/')
def authentication():
    return render_template('auth.html')


@auth.route('/login')
def login():
    return render_template('login.html',title = "Login page")


@auth.route('/signup')
def signup():
    return render_template('signup.html')