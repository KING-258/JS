import random
class MinesweeperSolver:
    def __init__(self, size, mines):
        self.s = size
        self.m = mines
        self.g = [[0 for _ in range(size)] for _ in range(size)]
        self.f = set()
        self.u = set()

    def generate_mines(self, r, c):
        m = set()
        while len(m) < self.m:
            row = random.randint(0, self.s - 1)
            col = random.randint(0, self.s - 1)
            if (row, col) != (r, c) and (row, col) not in m:
                m.add((row, col))
                self.g[row][col] = -1
                for dr in [-1, 0, 1]:
                    for dc in [-1, 0, 1]:
                        if 0 <= row + dr < self.s and 0 <= col + dc < self.s and self.g[row + dr][col + dc] != -1:
                            self.g[row + dr][col + dc] += 1
        return m

    def uncover_cell(self, r, c):
        if (r, c) in self.u or (r, c) in self.f:
            return
        self.u.add((r, c))
        if self.g[r][c] == 0:
            for dr in [-1, 0, 1]:
                for dc in [-1, 0, 1]:
                    if 0 <= r + dr < self.s and 0 <= c + dc < self.s:
                        self.uncover_cell(r + dr, c + dc)

    def flag_mine(self, r, c):
        if (r, c) in self.u:
            return False
        if (r, c) in self.f:
            self.f.remove((r, c))
        else:
            self.f.add((r, c))
        return True

    def solve(self):
        for r in range(self.s):
            for c in range(self.s):
                if self.g[r][c] == 0:
                    self.uncover_cell(r, c)
        while len(self.u) + len(self.f) < self.s * self.s:
            flagged = False
            for r in range(self.s):
                for c in range(self.s):
                    if (r, c) in self.u:
                        continue
                    if (r, c) in self.f:
                        continue
                    if self.g[r][c] == len(self.neighboring_flags(r, c)):
                        self.uncover_neighbors(r, c)
                        flagged = True
                    elif self.g[r][c] == len(self.neighboring_uncovered(r, c)) + len(self.neighboring_flags(r, c)):
                        for nr, nc in self.neighboring_uncovered(r, c):
                            self.f.add((nr, nc))
                        flagged = True
            if not flagged:
                r, c = self.random_uncovered()
                self.uncover_cell(r, c)

    def neighboring_flags(self, r, c):
        flags = []
        for dr in [-1, 0, 1]:
            for dc in [-1, 0, 1]:
                if 0 <= r + dr < self.s and 0 <= c + dc < self.s and (r + dr, c + dc) in self.f:
                    flags.append((r + dr, c + dc))
        return flags

    def neighboring_uncovered(self, r, c):
        uncovered = []
        for dr in [-1, 0, 1]:
            for dc in [-1, 0, 1]:
                if 0 <= r + dr < self.s and 0 <= c + dc < self.s and (r + dr, c + dc) in self.u:
                    uncovered.append((r + dr, c + dc))
        return uncovered

    def uncover_neighbors(self, r, c):
        for dr in [-1, 0, 1]:
            for dc in [-1, 0, 1]:
                if 0 <= r + dr < self.s and 0 <= c + dc < self.s and (r + dr, c + dc) not in self.f:
                    self.uncover_cell(r + dr, c + dc)

    def random_uncovered(self):
        uncovered = [(r, c) for r in range(self.s) for c in range(self.s) if (r, c) not in self.u and (r, c) not in self.f]
        return random.choice(uncovered)