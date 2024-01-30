from flask import Blueprint, render_template
from services.culture.culture_day import getTodayCulture

index_bp = Blueprint('index', __name__)

# Índice (Cultura)
@index_bp.route('/', methods=['GET'])
def index():
    today = getTodayCulture()
    return render_template('pages/index.html', today = today)