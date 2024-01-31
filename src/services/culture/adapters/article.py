import requests
from bs4 import BeautifulSoup
from models.culture.article import *

HEADERS = ({'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:53.0) Gecko/20100101 Firefox/53.0'})
WIKIPEDIA_URL = 'https://es.wikipedia.org'

def get_article_from_wikipedia():
    try:

        print(">> Leyendo artículo del día")

        page = requests.get(WIKIPEDIA_URL, headers=HEADERS)
        page.close()

        wikipediaSoup = BeautifulSoup(page.content, 'lxml')

        article = wikipediaSoup.find(id="main-tfa")

        title = article.find('h2').find('a').text
        body = article.find('p').text

        return Article(title, body, WIKIPEDIA_URL)

    except:
        print('Error buscando el artículo de Wikipedia')
        return Article("Artículo no encontrado", "Artículo no encontrado", WIKIPEDIA_URL)
