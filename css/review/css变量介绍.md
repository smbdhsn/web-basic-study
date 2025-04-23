# CSS 变量（自定义属性）详解

CSS 变量，正式名称为"CSS 自定义属性"（CSS Custom Properties），是 CSS 中允许开发者定义和重用值的一种机制。它们提供了一种在整个样式表中存储和管理值的方法，使代码更加灵活、可维护且具有动态性。

## CSS 变量的基本概念

### 定义语法

CSS 变量使用双横线（`--`）作为前缀来定义：

```css
:root {
  --main-color: #3498db;
  --secondary-color: #2ecc71;
  --font-size-base: 16px;
  --spacing-unit: 8px;
}
```

### 使用语法

使用 `var()` 函数来引用变量：

```css
.button {
  background-color: var(--main-color);
  padding: var(--spacing-unit) calc(var(--spacing-unit) * 2);
  font-size: var(--font-size-base);
}
```

### 变量作用域

CSS 变量遵循 CSS 的级联规则和继承机制：

- 通常在 `:root` 选择器中定义全局变量
- 可以在任何选择器中定义局部变量
- 子元素会继承父元素的变量

```css
:root {
  --text-color: black;
}

.dark-theme {
  --text-color: white;
}

p {
  color: var(--text-color); /* 根据上下文使用黑色或白色 */
}
```

### 默认值和回退机制

`var()` 函数可以提供默认值，当变量未定义或值无效时使用：

```css
.element {
  margin: var(--margin, 10px); /* 如果 --margin 未定义，则使用 10px */
}
```

## CSS 变量的主要应用场景

### 1. 主题切换

CSS 变量最强大的应用之一是实现动态主题切换，如明暗模式：

```css
:root {
  --background-color: white;
  --text-color: #333;
  --accent-color: #0066cc;
}

.dark-theme {
  --background-color: #222;
  --text-color: #eee;
  --accent-color: #66aaff;
}

body {
  background-color: var(--background-color);
  color: var(--text-color);
}

.button {
  background-color: var(--accent-color);
}
```

切换主题只需添加或移除类名：

```javascript
document.documentElement.classList.toggle('dark-theme');
```

### 2. 品牌和设计系统

为品牌颜色、间距、字体大小等创建一致的设计系统：

```css
:root {
  /* 品牌颜色 */
  --brand-primary: #ff5722;
  --brand-secondary: #2196f3;
  
  /* 间距系统 */
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 32px;
  
  /* 字体大小 */
  --text-xs: 12px;
  --text-sm: 14px;
  --text-md: 16px;
  --text-lg: 20px;
  --text-xl: 24px;
}
```

这样可以确保整个应用程序的一致性，并且可以轻松地进行全局调整。

### 3. 响应式设计

结合媒体查询，可以根据屏幕尺寸调整变量值：

```css
:root {
  --container-width: 1200px;
  --font-size-base: 16px;
  --header-height: 80px;
}

@media (max-width: 768px) {
  :root {
    --container-width: 100%;
    --font-size-base: 14px;
    --header-height: 60px;
  }
}
```

### 4. 组件变体

为组件创建不同的变体，而不需要编写大量重复代码：

```css
.button {
  padding: var(--button-padding, 8px 16px);
  background-color: var(--button-bg, #0066cc);
  color: var(--button-color, white);
  border-radius: var(--button-radius, 4px);
}

.button-large {
  --button-padding: 12px 24px;
  --button-radius: 8px;
}

.button-danger {
  --button-bg: #dc3545;
}
```

### 5. 动画和过渡

使用 CSS 变量控制动画参数：

```css
:root {
  --animation-duration: 0.3s;
  --animation-easing: ease-in-out;
}

.card {
  transition: transform var(--animation-duration) var(--animation-easing);
}

/* 为特定元素自定义动画 */
.hero-element {
  --animation-duration: 0.5s;
  --animation-easing: cubic-bezier(0.68, -0.55, 0.27, 1.55);
}
```

### 6. 与 JavaScript 交互

CSS 变量可以通过 JavaScript 动态修改，实现实时样式更新：

```javascript
// 获取 CSS 变量值
const rootStyles = getComputedStyle(document.documentElement);
const mainColor = rootStyles.getPropertyValue('--main-color');

// 设置 CSS 变量值
document.documentElement.style.setProperty('--main-color', '#ff0000');
```

这使得创建交互式组件变得更加简单，如颜色选择器、滑块控制的布局等。

### 7. 复杂计算和关系维护

CSS 变量可以用于维护元素之间的关系和进行计算：

