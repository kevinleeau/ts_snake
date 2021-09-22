class ScorePanel{
    score = 0;
    level = 1;
    scoreEle: HTMLElement;
    levelEle: HTMLElement;
    // 设置一个变量来限制level
    maxLevel: number;
    // 设置一个变量来规定升级的规则
    upScore: number
    constructor(maxLevel: number = 10, upScore: number = 10) {
        this.scoreEle = document.getElementById('score')!
        this.levelEle = document.getElementById('level')!
        this.maxLevel = maxLevel
        this.upScore = upScore
    }
    // 设置加分的方法
    addScore() {
        this.score ++
        // 返回需要为String
        this.scoreEle.innerHTML = this.score + ''
        if(this.score % this.upScore === 0) {
            this.levelUp()
        }
    }
    levelUp() {
        if(this.level < this.maxLevel) {
            this.level ++
            this.levelEle.innerHTML = this.level + ''
        }   
    }
}

export default ScorePanel