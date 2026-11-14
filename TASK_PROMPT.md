特效同学抱怨半透明叶片前后穿插，排序一抖就爆闪。仓库里留了个 WebGL2 加权混合 OIT（Weighted Blended Order-Independent Transparency）半成品，你补到能跑、测试全绿，禁止 Docker。

具体点：
1) 打开 index.html（npm start / python3 -m http.server 8822 --directory .）：左画布右参数；正常启动 #status=ready。
2) src/math/color.js：`premultiply(rgb, a)`；`wboitWeight(z, a, opts)`——按距离与 alpha 给加权混合权重（实现需满足测试单调性：更近或更高 alpha 权重大）。
3) src/math/wboit.js：`accumulate(prev, colorPremul, weight)` 累加 `sumColor` 与 `sumAlpha`；`composite(sumColor, sumAlpha, bg)` 按加权混合公式还原（除零要稳）。
4) src/renderer.js：双 Pass——Accumulate FBO（混合：one, one）+ Revealage；Composite 全屏三角；可调层数/透明度。
5) src/ui/controls.js：alpha / layerCount 滑杆，Capture PNG，#stats 写出 layers 与 weightPeak。
6) shader 放 src/shaders/。别改弱测试，原生 ESM。分文件短命令写，写完就 npm test，挂了再修到过。
