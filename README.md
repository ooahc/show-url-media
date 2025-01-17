# url_viewer
根据代码分析，这个项目支持通过 URL 参数来控制图片/视频的显示模式。以下是使用方法：

在 URL 中添加 `mode` 参数来设置显示模式，例如：

```
你的URL?mode=fill
```

支持的三种模式：
- `mode=fit` - 保持原始比例，确保整个图片/视频可见
- `mode=fill` - 填充模式，可能会裁剪部分内容以填满容器
- `mode=stretch` - 拉伸模式，可能会改变原始比例

示例：
```
https://example.com/image.jpg?mode=fill
https://example.com/video.mp4?mode=fit
```

除了 `mode` 参数外，还支持以下可选参数：
- `width` - 设置显示宽度（像素）
- `height` - 设置显示高度（像素）
- `quality` - 设置图片质量（1-100，仅对图片有效）

完整示例：
```
https://example.com/image.jpg?mode=fill&width=800&height=600&quality=80
```

这些参数的处理逻辑可以在以下代码块中找到：

```12:18:src/App.tsx
  const params: MediaParams = {
    url: mediaUrl,
    mode: (searchParams.get('mode') as DisplayMode) || 'stretch',
    width: searchParams.get('width') ? Number(searchParams.get('width')) : undefined,
    height: searchParams.get('height') ? Number(searchParams.get('height')) : undefined,
    quality: searchParams.get('quality') ? Number(searchParams.get('quality')) : undefined,
  };
```


如果不指定 `mode` 参数，默认会使用 `stretch` 模式。



要将默认显示模式从 'stretch' 改为 'fill' 或 'fit'，需要修改 App.tsx 中的默认值设置。

找到这段代码：

```12:18:src/App.tsx
  const params: MediaParams = {
    url: mediaUrl,
    mode: (searchParams.get('mode') as DisplayMode) || 'stretch',
    width: searchParams.get('width') ? Number(searchParams.get('width')) : undefined,
    height: searchParams.get('height') ? Number(searchParams.get('height')) : undefined,
    quality: searchParams.get('quality') ? Number(searchParams.get('quality')) : undefined,
  };
```


将第14行的 `'stretch'` 改为 `'fill'` 或 `'fit'`，比如：

```typescript:src/App.tsx
const params: MediaParams = {
  url: mediaUrl,
  mode: (searchParams.get('mode') as DisplayMode) || 'fill',  // 改这里
  width: searchParams.get('width') ? Number(searchParams.get('width')) : undefined,
  height: searchParams.get('height') ? Number(searchParams.get('height')) : undefined,
  quality: searchParams.get('quality') ? Number(searchParams.get('quality')) : undefined,
};
```

同时，也需要修改 updateParams 函数中的判断条件：

```20:27:src/App.tsx
  const updateParams = (newParams: MediaParams) => {
    const params = new URLSearchParams();
    if (newParams.mode !== 'stretch') params.set('mode', newParams.mode);
    if (newParams.width) params.set('width', newParams.width.toString());
    if (newParams.height) params.set('height', newParams.height.toString());
    if (newParams.quality) params.set('quality', newParams.quality.toString());
    setSearchParams(params);
  };
```


将第22行改为：
```typescript
if (newParams.mode !== 'fill') params.set('mode', newParams.mode);  // 如果默认值改为 'fill'
```

这样就完成了默认显示模式的修改。当URL中没有指定 mode 参数时，将使用新的默认值。




[Edit in StackBlitz next generation editor ⚡️](https://stackblitz.com/~/github.com/chaozhoo/url_viewer)