from flask import Blueprint, jsonify
from datetime import datetime
import json
from models.curiosity import *

api_bp = Blueprint('api', __name__)

# Curiosidad del día
@api_bp.route('/v1/external/today/all', methods=['GET'])
def api_external_today_all():
    try:

        date = datetime.now().strftime("%Y-%m-%d")
        file_name = f'./external_data/{date}.json'

        with open(file_name, 'r') as today_file:
            today = json.load(today_file)

        return jsonify({'today': today})

    except Exception as e:
            print(f"Error en api_external_today_all(): {e}")


# Curiosidad del día
@api_bp.route('/v1/internal/curiosity/today', methods=['GET'])
def api_internal_curiosity_today():
    try:

        current_date = datetime.now()
        current_month = current_date.strftime("%B").lower()
        current_day = current_date.day

        with open('internal_data/curiosities_2024.json', 'r') as curiosities_file:
            curiosities_obj = json.load(curiosities_file)

        month = curiosities_obj[current_month]

        return jsonify({'curiosity': month[str(current_day)]})

    except Exception as e:
            print(f"Error en api_internal_curiosity_today(): {e}")


# Curiosidad aleatoria
@api_bp.route('/v1/internal/curiosity/random', methods=['GET'])
def api_internal_curiosity_random():
    try:

        current_date = datetime.now()
        current_month = current_date.strftime("%B").lower()
        current_day = current_date.day

        with open('internal_data/curiosities_2024.json', 'r') as curiosities_file:
            curiosities_obj = json.load(curiosities_file)

        month = curiosities_obj[current_month]

        return jsonify({'curiosity': month[str(current_day)]})

    except Exception as e:
            print(f"Error en api_internal_curiosity_random(): {e}")


# Frase del día
@api_bp.route('/v1/internal/phrase/today', methods=['GET'])
def api_internal_phrase_today():
    try:

        current_date = datetime.now()
        current_month = current_date.strftime("%B").lower()
        current_day = current_date.day

        with open('internal_data/phrases_2024.json', 'r') as curiosities_file:
            curiosities_obj = json.load(curiosities_file)

        month = curiosities_obj[current_month]

        return jsonify({'curiosity': month[str(current_day)]})

    except Exception as e:
            print(f"Error en api_internal_phrase_today(): {e}")


# Frase aleatoria
@api_bp.route('/v1/internal/phrase/random', methods=['GET'])
def api_internal_phrase_random():
    try:
            
        current_date = datetime.now()
        current_month = current_date.strftime("%B").lower()
        current_day = current_date.day

        with open('internal_data/phrases_2024.json', 'r') as curiosities_file:
            curiosities_obj = json.load(curiosities_file)

        month = curiosities_obj[current_month]

        return jsonify({'curiosity': month[str(current_day)]})

    except Exception as e:
        print(f"Error en api_internal_phrase_random(): {e}")