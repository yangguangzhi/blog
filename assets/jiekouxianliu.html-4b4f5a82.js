import{_ as n,o as s,c as a,a as t}from"./app-a6bbcd8f.js";const e={},p=t(`<p>接口限流的作用是防止服务器被过多的请求压垮，从而保证服务器的稳定性和可靠性。 在高并发场景下，如果没有接口限流，可能会导致服务器崩溃，进而影响整个系统的稳定性。</p><h2 id="自定义限流注解" tabindex="-1"><a class="header-anchor" href="#自定义限流注解" aria-hidden="true">#</a> 自定义限流注解</h2><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@Retention</span><span class="token punctuation">(</span><span class="token class-name">RetentionPolicy</span><span class="token punctuation">.</span><span class="token constant">RUNTIME</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@Target</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token class-name">ElementType</span><span class="token punctuation">.</span><span class="token constant">METHOD</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@Documented</span>
<span class="token keyword">public</span> <span class="token annotation punctuation">@interface</span> <span class="token class-name">InterfaceLimit</span> <span class="token punctuation">{</span>
    <span class="token doc-comment comment">/**
     * 资源的key,唯一，不写代表使用类名+方法名
     * 作用：不同的接口，不同的流量控制
     */</span>
    <span class="token class-name">String</span> <span class="token function">key</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">default</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 在expire时间内， 访问限制次数
     */</span>
    <span class="token keyword">long</span> <span class="token function">permitsPerSecond</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">default</span> <span class="token number">2</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 过期时间也可以理解为单位时间，单位秒
     */</span>
    <span class="token keyword">long</span> <span class="token function">expire</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">default</span> <span class="token number">60</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 限流提示语
     */</span>
    <span class="token class-name">String</span> <span class="token function">msg</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">default</span> <span class="token string">&quot;系统繁忙,请稍后再试.&quot;</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="切面限流逻辑" tabindex="-1"><a class="header-anchor" href="#切面限流逻辑" aria-hidden="true">#</a> 切面限流逻辑</h2><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@Slf4j</span>
<span class="token annotation punctuation">@Aspect</span>
<span class="token annotation punctuation">@Component</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">LimitAspect</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Autowired</span>
    <span class="token keyword">private</span> <span class="token class-name">StringRedisTemplate</span> redisTemplate<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Pointcut</span><span class="token punctuation">(</span><span class="token string">&quot;@annotation(com.**.InterfaceLimit)&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token keyword">void</span> <span class="token function">check</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

    <span class="token punctuation">}</span>

    <span class="token keyword">private</span> <span class="token class-name">DefaultRedisScript</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Long</span><span class="token punctuation">&gt;</span></span> redisScript<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@PostConstruct</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">init</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        redisScript <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">DefaultRedisScript</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        redisScript<span class="token punctuation">.</span><span class="token function">setResultType</span><span class="token punctuation">(</span><span class="token class-name">Long</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        redisScript<span class="token punctuation">.</span><span class="token function">setScriptSource</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">ResourceScriptSource</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">ClassPathResource</span><span class="token punctuation">(</span><span class="token string">&quot;rateLimiter.lua&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Before</span><span class="token punctuation">(</span><span class="token string">&quot;check()&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">before</span><span class="token punctuation">(</span><span class="token class-name">JoinPoint</span> joinPoint<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">MethodSignature</span> signature <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">MethodSignature</span><span class="token punctuation">)</span> joinPoint<span class="token punctuation">.</span><span class="token function">getSignature</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Method</span> method <span class="token operator">=</span> signature<span class="token punctuation">.</span><span class="token function">getMethod</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">InterfaceLimit</span> redisLimit <span class="token operator">=</span> method<span class="token punctuation">.</span><span class="token function">getAnnotation</span><span class="token punctuation">(</span><span class="token class-name">InterfaceLimit</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">if</span> <span class="token punctuation">(</span>redisLimit <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">String</span> key <span class="token operator">=</span> redisLimit<span class="token punctuation">.</span><span class="token function">key</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token class-name">StringUtils</span><span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token class-name">String</span> className <span class="token operator">=</span> method<span class="token punctuation">.</span><span class="token function">getDeclaringClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token class-name">String</span> name <span class="token operator">=</span> method<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                key <span class="token operator">=</span> className <span class="token operator">+</span> name<span class="token punctuation">;</span>
            <span class="token punctuation">}</span>

            <span class="token keyword">long</span> limit <span class="token operator">=</span> redisLimit<span class="token punctuation">.</span><span class="token function">permitsPerSecond</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token keyword">long</span> expire <span class="token operator">=</span> redisLimit<span class="token punctuation">.</span><span class="token function">expire</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span> keys <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            keys<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token class-name">Long</span> count <span class="token operator">=</span> redisTemplate<span class="token punctuation">.</span><span class="token function">execute</span><span class="token punctuation">(</span>redisScript<span class="token punctuation">,</span> keys<span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">.</span><span class="token function">valueOf</span><span class="token punctuation">(</span>limit<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">.</span><span class="token function">valueOf</span><span class="token punctuation">(</span>expire<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token keyword">if</span> <span class="token punctuation">(</span>count <span class="token operator">!=</span> <span class="token keyword">null</span> <span class="token operator">&amp;&amp;</span> count <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">ServiceException</span><span class="token punctuation">(</span><span class="token string">&quot;500&quot;</span><span class="token punctuation">,</span> redisLimit<span class="token punctuation">.</span><span class="token function">msg</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>

    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="限流lua脚本" tabindex="-1"><a class="header-anchor" href="#限流lua脚本" aria-hidden="true">#</a> 限流Lua脚本</h2><div class="language-Lua line-numbers-mode" data-ext="Lua"><pre class="language-Lua"><code>--获取KEY
local key = KEYS[1]

local limit = tonumber(ARGV[1])

local currentLimit = tonumber(redis.call(&#39;get&#39;, key) or &quot;0&quot;)

if currentLimit + 1 &gt; limit
    then return 0
else
    -- 自增长 1
    redis.call(&#39;INCRBY&#39;, key, 1)
    -- 设置过期时间
    redis.call(&#39;EXPIRE&#39;, key, ARGV[2])
    return currentLimit + 1
end
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,7),c=[p];function o(i,l){return s(),a("div",null,c)}const k=n(e,[["render",o],["__file","jiekouxianliu.html.vue"]]);export{k as default};
