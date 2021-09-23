class Snake{
    head: HTMLElement;
    bodies: HTMLCollection;
    // 获取容器length
    element: HTMLElement;
    constructor() {
        this.element = document.getElementById('snake')
        // #snake只是容器，里面的第一个div才是蛇头
        this.head = document.querySelector('#snake > div')!
        this.bodies = document.getElementById('snake')!.getElementsByTagName('div')
    }
    // 获取坐标
    get x() {
        return this.head.offsetLeft
    }
    get y() {
        return this.head.offsetTop
    }
    // 设置坐标
    set x(value: number) {
        if (this.x === value) {
            return
        }
        if (value < 0 || value > 290) {
            throw new Error('Game over')
        }
        // 判断有没有第二节身体，并且第二节身体的x值是否等于value，从而判断有无逆行
        if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetLeft === value) {
            if(value > this.x) {
                value = this.x - 10
            } else {
                value = this.x + 10
            }
        }
        this.moveBody()
        this.head.style.left = value + 'px'
        this.checkHeadBody()
    }
    set y(value: number) {
        if (this.y === value) {
            return
        }
        if (value < 0 || value > 290) {
            throw new Error('Game over')
        }
        // 判断有没有第二节身体，并且第二节身体的x值是否等于value，从而判断有无逆行
        if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop === value) {
            if(value > this.y) {
                value = this.y - 10
            } else {
                value = this.y + 10
            }
        }
        this.moveBody()
        this.head.style.top = value + 'px'
        this.checkHeadBody()
    }
    // 设置length方法
    addBody() {
        this.element.insertAdjacentHTML('beforeend', '<div></div>')
    }
    moveBody() {
        // 将后面的部分的坐标值，重新赋值给前面部分的坐标值，从后往前提取元素
        for (let i=this.bodies.length-1; i>0; i--) {
            // 类型断言
            let x = (this.bodies[i-1] as HTMLElement).offsetLeft;
            let y = (this.bodies[i-1] as HTMLElement).offsetTop;
            (this.bodies[i] as HTMLElement).style.left = x + 'px';
            (this.bodies[i] as HTMLElement).style.top = y + 'px'
        }
    }
    // check if head坐标是否和body坐标一致，从而判断有无碰撞自己
    checkHeadBody() {
        for(let i=1; i<this.bodies.length; i++) {
            let bd = this.bodies[i] as HTMLElement
            if(this.x === bd.offsetLeft && this.y === bd.offsetTop) {
                throw new Error('Game over')
            }
        }
    }
}

export default Snake