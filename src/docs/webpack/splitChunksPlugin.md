# webpack4 splitChunksPlugin && runtimeChunkPlugin 配置杂记
- author: fe_bean

> webpack2 还没研究好，就发现升级到4了，你咋这么快~

最近要做项目脚手架，项目构建准备重新做，因为之前写的太烂了...然后发现webpack大版本已经升到4了(又去看了一眼，4.5了)，这么快的节奏，不适应啊...既然是新的，就用新的来吧，先跳过version3

webpack4 相对于之前的版本，有不少变化，其中包括一些不向下兼容的变化。具体哪些变化这里就不啰嗦了（[4.0 changelog](https://github.com/webpack/webpack/releases/tag/v4.0.0)， [译文](https://zhuanlan.zhihu.com/p/34028750)），今天主要记录一下 废除 ```commonChunksPlugin``` 之后，怎么使用 ```splitChunksPlugin``` && ```runtimeChunkPlugin```
> 只记录到自己了解到的部分，不定期更新吧

### splitChunksPlugin

```splitChunksPlugin 默认配置项``` ：
```json
{
    "chunks": "all",
    "minSize": 0,
    "misChunks": 1,
    "maxAsyncRequests": 1,
    "maxInitialRequests": 1,
    "name": undefined,
    "automaticNameDelimiter": "~",
    "filename": undefined,
    "cacheGroups": {}
}
```
稍微来解释下各项配置：
- **chunks**: all, async, initial 三选一, 插件作用的chunks范围
- **minSize**： 最小尺寸
- **misChunks**：最小chunks
- **maxAsyncRequests**： 最大异步请求chunks
- **maxInitialRequests**: 最大初始化chunks
- **name**： split 的 chunks name
- **automaticNameDelimiter**： 如果不指定name，自动生成name的分隔符（‘runtime~[name]’）
- **filename**: ''
- **cacheGroups**: 字面意思缓存组，主要配置在这里


```
cacheGroups配置项：
```

```json
[key]: {
    "priority": "缓存优先级权重",
    "name": "split 出来的 chunk 的名字",
    "chunks": "应该用范围",
    "enforce": "未知",
    "minSize": "最小尺寸",
    "minChunks": "最小chunks",
    "maxAsyncRequests": "",
    "maxInitialRequests": "",
    "filename": "最后output的文件名",
    "reuseExistingChunk": "未知"
}
```

### runtimeChunkPlugin
```json
"runtimeChunk": {
    "name": "manifest"
}
```

### 直接上例子了：
用不着的属性就不配置了，需要关联到 output 和 ExtractTextPlugin 配置

```js
webpackConf: {
    ...,
    output: {
        path: path.join(process.cwd(), 'dist'),
        publicPath,
        filename: '[name].js',
        chunkFilename: '[name].js'
    },
    optimization: {
        splitChunks: {
            chunks: 'initial', // 只对入口文件处理
            cacheGroups: {
                vendor: { // split `node_modules`目录下被打包的代码到 `page/vendor.js && .css` 没找到可打包文件的话，则没有。css需要依赖 `ExtractTextPlugin`
                    test: /node_modules\//,
                    name: 'page/vendor',
                    priority: 10,
                    enforce: true
                },
                commons: { // split `common`和`components`目录下被打包的代码到`page/commons.js && .css`
                    test: /common\/|components\//,
                    name: 'page/commons',
                    priority: 10,
                    enforce: true
                }
            }
        },
        runtimeChunk: {
            name: 'page/manifest'
        }
    },
     plugins: [
        new ExtractTextPlugin({
            filename: '[name].css',
            ignoreOrder: true
        }),
        ...
    ]
    ...
}

```

```
以上配置产出大致结构：
```

如果没有css文件，说明对应目录下没有相关css资源引用，或者未使用ExtractTextPlugin
```
dist
└── page
    ├── [commons.css]
    ├── commons.js
    ├── [manifest.css]
    ├── manifest.js
    ├── [vendor.css]
    ├── vendor.js
    └── demo // entry 中 配置
        ├── index.css
        └── index.js
```

### 写在最后
上边的例子是用的 `optimization` 配置项形式，你也可以用 `plugin` 形式，配置参数应该一样的。

之前搜索相关的配置，介绍的文章较少，有一些简单的demo，但总觉得不受用。
参考了不少文章，然后又大概读了 `webpack` 的 `splitChunksPlugin` 的源码，去了解了下都有哪些参数，看源码挺好

<br>

********************************** done **********************************
