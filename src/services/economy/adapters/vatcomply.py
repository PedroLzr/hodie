import requests

VATCOMPLY_URL = "https://api.vatcomply.com"

class VatComplyClient:

    def get_rates_latest(self):
        try:
            response = requests.get(VATCOMPLY_URL + "/rates")
            response.raise_for_status()

            return response.json()

        except requests.exceptions.HTTPError as errh:
            print(f"Http Error: {errh}")
        except requests.exceptions.ConnectionError as errc:
            print(f"Error Connecting: {errc}")
        except requests.exceptions.Timeout as errt:
            print(f"Timeout Error: {errt}")
        except requests.exceptions.RequestException as err:
            print(f"Ocurrió algún error desconocido: {err}")

    def get_rates_date(self, date):
        try:
            response = requests.get(VATCOMPLY_URL + "/rates?date=" + date)
            response.raise_for_status()

            return response.json()

        except requests.exceptions.HTTPError as errh:
            print(f"Http Error: {errh}")
        except requests.exceptions.ConnectionError as errc:
            print(f"Error Connecting: {errc}")
        except requests.exceptions.Timeout as errt:
            print(f"Timeout Error: {errt}")
        except requests.exceptions.RequestException as err:
            print(f"Ocurrió algún error desconocido: {err}")
