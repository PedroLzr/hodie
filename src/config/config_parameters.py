import os

EXTERNAL_DATA = {
    "culture_path": os.getenv("EXTERNAL_DATA_CULTURE_PATH", "./external_data/culture"),
    "economy_path": os.getenv("EXTERNAL_DATA_ECONOMY_PATH", "./external_data/economy")
}

INTERNAL_DATA = {
    "path": os.getenv("INTERNAL_DATA_PATH", "./internal_data")
}
