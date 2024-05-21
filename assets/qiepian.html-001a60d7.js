import{_ as n,o as s,c as a,a as t}from"./app-a6bbcd8f.js";const p={},e=t(`<p>数组长度固定，所以还是有很多局限性，切片是一个拥有相同类型的可变长度集合。 它是基于数组做的一层封装【内部结构包含地址(底层数组指针)、长度、容量】，支持自动扩容</p><ul><li>数组定义【var name [len]T】</li><li>切片定义【var name []T】</li></ul><h2 id="切片定义" tabindex="-1"><a class="header-anchor" href="#切片定义" aria-hidden="true">#</a> 切片定义</h2><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code>	<span class="token keyword">var</span> a <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span>
	<span class="token keyword">var</span> b <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
	<span class="token keyword">var</span> c <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">bool</span><span class="token punctuation">{</span><span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">}</span>
	<span class="token keyword">var</span> d <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">bool</span><span class="token punctuation">{</span><span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">}</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> b<span class="token punctuation">,</span> c<span class="token punctuation">,</span> d<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>a <span class="token operator">==</span> <span class="token boolean">nil</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>b <span class="token operator">==</span> <span class="token boolean">nil</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>c <span class="token operator">==</span> <span class="token boolean">nil</span><span class="token punctuation">)</span>
	<span class="token comment">// fmt.Println(c == d)	切片是引用类型不能直接比较</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>切片的可以用len()计算长度,cap()计算容量</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code>	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token function">len</span><span class="token punctuation">(</span>c<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">cap</span><span class="token punctuation">(</span>c<span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>切片的两种变体【省略了low代表0，省略了high代表数组长度】</p><ol><li>指定low和high索引边界的形式[)</li><li>除了low和high索引边界还指定容量的形式</li></ol><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code>	e <span class="token operator">:=</span> <span class="token punctuation">[</span><span class="token number">10</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">,</span> <span class="token number">7</span><span class="token punctuation">,</span> <span class="token number">8</span><span class="token punctuation">,</span> <span class="token number">9</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">}</span>
	s <span class="token operator">:=</span> e<span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">:</span><span class="token number">5</span><span class="token punctuation">]</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;s:%v len(s):%v cap(s):%v\\n&quot;</span><span class="token punctuation">,</span> s<span class="token punctuation">,</span> <span class="token function">len</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">cap</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span><span class="token punctuation">)</span>
	f <span class="token operator">:=</span> e<span class="token punctuation">[</span><span class="token punctuation">:</span><span class="token number">2</span><span class="token punctuation">]</span>
	g <span class="token operator">:=</span> e<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">:</span><span class="token punctuation">]</span>
	h <span class="token operator">:=</span> e<span class="token punctuation">[</span><span class="token punctuation">:</span><span class="token punctuation">]</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>f<span class="token punctuation">,</span> g<span class="token punctuation">,</span> h<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="make构造切片" tabindex="-1"><a class="header-anchor" href="#make构造切片" aria-hidden="true">#</a> make构造切片</h2><p>make([]T, size, cap)</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code>	<span class="token comment">// make构造切片,判断切片是否为空应该用len判断是否等于0，而不是和nil作比较</span>
	i <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>i<span class="token punctuation">,</span> <span class="token function">len</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">cap</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="切片拷贝赋值" tabindex="-1"><a class="header-anchor" href="#切片拷贝赋值" aria-hidden="true">#</a> 切片拷贝赋值</h2><p>切片拷贝赋值，j和k共享底层数组，修改一个切片会影响到另一个切片</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code>    j <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span>
    k <span class="token operator">:=</span> j
    j<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">1</span>
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>j<span class="token punctuation">,</span> k<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="切片遍历" tabindex="-1"><a class="header-anchor" href="#切片遍历" aria-hidden="true">#</a> 切片遍历</h2><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code>    <span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> v <span class="token operator">:=</span> <span class="token keyword">range</span> j <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>v<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="追加元素" tabindex="-1"><a class="header-anchor" href="#追加元素" aria-hidden="true">#</a> 追加元素</h2><p>追加元素，append(source, item...)</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code>    j <span class="token operator">=</span> <span class="token function">append</span><span class="token punctuation">(</span>j<span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span>
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>j<span class="token punctuation">,</span> k<span class="token punctuation">)</span>
    j <span class="token operator">=</span> <span class="token function">append</span><span class="token punctuation">(</span>j<span class="token punctuation">,</span> k<span class="token operator">...</span><span class="token punctuation">)</span>
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>j<span class="token punctuation">,</span> k<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>数组扩容机制会导致j、k没有共用一个底层数组的原因</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code>	<span class="token keyword">var</span> l <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">10</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		l <span class="token operator">=</span> <span class="token function">append</span><span class="token punctuation">(</span>l<span class="token punctuation">,</span> i<span class="token punctuation">)</span>
		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%v len(l):%v cap(l):%v ptr:%p\\n&quot;</span><span class="token punctuation">,</span> l<span class="token punctuation">,</span> <span class="token function">len</span><span class="token punctuation">(</span>l<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">cap</span><span class="token punctuation">(</span>l<span class="token punctuation">)</span><span class="token punctuation">,</span> l<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="复制切片" tabindex="-1"><a class="header-anchor" href="#复制切片" aria-hidden="true">#</a> 复制切片</h2><p>复制切片，copy(target, source, []T)</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code>    m <span class="token operator">:=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">}</span>
	n <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">)</span>
	<span class="token function">copy</span><span class="token punctuation">(</span>n<span class="token punctuation">,</span> m<span class="token punctuation">)</span>
	m<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">10</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>m<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>n<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="删除切片元素" tabindex="-1"><a class="header-anchor" href="#删除切片元素" aria-hidden="true">#</a> 删除切片元素</h2><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code>	<span class="token comment">// 删除切片元素，go中没有删除专用方法</span>
	o <span class="token operator">:=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">,</span> <span class="token number">7</span><span class="token punctuation">,</span> <span class="token number">8</span><span class="token punctuation">,</span> <span class="token number">9</span><span class="token punctuation">}</span>
	<span class="token comment">// 删除345</span>
	o <span class="token operator">=</span> <span class="token function">append</span><span class="token punctuation">(</span>o<span class="token punctuation">[</span><span class="token punctuation">:</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">,</span> o<span class="token punctuation">[</span><span class="token number">5</span><span class="token punctuation">:</span><span class="token punctuation">]</span><span class="token operator">...</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>o<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,27),o=[e];function c(u,l){return s(),a("div",null,o)}const k=n(p,[["render",c],["__file","qiepian.html.vue"]]);export{k as default};
