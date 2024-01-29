from controllers.word import *
from controllers.saying import *
from controllers.article import *
from controllers.saints import *
from controllers.anniversaries import *
from controllers.curiosities import *
from controllers.english_word import *
from controllers.utils.write_day_file import write_day_file

def save_scrap_day():

    print("Ejecutando save_scrap_day()...")

    word = get_word_from_dle()
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