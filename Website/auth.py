from flask import Blueprint, render_template, request

auth = Blueprint('auth',__name__)


@auth.route('/')
def authentication():
    return render_template('auth.html')


@auth.route('/login')
def login():
    return render_template('login.html',title = "Login page")


@auth.route('/signup', methods =["GET","POST"])
def signup():
    if request.method =="POST":

        return render_template('auth.html')
    else:
        return render_template('signup.html')