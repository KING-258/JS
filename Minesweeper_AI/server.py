from flask import Flask, request, jsonify
from solver import MinesweeperSolver

app = Flask(__name__)
@app.route('/minesweeper/solve', methods=['POST'])
def solve():
    data = request.json
    solver = MinesweeperSolver(data['grid_size'], data['num_mines'])
    mines = solver.generate_mines(data['click_row'], data['click_col'])
    solver.solve()
    response = {
        'uncovered': list(solver.uncovered),
        'flags': list(solver.flags)
    }
    return jsonify(response)
if __name__ == '__main__':
    app.run(debug=True)