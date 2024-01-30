from services.economy.adapters.metalsdev import MetalsDev

def get_metals():

    client = MetalsDev()

    metals = client.get_metal_prices_latest()
    format_metals = format_nums(metals)
    return format_metals

def format_nums(metals):
    if isinstance(metals, dict):
        for clave, valor in metals.items():
            metals[clave] = format_nums(valor)
    elif isinstance(metals, list):
        for i, elemento in enumerate(metals):
            metals[i] = format_nums(elemento)
    elif isinstance(metals, (int, float)):
        metals = "{:,.4f}".format(metals).replace(",", " ").replace(".", ",").replace(" ", ".")
    return metals