from services.economy.adapters.alphavantage import AlphaVantageClient
from datetime import datetime, timedelta
import json

def get_commodities_chart_data():

    try:

        client = AlphaVantageClient()

        wheat_prices = client.get_global_price_wheat()
        corn_prices = client.get_global_price_corn()
        cotton_prices = client.get_global_price_cotton()
        coffee_prices = client.get_global_price_coffee()

         # Calcula la fecha de hace 2 años desde ahora
        filter_time = datetime.now() - timedelta(days=2*365)

        # Filtra las entradas para los últimos 2 años
        filtered_wheat_prices = [item for item in wheat_prices["data"] if datetime.strptime(item["date"], "%Y-%m-%d") >= filter_time]
        filtered_corn_prices = [item for item in corn_prices["data"] if datetime.strptime(item["date"], "%Y-%m-%d") >= filter_time]
        filtered_cotton_prices = [item for item in cotton_prices["data"] if datetime.strptime(item["date"], "%Y-%m-%d") >= filter_time]
        filtered_coffee_prices = [item for item in coffee_prices["data"] if datetime.strptime(item["date"], "%Y-%m-%d") >= filter_time]

        dates = [item["date"] for item in filtered_wheat_prices]
        values_wheat = [float(item["value"]) for item in filtered_wheat_prices]
        values_corn = [float(item["value"]) for item in filtered_corn_prices]
        values_cotton = [float(item["value"]) for item in filtered_cotton_prices]
        values_coffee = [float(item["value"]) for item in filtered_coffee_prices]

        dates.reverse()
        values_wheat.reverse()
        values_corn.reverse()
        values_cotton.reverse()
        values_coffee.reverse()

        response = json.dumps({"dates": dates,
                               "values_wheat": values_wheat,
                               "values_corn": values_corn,
                               "values_cotton": values_cotton,
                               "values_coffee": values_coffee})

        return response

    except Exception as ex:
        print(f"Error en get_wheat_prices: {ex}")
        return {}
