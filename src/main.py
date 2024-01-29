from flask import Flask, render_template
from controllers.culture import getTodayCulture
from api.api import api_bp

app = Flask(__name__, static_folder="static")
app.register_blueprint(api_bp, url_prefix='/api')


# Índice (Cultura)
@app.route('/', methods=['GET'])
def index():
    today = getTodayCulture()
    return render_template('pages/index.html', today = today)


# Economía
@app.route('/economy', methods=['GET'])
def economy():
    return render_template('pages/economy.html')


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
    return render_template('pages/games/hangman.html')


# Alto el lápiz
@app.route('/stop', methods=['GET'])
def stop():
    return render_template('pages/games/stop.html')


# Alto el lápiz matemático
@app.route('/stop_mat', methods=['GET'])
def stop_mat():
    return render_template('pages/games/stop_mat.html')


if __name__ == '__main__':
    app.run()