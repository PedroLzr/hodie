from flask import Flask
from modules.index import index_bp
from modules.economy import economy_bp
from modules.credits import credits_bp
from modules.our_apis import our_apis_bp
from modules.games import games_bp
from modules.api_culture_v1 import api_culture_v1_bp

app = Flask(__name__, static_folder="static")

app.register_blueprint(index_bp)
app.register_blueprint(economy_bp)
app.register_blueprint(credits_bp)
app.register_blueprint(our_apis_bp)
app.register_blueprint(games_bp, url_prefix='/games')
app.register_blueprint(api_culture_v1_bp, url_prefix='/api/v1')

if __name__ == '__main__':
    app.run()