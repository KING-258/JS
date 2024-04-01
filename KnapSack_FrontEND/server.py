from flask import Flask, request, jsonify
from flask_cors import CORS
from solver import fractional_knapsack, zero_one_knapsack

app = Flask(__name__)
CORS(app, origins='http://localhost:3000')


@app.route('/calculate', methods=['POST'])
def calculate():
    data = request.json
    num_items = data['num_items']
    items = data['items']
    capacity = data['capacity']
    knapsack_type = data['knapsack_type']

    if knapsack_type == 0:
        max_value, selected_items = zero_one_knapsack(items, capacity)
    elif knapsack_type == 1:
        max_value, selected_items = fractional_knapsack(items, capacity)
    else:
        return jsonify({'error': 'Invalid knapsack type'}), 400

    return jsonify({'max_value': max_value, 'selected_items': selected_items})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
