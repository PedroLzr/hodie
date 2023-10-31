from flask import Flask, render_template
from models.day import *
from controllers.word import *
from controllers.saying import *
from controllers.article import *
from controllers.saints import *
from controllers.anniversaries import *
from controllers.something_to_know import *
from controllers.curiosities import *
from controllers.english_word import *

app = Flask(__name__)

@app.route('/')
def index():

    today = Day()
    today.word = get_word_from_dle()
    today.english_word = get_english_word_from_cambridge()
    today.saying = get_phrase_from_proverbia()
    today.curiosity = get_curiosity_from_json()
    today.something_to_know = get_something_to_know_from_json()
    today.article = get_article_from_wikipedia()
    today.saints = get_saints_from_santopedia()
    today.anniversaries = get_anniversaries_from_hechoshistoricos()

    return render_template('index.html', today=today)