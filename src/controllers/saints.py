import requests
from bs4 import BeautifulSoup
from models.saints import *

HEADERS = ({'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:53.0) Gecko/20100101 Firefox/53.0'})
SANTOPEDIA_URL = 'https://www.santopedia.com'

def get_saints_from_santopedia():
    try:

        print(">> Leyendo santos del día")

        url = SANTOPEDIA_URL
        page = requests.get(url, headers=HEADERS)
        page.close()

        santopediaSoup = BeautifulSoup(page.content, 'lxml')

        listSaintsOfDay = santopediaSoup.find('ul', {'class': 'saints'})
        saintsOfDay = listSaintsOfDay.find_all('a')

        saints = []
        for s in saintsOfDay:
            saint = s.text
            if saint.startswith('San'):
                saints.append(Saint(saint))

        return Saints(saints, url)

    except:
        print('Error buscando los santos en Santopedia')
        return Saints(["Santos no encontrados"], url)
