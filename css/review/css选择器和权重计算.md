# CSS 选择器优先级与权重叠加

## 基本优先级规则

CSS 选择器的优先级是由一个四位数值表示的，从左到右依次为：

| 级别 | 选择器类型 | 权重值 |
|------|------------|--------|
| 1️⃣ | 内联样式 | 1,0,0,0 |
| 2️⃣ | ID 选择器 | 0,1,0,0 |
| 3️⃣ | 类、伪类、属性选择器 | 0,0,1,0 |
| 4️⃣ | 元素、伪元素选择器 | 0,0,0,1 |
| 5️⃣ | 通配符、组合器 | 0,0,0,0 |

## 权重计算方法

1. **计数法**：统计选择器中各类型选择器的数量
2. **组合计算**：将各类型数量按位置填入四位权重值
3. **比较优先级**：从左到右比较权重值大小

## 权重叠加示例

### 基本选择器权重

```css
/* 权重: 0,0,0,1 */
p { color: black; }

/* 权重: 0,0,1,0 */
.text { color: blue; }

/* 权重: 0,1,0,0 */
#title { color: red; }

/* 权重: 1,0,0,0 */
<p style="color: green;">内联样式</p>
```

### 复合选择器权重叠加

```css
/* 权重: 0,0,0,1 */
p { color: black; }

/* 权重: 0,0,0,2 (两个元素选择器) */
div p { color: blue; }

/* 权重: 0,0,1,1 (一个类选择器 + 一个元素选择器) */
.content p { color: green; }

/* 权重: 0,1,0,1 (一个ID选择器 + 一个元素选择器) */
#sidebar p { color: red; }

/* 权重: 0,1,1,1 (一个ID + 一个类 + 一个元素) */
#sidebar .text p { color: purple; }
```

## 特殊规则

### !important

添加 `!important` 会覆盖所有其他样式声明，无视正常的优先级规则：

```css
p { color: red !important; } /* 即使权重低也会应用 */
#sidebar p { color: blue; }  /* 权重更高但不会应用 */
```

### 相同权重的规则

如果两个规则权重相同，后声明的规则会覆盖先声明的规则：

```css
/* 这两个规则权重相同 (0,0,1,0)，.blue 会生效 */
.red { color: red; }
.blue { color: blue; }
```

### 继承的权重

继承的样式没有权重，任何直接指定的样式都会覆盖继承样式：

```css
body { color: black; } /* 子元素会继承这个颜色 */
p { color: blue; }     /* 即使权重很低也会覆盖继承的颜色 */
```

## 权重叠加详细示例

### 示例 1：多类选择器

```css
/* 权重: 0,0,1,0 */
.sidebar { color: blue; }

/* 权重: 0,0,2,0 (两个类选择器) */
.sidebar.active { color: red; }

/* 权重: 0,0,3,0 (三个类选择器) */
.sidebar.active.highlighted { color: green; }
```

### 示例 2：复杂选择器组合

```css
/* 权重: 0,0,0,2 */
div p { color: black; }

/* 权重: 0,0,1,2 */
div p.text { color: blue; }

/* 权重: 0,1,1,2 */
div #content p.text { color: red; }

/* 权重: 0,1,2,2 */
div #content p.text.active { color: green; }

/* 权重: 0,2,2,2 */
#sidebar #content p.text.active { color: purple; }
```

### 示例 3：伪类和伪元素

```css
/* 权重: 0,0,1,1 (伪类算作类选择器) */
p:first-child { color: blue; }

/* 权重: 0,0,0,2 (伪元素算作元素选择器) */
p::before { content: "»"; color: red; }

/* 权重: 0,0,1,2 */
p.note::before { content: "*"; color: green; }
```

## 常见误区

1. **不是简单相加**：权重比较是按位比较，不是简单相加
   - `0,1,0,0` (一个ID) 总是高于 `0,0,10,10` (10个类和10个元素)

2. **选择器数量**：选择器链中的选择器数量不等于权重
   - `#nav .item p span` 权重是 `0,1,1,2`，而不是按4个选择器计算

3. **通配符和组合器**：`*`, `>`, `+`, `~`, ` `(空格) 不增加权重

## 实际应用建议

1. **避免过度依赖高权重**：尽量不使用 `!important`，减少ID选择器使用

2. **BEM命名方法**：使用如 `.block__element--modifier` 的命名方式，减少选择器嵌套

3. **CSS模块化**：使用CSS Modules或Scoped CSS隔离样式，避免权重战争

4. **权重递增**：需要覆盖样式时，尽量在原选择器基础上增加一个类选择器，而不是使用更高权重

5. **调试工具**：使用浏览器开发工具查看元素应用的样式及其优先级

通过理解和合理运用CSS选择器优先级规则，可以编写更可维护、更可预测的样式代码，减少样式冲突问题。


# CSS 选择器完全指南

CSS 选择器是 CSS 规则的一部分，用于选择要应用样式的 HTML 元素。以下是各类 CSS 选择器的详细分类：

## 基本选择器

