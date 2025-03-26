export const states = {
    NOT_ACTIVE: 0,
    ACTIVE: 1,
    PAUSED: 2,
    GAME_OVER: 3,
}
export const tetrominoStates = {
    PASS: 0,
    BOTTOM_COLLIDE: 1,
    SIDE_COLLIDE: 2,
    LEFT_COLLIDE: 3,
    RIGHT_COLLIDE: 4,
}
export const piecesIDs = {
    1: 'S',
    2: 'Z',
    3: 'L',
    4: 'J',
    5: 'O',
    6: 'I',
    7: 'T',
}
export const pieces = {
    S: {
        id: 1,
        shape: [
            [0, 1, 1],
            [1, 1, 0],
            [0, 0, 0],
        ],
    },
    Z: {
        id: 2,
        shape: [
            [1, 1, 0],
            [0, 1, 1],
            [0, 0, 0],

        ],
    },
    L: {
        id: 3,
        shape: [
            [1, 0, 0],
            [1, 1, 1],
            [0, 0, 0],
        ],
    },
    J: {
        id: 4,
        shape: [
            [0, 0, 1],
            [1, 1, 1],
            [0, 0, 0],
        ],
    },
    O: {
        id: 5,
        shape: [
            [1, 1],
            [1, 1],
        ],
    },
    I: {
        id: 6,
        shape: [
            [0, 0, 0, 0],
            [1, 1, 1, 1],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
        ],
    },
    T: {
        id: 7,
        shape: [
            [0, 1, 0],
            [1, 1, 1],
            [0, 0, 0],
        ],
    },
}