```css
:root {
  --grid-columns: 12;
  --gutter-width: 20px;
  --container-padding: 15px;
}

.container {
  padding: 0 var(--container-padding);
}

.column {
  width: calc((100% - (var(--grid-columns) - 1) * var(--gutter-width)) / var(--grid-columns));
  margin-right: var(--gutter-width);
}
```

### 8. 国际化和本地化

根据语言或区域设置调整布局：

```css
:root {
  --text-direction: ltr;
  --font-family: 'Roboto', sans-serif;
}

[lang="ar"] {
  --text-direction: rtl;
  --font-family: 'Cairo', sans-serif;
}

body {
  direction: var(--text-direction);
  font-family: var(--font-family);
}
```

### 9. 无障碍功能

创建无障碍模式，如高对比度主题或更大字体：

```css
:root {
  --contrast-ratio: normal;
  --font-scale: 1;
}

.high-contrast {
  --contrast-ratio: high;
}

.large-text {
  --font-scale: 1.5;
}

body {
  font-size: calc(var(--font-size-base) * var(--font-scale));
}

.text {
  color: var(--contrast-ratio) === 'high' ? black : #555;
  background: var(--contrast-ratio) === 'high' ? white : #f9f9f9;
}
```

### 10. CSS 预处理器替代

对于许多简单用例，CSS 变量可以替代 SASS/LESS 等预处理器的部分功能：

```css
:root {
  /* 颜色系统 */
  --color-primary-100: #e3f2fd;
  --color-primary-500: #2196f3;
  --color-primary-900: #0d47a1;
  
  /* 派生颜色 */
  --button-bg: var(--color-primary-500);
  --button-hover-bg: var(--color-primary-900);
  --card-header-bg: var(--color-primary-100);
}
```

## CSS 变量的高级技巧

### 嵌套变量

变量可以引用其他变量：

```css
:root {
  --primary-hue: 210;
  --primary-color: hsl(var(--primary-hue), 80%, 50%);
  --primary-light: hsl(var(--primary-hue), 80%, 70%);
  --primary-dark: hsl(var(--primary-hue), 80%, 30%);
}
```

### 条件逻辑

结合媒体查询和选择器，可以实现类似条件逻辑的效果：

```css
.component {
  --spacing: 20px;
}

@media (max-width: 768px) {
  .component {
    --spacing: 10px;
  }
}

.component.compact {
  --spacing: 5px;
}
```

### 作用域隔离

利用变量的作用域特性创建隔离的组件样式：

```css
.card {
  --card-padding: 16px;
  --card-bg: white;
  
  padding: var(--card-padding);
  background-color: var(--card-bg);
}

.special-card {
  --card-padding: 24px;
  --card-bg: #f5f5f5;
}
```

## 浏览器兼容性和最佳实践

### 兼容性

CSS 变量在所有现代浏览器中都得到支持，但在 IE11 及以下版本中不支持。可以使用 PostCSS 插件或提供回退值来增强兼容性：

```css
.button {
  background-color: #0066cc; /* 回退值 */
  background-color: var(--main-color, #0066cc);
}
```

### 命名约定

采用一致的命名约定可以提高可维护性：

```css
/* 组件前缀 */
--btn-background: #0066cc;
--btn-padding: 8px 16px;

/* 层级结构 */
--color-primary: #0066cc;
--color-primary-light: #4d94ff;
--color-primary-dark: #004c99;

/* 用途描述 */
--spacing-element: 16px;
--spacing-layout: 24px;
```

### 文档化

为大型项目创建 CSS 变量文档，帮助团队成员理解和使用变量系统：

```css
/**
 * 颜色系统
 * --color-primary: 主品牌色
 * --color-secondary: 辅助品牌色
 * --color-accent: 强调色
 * --color-text: 主文本颜色
 * --color-text-light: 次要文本颜色
 */
:root {
  --color-primary: #0066cc;
  --color-secondary: #4d94ff;
  /* ... */
}
```

## 总结

CSS 变量是现代前端开发中的强大工具，它们提供了以下优势：

1. **提高代码可维护性**：集中管理样式值，减少重复
2. **增强动态性**：可以通过 JavaScript 实时修改
3. **简化主题切换**：轻松实现明暗模式等主题变化
4. **支持响应式设计**：结合媒体查询调整变量值
5. **创建一致的设计系统**：确保整个应用的视觉一致性
6. **提升开发效率**：减少样式修改的工作量

随着浏览器支持的不断改善，CSS 变量已成为前端开发的标准工具，为样式表带来了编程语言般的灵活性和可维护性。无论是小型项目还是大型企业级应用，合理使用 CSS 变量都能显著提升开发体验和代码质量。