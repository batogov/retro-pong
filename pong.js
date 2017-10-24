class Vector {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
}

class Rect {
    constructor(w, h) {
        // Координата центра прямоугольника
        this.pos = new Vector;

        // Размер прямоугольника
        this.size = new Vector(w, h);
    }

    // Геттеры для получение границ прямоугольника
    get left() { return this.pos.x - this.size.x / 2; }
    get right() { return this.pos.x + this.size.x / 2; }
    get top() { return this.pos.y - this.size.y / 2; }
    get bottom() { return this.pos.y + this.size.y / 2; }
}
