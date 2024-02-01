from flask import Blueprint, render_template

our_apis_bp = Blueprint('ourApis', __name__)

@our_apis_bp.route('/ourApis', methods=['GET'])
def ourApis():
    return render_template('pages/our_apis.html')