def stringDistance(first, second, cost={'a':1, 'd':1, 'c':1}):
    """
    Find the Levenshtein distance between two strings.

    @parm str first: First string to compare
    @parm str second: Second string to compare to
    @parm dic cost: Custs to add, delete ad change (default={'a':1,'d':2,'c':1})
    """

    if len(second) == 0 or len(first) == 0:
        return max(len(first),len(second))

    first_length = len(first) + 1
    second_length = len(second) + 1
    distance_matrix = [[0] * second_length for x in range(first_length)]

    for i in xrange(0, first_length):
        distance_matrix[i][0] = i * cost['d']
        for j in xrange(1, second_length):
            if i == 0:
               distance_matrix[i][j] = j * cost['a']
            else:
                distance_matrix[i][j] = 999999

    for i in xrange(1, first_length):
        for j in xrange(1, second_length):
            deletion = distance_matrix[i-1][j] + cost['d']
            insertion = distance_matrix[i][j-1] + cost['a']
            substitution = distance_matrix[i-1][j-1]
            if first[i-1] != second[j-1]:
                substitution += cost['c']
            distance_matrix[i][j] = min(insertion, deletion, substitution, \
                distance_matrix[i][j])

    return distance_matrix[-1][-1]
