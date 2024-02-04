from services.economy.adapters.coingecko import CoinGeckoClient
import json

def get_cryptos():
    try:
        client = CoinGeckoClient()

        crypto_markets = client.get_crypto_markets()

        # for item in crypto_markets:
        #     item['current_price'] = "{:,.4f}".format(item['current_price']).replace(",", " ").replace(".", ",").replace(" ", ".")

        return crypto_markets

    except Exception as ex:
        print(f"Error en get_cryptos: {ex}")
        return {}