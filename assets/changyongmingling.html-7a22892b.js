import{_ as n,o as s,c as a,a as e}from"./app-a6bbcd8f.js";const i={},l=e(`<h2 id="帮助命令" tabindex="-1"><a class="header-anchor" href="#帮助命令" aria-hidden="true">#</a> 帮助命令</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">docker</span> version
<span class="token comment"># 显示 Docker 的版本信息，包括 Docker client 和 Docker server 的版本。</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">docker</span> info
<span class="token comment"># 显示 Docker 的系统级信息，包括内核版本、镜像数量、容器数量等。</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">docker</span> <span class="token builtin class-name">help</span>
<span class="token comment"># 显示 Docker 的命令行界面帮助信息，包括每个命令的简要说明和用法示例。</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="镜像管理" tabindex="-1"><a class="header-anchor" href="#镜像管理" aria-hidden="true">#</a> 镜像管理</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">docker</span> images <span class="token punctuation">[</span>options<span class="token punctuation">]</span>
<span class="token comment"># 列出本地主机上的所有镜像</span>
<span class="token comment">#options</span>
<span class="token comment">#   -a，列出本地所有镜像（包含中间映像层）</span>
<span class="token comment">#   -q，只显示镜像ID</span>
<span class="token comment">#   --digests，显示镜像的摘要信息</span>
<span class="token comment">#   --no-trunc，显示完整的镜像信息</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">docker</span> search <span class="token punctuation">[</span>options<span class="token punctuation">]</span> 镜像名    
<span class="token comment"># 搜索某个镜像</span>
<span class="token comment">#options</span>
<span class="token comment">#   -s num，点赞数大于num 的镜像</span>
<span class="token comment">#   --no-trunc，显示完整的镜像描述</span>
<span class="token comment">#   --automated，只列出automated build 类型的镜像</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">docker</span> pull 镜像名 <span class="token punctuation">[</span>:tag<span class="token punctuation">]</span>
<span class="token comment"># 下载镜像</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">docker</span> rmi <span class="token punctuation">[</span>镜像名 <span class="token punctuation">[</span>:tag<span class="token punctuation">]</span> <span class="token punctuation">..</span>.<span class="token punctuation">]</span>
<span class="token comment"># 删除镜像</span>
<span class="token comment"># docker rmi -f $(docker image -qa)    #删除全部</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">docker</span> tag <span class="token punctuation">[</span>oldName:tag<span class="token punctuation">]</span> <span class="token punctuation">[</span>newName:tag<span class="token punctuation">]</span>
<span class="token comment"># 修改镜像名称</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="容器管理" tabindex="-1"><a class="header-anchor" href="#容器管理" aria-hidden="true">#</a> 容器管理</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">docker</span> create image
<span class="token comment"># 新建启动容器【仅创建，不运行】</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">docker</span> start IMAGE/CONTAINER_ID
<span class="token comment"># 启动容器</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">docker</span> stop IMAGE/CONTAINER_ID
<span class="token comment"># 关闭容器</span>
$ <span class="token function">docker</span> <span class="token function">kill</span> IMAGE/CONTAINER_ID 
<span class="token comment"># 强制关闭</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">docker</span> restart IMAGE/CONTAINER_ID
<span class="token comment"># 重启容器</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">docker</span> run <span class="token punctuation">[</span>options<span class="token punctuation">]</span> image <span class="token punctuation">[</span>command<span class="token punctuation">]</span> <span class="token punctuation">[</span>arg<span class="token punctuation">..</span>.<span class="token punctuation">]</span>    
<span class="token comment"># 新建启动容器</span>
<span class="token comment"># options</span>
<span class="token comment">#   --name=&quot;容器新名字&quot;，为容器指定一个名称</span>
<span class="token comment">#   -d，后台运行容器，并返回容器ID</span>
<span class="token comment">#   -e，设置环境变量</span>
<span class="token comment">#   -w，指定工作目录</span>
<span class="token comment">#   -i，以交互式运行容器，通常与-t 同时使用</span>
<span class="token comment">#   -t，为容器重新分配一个伪输入终端</span>
<span class="token comment">#   -v，指定volume    befote:docker volume create test1</span>
<span class="token comment">#   -P，随机端口映射</span>
<span class="token comment">#   -p，指定端口映射，有四种形式</span>
<span class="token comment">#       ip:hostPort:containerPort</span>
<span class="token comment">#       ip:containerPort</span>
<span class="token comment">#       hostPort:containerPort</span>
<span class="token comment">#       containerPort</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">docker</span> <span class="token parameter variable">-ps</span> <span class="token punctuation">[</span>options<span class="token punctuation">]</span>
<span class="token comment"># 列出当前正在运行的容器</span>
<span class="token comment"># options</span>
<span class="token comment">#   -a，列出当前正在运行的容器+历史上运行过的容器</span>
<span class="token comment">#   -l，显示最近创建的容器</span>
<span class="token comment">#   -n num，显示最近num 个创建的容器</span>
<span class="token comment">#   -q，静默模式，只显示容器编号</span>
<span class="token comment">#   --no-trunc，完整输出容器信息</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">docker</span> logs <span class="token punctuation">[</span>Options<span class="token punctuation">]</span>  CONTAINER_ID
<span class="token comment"># 查看容器日志</span>
<span class="token comment"># options</span>
<span class="token comment">#   -f，跟随时间不断最新日志</span>
<span class="token comment">#   -t ，加上时间戳</span>
<span class="token comment">#   --tail num，只看倒数num 行</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">docker</span> <span class="token function">top</span> CONTAINER_ID
<span class="token comment"># 查看容器内运行线程</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">docker</span> port CONTAINER_ID
<span class="token comment"># 查看容器端口映射</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">docker</span> stats CONTAINER_ID
<span class="token comment"># 查看容器资源使用情况</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">docker</span> inspect CONTAINER_ID
<span class="token comment"># 查看容器内部细节</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">docker</span> <span class="token builtin class-name">exec</span> <span class="token parameter variable">-it</span> CONTAINER_ID <span class="token punctuation">[</span>BashShell<span class="token punctuation">]</span>
<span class="token comment"># 进入容器</span>
<span class="token comment"># BashShell【不进入容器执行BashShell 命令】</span>
$ <span class="token function">docker</span> attach CONTAINER_ID    
<span class="token comment"># 进入容器，等价于docker exec -it CONTAINER_ID /bin/bash</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token builtin class-name">exit</span>
<span class="token comment"># 退出容器  “出门关灯”</span>
$ ctrl+p+q
<span class="token comment"># “出门留灯”</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">docker</span> <span class="token function">rm</span> CONTAINER_ID
<span class="token comment"># 删除容器</span>
$ <span class="token function">docker</span> <span class="token function">rm</span> <span class="token parameter variable">-f</span> <span class="token variable"><span class="token variable">$(</span><span class="token function">docker</span> <span class="token function">ps</span> <span class="token parameter variable">-qa</span><span class="token variable">)</span></span>    
<span class="token comment"># 删除已停止的容器</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">docker</span> <span class="token function">cp</span> CONTAINER_ID:容器文件路径 主机路径
<span class="token comment"># 容器和宿主机文件拷贝</span>
$ <span class="token function">docker</span> <span class="token function">cp</span> 主机路径 CONTAINER_ID:容器文件路径
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="数据卷管理" tabindex="-1"><a class="header-anchor" href="#数据卷管理" aria-hidden="true">#</a> 数据卷管理</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">docker</span> volume create valumeName
<span class="token comment"># 创建数据卷</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">docker</span> volume <span class="token function">ls</span>
<span class="token comment"># 查看数据卷列表</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">docker</span> volume inspect volumeName
<span class="token comment"># 查看数据卷详情</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">docker</span> volume <span class="token function">rm</span> volumeName
<span class="token comment"># 删除数据卷</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">docker</span> volume prune
<span class="token comment"># 删除所有无主的数据卷</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="dockerfile" tabindex="-1"><a class="header-anchor" href="#dockerfile" aria-hidden="true">#</a> DockerFile</h2><ul><li>FROM[baseImage] <ul><li>指定基础镜像【必须是DockerFile的第一条指令】</li></ul></li><li>ADD <ul><li>将宿主机文件拷贝到镜像中【可以是压缩文件，自动解压】</li></ul></li><li>COPY [--chown=&lt;user&gt;:&lt;group&gt; &lt;源路径&gt;... &lt;目标路径&gt;] <ul><li>将宿主机文件拷贝到镜像中</li></ul></li><li>WORKDIR <ul><li>设置工作目录</li></ul></li><li>ENV <ul><li>设置环境变量</li></ul></li><li>CMD <ul><li>容器启动时执行的命令</li></ul></li><li>VOLUME <ul><li>设置数据卷</li></ul></li></ul>`,34),c=[l];function d(t,o){return s(),a("div",null,c)}const r=n(i,[["render",d],["__file","changyongmingling.html.vue"]]);export{r as default};
