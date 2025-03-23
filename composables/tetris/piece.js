import router from "#app/plugins/router.js";

export class Piece {

    constructor(typeID) {
        this._x = 0
        this._y = 0
        this._rotation = 0;


        this.type = undefined;
        this.shape = [];

        if (typeID != null) {
            this.type = typeID;
        } else {
            this.type = this.Random()
        }
        this.shape = pieces[this.type].shape;

        this.x = Math.floor(10 / 2 - this.shape[0].length / 2);
        this.y = 3;

        this.Info()
    }
    set rotation(value) {
        if (this._rotation >= 3) {
            this._rotation = 0;
        } else if (this._rotation < 0) {
            this._rotation = 0;
        } else {
            this._rotation = value;
        }

    }
    get rotation() {
        return this._rotation;
    }

    Random() {
        const id = Math.floor(Math.random() * 7);
        return id
        // console.log(this.type)
    }

    Info() {
        // console.log(
        //     `Type: ${this.type}\n` +
        //     `Shape: ${this.shape}\n` +
        //     `Position: ${this.x}, ${this.y}`
        // )
    }

    Rotate() {
        const newShape = this.shape[0].map((_, index) => this.shape.map(row => row[index]).reverse());
        this.shape = newShape;

        // this.SetRotateOffset()


        this.x = this.x;
        this.y = this.y;

        // this.y++
        this.rotation++;

    }

    SetRotateOffset() {
        const width = this.shape[0].length;
        const height = this.shape.length;

        if (width < height ) {
            this.y--;
            if (this.rotation === 1) {
                this.x++;
            } else if (this.rotation === 3) {
                this.x++;
            }
        } else if (width > height) {
            this.y++;
            if (this.rotation === 2) {
                this.x--;
            } else if (this.rotation === 0) {
                this.x--;
            }
        }
    }

    set pos(newValue) {
        this.x = newValue.x;
        this.y = newValue.y;
    }
    get pos() {
        return {
            x: this.x,
            y: this.y
        }
    }
    set x(newValue) {
        if (newValue < 0) {
            this._x = 0;
            return
        } else if (newValue > 10 - this.shape[0].length) {
            this._x = 10 - this.shape[0].length;
        } else {
            this._x = newValue;
        }
        // console.log(this._x)
    }
    get x() {
        return this._x;
    }
    set y(newValue) {
        if (newValue < 0) {
            this._y = 0;
            return
        } else if (newValue > 20 - this.shape.length) {
            this._y = 20 - this.shape.length;
        } else {
            this._y = newValue;
        }
    }
    get y() {
        return this._y;
    }
}