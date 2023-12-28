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
        page.close()

        wikipediaSoup = BeautifulSoup(page.content, 'lxml')

        article = wikipediaSoup.find(id="main-tfa")

        title = article.find('h2').find_all('span')[1].find('a').text
        body = article.find('p').text

        return Article(title, body, url)

    except:
        print('Error buscando el artículo de Wikipedia')
        return Article("Artículo no encontrado", "Artículo no encontrado", url)
