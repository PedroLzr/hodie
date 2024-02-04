from services.economy.adapters.alphavantage import AlphaVantageClient

def get_open_markets():

    try:

        client = AlphaVantageClient()

        markets = client.get_global_market_status()
        open_markets = [market for market in markets["markets"] if market["current_status"] == "open"]

        return open_markets

    except Exception as ex:
        print(f"Error en get_open_markets: {ex}")
        return {}
