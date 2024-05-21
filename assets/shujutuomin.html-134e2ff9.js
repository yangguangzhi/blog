import{_ as n,o as s,c as a,a as t}from"./app-a6bbcd8f.js";const e={},p=t(`<p>数据脱敏是指在不影响数据分析结果的准确性前提下，对原始数据中的敏感字段进行处理，从而降低数据敏感度和减少个人隐私风险的技术措施。 具体效果上，主要是去标识化和匿名化。</p><ul><li>去标识化：是指通过对个人信息的技术处理，使得在不借助额外信息的情况下，无法识别个人信息主体。</li><li>匿名化：是指通过对个人信息的技术处理，使得在不借助额外信息的情况下，无法识别个人信息主体 。</li></ul><h2 id="自定义序列化注解" tabindex="-1"><a class="header-anchor" href="#自定义序列化注解" aria-hidden="true">#</a> 自定义序列化注解</h2><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@Retention</span><span class="token punctuation">(</span><span class="token class-name">RetentionPolicy</span><span class="token punctuation">.</span><span class="token constant">RUNTIME</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@Target</span><span class="token punctuation">(</span><span class="token class-name">ElementType</span><span class="token punctuation">.</span><span class="token constant">FIELD</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@JacksonAnnotationsInside</span>
<span class="token annotation punctuation">@JsonSerialize</span><span class="token punctuation">(</span>using <span class="token operator">=</span> <span class="token class-name">SensitiveJsonSerializer</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token annotation punctuation">@interface</span> <span class="token class-name">Sensitive</span> <span class="token punctuation">{</span>
    <span class="token doc-comment comment">/**
     * 脱敏策略
     */</span>
    <span class="token class-name">SensitiveStrategy</span> <span class="token function">strategy</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 排除角色（跳过脱敏）
     */</span>
    <span class="token class-name">String</span> <span class="token function">excludeRole</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">default</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="序列化策略" tabindex="-1"><a class="header-anchor" href="#序列化策略" aria-hidden="true">#</a> 序列化策略</h2><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">enum</span> <span class="token class-name">SensitiveStrategy</span> <span class="token punctuation">{</span>
    <span class="token doc-comment comment">/**
     * 用户名
     */</span>
    <span class="token function">USERNAME</span><span class="token punctuation">(</span><span class="token class-name">DesensitizedUtil</span><span class="token operator">::</span><span class="token function">chineseName</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token doc-comment comment">/**
     * 密码
     */</span>
    <span class="token function">PASSWORD</span><span class="token punctuation">(</span><span class="token class-name">DesensitizedUtil</span><span class="token operator">::</span><span class="token function">password</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token doc-comment comment">/**
     * 只显示第一位
     */</span>
    <span class="token function">FIRST_MASK</span><span class="token punctuation">(</span><span class="token class-name">DesensitizedUtil</span><span class="token operator">::</span><span class="token function">firstMask</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token doc-comment comment">/**
     * 身份证
     */</span>
    <span class="token function">ID_CARD</span><span class="token punctuation">(</span>s <span class="token operator">-&gt;</span> <span class="token class-name">DesensitizedUtil</span><span class="token punctuation">.</span><span class="token function">idCardNum</span><span class="token punctuation">(</span>s<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token doc-comment comment">/**
     * 车牌号
     */</span>
    <span class="token function">CAR_LICENSE</span><span class="token punctuation">(</span><span class="token class-name">DesensitizedUtil</span><span class="token operator">::</span><span class="token function">carLicense</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token doc-comment comment">/**
     * 手机号
     */</span>
    <span class="token function">PHONE</span><span class="token punctuation">(</span><span class="token class-name">DesensitizedUtil</span><span class="token operator">::</span><span class="token function">mobilePhone</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token doc-comment comment">/**
     * 固定电话
     */</span>
    <span class="token function">FIXED_PHONE</span><span class="token punctuation">(</span><span class="token class-name">DesensitizedUtil</span><span class="token operator">::</span><span class="token function">fixedPhone</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token doc-comment comment">/**
     * 电子邮箱
     */</span>
    <span class="token function">EMAIL</span><span class="token punctuation">(</span><span class="token class-name">DesensitizedUtil</span><span class="token operator">::</span><span class="token function">email</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token doc-comment comment">/**
     * 银行卡
     */</span>
    <span class="token function">BACK_CARD</span><span class="token punctuation">(</span><span class="token class-name">DesensitizedUtil</span><span class="token operator">::</span><span class="token function">bankCard</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token doc-comment comment">/**
     * 地址
     */</span>
    <span class="token function">ADDRESS</span><span class="token punctuation">(</span>s <span class="token operator">-&gt;</span> <span class="token class-name">DesensitizedUtil</span><span class="token punctuation">.</span><span class="token function">address</span><span class="token punctuation">(</span>s<span class="token punctuation">,</span> <span class="token number">8</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">Function</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">&gt;</span></span> desensitizer<span class="token punctuation">;</span>

    <span class="token class-name">SensitiveStrategy</span><span class="token punctuation">(</span><span class="token class-name">Function</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">&gt;</span></span> desensitizer<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>desensitizer <span class="token operator">=</span> desensitizer<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">Function</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">&gt;</span></span> <span class="token function">desensitizer</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> desensitizer<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="自定义序列化器" tabindex="-1"><a class="header-anchor" href="#自定义序列化器" aria-hidden="true">#</a> 自定义序列化器</h2><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SensitiveJsonSerializer</span> <span class="token keyword">extends</span> <span class="token class-name">JsonSerializer</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span> <span class="token keyword">implements</span> <span class="token class-name">ContextualSerializer</span> <span class="token punctuation">{</span>
    <span class="token doc-comment comment">/**
     * 策略
     */</span>
    <span class="token keyword">private</span> <span class="token class-name">SensitiveStrategy</span> strategy<span class="token punctuation">;</span>
    <span class="token doc-comment comment">/**
     * 排除角色
     */</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> roleName<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 根据策略序列化
     */</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">serialize</span><span class="token punctuation">(</span><span class="token class-name">String</span> value<span class="token punctuation">,</span> <span class="token class-name">JsonGenerator</span> generator<span class="token punctuation">,</span> <span class="token class-name">SerializerProvider</span> provider<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
        <span class="token class-name">LoginContext</span> context <span class="token operator">=</span> <span class="token class-name">LoginContextHolder</span><span class="token punctuation">.</span><span class="token function">getContext</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>context<span class="token punctuation">.</span><span class="token function">hasRole</span><span class="token punctuation">(</span>roleName<span class="token punctuation">)</span> <span class="token operator">||</span> context<span class="token punctuation">.</span><span class="token function">isSuperAdmin</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            generator<span class="token punctuation">.</span><span class="token function">writeString</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        generator<span class="token punctuation">.</span><span class="token function">writeString</span><span class="token punctuation">(</span>strategy<span class="token punctuation">.</span><span class="token function">desensitizer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 初始化序列化脱敏策略
     */</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">JsonSerializer</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span><span class="token punctuation">&gt;</span></span> <span class="token function">createContextual</span><span class="token punctuation">(</span><span class="token class-name">SerializerProvider</span> provider<span class="token punctuation">,</span> <span class="token class-name">BeanProperty</span> property<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">JsonMappingException</span> <span class="token punctuation">{</span>
        <span class="token class-name">Sensitive</span> sensitive <span class="token operator">=</span> property<span class="token punctuation">.</span><span class="token function">getAnnotation</span><span class="token punctuation">(</span><span class="token class-name">Sensitive</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token class-name">Objects</span><span class="token punctuation">.</span><span class="token function">nonNull</span><span class="token punctuation">(</span>sensitive<span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> <span class="token class-name">Objects</span><span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> property<span class="token punctuation">.</span><span class="token function">getType</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getRawClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>strategy <span class="token operator">=</span> sensitive<span class="token punctuation">.</span><span class="token function">strategy</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>roleName <span class="token operator">=</span> sensitive<span class="token punctuation">.</span><span class="token function">excludeRole</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> provider<span class="token punctuation">.</span><span class="token function">findValueSerializer</span><span class="token punctuation">(</span>property<span class="token punctuation">.</span><span class="token function">getType</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> property<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,8),c=[p];function o(i,l){return s(),a("div",null,c)}const k=n(e,[["render",o],["__file","shujutuomin.html.vue"]]);export{k as default};
