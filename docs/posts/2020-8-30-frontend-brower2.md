---
title: 前端面试题汇总-浏览器篇-2
tag: javaScript
cover: https://gitee.com/artiely/Figure-bed/raw/master/image/20200831112934.png
base64: 2b4dd7
author: artiely
date: Sat, 29 Aug 2020 16:00:00 GMT
calendar: 庚子,鼠,甲申,乙巳,七月,十二,星期日
summary: 前端面试题汇总-浏览器篇-2## Token - 服务端身份验证的流行方案### 简述：1. 需要一个secret（随机数）2. 后端利用secret和加密算法(如：HMAC-SHA256)对payload(如账号密码)生成一个字符串(token)，返回前端3. 前端每次request在header中带上token4. 后端用同样的算法解密## 身份认证服务 ...
description: 前端面试题汇总-浏览器篇-2## Token - 服务端身份验证的流行方案### 简述：1. 需要一个secret（随机数）2. 后端利用secret和加密算法(如：HMAC-SHA256)对payload(如账号密码)生成一个字符串(token)，返回前端3. 前端每次request在header中带上token4. 后端用同样的算法解密## 身份认证服务 ...
primary: e08423
secondary: 1f7bdc
readTime: 22 min read
words: 4243
---

# 前端面试题汇总-浏览器篇-2
## Token - 服务端身份验证的流行方案

### 简述：

1. 需要一个secret（随机数）
2. 后端利用secret和加密算法(如：HMAC-SHA256)对payload(如账号密码)生成一个字符串(token)，返回前端
3. 前端每次request在header中带上token
4. 后端用同样的算法解密



## 身份认证

------

服务端提供资源给客户端，但是某些资源是**有条件**的。所以服务端要能够识别请求者的身份，然后再判断所请求的资源是否可以给请求者。

token是一种身份验证的机制，初始时用户提交账号数据给服务端，服务端采用一定的策略生成一个字符串（token），token字符串中包含了少量的用户信息，并且有一定的期限。服务端会把token字符串传给客户端，客户端保存token字符串，并在接下来的请求中带上这个字符串。

它的工作流程大概是这样：

