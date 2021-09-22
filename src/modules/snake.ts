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
        this.head.style.left = value + 'px'
    }
    set y(value: number) {
        this.head.style.top = value + 'px'
    }
    // 设置length方法
    addBody() {
        this.element.insertAdjacentHTML('beforeend', '<div></div>')
    }
}

export default Snake