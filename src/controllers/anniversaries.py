import requests
from bs4 import BeautifulSoup
from models.anniversaries import *

HEADERS = ({'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:53.0) Gecko/20100101 Firefox/53.0'})
HECHOSHISTORICOS_URL = 'https://www.hechoshistoricos.es'

def get_anniversaries_from_hechoshistoricos():
    try:
        print(">> Leyendo efemérides del día")
        url = HECHOSHISTORICOS_URL
        page = requests.get(url, headers=HEADERS)

        hhSoup = BeautifulSoup(page.content, 'lxml')
        page.close()

        anniversariesOfDay = hhSoup.find(id="colcajacent1")
        anniversariesListFacts = anniversariesOfDay.find_all("div", {'class': 'hhtext'})
        anniversariesListYears = anniversariesOfDay.find_all("div", {'class': 'hhanio'})

        anniversaries = []
        for ann in anniversariesListFacts:
            anniversaries.append(Anniversarie(ann.text, ann.span.text))

        for index, ann in enumerate(anniversaries):
            ann.year = anniversariesListYears[index].text

        return Anniversaries(anniversaries, url)
    except:
        print('Error buscando efemérides en HechosHistoricos')
        return Anniversaries(["Efemérides no encontradas"], url)
