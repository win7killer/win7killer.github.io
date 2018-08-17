## window.requestAnimationFrame 可以锁定的正常FPS

```js
let arr = [];
let mspf = 1000 / 60;
for (let i = 1; i <= 200; i++) {
    let fps = (1000 / (mspf * i)).toFixed(2);
    arr.push(fps);
}
```
#### 算法说明
- requestAnimationFrame， 默认执行60次/s，执行一次的时间是 msfp;
- 浏览器机制，每 msfp 时间执行一次渲染机制;
- 渲染次数i;
- 是否触发动画帧变化，必须是在每一轮的渲染中，所以i轮执行一次逻辑的时间是 mspf * i;
- 那么1秒内的帧数就是 fps = 1000 / (spf * i).

#### 可设置锁帧数值
```json
[ "60.00", "30.00", "20.00", "15.00", "12.00", "10.00", "8.57", "7.50", "6.67", "6.00", "5.45", "5.00", "4.62", "4.29", "4.00", "3.75", "3.53", "3.33", "3.16", "3.00", "2.86", "2.73", "2.61", "2.50", "2.40", "2.31", "2.22", "2.14", "2.07", "2.00", "1.94", "1.87", "1.82", "1.76", "1.71", "1.67", "1.62", "1.58", "1.54", "1.50", "1.46", "1.43", "1.40", "1.36", "1.33", "1.30", "1.28", "1.25", "1.22", "1.20", "1.18", "1.15", "1.13", "1.11", "1.09", "1.07", "1.05", "1.03", "1.02", "1.00" ]
```

### 使用方法

```js
function render() {
    // 渲染函数体
}
function loop(opts = {

}) {
    let fpsText = this.debug ? `FPS: ${opts.fps} --- ` : '';
    let showText = `${fpsText}KeepTime: ${Math.floor(opts.timeCounter / 1000)} s`;
    // some Render
}

initAnimate(loop, {
    fpsLock: fpsLock,
    debug: debug
});
```