| 选择器 | 语法 | 描述 | 示例 |
|--------|------|------|------|
| **通用选择器** | `*` | 选择所有元素 | `* { margin: 0; }` |
| **元素选择器** | `element` | 选择指定标签名的所有元素 | `p { color: blue; }` |
| **类选择器** | `.class` | 选择具有指定类名的所有元素 | `.highlight { background: yellow; }` |
| **ID 选择器** | `#id` | 选择具有指定 ID 的元素 | `#header { height: 80px; }` |
| **属性选择器** | `[attr]` | 选择具有指定属性的元素 | `[disabled] { opacity: 0.5; }` |

## 组合选择器

| 选择器 | 语法 | 描述 | 示例 |
|--------|------|------|------|
| **后代选择器** | `A B` | 选择 A 元素内部的所有 B 元素 | `div p { line-height: 1.5; }` |
| **子选择器** | `A > B` | 选择 A 元素的直接子元素 B | `ul > li { list-style: none; }` |
| **相邻兄弟选择器** | `A + B` | 选择紧接在 A 元素后的 B 元素 | `h2 + p { margin-top: 0; }` |
| **通用兄弟选择器** | `A ~ B` | 选择 A 元素后的所有同级 B 元素 | `h2 ~ p { color: gray; }` |
| **组选择器** | `A, B` | 同时选择 A 和 B 元素 | `h1, h2, h3 { font-family: sans-serif; }` |

## 属性选择器

| 选择器 | 语法 | 描述 | 示例 |
|--------|------|------|------|
| **存在属性** | `[attr]` | 选择具有指定属性的元素 | `[title] { cursor: help; }` |
| **精确属性值** | `[attr="value"]` | 选择属性值完全匹配的元素 | `[type="checkbox"] { margin-right: 5px; }` |
| **部分属性值** | `[attr*="value"]` | 选择属性值包含指定值的元素 | `[class*="btn"] { padding: 5px 10px; }` |
| **开头属性值** | `[attr^="value"]` | 选择属性值以指定值开头的元素 | `[href^="https"] { color: green; }` |
| **结尾属性值** | `[attr$="value"]` | 选择属性值以指定值结尾的元素 | `[src$=".pdf"] { background: url(pdf-icon.png); }` |
| **空格分隔的属性值** | `[attr~="value"]` | 选择属性值包含指定单词的元素 | `[class~="active"] { font-weight: bold; }` |
| **连字符分隔的属性值** | `[attr|="value"]` | 选择属性值以指定值开头，后跟连字符或等于指定值的元素 | `[lang|="en"] { font-style: italic; }` |
| **大小写敏感** | `[attr="value" i]` | 选择属性值匹配，忽略大小写 | `[title="hello" i] { color: blue; }` |

## 伪类选择器

### 状态伪类

| 选择器 | 描述 | 示例 |
|--------|------|------|
| `:hover` | 鼠标悬停在元素上时 | `a:hover { text-decoration: underline; }` |
| `:active` | 元素被激活（如点击）时 | `button:active { transform: scale(0.98); }` |
| `:focus` | 元素获得焦点时 | `input:focus { border-color: blue; }` |
| `:visited` | 已访问的链接 | `a:visited { color: purple; }` |
| `:link` | 未访问的链接 | `a:link { color: blue; }` |
| `:focus-within` | 元素或其后代获得焦点时 | `form:focus-within { background: #f0f0f0; }` |
| `:focus-visible` | 元素通过键盘获得焦点时 | `button:focus-visible { outline: 2px solid blue; }` |
| `:target` | 当前活动的锚点目标元素 | `#section:target { background: yellow; }` |
| `:checked` | 选中的表单元素 | `input:checked + label { font-weight: bold; }` |
| `:disabled` | 禁用的表单元素 | `input:disabled { opacity: 0.5; }` |
| `:enabled` | 启用的表单元素 | `input:enabled { border: 1px solid gray; }` |
| `:read-only` | 只读的表单元素 | `input:read-only { background: #eee; }` |
| `:read-write` | 可读写的表单元素 | `input:read-write { border: 1px solid #ccc; }` |
| `:valid` | 内容有效的表单元素 | `input:valid { border-color: green; }` |
| `:invalid` | 内容无效的表单元素 | `input:invalid { border-color: red; }` |
| `:required` | 必填的表单元素 | `input:required { border-left: 3px solid red; }` |
| `:optional` | 非必填的表单元素 | `input:optional { border-left: 1px solid gray; }` |
| `:in-range` | 值在范围内的表单元素 | `input:in-range { color: green; }` |
| `:out-of-range` | 值超出范围的表单元素 | `input:out-of-range { color: red; }` |
| `:placeholder-shown` | 显示占位符的表单元素 | `input:placeholder-shown { color: #999; }` |
| `:default` | 默认的表单元素 | `input:default { box-shadow: 0 0 2px blue; }` |
| `:indeterminate` | 不确定状态的表单元素 | `input:indeterminate { opacity: 0.8; }` |

### 结构伪类

