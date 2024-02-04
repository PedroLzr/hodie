from services.economy.adapters.metalsdev import MetalsDevClient

def get_metals():

    try:

        client = MetalsDevClient()

        metals = client.get_metal_prices_latest()
        format_metals = _format_nums(metals)

        return format_metals

    except Exception as ex:
        print(f"Error en get_metals: {ex}")
        return {}

def _format_nums(metals):
    if isinstance(metals, dict):
        for clave, valor in metals.items():
            metals[clave] = _format_nums(valor)
    elif isinstance(metals, list):
        for i, elemento in enumerate(metals):
            metals[i] = _format_nums(elemento)
    elif isinstance(metals, (int, float)):
        metals = "{:,.4f}".format(metals).replace(",", " ").replace(".", ",").replace(" ", ".")
    return metals