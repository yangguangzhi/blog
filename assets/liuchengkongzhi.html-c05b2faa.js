import{_ as n,o as s,c as a,a as t}from"./app-a6bbcd8f.js";const p={},e=t(`<h2 id="if" tabindex="-1"><a class="header-anchor" href="#if" aria-hidden="true">#</a> if</h2><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code>    <span class="token keyword">if</span> score <span class="token operator">&gt;=</span> <span class="token number">90</span> <span class="token punctuation">{</span>
        fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;A&quot;</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> score <span class="token operator">&gt;=</span> <span class="token number">80</span> <span class="token punctuation">{</span>
        fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;B&quot;</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;C&quot;</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    
    <span class="token comment">// </span>
    <span class="token keyword">if</span> score1 <span class="token operator">:=</span> <span class="token number">85</span><span class="token punctuation">;</span> score1 <span class="token operator">&gt;=</span> <span class="token number">90</span> <span class="token punctuation">{</span>
        fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;A&quot;</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> score1 <span class="token operator">&gt;=</span> <span class="token number">80</span> <span class="token punctuation">{</span>
        fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;B&quot;</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;C&quot;</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="for" tabindex="-1"><a class="header-anchor" href="#for" aria-hidden="true">#</a> for</h2><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code>    <span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">10</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
        fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%d &quot;</span><span class="token punctuation">,</span> i<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    j <span class="token operator">:=</span> <span class="token number">0</span>
    <span class="token keyword">for</span> <span class="token punctuation">;</span> j <span class="token operator">&lt;</span> <span class="token number">10</span><span class="token punctuation">;</span> j<span class="token operator">++</span> <span class="token punctuation">{</span>
        fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%d &quot;</span><span class="token punctuation">,</span> j<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    k <span class="token operator">:=</span> <span class="token number">0</span>
    <span class="token keyword">for</span> k <span class="token operator">&lt;</span> <span class="token number">10</span> <span class="token punctuation">{</span>
        fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%d &quot;</span><span class="token punctuation">,</span> k<span class="token punctuation">)</span>
        k<span class="token operator">++</span>
    <span class="token punctuation">}</span>
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token comment">// 无限循环，for循环可以通过break；goto；return；panic强制退出</span>
    l <span class="token operator">:=</span> <span class="token number">0</span>
    <span class="token keyword">for</span> <span class="token punctuation">{</span>
        fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%d &quot;</span><span class="token punctuation">,</span> l<span class="token punctuation">)</span>
        <span class="token keyword">if</span> l <span class="token operator">==</span> <span class="token number">10</span> <span class="token punctuation">{</span>
            <span class="token keyword">break</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        l<span class="token operator">++</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// for range，可以遍历数组、切片、字符串、map、channel</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="switch" tabindex="-1"><a class="header-anchor" href="#switch" aria-hidden="true">#</a> switch</h2><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code>    m <span class="token operator">:=</span> <span class="token operator">-</span><span class="token number">1</span>
    <span class="token keyword">switch</span> m <span class="token punctuation">{</span>
    <span class="token keyword">case</span> <span class="token number">1</span><span class="token punctuation">:</span>
        fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;1&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">case</span> <span class="token number">2</span><span class="token punctuation">:</span>
        fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;2&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">case</span> <span class="token number">3</span><span class="token punctuation">:</span>	
        fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;3&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">default</span> <span class="token punctuation">:</span>
        fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;default&quot;</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    
    <span class="token keyword">switch</span> n<span class="token operator">:=</span> <span class="token number">7</span><span class="token punctuation">;</span> n <span class="token punctuation">{</span>
        <span class="token keyword">case</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">7</span><span class="token punctuation">,</span> <span class="token number">9</span><span class="token punctuation">:</span>
            fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;奇数&quot;</span><span class="token punctuation">)</span>
        <span class="token keyword">case</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">,</span> <span class="token number">8</span><span class="token punctuation">:</span>
            fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;偶数&quot;</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    
    <span class="token keyword">switch</span> <span class="token punctuation">{</span>
        <span class="token keyword">case</span> score <span class="token operator">&gt;=</span> <span class="token number">90</span><span class="token punctuation">:</span>
            fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;A&quot;</span><span class="token punctuation">)</span>
        <span class="token keyword">case</span> score <span class="token operator">&gt;=</span> <span class="token number">80</span><span class="token punctuation">:</span>
            fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;B&quot;</span><span class="token punctuation">)</span>
        <span class="token keyword">default</span><span class="token punctuation">:</span>
            fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;C&quot;</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="goto" tabindex="-1"><a class="header-anchor" href="#goto" aria-hidden="true">#</a> goto</h2><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code>	<span class="token comment">// goto 跳转指定标签</span>
	breakFlag <span class="token operator">:=</span> <span class="token boolean">false</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">10</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		<span class="token keyword">for</span> j <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> j <span class="token operator">&lt;</span> <span class="token number">10</span><span class="token punctuation">;</span> j<span class="token operator">++</span> <span class="token punctuation">{</span>
			<span class="token keyword">if</span> j <span class="token operator">==</span> <span class="token number">2</span> <span class="token punctuation">{</span>
				breakFlag <span class="token operator">=</span> <span class="token boolean">true</span>
				<span class="token keyword">break</span>
			<span class="token punctuation">}</span>
			fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%v-%v\\n&quot;</span><span class="token punctuation">,</span> i<span class="token punctuation">,</span> j<span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
		<span class="token keyword">if</span> breakFlag <span class="token punctuation">{</span>
			<span class="token keyword">break</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
	
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">10</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		<span class="token keyword">for</span> j <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> j <span class="token operator">&lt;</span> <span class="token number">10</span><span class="token punctuation">;</span> j<span class="token operator">++</span> <span class="token punctuation">{</span>
			<span class="token keyword">if</span> j <span class="token operator">==</span> <span class="token number">2</span> <span class="token punctuation">{</span>
				<span class="token keyword">goto</span> breakTag
			<span class="token punctuation">}</span>
			fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%v-%v\\n&quot;</span><span class="token punctuation">,</span> i<span class="token punctuation">,</span> j<span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
	breakTag<span class="token punctuation">:</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;breakTag&quot;</span><span class="token punctuation">)</span>
	<span class="token comment">// break跳出循环</span>
	<span class="token comment">// 结束for、switch、select代码块；还可以添加标签标识退出对应标签的代码块</span>
	BREAKTAG<span class="token punctuation">:</span>
		<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">10</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
			<span class="token keyword">for</span> j <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> j <span class="token operator">&lt;</span> <span class="token number">10</span><span class="token punctuation">;</span> j<span class="token operator">++</span> <span class="token punctuation">{</span>
				<span class="token keyword">if</span> j <span class="token operator">==</span> <span class="token number">2</span> <span class="token punctuation">{</span>
					<span class="token keyword">break</span> BREAKTAG
				<span class="token punctuation">}</span>
				fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%v-%v\\n&quot;</span><span class="token punctuation">,</span> i<span class="token punctuation">,</span> j<span class="token punctuation">)</span>
			<span class="token punctuation">}</span>
		<span class="token punctuation">}</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;...&quot;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,8),o=[e];function c(i,l){return s(),a("div",null,o)}const r=n(p,[["render",c],["__file","liuchengkongzhi.html.vue"]]);export{r as default};
