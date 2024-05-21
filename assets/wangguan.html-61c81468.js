import{_ as n,o as a,c as s,a as e}from"./app-a6bbcd8f.js";const t={},p=e(`<h2 id="gateway" tabindex="-1"><a class="header-anchor" href="#gateway" aria-hidden="true">#</a> Gateway</h2><h3 id="核心概念" tabindex="-1"><a class="header-anchor" href="#核心概念" aria-hidden="true">#</a> 核心概念</h3><ol><li>Route（路由），网关基本构成部分，由ID和、目标URI、谓词集合和过滤器集合定义。断言为true则匹配该路由</li><li>Predicate（断言），Java8 Function谓语，输入类型是SpringFrameworkServerWebExchange。 这使得可以匹配Http请求中的所有内容（表头或参数）。</li><li>Filter（过滤器），SpringFrameworkGateway实例。可以在给下游请求之前/后修改请求/响应。</li></ol><h3 id="依赖" tabindex="-1"><a class="header-anchor" href="#依赖" aria-hidden="true">#</a> 依赖</h3><div class="language-xml line-numbers-mode" data-ext="xml"><pre class="language-xml"><code><span class="token comment">&lt;!-- 注意不要添加 web的依赖，与gateway里的web flux冲突 --&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>org.springframework.cloud<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>spring-cloud-starter-gateway<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="yaml配置" tabindex="-1"><a class="header-anchor" href="#yaml配置" aria-hidden="true">#</a> yaml配置</h3><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">server</span><span class="token punctuation">:</span>
  <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">9527</span>
<span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token key atrule">application</span><span class="token punctuation">:</span>
    <span class="token key atrule">name</span><span class="token punctuation">:</span> cloud<span class="token punctuation">-</span>gateway
<span class="token key atrule">eureka</span><span class="token punctuation">:</span>
  <span class="token key atrule">instance</span><span class="token punctuation">:</span>
    <span class="token key atrule">hostname</span><span class="token punctuation">:</span> cloud<span class="token punctuation">-</span>gateway<span class="token punctuation">-</span>service
  <span class="token key atrule">client</span><span class="token punctuation">:</span>
    <span class="token key atrule">service-url</span><span class="token punctuation">:</span>
       <span class="token key atrule">register-with-eureka</span><span class="token punctuation">:</span>  <span class="token boolean important">true</span>
       <span class="token key atrule">fetch-registry</span><span class="token punctuation">:</span>  <span class="token boolean important">true</span>
       <span class="token key atrule">defaultZone</span><span class="token punctuation">:</span> http<span class="token punctuation">:</span>//eureka7001.com<span class="token punctuation">:</span>7001/eureka
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="开启服务发现" tabindex="-1"><a class="header-anchor" href="#开启服务发现" aria-hidden="true">#</a> 开启服务发现</h3><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@SpringBootApplication</span>
<span class="token annotation punctuation">@EnableDiscoveryClient</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Gateway9527</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">SpringApplication</span><span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token class-name">Gateway9527</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> args<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="配置文件配置路由" tabindex="-1"><a class="header-anchor" href="#配置文件配置路由" aria-hidden="true">#</a> 配置文件配置路由</h3><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code>spring<span class="token operator">:</span>
  application<span class="token operator">:</span>
    name<span class="token operator">:</span> cloud<span class="token operator">-</span>gateway
  cloud<span class="token operator">:</span>
    gateway<span class="token operator">:</span>
      routes<span class="token operator">:</span> # 可以配置多个路由
        <span class="token operator">-</span> id<span class="token operator">:</span> payment_routh # 路由id，没有固定规则但要求唯一
          uri<span class="token operator">:</span>  http<span class="token operator">:</span><span class="token operator">/</span><span class="token operator">/</span>localhost<span class="token operator">:</span><span class="token number">8001</span> # 匹配后提供服务的路由地址
          predicates<span class="token operator">:</span>
            <span class="token operator">-</span> <span class="token class-name">Path</span><span class="token operator">=</span><span class="token operator">/</span>payment<span class="token operator">/</span>get<span class="token doc-comment comment">/** # 路径相匹配的进行路由
        - id: payment_routh2 # 路由id，没有
          uri:  http://localhost:8001 # 匹配后提供服务的路由地址
          predicates:
            - Path=/payment/payment # 路径相匹配的进行路由
</span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>配置之后可以通过localhost:9527/payment/get/11 访问8001的资源</p><h3 id="动态负载路由配置" tabindex="-1"><a class="header-anchor" href="#动态负载路由配置" aria-hidden="true">#</a> 动态负载路由配置</h3><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">server</span><span class="token punctuation">:</span>
  <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">9527</span>
<span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token key atrule">application</span><span class="token punctuation">:</span>
    <span class="token key atrule">name</span><span class="token punctuation">:</span> cloud<span class="token punctuation">-</span>gateway
  <span class="token key atrule">cloud</span><span class="token punctuation">:</span>
    <span class="token key atrule">gateway</span><span class="token punctuation">:</span>
      <span class="token key atrule">discovery</span><span class="token punctuation">:</span>
        <span class="token key atrule">locator</span><span class="token punctuation">:</span>
          <span class="token key atrule">enabled</span><span class="token punctuation">:</span> <span class="token boolean important">true</span> <span class="token comment"># 1.开启从服务在注册中心动态创建路由的功能</span>
      <span class="token key atrule">routes</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">id</span><span class="token punctuation">:</span> payment_routh
<span class="token comment">#          uri:  http://localhost:8001 # 匹配后提供服务的路由地址</span>
          <span class="token key atrule">uri</span><span class="token punctuation">:</span>  lb<span class="token punctuation">:</span>//cloud<span class="token punctuation">-</span>payment<span class="token punctuation">-</span>service <span class="token comment"># 2.输入服务名，lb代表负载均衡</span>
          <span class="token key atrule">predicates</span><span class="token punctuation">:</span>
            <span class="token punctuation">-</span> Path=/payment/get/<span class="token important">**</span> 

        <span class="token punctuation">-</span> <span class="token key atrule">id</span><span class="token punctuation">:</span> payment_routh2 
<span class="token comment">#          uri:  http://localhost:8001 # 匹配后提供服务的路由地址</span>
          <span class="token key atrule">uri</span><span class="token punctuation">:</span>  lb<span class="token punctuation">:</span>//cloud<span class="token punctuation">-</span>payment<span class="token punctuation">-</span>service <span class="token comment"># 2.输入服务名，lb代表负载均衡</span>
          <span class="token key atrule">predicates</span><span class="token punctuation">:</span>
            <span class="token punctuation">-</span> Path=/payment/create 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="配置类配置路由" tabindex="-1"><a class="header-anchor" href="#配置类配置路由" aria-hidden="true">#</a> 配置类配置路由</h3><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@Configuration</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">GateWayConfig</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Bean</span>
    <span class="token keyword">public</span> <span class="token class-name">RouteLocator</span> <span class="token function">routeLocator</span><span class="token punctuation">(</span><span class="token class-name">RouteLocatorBuilder</span> routeLocatorBuilder<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token class-name">RouteLocatorBuilder<span class="token punctuation">.</span>Builder</span>  routes <span class="token operator">=</span> routeLocatorBuilder<span class="token punctuation">.</span><span class="token function">routes</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">/*
        * 代表访问http://localhost:9527/guonei
        * 跳转到http://news.baidu.com/guonei
        * */</span>
        routes<span class="token punctuation">.</span><span class="token function">route</span><span class="token punctuation">(</span><span class="token string">&quot;route1&quot;</span><span class="token punctuation">,</span>
                r<span class="token operator">-&gt;</span>r<span class="token punctuation">.</span><span class="token function">path</span><span class="token punctuation">(</span><span class="token string">&quot;/guonei&quot;</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">uri</span><span class="token punctuation">(</span><span class="token string">&quot;http://news.baidu.com/guonei&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> routes<span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,16),l=[p];function c(o,i){return a(),s("div",null,l)}const r=n(t,[["render",c],["__file","wangguan.html.vue"]]);export{r as default};
