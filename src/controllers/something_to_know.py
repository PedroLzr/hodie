import json
from datetime import datetime
from models.something_to_know import *

def get_something_to_know_from_json():
    try:
        current_date = datetime.now()
        current_month = current_date.strftime("%B").lower()
        current_day = current_date.day

        with open('src/jsons/2023/something_to_know_2023.json', 'r') as something_to_know_file:
            something_to_know_obj = json.load(something_to_know_file)

        month = something_to_know_obj[current_month]
        something_to_know = SomethingToKnow(month[str(current_day)])

        return something_to_know

    except:
        print('Error buscando algo que saber en JSON')
