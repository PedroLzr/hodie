from flask import Blueprint, render_template

games_bp = Blueprint('games', __name__)

# Adivina la palabra
@games_bp.route('/hangman', methods=['GET'])
def hangman():
    return render_template('pages/games/hangman.html')


# Alto el lápiz
@games_bp.route('/stop', methods=['GET'])
def stop():
    return render_template('pages/games/stop.html')


# Alto el lápiz matemático
@games_bp.route('/stop_mat', methods=['GET'])
def stop_mat():
    return render_template('pages/games/stop_mat.html')