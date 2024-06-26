import{_ as n,o as a,c as s,a as e}from"./app-a6bbcd8f.js";const t={},p=e(`<p>服务发现与注册中有注册中心。服务器启动时，会把当前自己的服务器信息（通信地址、服务地址等）注册到注册中心。 另一方（服务消费者）可以在注册中心上获取实际的服务器通讯地址，然后再通过RPC调用其他服务。</p><h2 id="cap原则" tabindex="-1"><a class="header-anchor" href="#cap原则" aria-hidden="true">#</a> CAP原则</h2><ul><li>C（Consistency），一致性指“所有节点在同一时间具有相同的数据副本”。</li><li>A（Availability），可用性指“节点可以随时对客户端发起响应”。</li><li>P（Partition tolerance），分区容错性指“系统容忍任意数量的消息丢失或网络分区”。 三个要素最多只能同时实现两点，不可能三者兼顾。这是由于分布式系统的特性所导致的，例如网络延迟、节点故障等。</li></ul><h2 id="eureka" tabindex="-1"><a class="header-anchor" href="#eureka" aria-hidden="true">#</a> Eureka</h2><p>Eureka Server常作为服务注册服务器，他是服务注册中心。 系统中其他的微服务模块通过Eureka 客户端连接到Eureka Server并维持心跳连接。 系统维护人员可以通过Eureka Server来监控各个服务是否正常。</p><h3 id="单机eureka配置" tabindex="-1"><a class="header-anchor" href="#单机eureka配置" aria-hidden="true">#</a> 单机Eureka配置</h3><ul><li>依赖</li></ul><div class="language-xml line-numbers-mode" data-ext="xml"><pre class="language-xml"><code><span class="token comment">&lt;!--eureka-server--&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>org.springframework.cloud<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>spring-cloud-starter-netflix-eureka-server<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>yaml配置文件</li></ul><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">server</span><span class="token punctuation">:</span>
  <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">7001</span>
<span class="token key atrule">eureka</span><span class="token punctuation">:</span>
  <span class="token key atrule">instance</span><span class="token punctuation">:</span>
    <span class="token key atrule">instance-id</span><span class="token punctuation">:</span> xxx    <span class="token comment">#自定义主机名</span>
    <span class="token key atrule">prefer-ip-address</span><span class="token punctuation">:</span> <span class="token boolean important">true</span> <span class="token comment"># 设置暴露ip地址</span>
    <span class="token key atrule">hostname</span><span class="token punctuation">:</span> localhost <span class="token comment"># eureka服务端实例名称</span>
  <span class="token key atrule">client</span><span class="token punctuation">:</span>
    <span class="token comment">#false表示不向注册中心注册自己</span>
    <span class="token key atrule">register-with-eureka</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>
    <span class="token comment">#false表示自己就是注册中心，职责是维护服务实例，并不需要去检索服务</span>
    <span class="token key atrule">fetch-registry</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>
    <span class="token key atrule">service-url</span><span class="token punctuation">:</span>
      <span class="token comment"># 设置与 eureka server交互的地址查询服务和注册服务都需要依赖这个地址</span>
      <span class="token key atrule">defaultZone</span><span class="token punctuation">:</span>  http<span class="token punctuation">:</span>//$<span class="token punctuation">{</span>eureka.instance.hostname<span class="token punctuation">}</span><span class="token punctuation">:</span>$<span class="token punctuation">{</span>server.port<span class="token punctuation">}</span>/eureka/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>开启Eureka Server功能</li></ul><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@SpringBootApplication</span>
<span class="token comment">// 声明自己是 eureka 的服务端</span>
<span class="token annotation punctuation">@EnableEurekaServer</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">EurekaMain7001</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">SpringApplication</span><span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token class-name">EurekaMain7001</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span>args<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="集群eureka配置" tabindex="-1"><a class="header-anchor" href="#集群eureka配置" aria-hidden="true">#</a> 集群Eureka配置</h3><p>高可用，如果注册中心只有一个，出了故障就会导致整个服务环境不可用</p><ul><li>yml配置文件</li></ul><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token comment"># 主要就是修改service-url 使得集群内的注册中心互相守护</span>
<span class="token key atrule">server</span><span class="token punctuation">:</span>
  <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">7001</span>
<span class="token key atrule">eureka</span><span class="token punctuation">:</span>
  <span class="token key atrule">instance</span><span class="token punctuation">:</span>
    <span class="token comment">#服务端的实例名称</span>
    <span class="token key atrule">hostname</span><span class="token punctuation">:</span> eureka7001.com
  <span class="token key atrule">client</span><span class="token punctuation">:</span>
    <span class="token comment">#false表示不向服务注册中心注册自己</span>
    <span class="token key atrule">register-with-eureka</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>
    <span class="token comment">#false表示自己就是注册中心，职责就是维护服务实例，并不需要检索服务</span>
    <span class="token key atrule">fetch-registry</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>
    <span class="token key atrule">service-url</span><span class="token punctuation">:</span>
      <span class="token key atrule">defaultZone</span><span class="token punctuation">:</span> http<span class="token punctuation">:</span>//eureka7002.com<span class="token punctuation">:</span>7002/eureka
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="eureka注册" tabindex="-1"><a class="header-anchor" href="#eureka注册" aria-hidden="true">#</a> Eureka注册</h3><p>Eureka Client端注册到Eureka Server成为注册中心的服务节点</p><ul><li>依赖</li></ul><div class="language-xml line-numbers-mode" data-ext="xml"><pre class="language-xml"><code><span class="token comment">&lt;!--eureka-client--&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>org.springframework.cloud<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>spring-cloud-starter-netflix-eureka-client<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>yaml配置文件</li></ul><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">eureka</span><span class="token punctuation">:</span>
  <span class="token key atrule">client</span><span class="token punctuation">:</span>
    <span class="token comment">#表示是否将自己注册进EurekaServer默认为true</span>
    <span class="token key atrule">register-with-eureka</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
    <span class="token comment">#是否从EurekaServer抓取已有的注册信息，默认为true。单节点无所谓，集群必须设置为true才能配合ribbon使用 负载均衡</span>
    <span class="token key atrule">fetch-registry</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>
    <span class="token key atrule">service-url</span><span class="token punctuation">:</span>
      <span class="token comment"># 集群注册http://eureka7002.com:7002/eureka/,http://eureka7001.com:7001/eureka/</span>
      <span class="token key atrule">defaultZone</span><span class="token punctuation">:</span>  http<span class="token punctuation">:</span>//localhost<span class="token punctuation">:</span>7001/eureka
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>开启服务发现</li></ul><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@SpringBootApplication</span>
<span class="token comment">// 服务发现</span>
<span class="token annotation punctuation">@EnableDiscoveryClient</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ProviderMain8001</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">SpringApplication</span><span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token class-name">ProviderMain8001</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> args<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="nacos" tabindex="-1"><a class="header-anchor" href="#nacos" aria-hidden="true">#</a> Nacos</h2>`,25),l=[p];function c(i,o){return a(),s("div",null,l)}const r=n(t,[["render",c],["__file","zhucezhongxin.html.vue"]]);export{r as default};
