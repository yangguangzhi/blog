import{_ as n,o as s,c as a,a as t}from"./app-a6bbcd8f.js";const p={},e=t(`<h2 id="声明变量" tabindex="-1"><a class="header-anchor" href="#声明变量" aria-hidden="true">#</a> 声明变量</h2><p>var 变量名 变量类型 = 变量值</p><h2 id="示例" tabindex="-1"><a class="header-anchor" href="#示例" aria-hidden="true">#</a> 示例</h2><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span>
<span class="token comment">// 成员变量声明</span>
<span class="token keyword">var</span> hello <span class="token operator">=</span> <span class="token string">&quot;hello&quot;</span><span class="token punctuation">;</span>

<span class="token comment">// 常量声明【这里b c省略，等价于和a赋值相同】</span>
<span class="token keyword">const</span> <span class="token punctuation">(</span>
	a <span class="token operator">=</span> <span class="token number">3.141592654</span> <span class="token comment">// 3.141592654</span>
	b               <span class="token comment">// 3.141592654</span>
	c               <span class="token comment">// 3.141592654</span>
<span class="token punctuation">)</span>

<span class="token comment">// iota 递增常量计数器</span>
<span class="token keyword">const</span> <span class="token punctuation">(</span>
	d <span class="token operator">=</span> <span class="token boolean">iota</span>    <span class="token comment">// 0</span>
	e           <span class="token comment">// 1</span>
	f <span class="token operator">=</span> <span class="token number">100</span>     <span class="token comment">// 100</span>
	g <span class="token operator">=</span> <span class="token boolean">iota</span>    <span class="token comment">// 3</span>
	h           <span class="token comment">// 4</span>
<span class="token punctuation">)</span>


<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 声明变量</span>
	<span class="token keyword">var</span> name <span class="token builtin">string</span> <span class="token operator">=</span> <span class="token string">&quot;yanguangzhi&quot;</span><span class="token punctuation">;</span>
	<span class="token keyword">var</span> age <span class="token builtin">int</span> <span class="token operator">=</span> <span class="token number">24</span><span class="token punctuation">;</span>
	<span class="token keyword">var</span> isOk <span class="token builtin">bool</span> <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
	<span class="token comment">// 批量声明变量</span>
	<span class="token keyword">var</span> <span class="token punctuation">(</span>
		sex <span class="token operator">=</span> <span class="token string">&quot;男&quot;</span>
		address <span class="token operator">=</span> <span class="token string">&quot;shanghai&quot;</span>
	<span class="token punctuation">)</span>
	<span class="token keyword">var</span> girl<span class="token punctuation">,</span> girlAge <span class="token operator">=</span> <span class="token string">&quot;HUANHUAN&quot;</span><span class="token punctuation">,</span> <span class="token number">23</span>
	<span class="token comment">// 类型推断\`:=\`不用再写var关键字</span>
	world <span class="token operator">:=</span> <span class="token string">&quot; world&quot;</span>
	<span class="token comment">// 匿名变量\`_\`，接收但不做处理</span>
	simpleName<span class="token punctuation">,</span> <span class="token boolean">_</span> <span class="token operator">:=</span> <span class="token function">personInfo</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token boolean">_</span><span class="token punctuation">,</span> infoAge <span class="token operator">:=</span> <span class="token function">personInfo</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> isOk <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>age<span class="token punctuation">)</span><span class="token punctuation">;</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>sex<span class="token punctuation">)</span><span class="token punctuation">;</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>address<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>girl<span class="token punctuation">)</span><span class="token punctuation">;</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>girlAge<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>simpleName<span class="token punctuation">)</span><span class="token punctuation">;</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>infoAge<span class="token punctuation">)</span><span class="token punctuation">;</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>hello <span class="token operator">+</span> world<span class="token punctuation">)</span><span class="token punctuation">;</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> b<span class="token punctuation">,</span> c<span class="token punctuation">)</span><span class="token punctuation">;</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>d<span class="token punctuation">,</span> e<span class="token punctuation">,</span> f<span class="token punctuation">,</span> g<span class="token punctuation">,</span> h<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">personInfo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token builtin">string</span><span class="token punctuation">,</span> <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">return</span> <span class="token string">&quot;ygz&quot;</span><span class="token punctuation">,</span> <span class="token number">24</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,4),o=[e];function c(i,l){return s(),a("div",null,o)}const k=n(p,[["render",c],["__file","bianlianghechangliang.html.vue"]]);export{k as default};
