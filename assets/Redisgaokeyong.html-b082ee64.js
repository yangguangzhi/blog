import{_ as n,o as i,c as a,a as s,b as e}from"./app-a6bbcd8f.js";const l={},d=s(`<h2 id="redis主从复制" tabindex="-1"><a class="header-anchor" href="#redis主从复制" aria-hidden="true">#</a> Redis主从复制</h2><p>主从复制，主机数据更新后根据一定的配置策略，同步到从服务器上。master/slaver机制，master以写为主，slaver以读为主</p><ul><li>读写分离，性能扩展</li><li>容灾快速恢复</li></ul><h3 id="步骤" tabindex="-1"><a class="header-anchor" href="#步骤" aria-hidden="true">#</a> 步骤</h3><ol><li>拷贝多个Redis.conf，配置一主（写）两从（读）</li></ol><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 1</span>
include /redis/redis.conf
pidfile /var/run/redis_6379.pid
<span class="token comment"># pid文件名</span>
port <span class="token number">6379</span>
<span class="token comment"># 启动端口</span>
dbfilename dump6379.rdb

<span class="token comment"># 2</span>
include /redis/redis.conf
pidfile /var/run/redis_6380.pid
<span class="token comment"># pid文件名</span>
port <span class="token number">6380</span>
<span class="token comment"># 启动端口</span>
dbfilename dump6380.rdb

<span class="token comment"># 3</span>
include /redis/redis.conf
pidfile /var/run/redis_6381.pid
<span class="token comment"># pid文件名</span>
port <span class="token number">6381</span>
<span class="token comment"># 启动端口</span>
dbfilename dump6381.rdb
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li>关闭aof 或者在对应配置文件上加上aof配置</li><li>启动三个服务并查看状态（info replication）</li></ol><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ redis-server redis6379.conf
$ redis-server redis6380.conf
$ redis-server redis6381.conf
$ info replication
<span class="token comment"># redis终端指令</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="4"><li>在从节点的终端上执行slaveof masterIp masterPort</li></ol>`,9),r=e("div",{class:"custom-container tip"},[e("svg",{xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 24 24"},[e("g",{fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"},[e("circle",{cx:"12",cy:"12",r:"9"}),e("path",{d:"M12 8h.01"}),e("path",{d:"M11 12h1v4h1"})])]),e("p",{class:"custom-container-title"},"TIP"),e("ul",null,[e("li",null,"在主机上写，从机上读"),e("li",null,"在从机上写会报错(error) READDNLY You can't write against a read only slave."),e("li",null,"从机挂掉之后需要重新和主机构建主从关系（即slaveof）")])],-1),c=s(`<h3 id="三种模式" tabindex="-1"><a class="header-anchor" href="#三种模式" aria-hidden="true">#</a> 三种模式</h3><ul><li>一主二仆 <ul><li>主机挂掉之后，从机并不会成为主机</li><li>从机上不能进行写操作</li></ul></li><li>薪火相传 <ul><li>上一台从机可以是下一台从机的主机</li><li>有效减轻主机压力</li><li>某一个从机宕机，后续从机无法备份</li><li>主机挂掉，从机就无法写入数据</li></ul></li><li>slaveof no one（反客为主） 当一个master宕机之后，后面的slave可以立刻升为master，后面的slave不用做任何修改。使用命令[slave of one]将从机变成主机</li></ul><h3 id="哨兵模式" tabindex="-1"><a class="header-anchor" href="#哨兵模式" aria-hidden="true">#</a> 哨兵模式</h3><p>哨兵模式是，反客为主的自动版，能够后台监控主机状态，如果发生故障会根据选举策略自动将从库转换为主库</p><ol><li>首先调整为一主两仆</li><li>在/redis/下新增sentinel.conf文件</li><li>配置</li></ol><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>sentinel monitor mymaster <span class="token number">127.0</span>.0.1 <span class="token number">6379</span> <span class="token number">1</span>
<span class="token comment"># mymaster，为监控对象起的服务器名</span>
<span class="token comment"># 1，为至少1个哨兵同意转换的数量</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="4"><li>启动哨兵[redis-sentinel /redis/sentinel.conf]</li><li>主机挂掉，从机产生新的主机</li></ol><h3 id="复制的原理" tabindex="-1"><a class="header-anchor" href="#复制的原理" aria-hidden="true">#</a> 复制的原理</h3><ul><li>slave启动连接到master会发送一个sync命令</li><li>master接到命令，启动后台的存盘进程，同时收集所有接收到用于修改数据的命令， 在后台进程执行完毕之后，master将传输整个数据文件到slave，完成一次完全同步</li><li>全量复制，在slave接收到RDB文件之后，将其存盘并加载到内存中</li><li>增量复制，master继续将所有收集到的修改命令依次传给slave，完成同步，但是只要重新连接到master，会自动执行一次全量复制</li></ul><h2 id="redis集群" tabindex="-1"><a class="header-anchor" href="#redis集群" aria-hidden="true">#</a> Redis集群</h2><h3 id="步骤-1" tabindex="-1"><a class="header-anchor" href="#步骤-1" aria-hidden="true">#</a> 步骤</h3><ol><li>集群模式配置</li></ol><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>cluster-enabled <span class="token function">yes</span>
<span class="token comment"># 开启集群模式</span>
cluster-require-full-coverage <span class="token function">yes</span>
<span class="token comment"># yes 一个主从挂掉整个服务挂掉，no 只是该节点的插槽不能使用</span>
cluster-config-file nodes-6379.conf
<span class="token comment"># 节点配置的文件名</span>
cluster-node-timeout <span class="token number">15000</span>
<span class="token comment"># 心跳检测，如果节点失联超过该时间，集群会自动进行主从切换</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li>复制6份cluster服务配置，并启动</li><li>链接集群状态</li></ol><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ redis-cli <span class="token parameter variable">--cluster</span> <span class="token parameter variable">--create</span> --cluster-replicas <span class="token number">1</span> Ip:port
<span class="token comment"># 数字1代表最简单的集群，一主一从</span>
$ redis-cli <span class="token parameter variable">-c</span> <span class="token parameter variable">-p</span> xxx
<span class="token comment"># 集群模式连接</span>
$ cluster nodes
<span class="token comment"># 查看集群节点信息</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,15),t=[d,r,c];function o(m,v){return i(),a("div",null,t)}const p=n(l,[["render",o],["__file","Redisgaokeyong.html.vue"]]);export{p as default};
