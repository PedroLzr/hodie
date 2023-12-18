import requests
from bs4 import BeautifulSoup
from models.article import *

HEADERS = ({'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:53.0) Gecko/20100101 Firefox/53.0'})
WIKIPEDIA_URL = 'https://es.wikipedia.org'

def get_article_from_wikipedia():
    try:
        print(">> Leyendo artículo del día")
        url = WIKIPEDIA_URL
        page = requests.get(url, headers=HEADERS)

        wikipediaSoup = BeautifulSoup(page.content, 'lxml')
        page.close()
        
        article = wikipediaSoup.find(id="main-tfa")
        divs = article.find_all('div')

        return Article(divs[1].a.text, article.p.text, url)
    except:
        print('Error buscando el artículo de Wikipedia')
        return Article("Artículo no encontrado", "Artículo no encontrado", url)
