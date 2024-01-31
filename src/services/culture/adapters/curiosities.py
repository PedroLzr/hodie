import json
from datetime import datetime
from models.culture.curiosity import *
from config.config_parameters import INTERNAL_DATA

def get_curiosity_from_json():
    try:

        print(">> Leyendo curiosidad del día")

        current_date = datetime.now()
        current_month = current_date.strftime("%B").lower()
        current_day = current_date.day

        with open(f'{INTERNAL_DATA["path"]}/curiosities_2024.json', 'r') as curiosities_file:
            curiosities_obj = json.load(curiosities_file)

        month = curiosities_obj[current_month]
        curiosity = Curiosity(month[str(current_day)])

        return curiosity

    except:
        print('Error buscando la curiosidad en JSON')
        return Curiosity("Curiosidad no encontrada")
