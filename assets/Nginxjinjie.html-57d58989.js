import{_ as n,o as s,c as a,a as e}from"./app-a6bbcd8f.js";const i={},t=e(`<h2 id="故障检测重试" tabindex="-1"><a class="header-anchor" href="#故障检测重试" aria-hidden="true">#</a> 故障检测重试</h2><h3 id="upstream" tabindex="-1"><a class="header-anchor" href="#upstream" aria-hidden="true">#</a> upstream</h3><p>upstream是nginx中的一个模块，用于配置负载均衡。 它可以根据不同的算法（如轮询、IP哈希、最少连接等）将请求分发到不同的后端服务器上，从而提高系统的可用性和性能。</p><ul><li>server：指定后端服务器的地址和端口号。</li><li>listen：指定后端服务器监听的端口号。</li><li>weight：指定后端服务器的权重，用于轮询算法中。</li><li>max_fails：指定允许的最大失败次数，如果超过这个次数，nginx将关闭连接。</li><li>fail_timeout：指定在多少次请求后，nginx将关闭连接。</li><li>backup：指定备份的服务器数量和负载均衡算法。</li><li>health_check：用于检测后端服务器的健康状态，可以指定一个HTTP或HTTPS URL作为健康检查接口。</li><li>ip_hash：使用客户端IP地址作为哈希键来进行负载均衡。</li><li>least_conn：选择连接数最少的服务器进行请求分发。</li><li>random：随机选择一个后端服务器进行请求分发。</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 轮询</span>
upstream <span class="token builtin class-name">test</span> <span class="token punctuation">{</span>
    server <span class="token number">127.0</span>.0.1:8081<span class="token punctuation">;</span>
    server <span class="token number">127.0</span>.0.1:8082<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment"># 权重</span>
upstream <span class="token builtin class-name">test</span> <span class="token punctuation">{</span>
    server <span class="token number">127.0</span>.0.1:8081 <span class="token assign-left variable">weight</span><span class="token operator">=</span><span class="token number">2</span><span class="token punctuation">;</span>
    server <span class="token number">127.0</span>.0.1:8082 <span class="token assign-left variable">weight</span><span class="token operator">=</span><span class="token number">3</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment"># ip_hash，根据来源IP和后端配置来做hash分配</span>
upstream <span class="token builtin class-name">test</span> <span class="token punctuation">{</span>
    ip_hash<span class="token punctuation">;</span>
    server <span class="token number">127.0</span>.0.1:8081<span class="token punctuation">;</span>
    server <span class="token number">127.0</span>.0.1:8082<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment"># fair，根据后端服务的响应时间来分配，需要安装Upstream Fair Balancer Module</span>
upstream <span class="token builtin class-name">test</span> <span class="token punctuation">{</span>
    server <span class="token number">127.0</span>.0.1:8081<span class="token punctuation">;</span>
    server <span class="token number">127.0</span>.0.1:8082<span class="token punctuation">;</span>
    fair<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment"># 自定义hash，根据给定的字符串进行Hash分配，需要安装Upstream Hash Module</span>
upstream <span class="token builtin class-name">test</span> <span class="token punctuation">{</span>
    server <span class="token number">127.0</span>.0.1:8081<span class="token punctuation">;</span>
    server <span class="token number">127.0</span>.0.1:8082<span class="token punctuation">;</span>
    <span class="token builtin class-name">hash</span> <span class="token variable">$request_uri</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="反向代理" tabindex="-1"><a class="header-anchor" href="#反向代理" aria-hidden="true">#</a> 反向代理</h2><ul><li>把二级域名映射到不同目录</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>http <span class="token punctuation">{</span>
    include       mime.types<span class="token punctuation">;</span>
    default_type  application/octet-stream<span class="token punctuation">;</span>
    sendfile        on<span class="token punctuation">;</span>
    keepalive_timeout  <span class="token number">65</span><span class="token punctuation">;</span>
    server <span class="token punctuation">{</span>
        listen       <span class="token number">80</span><span class="token punctuation">;</span>
        server_name  www.ggboom.com<span class="token punctuation">;</span>
        location / <span class="token punctuation">{</span>
            root   html/www<span class="token punctuation">;</span>
            index  index.html index.htm<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
   
    server <span class="token punctuation">{</span>
        listen       <span class="token number">80</span><span class="token punctuation">;</span>
        server_name  msg.ggboom.com<span class="token punctuation">;</span>
        location / <span class="token punctuation">{</span> 
            root   html/msg<span class="token punctuation">;</span>
            index  index.html index.htm<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>   
    <span class="token punctuation">}</span>   

    server <span class="token punctuation">{</span>
        listen       <span class="token number">80</span><span class="token punctuation">;</span>
        server_name  blog.ggboom.com<span class="token punctuation">;</span>
        location / <span class="token punctuation">{</span> 
            root   html/blog<span class="token punctuation">;</span>
            index  index.html index.htm<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>   
    <span class="token punctuation">}</span>   
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>二级域名（URL也可）映射到不同集群组</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>upstream serverGroup1 <span class="token punctuation">{</span>                    <span class="token comment"># 定义负载均衡设备的ip和状态</span>
        server <span class="token number">192.168</span>.1.100:8080 <span class="token punctuation">;</span>           <span class="token comment"># 默认权重值为一</span>
        server <span class="token number">192.168</span>.1.101:8082 <span class="token assign-left variable">weight</span><span class="token operator">=</span><span class="token number">2</span><span class="token punctuation">;</span>   <span class="token comment"># 值越高，负载的权重越高</span>
        server <span class="token number">192.168</span>.1.102:8083 <span class="token punctuation">;</span>       
        server <span class="token number">192.168</span>.1.103:8084 backup<span class="token punctuation">;</span>     <span class="token comment"># 当其他非backup状态的server 不能正常工作时，才请求该server，简称热备</span>
    <span class="token punctuation">}</span>

upstream serverGroup2 <span class="token punctuation">{</span>                    <span class="token comment"># 定义负载均衡设备的ip和状态</span>
        server <span class="token number">192.168</span>.1.110:8080 <span class="token punctuation">;</span>           <span class="token comment"># 默认权重值为一</span>
        server <span class="token number">192.168</span>.1.111:8080 <span class="token assign-left variable">weight</span><span class="token operator">=</span><span class="token number">2</span><span class="token punctuation">;</span>   <span class="token comment"># 值越高，负载的权重越高</span>
        server <span class="token number">192.168</span>.1.112:8080 <span class="token punctuation">;</span>
        server <span class="token number">192.168</span>.1.113:8080 backup<span class="token punctuation">;</span>     <span class="token comment"># 当其他非backup状态的server 不能正常工作时，才请求该server，简称热备</span>
    <span class="token punctuation">}</span>

server <span class="token punctuation">{</span>                                    <span class="token comment"># 设定虚拟主机配置</span>
    listen  <span class="token number">80</span><span class="token punctuation">;</span>                             <span class="token comment"># 监听的端口</span>
    server_name  picture.itdragon.com<span class="token punctuation">;</span>      <span class="token comment"># 监听的地址，多个域名用空格隔开</span>
    location /group1 <span class="token punctuation">{</span>                      <span class="token comment"># 默认请求 ，后面 &quot;/group1&quot; 表示开启反向代理，也可以是正则表达式</span>
       root     html<span class="token punctuation">;</span>                       <span class="token comment"># 监听地址的默认网站根目录位置</span>
       proxy_pass   http://serverGroup1<span class="token punctuation">;</span>   <span class="token comment"># 代理转发</span>
       index  index.html index.htm<span class="token punctuation">;</span>         <span class="token comment"># 欢迎页面</span>
       deny <span class="token number">127.0</span>.0.1<span class="token punctuation">;</span>                      <span class="token comment"># 拒绝的ip</span>
       allow <span class="token number">192.168</span>.1.133<span class="token punctuation">;</span>               <span class="token comment"># 允许的ip</span>
    <span class="token punctuation">}</span>
    location /group2 <span class="token punctuation">{</span>                      <span class="token comment"># 默认请求 ，后面 &quot;/group2&quot; 表示开启反向代理，也可以是正则表达式</span>
       root     html<span class="token punctuation">;</span>                       <span class="token comment"># 监听地址的默认网站根目录位置</span>
       proxy_pass   http://serverGroup2<span class="token punctuation">;</span>   <span class="token comment"># 代理转发</span>
       index  index.html index.htm<span class="token punctuation">;</span>         <span class="token comment"># 欢迎页面</span>
       deny <span class="token number">127.0</span>.0.1<span class="token punctuation">;</span>                      <span class="token comment"># 拒绝的ip</span>
       allow <span class="token number">192.168</span>.1.133<span class="token punctuation">;</span>               <span class="token comment"># 允许的ip</span>
    <span class="token punctuation">}</span>
    error_page   <span class="token number">500</span> <span class="token number">502</span> <span class="token number">503</span> <span class="token number">504</span>  /50x.html<span class="token punctuation">;</span><span class="token comment"># 定义错误提示页面     </span>
    location <span class="token operator">=</span> /50x.html <span class="token punctuation">{</span>                  <span class="token comment"># 配置错误提示页面</span>
        root   html<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="动静分离" tabindex="-1"><a class="header-anchor" href="#动静分离" aria-hidden="true">#</a> 动静分离</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>server<span class="token punctuation">{</span>
    listen        <span class="token number">80</span><span class="token punctuation">;</span>
    server_name IP<span class="token punctuation">;</span>
    location /api/<span class="token punctuation">{</span>
        proxy_pass  http://myserver<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    location /image/<span class="token punctuation">{</span>
        root        /data/<span class="token punctuation">;</span>
        autoindex        on<span class="token punctuation">;</span>    
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,12),l=[t];function p(c,o){return s(),a("div",null,l)}const r=n(i,[["render",p],["__file","Nginxjinjie.html.vue"]]);export{r as default};
