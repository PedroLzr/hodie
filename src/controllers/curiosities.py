import json
from datetime import datetime
from models.curiosity import *

def get_curiosity_from_json():
    try:

        print(">> Leyendo curiosidad del día")

        current_date = datetime.now()
        current_month = current_date.strftime("%B").lower()
        current_day = current_date.day

        with open('internal_data/curiosities_2023.json', 'r') as curiosities_file:
            curiosities_obj = json.load(curiosities_file)

        month = curiosities_obj[current_month]
        curiosity = Curiosity(month[str(current_day)])

        return curiosity

    except:
        print('Error buscando la curiosidad en JSON')
        return "Curiosidad no encontrada"
