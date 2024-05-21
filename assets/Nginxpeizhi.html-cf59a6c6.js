import{_ as n,o as s,c as a,a as e}from"./app-a6bbcd8f.js";const i={},l=e(`<h2 id="常用配置" tabindex="-1"><a class="header-anchor" href="#常用配置" aria-hidden="true">#</a> 常用配置</h2><p>nginx配置文件位置，/usr/local/nginx/conf/nginx.conf</p><h2 id="配置文件结构" tabindex="-1"><a class="header-anchor" href="#配置文件结构" aria-hidden="true">#</a> 配置文件结构</h2><h3 id="全局块" tabindex="-1"><a class="header-anchor" href="#全局块" aria-hidden="true">#</a> 全局块</h3><p>设置一些影响Nginx服务器整体运行的配置。例如nginx服务器的用户组、nginx进程的pid路径、日志路径、配置文件引入、并发处理等</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>user admin admins<span class="token punctuation">;</span>
<span class="token comment"># 指定运行Nginx的用户或者用户组，默认为nobody nobody</span>
worker_processes  <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token comment"># 并发处理，允许生成的进程数，一般设置为CPU核心数-1，默认为1</span>
<span class="token comment"># cat /proc/cpuinfo | grep name | cut -f2 -d: | uniq -c</span>
pid /nginx/nginx.pid<span class="token punctuation">;</span>
<span class="token comment"># 指定pid文件的存放路径</span>
error_log /nginx/log/err.log debug<span class="token punctuation">;</span>
<span class="token comment"># 指定日志的路径和日志级别</span>
worker_rlimit_nofile <span class="token number">1024</span><span class="token punctuation">;</span>
<span class="token comment"># 单个进程可打开的文件数量</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="events块" tabindex="-1"><a class="header-anchor" href="#events块" aria-hidden="true">#</a> events块</h3><p>设置一些影响Nginx服务器与用户的网络配置。例如进程最大连接数、事件驱动模型处理连接、是否允许多个网络连接、开启多个网络连接序列化等</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>events <span class="token punctuation">{</span>
    accept_mutex on<span class="token punctuation">;</span>
    <span class="token comment"># 设置网络连接序列化，默认为on</span>
    multi_accept on<span class="token punctuation">;</span>
    <span class="token comment"># 设置一个进程可以同时接收多个网络请求，默认为off</span>
    use epoll<span class="token punctuation">;</span>
    <span class="token comment"># 指定使用那种网络IO模型</span>
    worker_connections  <span class="token number">1024</span><span class="token punctuation">;</span>
    <span class="token comment"># 客户端连接数，建议与单个进程可以打开的文件数量保持一致，默认512</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="http块" tabindex="-1"><a class="header-anchor" href="#http块" aria-hidden="true">#</a> http块</h3><p>配置最频繁的部分，代理、缓存、日志等绝大多数功能和三方模块的配置。 例如：文件引入、MIME-TYPE定义、日志定义、连接超时、单链接请求数等</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>http <span class="token punctuation">{</span>
    include mine.types<span class="token punctuation">;</span> 
    <span class="token comment"># 文件扩展名与文件类型映射表【可以引入其他配置文件】</span>
    default_type  application/octet-stream<span class="token punctuation">;</span>
    <span class="token comment"># 默认文件类型，默认为text/plain</span>
    access_log  off<span class="token punctuation">;</span>
    <span class="token comment"># 取消服务日志</span>
    log_format customFormat <span class="token string">&#39;format格式&#39;</span>
    <span class="token comment"># 日志格式</span>
    access_log /nginx/log/access_log customFormat<span class="token punctuation">;</span>
    <span class="token comment"># 自定义日志格式，默认值为combined</span>
    sendfile on<span class="token punctuation">;</span>
    <span class="token comment"># 允许sendfile【高效文件传输】方式传输文件，默认为off</span>
    sendfile_max_chunk 100k<span class="token punctuation">;</span>
    <span class="token comment"># 每个进程每次调用传输数量不能大于100k，默认为0（没有上限）</span>
    keepalive_timeout <span class="token number">65</span><span class="token punctuation">;</span>
    <span class="token comment"># 连接超时时间，默认75s</span>
    upstream myserver <span class="token punctuation">{</span>
    <span class="token comment"># myserver集群自定义名称，代理配置使用集群名称</span>
        server IP:port <span class="token assign-left variable">weight</span><span class="token operator">=</span>x<span class="token punctuation">;</span>
        server IP:port <span class="token assign-left variable">weight</span><span class="token operator">=</span>x<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment"># 负载请求</span>
    error_page <span class="token number">404</span>  https://www.ggboom.com/404.html<span class="token punctuation">;</span>
    <span class="token comment"># 错误页</span>
    open_log_file_cache <span class="token assign-left variable">max</span><span class="token operator">=</span><span class="token number">10240</span> <span class="token assign-left variable">inactive</span><span class="token operator">=</span>60s <span class="token assign-left variable">valid</span><span class="token operator">=</span>1m <span class="token assign-left variable">min_uses</span><span class="token operator">=</span><span class="token number">2</span><span class="token punctuation">;</span>
    <span class="token comment"># nginx日志缓存，降低日志IO</span>
    client_max_body_size 100m<span class="token punctuation">;</span>
    client_header_buffer_size 64k<span class="token punctuation">;</span>
    large_client_header_buffers <span class="token number">4</span> 4k<span class="token punctuation">;</span>
    <span class="token comment"># 限制客户端上传的文件大小100M</span>
    <span class="token function">gzip</span> on<span class="token punctuation">;</span>
    gzip_min_length 2k<span class="token punctuation">;</span>
    gzip_buffers <span class="token number">4</span> 64k<span class="token punctuation">;</span>
    gzip_comp_level <span class="token number">3</span><span class="token punctuation">;</span>
    gzip_vary on<span class="token punctuation">;</span>
    gzip_types text/plain application/x-javascript application/javascript application/css text/css application/xml application/json<span class="token punctuation">;</span>
    <span class="token comment"># 压缩配置</span>
    server_token off<span class="token punctuation">;</span>
    <span class="token comment"># 隐藏nginx版本信息</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="server块" tabindex="-1"><a class="header-anchor" href="#server块" aria-hidden="true">#</a> server块</h3><p>配置虚拟主机相关参数，一个http中可以存在多个server</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>server <span class="token punctuation">{</span>
  keepalive_requests <span class="token number">120</span><span class="token punctuation">;</span>
  <span class="token comment"># 单连接请求上限</span>
  listen <span class="token number">8080</span><span class="token punctuation">;</span>
  <span class="token comment"># 监听端口，Nginx代理服务端口（用户访问的端口）</span>
  server_name ggboom.com<span class="token punctuation">;</span>
  <span class="token comment"># 监听地址，Nginx服务器的域名或者IP地址</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="location" tabindex="-1"><a class="header-anchor" href="#location" aria-hidden="true">#</a> location</h3><p>配置请求路由，以及各种页面的处理</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 请求url过滤，支持正则匹配</span>
location /~*^.+$ <span class="token punctuation">{</span>
  root path<span class="token punctuation">;</span>
  <span class="token comment"># 根目录</span>
  index index.html<span class="token punctuation">;</span>
  <span class="token comment"># 默认访问页</span>
  proxy_pass http://myserver<span class="token punctuation">;</span>
  <span class="token comment"># 路由转向myserver，集群需要使用自定义的集群名称</span>
  deny <span class="token number">127.0</span>.0.1<span class="token punctuation">;</span>
  <span class="token comment"># 拒绝访问的IP</span>
  allow <span class="token number">192.168</span>.1.100<span class="token punctuation">;</span>
  <span class="token comment"># 允许访问的IP</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,18),c=[l];function t(p,o){return s(),a("div",null,c)}const r=n(i,[["render",t],["__file","Nginxpeizhi.html.vue"]]);export{r as default};
