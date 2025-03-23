export const useTetrisStore = defineStore('tetris', {
    state: () => ({
        state: states.NOT_ACTIVE,
        score: 0,

        timer: null,
        time: 0, // ms
        speed: 500, //ms

        pieceCount: 0,
        board: Array(10 * 20).fill(0),
        currentPiece: undefined,
        nextPiece: undefined,
    }),
    getters: {
        getCell: (state) => (x, y) => {
            if (x < 0 || x >= 10 || y < 0 || y >= 20) {
                console.error('Index out of range');
                return
            }
            return state.board[y * 10 + x];
        },
    },
    actions: {
        generateNextPiece() {
            const piece = new Piece();
            if (this.nextPiece === undefined) {
                this.nextPiece = piece.Random();
            }
            this.currentPiece = this.nextPiece;
            this.nextPiece = piece.Random();
            this.pieceCount++;


        },
        setCell(x, y, value) {
            if (x < 0 || x >= 10 || y < 0 || y >= 20) {
                console.error('Index out of range');
                return
            }
            this.board[y * 10 + x] = value;
        },
        Update(newBoard) {
            this.board = newBoard;
        },
        StartTimer() {
            if (this.timer) {
                return;
            }
            this.state = states.ACTIVE;

            // window.addEventListener('keydown', this.KeyReader);

            this.timer = setInterval(() => {
                this.time += this.speed;
                // this.time = performance.now();

            }, this.speed);

        },
        StopTimer() {

            this.state = states.PAUSED;

            // window.removeEventListener('keydown', this.KeyReader);

            clearInterval(this.timer);
            this.timer = null;

        },



    }
})
