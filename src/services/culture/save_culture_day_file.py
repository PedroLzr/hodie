from services.culture.adapters.word import *
from services.culture.adapters.saying import *
from services.culture.adapters.article import *
from services.culture.adapters.saints import *
from services.culture.adapters.anniversaries import *
from services.culture.adapters.curiosities import *
from services.culture.adapters.english_word import *
from services.utils.write_day_file import write_day_file

def save_culture_day_file():

    print("Ejecutando save_culture_day()...")

    word = get_word_from_dle()
    word2 = get_word_from_iedra()
    english_word = get_english_word_from_cambridge()
    saying = get_phrase_from_proverbia()
    curiosity = get_curiosity_from_json()
    article = get_article_from_wikipedia()
    saints = get_saints_from_santopedia()
    anniversaries = get_anniversaries_from_hechoshistoricos()

    day_data = {
        "word": {
            "name": word.name,
            "link": word.link,
            "defs_word": word.defs_word
        },
        "word2": {
            "name": word2.name,
            "link": word2.link,
            "defs_word": word2.defs_word
        },
        "english_word": {
            "name": english_word.name,
            "link": english_word.link,
            "def_word": english_word.def_word
        },
        "saying": {
            "phrase": saying.phrase,
            "link": saying.link,
            "author": saying.author,
            "desc_author": saying.desc_author
        },
        "curiosity": {
            "curiosity": curiosity.curiosity
        },
        "article": {
            "title": article.title,
            "link": article.link,
            "body": article.body
        },
        "saints": {
            "link": saints.link,
            "list": [{"name": saint.name} for saint in saints.list]
        },
        "anniversaries": {
            "link": anniversaries.link,
            "list": [{"year": anniversary.year, "fact": anniversary.fact} for anniversary in anniversaries.list]
        }
    }

    write_day_file(day_data)