import requests
from bs4 import BeautifulSoup
from models.culture.saying import *

HEADERS = ({'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:53.0) Gecko/20100101 Firefox/53.0'})
PROVERBIA_URL = 'https://proverbia.net/frase-del-dia'

def get_phrase_from_proverbia():
    try:

        print(">> Leyendo frase del día")

        page = requests.get(PROVERBIA_URL, headers=HEADERS)
        page.close()

        proverbiaSoup = BeautifulSoup(page.content, 'lxml')

        blockquote = proverbiaSoup.blockquote
        phrase = blockquote.p
        footer = blockquote.footer
        author = blockquote.a
        desc_author = footer.em

        return Saying(phrase.text, author.text, desc_author.text, PROVERBIA_URL)

    except:
        print('Error buscando la frase de Proverbia')
        return Saying("Frase no encontrada", "Frase no encontrada", "Frase no encontrada", PROVERBIA_URL)