| 选择器 | 描述 | 示例 |
|--------|------|------|
| `:root` | 文档的根元素 | `:root { --main-color: blue; }` |
| `:empty` | 没有子元素的元素 | `div:empty { padding: 10px; background: #eee; }` |
| `:first-child` | 作为第一个子元素的元素 | `li:first-child { font-weight: bold; }` |
| `:last-child` | 作为最后一个子元素的元素 | `li:last-child { border-bottom: none; }` |
| `:only-child` | 作为唯一子元素的元素 | `li:only-child { list-style: none; }` |
| `:nth-child(n)` | 作为第 n 个子元素的元素 | `tr:nth-child(odd) { background: #f9f9f9; }` |
| `:nth-last-child(n)` | 从后数第 n 个子元素 | `li:nth-last-child(2) { color: red; }` |
| `:first-of-type` | 同类型的第一个兄弟元素 | `p:first-of-type { font-size: 1.2em; }` |
| `:last-of-type` | 同类型的最后一个兄弟元素 | `img:last-of-type { margin-bottom: 0; }` |
| `:only-of-type` | 同类型的唯一兄弟元素 | `h1:only-of-type { text-align: center; }` |
| `:nth-of-type(n)` | 同类型的第 n 个兄弟元素 | `p:nth-of-type(2) { text-indent: 1em; }` |
| `:nth-last-of-type(n)` | 同类型从后数第 n 个兄弟元素 | `div:nth-last-of-type(3) { margin-bottom: 20px; }` |

### 其他伪类

| 选择器 | 描述 | 示例 |
|--------|------|------|
| `:not(selector)` | 不匹配指定选择器的元素 | `div:not(.special) { color: black; }` |
| `:is(selectors)` | 匹配任何指定选择器的元素 | `:is(h1, h2, h3) { color: blue; }` |
| `:where(selectors)` | 类似 `:is()`，但权重为 0 | `:where(section, article) p { line-height: 1.5; }` |
| `:has(selector)` | 包含指定元素的元素 | `div:has(> img) { display: flex; }` |
| `:lang(language)` | 指定语言的元素 | `:lang(fr) { font-style: italic; }` |
| `:dir(direction)` | 指定文本方向的元素 | `:dir(rtl) { margin-right: 10px; }` |

## 伪元素选择器

| 选择器 | 描述 | 示例 |
|--------|------|------|
| `::before` | 在元素内容前插入内容 | `p::before { content: "»"; color: blue; }` |
| `::after` | 在元素内容后插入内容 | `a[href^="http"]::after { content: " ↗"; }` |
| `::first-line` | 元素的第一行 | `p::first-line { font-weight: bold; }` |
| `::first-letter` | 元素的第一个字母 | `p::first-letter { font-size: 2em; }` |
| `::selection` | 用户选中的文本 | `::selection { background: yellow; color: black; }` |
| `::placeholder` | 表单元素的占位符文本 | `input::placeholder { color: #999; }` |
| `::marker` | 列表项的标记 | `li::marker { color: red; }` |
| `::backdrop` | 全屏元素后的背景 | `dialog::backdrop { background: rgba(0,0,0,0.5); }` |
| `::cue` | WebVTT 字幕 | `::cue { color: yellow; }` |
| `::slotted()` | Web Components 中的插槽内容 | `::slotted(p) { margin: 0; }` |

## 选择器组合与优化

### 复杂选择器示例

```css
/* 选择导航栏中的活动链接 */
nav > ul > li.active > a { color: #ff6600; }

/* 选择表单中必填但无效的输入框 */
form input[required]:invalid { border: 2px solid red; }

/* 选择带有特定属性的表格行 */
table tr[data-status="completed"] { background-color: #e6ffe6; }

/* 使用 :is() 简化选择器 */
:is(header, main, footer) h2 { margin-bottom: 1em; }

/* 使用 :not 和属性选择器组合 */
a:not([href^="https"]):not([href^="mailto"]) { color: red; }

/* 使用 :has 选择包含图片的段落 */
p:has(img) { display: flex; align-items: center; }
```

### 性能优化提示

1. **从右到左匹配**：浏览器从右向左解析选择器，所以右侧应尽量具体
2. **避免过度嵌套**：减少选择器链的长度，提高性能
3. **使用类选择器**：比元素选择器更高效
4. **避免通用选择器**：`*` 作为关键选择器会降低性能
5. **合理使用新选择器**：`:is()`, `:where()` 可以简化代码，但注意浏览器兼容性

## 浏览器兼容性注意事项

- 较新的选择器（如 `:has()`, `:is()`, `:where()`）在旧浏览器中可能不支持
- 伪元素应使用双冒号（`::`），但为兼容旧浏览器，有些可使用单冒号（`:`）
- 某些选择器在不同浏览器中行为可能略有不同
- 使用前可查阅 [Can I Use](https://caniuse.com/) 确认兼容性

通过掌握这些选择器，你可以精确地定位和样式化 HTML 元素，创建更加灵活和可维护的 CSS 代码。