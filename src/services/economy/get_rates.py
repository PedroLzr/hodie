from services.economy.adapters.vatcomply import VatComplyClient
from datetime import datetime, timedelta

def get_rates():

    try:
        today = datetime.now()
        yesterday = today - timedelta(days=1)
        formatted_yesterday = yesterday.strftime("%Y-%m-%d")

        client = VatComplyClient()

        rates = client.get_rates_latest()
        rates_yesterday = client.get_rates_date(formatted_yesterday)
        rates_with_change = _add_rate_change(rates, rates_yesterday)

        return rates_with_change

    except Exception as ex:
            print(f"Error en get_metals: {ex}")
            return {}

def _add_rate_change(rates_today, rates_yesterday):
    for currency, rate_today in rates_today['rates'].items():
        rate_yesterday = rates_yesterday['rates'].get(currency)
        if rate_yesterday:
            change = "increased" if rate_today < rate_yesterday else "decreased" if rate_today > rate_yesterday else "unchanged"
            rates_today['rates'][currency] = {"rate": rate_today, "change": change}

    return rates_today