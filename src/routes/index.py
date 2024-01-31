from flask import Blueprint, render_template
from datetime import datetime
import os
from services.culture.save_culture_day_file import save_culture_day_file
from services.utils.read_json_file import read_json_file
from config.config_parameters import EXTERNAL_DATA

index_bp = Blueprint('index', __name__)

# Índice (Cultura)
@index_bp.route('/', methods=['GET'])
def index():

    today = {}

    date = datetime.now().strftime("%Y-%m-%d")
    file_name = f'{EXTERNAL_DATA["culture_path"]}/{date}.json'

    try:
        if os.path.exists(file_name):
            print("El archivo existe, leyendo archivo...")
            today = read_json_file(file_name)
        else:
            print("El archivo no existe, llamando a save_culture_day_file()...")
            save_culture_day_file()
            today = read_json_file(file_name)
    except Exception as ex:
        print(f"Error al procesar el archivo: {ex}")

    return render_template('pages/index.html', today = today)