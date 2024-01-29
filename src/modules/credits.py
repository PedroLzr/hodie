from flask import Blueprint, render_template

credits_bp = Blueprint('credits', __name__)

# Créditos
@credits_bp.route('/credits', methods=['GET'])
def credits():
    return render_template('pages/credits.html')