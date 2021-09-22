class Food{
    // 定义一个基本属性表示食物对应的元素
    element: HTMLElement
    constructor() {
        // 获取页面中的food元素并赋值给element
        this.element = document.getElementById('food')!
    }
    // 定义方法获取食物在屏幕上的坐标
    get x() {
        return this.element.offsetLeft
    }
    get y() {
        return this.element.offsetTop
    }
    // 定义食物随机在屏幕上的位置
    // 左边最小为0，右边最大为stage width304 - border4 - food10 = 290px
    change() {
        let top = Math.round(Math.random() * 29) * 10
        let left = Math.round(Math.random() * 29) * 10
        this.element.style.left = left + 'px'
        this.element.style.top = top + 'px'
    }
}

export default Food