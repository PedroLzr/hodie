import requests
from bs4 import BeautifulSoup
from models.culture.english_word import *

HEADERS = ({'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:53.0) Gecko/20100101 Firefox/53.0'})
CAMBRIDGE_URL = 'https://dictionary.cambridge.org'

def get_english_word_from_cambridge():
    try:

        print(">> Leyendo palabra en inglés del día")

        page = requests.get(CAMBRIDGE_URL, headers=HEADERS)
        page.close()

        cambridgeSoup = BeautifulSoup(page.content, 'lxml')

        wordOfDayName = cambridgeSoup.find('p', {'class': 'fs36 lmt-5 feature-w-big wotd-hw'})
        wordName = wordOfDayName.find("a").text

        wordOfDayDesc = cambridgeSoup.find('p', {'class': 'lmt-0 lmb-20'})
        wordDesc = wordOfDayDesc.text

        return EnglishWord(wordName, wordDesc, CAMBRIDGE_URL)

    except:
        print('Error buscando la palabra de Cambridge')
        return EnglishWord("Palabra no encontrada", "Palabra no encontrada", CAMBRIDGE_URL)
