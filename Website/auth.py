from flask import Blueprint, render_template

auth = Blueprint('auth',__name__)


@auth.route('/')
def authentication():
    return render_template('auth.html')


@auth.route('/login')
def login():
    return "<h1> This is the login page </h1>"


@auth.route('/signup')
def signup():
    return "<h1> This is the Sign-up page </h1>"