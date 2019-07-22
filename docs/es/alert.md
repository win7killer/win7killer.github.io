```js

class DiyAlert {
    constructor() {
        return ((opt) => new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
            this.render(opt);
        })).bind(this);
    }
    render(opt) {
        let {
            str,
            title = '提示'
        } = opt;
        let domHtml = `
            <div style="position: fixed; width: 240px; left: 50%; top: 50%; transform: translate(-50%, -50%); background: #fff; border: 1px solid #999; box-shadow: 3px 3px 3px #999; z-index: 999; padding: 12px;">
            <div style="font-size: 14px; color: #aaa;">${title}</div>
            <p style="font-size: 14px; line-height: 2em;">${str}</p>
            <button class="confirm" style="float: right; border: 1px solid #f90; border-radius: 4px; text-algin: center; padding: 4px 8px;">确认</button>
            </div>
        `
        let dom = this.dom = document.createElement('div');
        dom.innerHTML = domHtml;
        dom.addEventListener('click', (evt) => {
            if (evt.target.className === 'confirm') {
                console.log('确认按钮');
                this.resolve();
                this.destroyPop();
            }
        })
        document.body.appendChild(dom);
    }
    destroyPop() {
        console.log('remove dom')
        document.body.removeChild(this.dom);
        this.dom = null;
    }
}

const _alert = new DiyAlert();

async function app() {
    console.log('alert 之前执行');
    await _alert({title: 'msg', str: '这一条警告信息！'});
    console.log('alert 阻断了我执行，所以我等 alert 确认后才行');
}

app();

```
