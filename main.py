#Just run to start app
from Website import create_app


app = create_app()

if __name__ == '__main__':
    app.run(debug = True)