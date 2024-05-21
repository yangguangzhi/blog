import{_ as s,o as e,c as a,a as n}from"./app-a6bbcd8f.js";const i={},l=n(`<h2 id="环境准备" tabindex="-1"><a class="header-anchor" href="#环境准备" aria-hidden="true">#</a> 环境准备</h2><ol><li>预备gcc（c环境）</li></ol><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 检测环境</span>
<span class="token comment"># gcc --version</span>
$ yum <span class="token parameter variable">-y</span> <span class="token function">install</span> gcc
$ yum <span class="token parameter variable">-y</span> <span class="token function">install</span> gcc-c++
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li>卸载旧版本</li></ol><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">sudo</span> yum remove docker*
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="安装" tabindex="-1"><a class="header-anchor" href="#安装" aria-hidden="true">#</a> 安装</h2><ol><li>安装yum软件包</li></ol><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">sudo</span> yum <span class="token function">install</span> <span class="token parameter variable">-y</span> yum-utils
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="2"><li>设置yum docker镜像仓库</li></ol><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">sudo</span> yum-config-manager <span class="token punctuation">\\</span>
  --add-repo <span class="token punctuation">\\</span>
  http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3"><li>查看当前镜像源中支持的docker版本</li></ol><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ yum list docker-ce <span class="token parameter variable">--showduplicates</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="4"><li>安装特定版本的docker-ce</li></ol><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 必须指定--setopt=obsoletes=0，否则yum会自动安装更高版本</span>
$ yum <span class="token function">install</span> <span class="token parameter variable">--setopt</span><span class="token operator">=</span>obsoletes<span class="token operator">=</span><span class="token number">0</span> docker-ce-20.10.7 docker-ce-cli-20.10.7  containerd.io-1.4.6 <span class="token parameter variable">-y</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ol start="5"><li>添加镜像加速</li></ol><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># Docker在默认情况下使用的Cgroup Driver为cgroupfs，而kubernetes推荐使用systemd来代替cgroupfs</span>
$ <span class="token function">mkdir</span> /etc/docker
$ <span class="token function">tee</span> <span class="token operator">&lt;</span> /etc/docker/daemon.json <span class="token operator">&lt;&lt;-</span><span class="token string">&#39;EOF&#39;
{
    &quot;exec-opts&quot;: [&quot;native.cgroupdriver=systemd&quot;],
    &quot;registry-mirrors&quot;: [&quot;https://614v4wgf.mirror.aliyuncs.com&quot;]
}
EOF</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="6"><li>启动docker</li></ol><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ systemctl daemon-reload
$ systemctl restart <span class="token function">docker</span>
$ systemctl <span class="token builtin class-name">enable</span> <span class="token function">docker</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="7"><li>检查docker状态和版本</li></ol><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">docker</span> version
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,20),c=[l];function d(r,o){return e(),a("div",null,c)}const u=s(i,[["render",d],["__file","dockeranzhuang.html.vue"]]);export{u as default};
