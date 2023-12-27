import json
from datetime import datetime

def write_json_file(data):

    try:
        date = datetime.now().strftime("%Y-%m-%d")
        file_name = f'./external_data/{date}.json'

        with open(file_name, 'w') as file:
            json.dump(data, file)

        print(f"Archivo JSON guardado como {file_name}")

    except Exception as e:
        print(f"Error al guardar el archivo: {e}")
