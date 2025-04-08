export default class Queue
{
    constructor() {
        this.queue = [];
    }

    get length() {
        return this.queue.length;
    }

    get isEmpty() {
        return this.length=== 0;
    }


    Enqueue(item) {
        this.queue.push(item);
    }
    Dequeue() {
        if (this.isEmpty) {
            return null;
        }
        return this.queue.shift();
    }
    Peek() {
        if (this.isEmpty) {
            return null;
        }
        return this.queue[0];
    }
}