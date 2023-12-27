from flask import Flask, render_template
from controllers.index import getToday
from api.api import api_bp

app = Flask(__name__, static_folder="static")
app.register_blueprint(api_bp, url_prefix='/api')


# Índice
@app.route('/', methods=['GET'])
def index():
    today = getToday()
    return render_template('pages/index.html', today=today)


# Créditos
@app.route('/credits', methods=['GET'])
def credits():
    return render_template('pages/credits.html')


# Nuestras APIs
@app.route('/ourApis', methods=['GET'])
def ourApis():
    return render_template('pages/our_apis.html')


# Adivina la palabra
@app.route('/hangman', methods=['GET'])
def hangman():
    return render_template('pages/hangman.html')


# Levanta el lápiz
@app.route('/stop', methods=['GET'])
def stop():
    return render_template('pages/stop.html')


if __name__ == '__main__':
    app.run()