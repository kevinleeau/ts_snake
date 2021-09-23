import Snake from "./snake";
import Food from "./food";
import ScorePanel from "./scorePanel";

class GameControl{
    snake: Snake;
    food: Food;
    scorePanel: ScorePanel;
    direction: String = '';
    isLive = true
    constructor() {
        this.snake = new Snake();
        this.food = new Food();
        this.scorePanel = new ScorePanel(10, 5);
        this.init()
    }
    init() {
        document.addEventListener('keydown', this.keydownHandler.bind(this))
        this.run()
    }
    keydownHandler(event: KeyboardEvent) {
        this.direction = event.key
    }
    run() {
        let x = this.snake.x
        let y = this.snake.y
        switch(this.direction) {
            case "ArrowUp":
            case "Up":
                y -= 10
                break;
            case "ArrowDown":
            case "Down":
                y += 10
                break;
            case "ArrowLeft":
            case "Left":
                x -= 10
                break;
            case "ArrowRight":
            case "Right":
                x += 10
                break;
        }
        this.checkEat(x, y)
            
        try {
            this.snake.x = x
            this.snake.y = y
        } catch (err) {
            this.isLive = false
            return alert(err)
        }
        
        // default level is 1, if level up to 2, then setTimeout run() will be 270ms
        this.isLive && setTimeout(this.run.bind(this), 300 - (this.scorePanel.level - 1) *30)
    }
    // check if snake of x & y are same with food of x & y
    checkEat(x: number, y: number) {
        if (x === this.food.x && y === this.food.y) {
            this.food.change()
            this.scorePanel.addScore()
            this.snake.addBody()
        }
    }
}

export default GameControl