![](https://gitee.com/artiely/Figure-bed/raw/master/image/20200831105031.png)

组件图

## Token机制

在这样的流程下，我们需要考虑下面几个问题：

1. 服务端如何根据token获取用户的信息？
2. 如何确保识别**伪造**的token？
    这里是指token不是经过服务端来生成的。
3. 如何应付**冒充**的情况？
    非法客户端拦截了合法客户端的token，然后使用这个token向服务端发送请求，冒充合法客户端。

### 用户匹配

服务端在生成token时，加入少量的用户信息，比如用户的id。服务端接收到token之后，可以解析出这些数据，从而将token和用户关联了起来。

### 防伪造

一般情况下，建议放入token的数据是不敏感的数据，这样只要服务端使用私钥对数据生成签名，然后和数据拼接起来，作为token的一部分即可。



### 防冒充

#### 加干扰码

服务端在生成token时，使用了客户端的UA作为干扰码对数据加密，客户端进行请求时，会同时传入token、UA，服务端使用UA对token解密，从而验证用户的身份。

如果只是把token拷贝到另一个客户端使用，不同的UA会导致在服务端解析token失败，从而实现了一定程度的防冒充。但是攻击者如果猜到服务端使用UA作为加密钥，他可以修改自己的UA。

#### 有效期

给token加上有效期，即使被冒充也只是在一定的时间段内有效。这不是完美的防御措施，只是尽量减少损失。

服务端在生成token时，加入有效期。每次服务端接收到请求，解析token之后，判断是否已过期，如果过期就拒绝服务。

#### token刷新

如果token过期了，客户端应该对token续期或者重新生成token。这取决于token的过期机制。

1. 服务器缓存token及对应的过期时间
    这个时候就可以采用续期的方式，服务器更新过期时间，token再次有效。
2. token中含有过期时间
    这个时候需要重新生成token。

在token续期或者重新生成token的时候，需要额外加入数据来验证身份。因为token已经过期了，即token已经不能用来验证用户的身份了。这个时候可以请求用户重新输入账号和密码，但是用户体验稍差。

另一种方式是使用摘要。服务端生成token，同时生成token的摘要，然后一起返回给客户端。客户端保存摘要，一般请求只需要用到token，在刷新token时，才需要用到摘要。服务端验证摘要，来验证用户的身份。因为摘要不会频繁的在客户端和服务端之间传输，所以被截取的概率较小。

## Token工作流程

------

### 生成token

![](https://gitee.com/artiely/Figure-bed/raw/master/image/20200831105047.png)

生成token

一般在登录的时候生成token。Token管理者负责根据用户的数据生成token和摘要，摘要用来给APP端刷新token用，类似于[微信登录](https://link.jianshu.com?t=https://open.weixin.qq.com/cgi-bin/showdocument?action=dir_list&t=resource/res_list&verify=1&id=open1419317853&lang=zh_CN)中的refresh_token。

生成token的过程中，ua的充作干扰码。没有相同的ua，就无法解析生成的token字符串。如果客户端是混合开发的模式，生成token和使用token的代理可能不同（比如一个是h5，一个是原生），ua就会不同，token就无法成功的使用。可以选择其他的客户端数据作为干扰码，注意考虑下面的问题：

1. 不同的客户端，干扰码应该不同
    干扰码的很大一个作用是防冒充，如果选择的充当干扰码的客户端数据没有区分性，就达不到效果。
2. 选择充当干扰码的数据，在哪些情况下会变化？这些情况是否合理？
    比如干扰码数据中含有app的版本号，那么app版本升级就会导致干扰码变化。服务端根据新的干扰码，无法解析旧的token，此时用户必须重新登录。这种情况是合理的吗？如果不合理，干扰码中就不应该含有app的版本号。

### 拦截验证

![](https://gitee.com/artiely/Figure-bed/raw/master/image/20200831105120.png)

拦截验证

客户端的每一次请求，都必须携带token、ua，拦截器会对敏感资源的访问进行拦截，然后根据ua解析token，解析不成功，表示token和ua不匹配。解析成功之后，判断token是否已过期，如果是，拒绝服务。所有都ok的情况下，拦截器放行，请求传达到业务服务者。

###  token刷新

![](https://gitee.com/artiely/Figure-bed/raw/master/image/20200831105137.png)

token刷新

当token过期，用户需要刷新token。刷新token本质上是这样的：

> 服务端：这个token是你的吗？
>  客户端：是的。
>  服务端：当初我给你token的时候，还给了一个摘要，你把摘要拿过来证明。

客户端需要把token、摘要、ua都传给服务端，服务端对token重新生成摘要，通过判断两个摘要是否相同来验证**这次请求刷新token的客户端，是不是上次请求生成token的客户端**。验证通过，服务端需要使用用户数据重新生成token，用户数据则来自用ua解析token的结果。



## 基于 Token 的身份验证：JSON Web Token

很多大型网站也都在用，比如 Facebook，Twitter，Google+，Github 等等，比起传统的身份验证方法，Token 扩展性更强，也更安全点，非常适合用在 Web 应用或者移动应用上。Token 的中文有人翻译成 “令牌”，我觉得挺好，意思就是，你拿着这个令牌，才能过一些关卡。

文章先介绍了一下传统身份验证与基于 JWT 身份验证的方法，再理解一下 JWT 的 Token 的组成部分（头部，数据，签名），最后我们会在一个 Node.js 项目上实施签发与验证 JWT 的功能。

### 传统身份验证的方法

HTTP 是一种没有状态的协议，也就是它并不知道是谁是访问应用。这里我们把用户看成是客户端，客户端使用用户名还有密码通过了身份验证，不过下回这个客户端再发送请求时候，还得再验证一下。

解决的方法就是，当用户请求登录的时候，如果没有问题，我们在服务端生成一条记录，这个记录里可以说明一下登录的用户是谁，然后把这条记录的 ID 号发送给客户端，客户端收到以后把这个 ID 号存储在 Cookie 里，下次这个用户再向服务端发送请求的时候，可以带着这个 Cookie ，这样服务端会验证一个这个 Cookie 里的信息，看看能不能在服务端这里找到对应的记录，如果可以，说明用户已经通过了身份验证，就把用户请求的数据返回给客户端。

上面说的就是 Session，我们需要在服务端存储为登录的用户生成的 Session ，这些 Session 可能会存储在内存，磁盘，或者数据库里。我们可能需要在服务端定期的去清理过期的 Session 。

### 基于 Token 的身份验证方法

使用基于 Token 的身份验证方法，在服务端不需要存储用户的登录记录。大概的流程是这样的：

1. 客户端使用用户名跟密码请求登录
2. 服务端收到请求，去验证用户名与密码
3. 验证成功后，服务端会签发一个 Token，再把这个 Token 发送给客户端
4. 客户端收到 Token 以后可以把它存储起来，比如放在 Cookie 里或者 Local Storage 里
5. 客户端每次向服务端请求资源的时候需要带着服务端签发的 Token
6. 服务端收到请求，然后去验证客户端请求里面带着的 Token，如果验证成功，就向客户端返回请求的数据

### JWT

实施 Token 验证的方法挺多的，还有一些标准方法，比如 JWT，读作：*jot* ，表示：JSON Web Tokens 。JWT 标准的 Token 有三个部分：

- header（头部）
- payload（数据）
- signature（签名）

中间用点分隔开，并且都会使用 Base64 编码，所以真正的 Token 看起来像这样：

```shell
eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJuaW5naGFvLm5ldCIsImV4cCI6IjE0Mzg5NTU0NDUiLCJuYW1lIjoid2FuZ2hhbyIsImFkbWluIjp0cnVlfQ.SwyHTEx_RQppr97g4J5lKXtabJecpejuef8AqKYMAJc
```

### Header

每个 JWT token 里面都有一个 header，也就是头部数据。里面包含了使用的算法，这个 JWT 是不是带签名的或者加密的。主要就是说明一下怎么处理这个 JWT token 。

头部里包含的东西可能会根据 JWT 的类型有所变化，比如一个加密的 JWT 里面要包含使用的加密的算法。唯一在头部里面要包含的是 *alg* 这个属性，如果是加密的 JWT，这个属性的值就是使用的签名或者解密用的算法。如果是未加密的 JWT，这个属性的值要设置成 *none*。

示例：

```js
{
  "alg": "HS256"
}
```

意思是这个 JWT 用的算法是 HS256。上面的内容得用 [base64url](https://tools.ietf.org/html/rfc4648#section-5) 的形式编码一下，所以就变成这样：

```shell
eyJhbGciOiJIUzI1NiJ9
```

### Payload

Payload 里面是 Token 的具体内容，这些内容里面有一些是标准字段，你也可以添加其它需要的内容。下面是标准字段：

- iss：Issuer，发行者
- sub：Subject，主题
- aud：Audience，观众
- exp：Expiration time，过期时间
- nbf：Not before
- iat：Issued at，发行时间
- jti：JWT ID

比如下面这个 Payload ，用到了 *iss* 发行人，还有 *exp* 过期时间这两个标准字段。另外还有两个自定义的字段，一个是 *name* ，还有一个是 *admin* 。

```js
{
 "iss": "ninghao.net",
 "exp": "1438955445",
 "name": "wanghao",
 "admin": true
}
```

使用 base64url 编码以后就变成了这个样子：

```shell
eyJpc3MiOiJuaW5naGFvLm5ldCIsImV4cCI6IjE0Mzg5NTU0NDUiLCJuYW1lIjoid2FuZ2hhbyIsImFkbWluIjp0cnVlfQ
```

### Signature

JWT 的最后一部分是 Signature ，这部分内容有三个部分，先是用 Base64 编码的 header.payload ，再用加密算法加密一下，加密的时候要放进去一个 Secret ，这个相当于是一个密码，这个密码秘密地存储在服务端。

- header
- payload
- secret

```js
const encodedString = base64UrlEncode(header) + "." + base64UrlEncode(payload); 
HMACSHA256(encodedString, 'secret');
```

处理完成以后看起来像这样：

```shell
SwyHTEx_RQppr97g4J5lKXtabJecpejuef8AqKYMAJc
```

最后这个在服务端生成并且要发送给客户端的 Token 看起来像这样：

```shell
eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJuaW5naGFvLm5ldCIsImV4cCI6IjE0Mzg5NTU0NDUiLCJuYW1lIjoid2FuZ2hhbyIsImFkbWluIjp0cnVlfQ.SwyHTEx_RQppr97g4J5lKXtabJecpejuef8AqKYMAJc
```

客户端收到这个 Token 以后把它存储下来，下回向服务端发送请求的时候就带着这个 Token 。服务端收到这个 Token ，然后进行验证，通过以后就会返回给客户端想要的资源。

## 签发与验证 JWT

在应用里实施使用基于 JWT 这种 Token 的身份验证方法，你可以先去找一个签发与验证 JWT 的功能包。无论你的后端应用使用的是什么样的程序语言，系统，或者框架，你应该都可以找到提供类似功能的包。

下面我们在一个 Node.js 项目里，用最简单的方式来演示一下签发还有验证 JWT 的方法。

### 准备项目

准备一个简单的 Node.js 项目：

```shell
cd ~/desktop
mkdir jwt-demo
cd jwt-demo
npm init -y
```

安装签发与验证 JWT 的功能包，我用的叫 [*jsonwebtoken*](https://github.com/auth0/node-jsonwebtoken)，在项目里安装一下这个包：

```shell
npm install jsonwebtoken --save
```

### 签发 JWT

在项目里随便添加一个 .js 文件，比如 *index.js*，在文件里添加下面这些代码：

```js
const jwt = require('jsonwebtoken')

// Token 数据
const payload = {
  name: 'wanghao',
  admin: true
}

// 密钥
const secret = 'ILOVENINGHAO'

// 签发 Token
const token = jwt.sign(payload, secret, { expiresIn: '1day' })

// 输出签发的 Token
console.log(token)
```

非常简单，就是用了刚刚为项目安装的 jsonwebtoken 里面提供的 jwt.sign 功能，去签发一个 token。这个 sign 方法需要三个参数：

1. *playload*：签发的 token 里面要包含的一些数据。
2. *secret*：签发 token 用的密钥，在验证 token 的时候同样需要用到这个密钥。
3. *options*：一些其它的选项。

在命令行下面，用 *node* 命令，执行一下项目里的 *index.js* 这个文件（*node index.js*），会输出应用签发的 *token*：

```shell
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoid2FuZ2hhbyIsImFkbWluIjp0cnVlLCJpYXQiOjE1MjkwMzM5MDYsImV4cCI6MTUyOTEyMDMwNn0.DctA2QlUCrM6wLWkIO78wBVN0NLpjoIq4T5B_2WJ-PU
```

上面的 Token 内容并没有加密，所以如果用一些 JWT 解码功能，可以看到 Token 里面包含的内容，内容由三个部分组成，像这样：

```js
// header
{
  "alg": "HS256", 
  "typ": "JWT"
}

// payload
{
  "admin": true, 
  "iat": 1529033906, 
  "name": "wanghao", 
  "exp": 1529120306
}

// signature
DctA2QlUCrM6wLWkIO78wBVN0NLpjoIq4T5B_2WJ-PU
```

假设用户通过了某种身份验证，你就可以使用上面的签发 Token 的功能为用户签发一个 Token。一般在客户端那里会把它保存在 Cookie 或 LocalStorage 里面。

用户下次向我们的应用请求受保护的资源的时候，可以在请求里带着我们给它签发的这个 Token，后端应用收到请求，检查签名，如果验证通过确定这个 Token 是我们自己签发的，那就可以为用户响应回他需要的资源。

### 验证 JWT

验证 JWT 的用效性，确定一下用户的 JWT 是我们自己签发的，首先要得到用户的这个 JWT Token，然后用 *jwt.verify* 这个方法去做一下验证。这个方法是 Node.js 的 jsonwebtoken 这个包里提供的，在其它的应用框架或者系统里，你可能会找到类似的方法来验证 JWT。

打开项目的 index.js 文件，里面添加几行代码：

```js
// 验证 Token
jwt.verify(token, 'bad secret', (error, decoded) => {
  if (error) {
    console.log(error.message)
    return
  }
  console.log(decoded)
})
```

把要验证的 Token 数据，还有签发这个 Token 的时候用的那个密钥告诉 *verify* 这个方法，在一个回调里面有两个参数，*error* 表示错误，*decoded* 是解码之后的 Token 数据。

执行：

```shell
node ~/desktop/jwt-demo/index.js
```

输出：

```shell
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoid2FuZ2hhbyIsImFkbWluIjp0cnVlLCJpYXQiOjE1MjkwMzQ3MzMsImV4cCI6MTUyOTEyMTEzM30.swXojmu7VimFu3BoIgAxxpmm2J05dvD0HT3yu10vuqU

invalid signature
```

注意输出了一个 invalid signature ，表示 Token 里的签名不对，这是因为我们组长 *verify* 方法提供的密钥并不是签发 Token 的时候用的那个密钥。这样修改一下：

```shell
jwt.verify(token, secret, (error, decoded) => { ...
```

再次运行，会输出类似的数据：

```shell
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoid2FuZ2hhbyIsImFkbWluIjp0cnVlLCJpYXQiOjE1MjkwMzUzODYsImV4cCI6MTUyOTEyMTc4Nn0.mkNrt4TfcfmP22xd3C_GQn8qnUmlB39dKT9SpIBTBGI

{ name: 'wanghao', admin: true, iat: 1529035386, exp: 1529121786 }
```

### RS256 算法

默认签发还有验证 Token 的时候用的是 HS256 算法，这种算法需要一个密钥（密码）。我们还可以使用 RS256 算法签发与验证 JWT。这种方法可以让我们分离开签发与验证，签发时需要用一个密钥，验证时使用公钥，也就是有公钥的地方只能做验证，但不能签发 JWT。

在项目下面创建一个新的目录，里面可以存储即将生成的密钥与公钥文件。

```shell
cd ~/desktop/jwt-demo
mkdir config
cd config
```

#### 密钥

先生成一个密钥文件：

```shell
ssh-keygen -t rsa -b 2048 -f private.key
```

#### 公钥

基于上面生成的密钥，再去创建一个对应的公钥：

```shell
openssl rsa -in private.key -pubout -outform PEM -out public.key
```

### 签发 JWT（RS256 算法）

用 RS256 算法签发 JWT 的时候，需要从文件系统上读取创建的密钥文件里的内容。

```js
const fs = require('fs')

// 获取签发 JWT 时需要用的密钥
const privateKey = fs.readFileSync('./config/private.key')
```

签发仍然使用 jwt.sign 方法，只不过在选项参数里特别说明一下使用的算法是 RS256：

```js
// 签发 Token
const tokenRS256 = jwt.sign(payload, privateKey, { algorithm: 'RS256' })

// 输出签发的 Token
console.log('RS256 算法：', tokenRS256)
```



