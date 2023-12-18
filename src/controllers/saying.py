import requests
from bs4 import BeautifulSoup
from models.saying import *

HEADERS = ({'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:53.0) Gecko/20100101 Firefox/53.0'})
PROVERBIA_URL = 'https://proverbia.net/frase-del-dia'

def get_phrase_from_proverbia():
    try:
        print(">> Leyendo frase del día")
        url = PROVERBIA_URL
        page = requests.get(url, headers=HEADERS)

        proverbiaSoup = BeautifulSoup(page.content, 'lxml')
        page.close()

        blockquote = proverbiaSoup.blockquote
        phrase = blockquote.p
        footer = blockquote.footer
        author = blockquote.a
        desc_author = footer.em

        return Saying(phrase.text, author.text, desc_author.text, url)
    except:
        print('Error buscando la frase de Proverbia')
        return Saying("Frase no encontrada", "Frase no encontrada", "Frase no encontrada", url)
