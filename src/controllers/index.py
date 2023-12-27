from datetime import datetime
import os
from utils.get_external_data import save_scrap_day
from utils.read_json_file import read_json_file
from config.config_parameters import EXTERNAL_DATA

def getToday():
    try:

        date = datetime.now().strftime("%Y-%m-%d")
        file_name = f'{EXTERNAL_DATA["path"]}/{date}.json'

        try:
            if not os.path.exists(file_name):
                print("El archivo no existe, llamando a save_scrap_day()...")
                save_scrap_day()
                today = read_json_file(file_name)
            else:
                print("El archivo existe, leyendo archivo...")
                today = read_json_file(file_name)
        except Exception as ex:
            print(f"Error al procesar el archivo: {ex}")
            today = {}

    except Exception as e:
        print(f"Error en getToday(): {e}")

    return today