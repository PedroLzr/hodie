import requests
from requests.structures import CaseInsensitiveDict

METALS_DEV_URL = "https://api.metals.dev/v1"
API_KEY = "XXXXXXXXXXXXXXX"

class MetalsDevClient:

    def get_metal_prices_latest(self):
        try:
            url = METALS_DEV_URL + "/latest?api_key=" + API_KEY + "&currency=EUR&unit=kg"

            headers = CaseInsensitiveDict()
            headers["Accept"] = "application/json"

            response = requests.get(url, headers=headers)
            
            return response.json()
    
        except requests.exceptions.HTTPError as errh:
                print(f"Http Error: {errh}")
        except requests.exceptions.ConnectionError as errc:
            print(f"Error Connecting: {errc}")
        except requests.exceptions.Timeout as errt:
            print(f"Timeout Error: {errt}")
        except requests.exceptions.RequestException as err:
            print(f"Ocurrió algún error desconocido: {err}")
