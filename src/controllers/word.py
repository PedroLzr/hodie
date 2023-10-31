import requests
from bs4 import BeautifulSoup
from models.word import *

HEADERS = ({'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:53.0) Gecko/20100101 Firefox/53.0'})
DLE_URL = 'https://dle.rae.es'

def get_word_from_dle():
    url = DLE_URL
    page = requests.get(url, headers=HEADERS)

    dleSoup = BeautifulSoup(page.content, 'lxml')
    page.close()

    try:
        wordOfDay = dleSoup.find(id="wotd")
        word = wordOfDay.find("a").text

        wordUrl = url + '/' + word.split(",")[0]
        wordPage = requests.get(wordUrl, headers=HEADERS)

        wordSoup = BeautifulSoup(wordPage.content, 'lxml')
        wordPage.close()

        result = wordSoup.find(id="resultados")
        article = result.article
        def_word_array = article.find_all('p', {'class': 'j'})

        definitions = []
        for p in def_word_array:
            definition = ' '.join(span.get_text() for span in p.find_all('span'))
            definitions.append(definition)

        return Word(word, definitions, wordUrl)
    except:
        print('Error buscando la palabra del DLE-RAE')
