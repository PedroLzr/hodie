import json

def read_json_file(file_path):
    try:
        with open(file_path, 'r') as file:
            return json.load(file)

    except FileNotFoundError:
        print("No se encuentra el archivo")
        raise FileNotFoundError(f"El archivo {file_path} no se encontró.")

    except json.JSONDecodeError:
        print("El archivo no es un Json válido")
        raise ValueError(f"El archivo {file_path} no es un JSON válido.")
