import{_ as e,o as n,c as a,a as s}from"./app-a6bbcd8f.js";const i={},l=s(`<div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Nginx 学习记录笔记
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="常用命令" tabindex="-1"><a class="header-anchor" href="#常用命令" aria-hidden="true">#</a> 常用命令</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ nginx
<span class="token comment"># 启动nginx</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ nginx <span class="token parameter variable">-c</span> confFile
<span class="token comment"># 指定配置文件启动nginx</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ nginx <span class="token parameter variable">-V</span>
<span class="token comment"># 查看nginx编译参数</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ nginx <span class="token parameter variable">-t</span>
<span class="token comment"># 测试配置文件是否正确</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ nginx <span class="token parameter variable">-s</span> quit
<span class="token comment"># 优雅地停止nginx</span>
$ nginx <span class="token parameter variable">-s</span> stop
<span class="token comment"># 快速停止nginx</span>
$ nginx <span class="token parameter variable">-s</span> reload
<span class="token comment"># 重新加载配置文件</span>
$ nginx <span class="token parameter variable">-s</span> reopen
<span class="token comment"># 重新打开日志文件</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,7),d=[l];function r(c,t){return n(),a("div",null,d)}const m=e(i,[["render",r],["__file","index.html.vue"]]);export{m as default};
