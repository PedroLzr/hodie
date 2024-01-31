import requests
from bs4 import BeautifulSoup
from models.culture.saints import *

HEADERS = ({'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:53.0) Gecko/20100101 Firefox/53.0'})
SANTOPEDIA_URL = 'https://www.santopedia.com'

def get_saints_from_santopedia():
    try:

        print(">> Leyendo santos del día")

        page = requests.get(SANTOPEDIA_URL, headers=HEADERS)
        page.close()

        santopediaSoup = BeautifulSoup(page.content, 'lxml')

        listSaintsOfDay = santopediaSoup.find('ul', {'class': 'saints'})
        saintsOfDay = listSaintsOfDay.find_all('a')

        saints = []
        cleaned_saints = [saint.text.strip() for saint in saintsOfDay]
        [saints.append(Saint(saint)) for saint in cleaned_saints if saint.startswith('San')]

        return Saints(saints, SANTOPEDIA_URL)

    except:
        print('Error buscando los santos en Santopedia')
        return Saints(["Santos no encontrados"], SANTOPEDIA_URL)
