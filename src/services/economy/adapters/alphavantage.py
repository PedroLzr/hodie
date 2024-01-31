import requests

ALPHA_VANTAGE_URL = "https://www.alphavantage.co"
API_KEY = "1699MSUFTB1IT5QC"

class AlphaVantageClient:

    def get_global_market_status(self):
        try:
            url = ALPHA_VANTAGE_URL + "/query?function=MARKET_STATUS&apikey=" + API_KEY
            response = requests.get(url)
            
            return response.json()
        except requests.exceptions.HTTPError as errh:
                print(f"Http Error: {errh}")
        except requests.exceptions.ConnectionError as errc:
            print(f"Error Connecting: {errc}")
        except requests.exceptions.Timeout as errt:
            print(f"Timeout Error: {errt}")
        except requests.exceptions.RequestException as err:
            print(f"Ocurrió algún error desconocido: {err}")
