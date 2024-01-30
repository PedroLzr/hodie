from services.economy.adapters.metalsdev import MetalsDev

def get_metals():

    client = MetalsDev()

    metals = client.get_metal_prices_latest()

    return metals
