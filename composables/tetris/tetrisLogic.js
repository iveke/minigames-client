import {computed} from "vue";

export class TetrisLogic {
    constructor() {
        this._tetrisStore = useTetrisStore();


        this.currentPiece = computed(() => new Piece(this._tetrisStore.currentPiece));
        this.nextPiece = computed(() => new Piece(this._tetrisStore.nextPiece));

        this.board = Array(10 * 20).fill(0);
    }

    DrawBoard() {
        const piece = this.currentPiece;
        const newBoard = this.board.slice();
        piece.shape.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value) {
                    this.SetCell(newBoard,x + piece.x, y + piece.y, piece.type + 1);

                }
            });
        });
        // console.log(newBoard)
        this._tetrisStore.Update(newBoard);
    }

    GroundCheck() {

    }

    SetCell(board, x, y, value) {
        if (x < 0 || x >= 10 || y < 0 || y >= 20) {
            console.error('Index out of range');
            return
        }
        board[y * 10 + x] = value;
    }

    GetCell(board, x, y) {
        if (x < 0 || x >= 10 || y < 0 || y >= 20) {
            console.error('Index out of range');
            return
        }
        return board[y * 10 + x];
    }

    Rotate() {
        this.currentPiece.Rotate();
        // const newShape = this.currentPiece.shape[0].map((_, index) => this.currentPiece.shape.map(row => row[index]).reverse());
        // this.currentPiece.shape = newShape;
        this.DrawBoard()

    }
    Drop() {
        this.currentPiece.y++;
        this.DrawBoard()
    }
    Fall() {
        this.currentPiece.y++;
        this.DrawBoard()
    }
    Left() {
        this.currentPiece.x--;
        this.DrawBoard()
    }
    Right() {
        this.currentPiece.x++;
        this.DrawBoard()

    }
}