from flask import Blueprint, render_template
from services.economy.get_rates import get_rates
from services.economy.get_metals import get_metals
from services.economy.get_open_markets import get_open_markets
from services.economy.get_commodities_chart_data import get_commodities_chart_data

economy_bp = Blueprint('economy', __name__)

@economy_bp.route('/economy', methods=['GET'])
def economy():

    rates = get_rates()
    metals = get_metals()
    open_markets = get_open_markets()
    commodities_chart_data = get_commodities_chart_data()

    return render_template('pages/economy.html',
                           rates = rates,
                           metals = metals,
                           open_markets = open_markets,
                           commodities_chart_data = commodities_chart_data)
