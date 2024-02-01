import requests

ALPHA_VANTAGE_URL = "https://www.alphavantage.co"
API_KEY = "1699MSUFTB1IT5QC"

class AlphaVantageClient:

# Global markets
    def get_global_market_status(self):
        try:
            # url = ALPHA_VANTAGE_URL + "/query?function=MARKET_STATUS&apikey=" + API_KEY
            url = "https://www.alphavantage.co/query?function=MARKET_STATUS&apikey=demo"
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

# Commodities
    def get_global_price_wheat(self):
        try:
            url = "https://www.alphavantage.co/query?function=WHEAT&interval=monthly&apikey=demo"
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

    def get_global_price_corn(self):
        try:
            url = "https://www.alphavantage.co/query?function=CORN&interval=monthly&apikey=demo"
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

    def get_global_price_cotton(self):
        try:
            url = "https://www.alphavantage.co/query?function=COTTON&interval=monthly&apikey=demo"
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

    def get_global_price_sugar(self):
        try:
            url = "https://www.alphavantage.co/query?function=SUGAR&interval=monthly&apikey=demo"
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

    def get_global_price_coffee(self):
        try:
            url = "https://www.alphavantage.co/query?function=COFFEE&interval=monthly&apikey=demo"
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