import './style/index.less'
import Food from './modules/food'
import ScorePanel from './modules/scorePanel'

const food = new Food()
console.log(food.x, food.y)
food.change()
console.log(food.x, food.y)