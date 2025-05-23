export const points_reward = {
    LINE_CLEAR_1: 100,
    LINE_CLEAR_2: 300,
    LINE_CLEAR_3: 500,
    LINE_CLEAR_4: 800,
    HARD_DROP: 2,
    SOFT_DROP: 1,
}


export const tetraminos = [
    // S
    {
        shape: [
            [0, 1, 1],
            [1, 1, 0],
            [0, 0, 0]
        ],
    },
    // Z
    {
        shape: [
            [2, 2, 0],
            [0, 2, 2],
            [0, 0, 0]
        ],
    },
    // J
    {
        shape: [
            [3, 0, 0],
            [3, 3, 3],
            [0, 0, 0]
        ],
    },
    // L
    {
        shape: [
            [0, 0, 4],
            [4, 4, 4],
            [0, 0, 0]
        ],
    },
    // O
    {
        shape: [
            [5, 5],
            [5, 5]
        ],
    },
    // I
    {
        shape: [
            [0, 0, 0, 0],
            [6, 6, 6, 6],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ],
    },
    // T
    {
        shape: [
            [0, 7, 0],
            [7, 7, 7],
            [0, 0, 0]
        ],
    }
]
