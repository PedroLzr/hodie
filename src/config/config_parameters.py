import os

EXTERNAL_DATA = {
    "path": os.getenv("EXTERNAL_DATA_PATH", "./external_data")
}

INTERNAL_DATA = {
    "path": os.getenv("INTERNAL_DATA_PATH", "./internal_data")
}
