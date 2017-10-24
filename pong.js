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

class Ball extends Rect {
    constructor() {
        super(10, 10);
        this.velocity = new Vector;
    }
}

class Player extends Rect {
    constructor() {
        super(20, 100);
        this.score = 0;
    }
}

class Pong {
    constructor(canvas) {
        this._canvas = canvas;
        this._context = canvas.getContext('2d');

        this._accumulator = 0;
        this.step = 1 / 120;

        // Создаём мяч и добавляем ему необходимые свойства
        this.ball = new Ball;
        this.ball.velocity.x = 200;
        this.ball.velocity.y = 200;
        this.ball.pos.x = 100;
        this.ball.pos.y = 100;

        // Массив игроков
        this.players = [
            new Player,
            new Player
        ];

        // Позиционируем игроков
        this.players[0].pos.x = 30;
        this.players[1].pos.x = this._canvas.width - 30;
        this.players.forEach(player => {
            player.pos.y = this._canvas.height / 2;
        })

        // Рекурсивная функция, которая обновляет состояние игры
        // и отрисовывает новый кадр
        let lastTime;
        const callback = (millis) => {
            if (lastTime) {
                this.update((millis - lastTime) / 1000);
                this.draw();
            }
            lastTime = millis;
            requestAnimationFrame(callback);
        }

        callback();
    }

    drawRect(rect) {
        this._context.fillStyle = '#fff';
        this._context.fillRect(
            rect.left, rect.top,
            rect.size.x, rect.size.y
        );
    }

    /**
     * Функция отрисовывает новый кадр игры.
     */
    draw() {
        this._context.fillStyle = '#000';
        this._context.fillRect(0, 0, canvas.width, canvas.height);

        this.drawRect(this.ball);
        this.players.forEach(player => this.drawRect(player));
    }

    simulate(step) {
        this.ball.pos.x += this.ball.velocity.x * step;
        this.ball.pos.y += this.ball.velocity.y * step;

        if (this.ball.left < 0 || this.ball.right > this._canvas.width) {
            this.ball.velocity.x = -this.ball.velocity.x;
        }

        if (this.ball.top < 0 || this.ball.bottom > this._canvas.height) {
            this.ball.velocity.y = -this.ball.velocity.y;
        }
    }

    /**
     * Функция обновления состояния игры. Внутри себя необходимое количество
     * раз вызывает функцию simulate.
     * @param {number} dt Время, прошедшее с прошлого обновления.
     */
    update(dt) {
        this._accumulator += dt;
        while (this._accumulator > this.step) {
            this.simulate(this.step);
            this._accumulator -= this.step;
        }
    }
}

const canvas = document.getElementById('pong');
const pong = new Pong(canvas);
