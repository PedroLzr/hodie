import requests
from requests.structures import CaseInsensitiveDict

METALS_DEV_URL = "https://api.metals.dev/v1"

class MetalsDev:

    def get_metal_prices_latest(self):
        url = METALS_DEV_URL + "/latest?api_key=7RVBJZTJEJGSIQ4P045A4124P045A&currency=EUR&unit=kg"

        headers = CaseInsensitiveDict()
        headers["Accept"] = "application/json"

        response = requests.get(url, headers=headers)
        
        return response.json()
