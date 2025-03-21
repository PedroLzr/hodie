from flask import Flask
from routes.index import index_bp
from routes.economy import economy_bp
from routes.credits import credits_bp
from routes.our_apis import our_apis_bp
from routes.games import games_bp
from routes.api_culture_v1 import api_culture_v1_bp

app = Flask(__name__, static_folder="static")

# Registro de Blueprints
app.register_blueprint(index_bp)
app.register_blueprint(economy_bp)
app.register_blueprint(credits_bp)
app.register_blueprint(our_apis_bp)
app.register_blueprint(games_bp, url_prefix='/games')
app.register_blueprint(api_culture_v1_bp, url_prefix='/api/v1')

if __name__ == '__main__':
    app.run()