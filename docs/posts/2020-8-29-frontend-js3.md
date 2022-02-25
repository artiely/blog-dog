---
title: 前端面试题汇总-js-3
tag: javaScript
cover: https://gitee.com/artiely/Figure-bed/raw/master/image/20200829105349.png
base64: 141414
author: artiely
date: Fri, 28 Aug 2020 16:00:00 GMT
calendar: 庚子,鼠,甲申,甲辰,七月,十一,星期六
summary: 前端面试题汇总-js-3## XSS### XSS是什么XSS是一种经常出现在web应用中的计算机安全漏洞，它允许恶意web用户将代码植入到提供给其它用户使用的页面中。比如这些代码包括HTML代码和客户端脚本。攻击者利用XSS漏洞旁路掉访问控制——例如同源策略(same origin policy)。这种类型的漏洞由于被黑客用来编写危害性更大的网络钓鱼(Phishing) ...
description: 前端面试题汇总-js-3## XSS### XSS是什么XSS是一种经常出现在web应用中的计算机安全漏洞，它允许恶意web用户将代码植入到提供给其它用户使用的页面中。比如这些代码包括HTML代码和客户端脚本。攻击者利用XSS漏洞旁路掉访问控制——例如同源策略(same origin policy)。这种类型的漏洞由于被黑客用来编写危害性更大的网络钓鱼(Phishing) ...
primary: f0c760
secondary: 0f389f
readTime: 7 min read
words: 1311
---
# 前端面试题汇总-js-3

## XSS

### XSS是什么

XSS是一种经常出现在web应用中的计算机安全漏洞，它允许恶意web用户将代码植入到提供给其它用户使用的页面中。

比如这些代码包括HTML代码和客户端脚本。攻击者利用XSS漏洞旁路掉访问控制——例如同源策略(same origin policy)。

这种类型的漏洞由于被黑客用来编写危害性更大的网络钓鱼(Phishing)攻击而变得广为人知。<br>
对于跨站脚本攻击，黑客界共识是：跨站脚本攻击是新型的“缓冲区溢出攻击“，而JavaScript是新型的“ShellCode”。

```js
// 示例：
// <script>alert(document.cookie)</script>
```

### 特点

能注入恶意的HTML/JavaScript代码到用户浏览的网页上，从而达到Cookie资料窃取、会话劫持、钓鱼欺骗等攻击。
`<攻击代码不一定（非要）在 <script></script> 中>`

### 原因

* Web浏览器本身的设计不安全。浏览器能解析和执行JS等代码，但是不会判断该数据和程序代码是否恶意。

* 输入和输出是Web应用程序最基本的交互，而且网站的交互功能越来越丰富。如果在这过程中没有做好安全防护，很容易会出现XSS漏洞。

* 程序员水平参差不齐，而且大都没有过正规的安全培训，没有相关的安全意识。

* XSS攻击手段灵活多变。

  

### 危害

* 盗取各类用户帐号，如机器登录帐号、用户网银帐号、各类管理员帐号
* 控制企业数据，包括读取、篡改、添加、删除企业敏感数据的能力
* 盗窃企业重要的具有商业价值的资料
* 非法转账
* 强制发送电子邮件
* 网站挂马
* 控制受害者机器向其它网站发起攻击

### 如何防范

* 将重要的cookie标记为http only, 这样的话Javascript 中的document.cookie语句就不能获取到cookie了.
* 表单数据规定值的类型，例如：年龄应为只能为int、name只能为字母数字组合。。。。
* 对数据进行Html Encode 处理
* 过滤或移除特殊的Html标签， 例如: `<script>`, `<iframe>` , `&lt; for <`, `&gt; for >`, `&quot for`
* 过滤JavaScript 事件的标签。例如 "onclick=", "onfocus" 等等。

参考资料：<br>
https://www.cnblogs.com/phpstudy2015-6/p/6767032.html<br>
https://www.cnblogs.com/443855539-wind/p/6055816.html<br>
https://baike.baidu.com/item/XSS%E6%94%BB%E5%87%BB/954065?fr=aladdin


## CSRF

CSRF（Cross-site request forgery）跨站请求伪造，也被称为“One Click Attack”或者Session Riding，通常缩写为CSRF或者XSRF，是一种对网站的恶意利用。尽管听起来像跨站脚本（XSS），但它与XSS非常不同，XSS利用站点内的信任用户，而CSRF则通过伪装来自受信任用户的请求来利用受信任的网站。与XSS攻击相比，CSRF攻击往往不大流行（因此对其进行防范的资源也相当稀少）和难以防范，所以被认为比XSS更具危险性。

### 特点

* 依靠用户标识危害网站
* 利用网站对用户标识的信任
* 欺骗用户的浏览器发送HTTP请求给目标站点
* 另外可以通过IMG标签会触发一个GET请求，可以利用它来实现CSRF攻击。

### 防御

* 通过referer、token或者验证码来检测用户提交。
* 尽量不要在页面的链接中暴露用户隐私信息。
* 对于用户修改删除等操作最好都使用post操作 。
* 避免全站通用的cookie，严格设置cookie的域。


## 同源策略

同源策略可防止 JavaScript 发起跨域请求。源被定义为 URI、主机名和端口号的组合。此策略可防止页面上的恶意脚本通过该页面的文档对象模型，访问另一个网页上的敏感数据。

## 跨域

* 原因 <br>
  浏览器的同源策略导致了跨域
* 作用 <br>
  用于隔离潜在恶意文件的重要安全机制
* 解决

1. jsonp ，允许 script 加载第三方资源
2. 反向代理（nginx 服务内部配置 Access-Control-Allow-Origin *）
3. cors 前后端协作设置请求头部，Access-Control-Allow-Origin 等头部信息
4. iframe 嵌套通讯，postmessage

https://zhuanlan.zhihu.com/p/41479807 <br>
[跨域资源共享 CORS 阮一峰](http://www.ruanyifeng.com/blog/2016/04/cors.html)

## JSONP

这是我认为写得比较通俗易懂的一篇文章 直接转载过来<br>
https://blog.csdn.net/hansexploration/article/details/80314948

## 域名收敛

PC 时代为了突破浏览器的域名并发限制。有了域名发散。<br>
浏览器有并发限制，是为了防止DDOS攻击。<br>
域名收敛：就是将静态资源放在一个域名下。减少DNS解析的开销。<br>
域名发散：是将静态资源放在多个子域名下，就可以多线程下载，提高并行度，使客户端加载静态资源更加迅速。<br>
域名发散是pc端为了利用浏览器的多线程并行下载能力。而域名收敛多用与移动端，提高性能，因为dns解析是是从后向前迭代解析，如果域名过多性能会下降，增加DNS的解析开销。
