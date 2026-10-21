# 我的证书健康码

健康码风格的浏览器证书链检测网页。进入页面后自动检查 eMudhra 风险证书链，以红、黄、绿三色显示本轮结果。

- 自动检测参考站的 12 个 TLS 端点。
- 右上角问号显示事件介绍、本轮风险统计、检测边界及处理建议。
- 展开按钮显示各证书链的结果，可重新检测。
- 纯静态 HTML、CSS、JavaScript，无构建依赖；二维码适配当前部署地址。

## 运行

在项目目录执行 `python3 -m http.server 8000`，打开 `http://localhost:8000`。

## GitHub Pages

在仓库 **Settings → Pages** 将 Source 设置为 **GitHub Actions**。推送到 `main` 后，`.github/workflows/pages.yml` 自动校验并部署静态文件；也可以在 Actions 页面选择该流程并点击 **Run workflow**。

发布地址：https://goldppx.github.io/Certificate-Health-Code/

## 判读规则

| 颜色 | 条件 |
| --- | --- |
| 红 | 至少一个风险测试端点连接成功 |
| 黄 | 请求超时、参考主页无法访问，或检测尚在进行 |
| 绿 | 12 个风险端点均未连通，参考主页可达 |

网页脚本通常无法区分证书拦截、DNS 故障和网络阻断。代理可能影响连接路径。结果仅反映当前浏览器及网络环境，历史泄露和其他应用安全状况需另行调查。用户访问页面即会向第三方参考站发出请求，参考站及托管平台可能记录常规访问日志。

## 参考与依赖

- [原始检测站](https://emudhra.we-have-a-problem.com/)
- [Mozilla 事件记录](https://bugzilla.mozilla.org/show_bug.cgi?id=2083449)
- 本地 `qrcode.js` 来自 Kazuhiko Arase 的 [qrcode-generator](https://github.com/kazuhikoarase/qrcode-generator)，采用 MIT 许可，源文件保留版权声明。
