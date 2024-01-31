from flask import Blueprint, render_template
from services.economy.get_rates import get_rates
from services.economy.get_metals import get_metals
from services.economy.get_open_markets import get_open_markets

economy_bp = Blueprint('economy', __name__)

# Economía
@economy_bp.route('/economy', methods=['GET'])
def economy():

    rates = get_rates()
    metals = get_metals()
    open_markets = get_open_markets()
    
    return render_template('pages/economy.html', rates = rates, metals = metals, open_markets = open_markets)
