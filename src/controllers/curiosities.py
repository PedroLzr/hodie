import json
from datetime import datetime
from models.curiosity import *

def get_curiosity_from_json():
    try:
        current_date = datetime.now()
        current_month = current_date.strftime("%B").lower()
        current_day = current_date.day

        with open('src/jsons/2023/curiosities_2023.json', 'r') as curiosities_file:
            curiosities_obj = json.load(curiosities_file)

        month = curiosities_obj[current_month]
        curiosity = Curiosity(month[str(current_day)])

        return curiosity

    except:
        print('Error buscando la curiosidad en JSON')
