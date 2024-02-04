import requests
from requests.structures import CaseInsensitiveDict

COIN_GECKO_URL = "https://api.coingecko.com/api/v3"

class CoinGeckoClient:

    def get_crypto_markets(self):
        try:
            url = COIN_GECKO_URL + "/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=10&page=1&sparkline=false&price_change_percentage=30d&locale=es"

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
