from flask import Blueprint, render_template
from services.economy.get_rates import get_rates
from services.economy.get_metals import get_metals

economy_bp = Blueprint('economy', __name__)

# Economía
@economy_bp.route('/economy', methods=['GET'])
def economy():

    rates = get_rates()
    metals = get_metals()
    return render_template('pages/economy.html', rates = rates, metals = metals)
