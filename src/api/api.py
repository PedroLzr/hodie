from flask import Blueprint, jsonify
from datetime import datetime
import json
from models.curiosity import *

api_bp = Blueprint('api', __name__)

@api_bp.route('/v1/internal/curiosity/today', methods=['GET'])
def api_internal_curiosity_today():

    current_date = datetime.now()
    current_month = current_date.strftime("%B").lower()
    current_day = current_date.day

    with open('internal_data/curiosities_2023.json', 'r') as curiosities_file:
        curiosities_obj = json.load(curiosities_file)

    month = curiosities_obj[current_month]

    return jsonify({'curiosity': month[str(current_day)]})

@api_bp.route('/v1/internal/curiosity/random', methods=['GET'])
def api_internal_curiosity_random():

    current_date = datetime.now()
    current_month = current_date.strftime("%B").lower()
    current_day = current_date.day

    with open('internal_data/curiosities_2023.json', 'r') as curiosities_file:
        curiosities_obj = json.load(curiosities_file)

    month = curiosities_obj[current_month]

    return jsonify({'curiosity': month[str(current_day)]})

@api_bp.route('/v1/internal/phrase/today', methods=['GET'])
def api_internal_phrase_today():

    current_date = datetime.now()
    current_month = current_date.strftime("%B").lower()
    current_day = current_date.day

    with open('internal_data/phrases_2023.json', 'r') as curiosities_file:
        curiosities_obj = json.load(curiosities_file)

    month = curiosities_obj[current_month]

    return jsonify({'curiosity': month[str(current_day)]})

@api_bp.route('/v1/internal/phrase/random', methods=['GET'])
def api_internal_phrase_today():

    current_date = datetime.now()
    current_month = current_date.strftime("%B").lower()
    current_day = current_date.day

    with open('internal_data/phrases_2023.json', 'r') as curiosities_file:
        curiosities_obj = json.load(curiosities_file)

    month = curiosities_obj[current_month]

    return jsonify({'curiosity': month[str(current_day)]})