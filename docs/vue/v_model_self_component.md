## 如何在自定义组件中使用v-model

文章属于速记，有错误欢迎指出。风格什么的不喜勿喷。

### 先来一个组件，不用vue-model，正常父子通信

```html
<!-- parent -->
<template>
<div class="parent">
    <p>我是父亲, 对儿子说： {{sthGiveChild}}</p>
    <Child @returnBack="turnBack" :give="sthGiveChild"></Child>
</div>
</template>
<script>
import Child from './Child.vue';
export default {
    data() {
        return {
            sthGiveChild: '给你100块'
        };
    },
    components: {
        Child
    },
    methods: {
        turnBack(val) {
            this.sthGiveChild = val;
        }
    }
}
</script>
```

```html
<!-- child -->
<template>
<div class="child">
    <p>我是儿子，父亲对我说： {{give}}</p>
    <a href="javascript:;" @click="returnBackFn">回应</a>
</div>
</template>
<script>
export default {
    props: {
        give: String
    },
    methods: {
        returnBackFn() {
            this.$emit('returnBack', '还你200块');
        }
    }
}
</script>
```
点击回应后，父亲对儿子说的话变成了儿子的回应。儿子收到的信息也变了，实现通信。

### 改用v-model
```html
<!-- parent -->
<template>
<div class="parent">
    <p>我是父亲, 对儿子说： {{sthGiveChild}}</p>
    <Child v-model="sthGiveChild"></Child>
</div>
</template>
<script>
import Child from './Child.vue';
export default {
    data() {
        return {
            sthGiveChild: '给你100块'
        };
    },
    components: {
        Child
    }
}
</script>
```

```html
<!-- child -->
<template>
<div class="child">
    <p>我是儿子，父亲对我说： {{give}}</p>
    <a href="javascript:;" @click="returnBackFn">回应</a>
</div>
</template>
<script>
export default {
    props: {
        give: String
    },
    model: {
        prop: 'give',
        event: 'returnBack'
    },
    methods: {
        returnBackFn() {
            this.$emit('returnBack', '还你200块');
        }
    }
}
</script>
```

文案虽有不同，但是效果最终是一致的。

### 看看官方自定义组件的v-model
官方例子[https://vuefe.cn/v2/api/#model](https://vuefe.cn/v2/api/#model)

有这么一句话： ```默认情况下，一个组件上的 v-model 会把 value 用作 prop 且把 input 用作 event。```
尝试把上边子组件的例子改一下，也是跑的通的
```html
<!-- child -->
<template>
<div class="child">
    <p>我是儿子，父亲对我说： {{value}}</p>
    <a href="javascript:;" @click="returnBackFn">回应</a>
</div>
</template>
<script>
export default {
    props: {
        value: String
    },
    methods: {
        returnBackFn() {
            this.$emit('input', '还你200块');
        }
    }
}
</script>
```

### 做一下总结：
- 如果你懒，不想自己去处理事件，那就用默认的 'value' && 'input' 事件去处理，如果用原生事件的，甚至连model属性也可以省去。
- 如果你想自己的代码比较明确，区分出自定义事件，那么下面的组合才是你的菜。
prop和event看你自己心情定义，当然要知名见意【尽量避开关键字】
```
model: {
    prop: 'someProp', // 注意，是prop，不带s。我在写这个速记的时候，多写了一个s，调试到怀疑人生
    event: 'someEvent'
}
this.$emit('someProp', [returnValueToParent])
```

