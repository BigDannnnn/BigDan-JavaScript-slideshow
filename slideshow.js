const log = console.log.bind(console)

var e = function(selector) {
    var element = document.querySelector(selector)
    if (element === null) {
        var s = `元素没找到，选择器 ${selector} 没有找到或者 js 没有放在 body 里`
        alert(s)
        return element
    } else {
        return element
    }
}

const es = function(selector) {
    let elements = document.querySelectorAll(selector)
    if (elements.length === 0) {
        let s = `元素没找到，选择器 ${selector} 没有找到或者 js 没有放在 body 里`
        alert(s)
    } else {
        return elements
    }
}

var bindEvent = function(element, eventName, callback) {
    element.addEventListener(eventName, callback)
}

var bindAll = function(selector, eventName, callback) {
    var elements = es(selector)
    for (var i = 0; i < elements.length; i++) {
        var e = elements[i]
        bindEvent(e, eventName, callback)
    }
}

const removeClassAll = function(className) {
    let selector = '.' + className
    let elements = es(selector)
    for (let i = 0; i < elements.length; i++) {
        let e = elements[i]
        e.classList.remove(className)
    }
}

const nextPicIndex = (offset, container) => {
    let numberOfImages = Number(container.dataset.imgs)
    let activeIndex = Number(container.dataset.show)
    let index = (activeIndex + offset + numberOfImages) % numberOfImages
    return index
}

const showNextPic = (nextIndex, container) => {
    // 一、切换图片
    // 1.设置父节点的 data-show
    container.dataset.show = nextIndex
    // 2.删除当前图片的 class
    let className = 'show'
    removeClassAll(className)
    // 3.得到下一张图片的选择器，给下一张图片加上 class
    let nextSelector = '#id-img-' + String(nextIndex)
    let img = document.querySelector(nextSelector)
    img.classList.add(className)

    // 二、切换小圆点
    // 1. 删除当前小圆点的 class
    var indicatorClassName = 'white'
    removeClassAll(indicatorClassName)
    // 2. 得到下一个小圆点的选择器
    var indicatorSelector = '#id-indicator-' + String(nextIndex)
    var indicator = document.querySelector(indicatorSelector)
    indicator.classList.add(indicatorClassName)
}

const bindEventButtons = () => {
    let buttons = document.querySelectorAll('.button')
    for (let b of buttons) {
        b.addEventListener('click', function(event) {
            log('cliked')
            let self = event.target
            let offset = Number(self.dataset.offset)
            let container = self.parentElement
            let nextIndex = nextPicIndex(offset, container)
            showNextPic(nextIndex, container)
        })
    }
}

var bindEventIndicator = function() {
    let selector = '.slide-indi'
    bindAll(selector, 'mouseover', function(event) {
        log('indicator in mouseover')
        let self = event.target
        let index = Number(self.dataset.index)
        // 直接播放第 n 张图片
        let container = self.closest('.slide-container')
        showNextPic(index, container)
    })
}

const playNextImage = function() {
    var container = e('.slide-container')
    // 求出下一张图片的 index
    var offset = 1
    var index = nextPicIndex(offset, container)
    showNextPic(index, container)
}

const autoPlay = function() {
    let interval = 3000
    setInterval(function() {
        // 每 3s 都会调用这个函数
        playNextImage()
    }, interval)
}

const __main = () => {
    bindEventButtons()
    bindEventIndicator()
    autoPlay()
}

__main()
