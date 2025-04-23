# 子域访问父域 Cookie 的规则

## 简明回答

**不，子域默认情况下不能访问父域的 Cookie。**

只有当父域在设置 Cookie 时**明确指定了 Domain 属性**包含该子域，子域才能访问该 Cookie。

## 详细解释

### Cookie 访问的基本规则

Cookie 的可见性遵循"同源策略"的变体，具体规则如下：

1. **默认情况下，Cookie 只对设置它的确切域可见**
2. **当 Cookie 设置了 Domain 属性时，它对该域及其所有子域可见**

### 具体场景分析

#### 场景 1：父域设置 Cookie（不指定 Domain）

```http
// 在 example.com 上设置
Set-Cookie: user=john; Path=/
```

访问规则：
- ✅ `example.com` 可以访问
- ❌ `a.example.com` 不能访问
- ❌ `b.example.com` 不能访问

#### 场景 2：父域设置 Cookie（指定 Domain）

```http
// 在 example.com 上设置
Set-Cookie: user=john; Domain=example.com; Path=/
```

访问规则：
- ✅ `example.com` 可以访问
- ✅ `a.example.com` 可以访问
- ✅ `b.example.com` 可以访问
- ✅ 任何 `.example.com` 的子域都可以访问

#### 场景 3：子域设置 Cookie（不指定 Domain）

```http
// 在 a.example.com 上设置
Set-Cookie: user=john; Path=/
```

访问规则：
- ❌ `example.com` 不能访问
- ✅ `a.example.com` 可以访问
- ❌ `b.example.com` 不能访问

#### 场景 4：子域设置 Cookie（指定父域作为 Domain）

```http
// 在 a.example.com 上设置
Set-Cookie: user=john; Domain=example.com; Path=/
```

访问规则：
- ✅ `example.com` 可以访问
- ✅ `a.example.com` 可以访问
- ✅ `b.example.com` 可以访问
- ✅ 任何 `.example.com` 的子域都可以访问

## 验证示例

### 在父域设置 Cookie 的测试

1. 访问 `example.com`
2. 设置 Cookie（不指定 Domain）：
   ```javascript
   document.cookie = "parentOnly=true; path=/";
   ```
3. 设置 Cookie（指定 Domain）：
   ```javascript
   document.cookie = "sharedWithSubdomains=true; domain=example.com; path=/";
   ```
4. 访问 `a.example.com`
5. 检查可用的 Cookie：
   ```javascript
   console.log(document.cookie);
   // 只会显示 "sharedWithSubdomains=true"
   // 不会显示 "parentOnly=true"
   ```

## 关键技术细节

### 1. Domain 属性的作用

Domain 属性指定哪些主机可以接收 Cookie：

- 如果指定了 Domain，则对该域及其子域可见
- 如果省略 Domain，则 Cookie 仅对设置它的主机可见（不包括子域）

### 2. 浏览器如何匹配 Cookie 域

当浏览器发送请求时，它会检查所有存储的 Cookie：

```
请求域: a.example.com

Cookie 1: Domain=example.com ✅ 匹配（子域匹配父域）
Cookie 2: Domain=a.example.com ✅ 匹配（完全匹配）
Cookie 3: (无 Domain，由 example.com 设置) ❌ 不匹配
Cookie 4: (无 Domain，由 a.example.com 设置) ✅ 匹配
```

### 3. 安全限制

浏览器实施以下安全限制：

- 不能为顶级域（如 `.com`、`.org`）设置 Cookie
- 不能为公共后缀（如 `.co.uk`、`.github.io`）设置 Cookie
- 子域可以为父域设置 Cookie，但父域不能专门为特定子域设置 Cookie

## 常见误解

### 误解 1：所有 Cookie 都在子域间共享

**事实**：只有明确设置了 Domain 属性的 Cookie 才会在子域间共享。

### 误解 2：父域可以读取所有子域的 Cookie

**事实**：父域只能读取明确设置了父域作为 Domain 的 Cookie，不能读取子域的专有 Cookie。

### 误解 3：子域可以读取父域的所有 Cookie

**事实**：子域只能读取父域中明确设置了 Domain 属性包含该子域的 Cookie。

## 实际应用考虑

### 1. 单点登录实现

要实现跨子域的单点登录：

```http
// 在 login.example.com 上设置
Set-Cookie: auth=token123; Domain=example.com; Path=/; Secure; HttpOnly
```

这样所有子域都可以访问认证 Cookie。

### 2. 隔离敏感 Cookie

对于需要隔离的敏感信息：

```http
// 在 payments.example.com 上设置
Set-Cookie: paymentToken=abc123; Path=/; Secure; HttpOnly
```

不设置 Domain，确保其他子域无法访问。

### 3. 使用 __Host- 前缀增强安全性

```http
Set-Cookie: __Host-session=value; Path=/; Secure
```

使用此前缀的 Cookie 不能设置 Domain 属性，确保 Cookie 仅对设置它的确切主机可见。

## 总结

1. **子域默认不能访问父域的 Cookie**
   - 只有当父域的 Cookie 明确设置了 Domain 属性时才可以

2. **访问规则**：
   - 无 Domain 属性：Cookie 仅对设置它的确切域可见
   - 有 Domain 属性：Cookie 对指定域及其所有子域可见

3. **安全最佳实践**：
   - 除非必要，否则不要设置 Domain 属性
   - 对敏感 Cookie 使用 __Host- 前缀
   - 始终使用 Secure 和 HttpOnly 属性（适用时）

理解这些规则对于正确实现跨域/子域功能和维护适当的安全边界至关重要。