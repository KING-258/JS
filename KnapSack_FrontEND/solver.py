def fractional_knapsack(items, capacity):
    n = len(items)
    sorted_items = sorted(items, key=lambda x: x[1] / x[0], reverse=True)
    cost = 0
    bag = []
    for weight, value in sorted_items:
        if capacity == 0:
            break
        if weight <= capacity:
            bag.append((weight, value, 1))
            cost += value
            capacity -= weight
        else:
            fraction = capacity / weight
            bag.append((capacity, fraction * value, fraction))
            cost += fraction * value
            capacity = 0
    return cost, bag

def zero_one_knapsack(items, capacity):
    n = len(items)
    dp = [[0] * (capacity + 1) for _ in range(n + 1)]

    for i in range(1, n + 1):
        weight_i, value_i = items[i - 1]
        for w in range(1, capacity + 1):
            if weight_i > w:
                dp[i][w] = dp[i - 1][w]
            else:
                dp[i][w] = max(dp[i - 1][w], dp[i - 1][w - weight_i] + value_i)
    selected_items = []
    w = capacity
    for i in range(n, 0, -1):
        if dp[i][w] != dp[i - 1][w]:
            selected_items.append(items[i - 1])
            w -= items[i - 1][0]

    return dp[n][capacity], selected_items
