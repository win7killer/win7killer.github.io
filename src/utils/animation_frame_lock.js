/**
 * @file 带有锁FPS的 animationFrame
 * @author win7killer
 * @param {function} loop 循环执行的函数
 * @param {Object} opt 配置参数
 * @return {Number} window.animationFrameId
 */

function initAnimate(loop = () => {}, opt = {
    fpsLock: 60
}) {
    let {
        fpsLock,
        debug
    } = {
        fpsLock: 60,
        ...opt
    };
    let timeCounter = 0;
    let isActiveDocument = true;
    let mSpf = +(1000 / fpsLock).toFixed(2); // ms per frame

    function animationFrameLoop(time) {
        if (isActiveDocument) {
            lockFps(time);
            window.animationFrameId = requestAnimationFrame(animationFrameLoop);
        }
    }

    function lockFps(time = 0) {
        let temp = time - timeCounter;
        if (temp > mSpf) {
            timeCounter = Math.floor(time);
            let data = {
                timeCounter,
                animationFrameId: window.animationFrameId
            };
            if (debug) {
                data.fps = Math.ceil(1000 / temp);
            }
            loop(data);
        }
    }

    document.addEventListener('visibilitychange', function (e) {
        isActiveDocument = document.visibilityState !== 'hidden';
    });

    window.animationFrameId = requestAnimationFrame(animationFrameLoop);
    return window.animationFrameId;
}

export default initAnimate;
