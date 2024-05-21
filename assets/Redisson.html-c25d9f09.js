import{_ as a,o as e,c as i,b as n,d as t,a as s}from"./app-a6bbcd8f.js";const l={},c=n("h2",{id:"可重入-非公平锁",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#可重入-非公平锁","aria-hidden":"true"},"#"),t(" 可重入-非公平锁")],-1),o=n("div",{class:"custom-container tip"},[n("svg",{xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 24 24"},[n("g",{fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"},[n("circle",{cx:"12",cy:"12",r:"9"}),n("path",{d:"M12 8h.01"}),n("path",{d:"M11 12h1v4h1"})])]),n("p",{class:"custom-container-title"},"TIP"),n("ul",null,[n("li",null,"获取锁，在redis中设置hash值，并赋过期时间30s"),n("li",null,"锁续期，后台看门狗10s刷新锁过期时间为30s"),n("li",null,"锁重入，将锁值自增1"),n("li",null,"互斥阻塞，锁被其他客户端占用时，会一直阻塞直至加锁成功"),n("li",null,"释放锁，hash锁值减1，完全释放掉锁才是被真正释放； 服务器宕机释放锁，持有锁的客户端宕机后，看门狗也会挂掉，锁最多持有30s就过期了。")])],-1),p=s(`<h3 id="加锁" tabindex="-1"><a class="header-anchor" href="#加锁" aria-hidden="true">#</a> 加锁</h3><p>redis cluster默认有16384个数据槽，redis客户端使用hash算法（crc16）获取slot槽。 再通过槽位拿到对应的cluster节点地址，接着执行加锁脚本，如果加锁成功，启动后台线程对锁定时续约（看门狗机制）</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token class-name">RLock</span> lock <span class="token operator">=</span> redisson<span class="token punctuation">.</span><span class="token function">getLock</span><span class="token punctuation">(</span><span class="token string">&quot;mylock&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 设置为非公平锁</span>
lock<span class="token punctuation">.</span><span class="token function">setRank</span><span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
lock<span class="token punctuation">.</span><span class="token function">lock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">try</span> <span class="token punctuation">{</span>
    <span class="token comment">// 执行业务逻辑</span>
<span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
    lock<span class="token punctuation">.</span><span class="token function">unlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>lua脚本</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// 当前无锁，加锁并返回
if (redis.call(&#39;exists&#39;, KEYS[1]) == 0) then  
    redis.call(&#39;hset&#39;, KEYS[1], ARGV[2], 1);  
    redis.call(&#39;pexpire&#39;, KEYS[1], ARGV[1]);  
    return nil;  
end;  
// 当前有锁，持有锁的是自己，设置自增值和过期时间，并返回
if (redis.call(&#39;hexists&#39;, KEYS[1], ARGV[2]) == 1) then 
    redis.call(&#39;hincrby&#39;, KEYS[1], ARGV[2], 1);  
    redis.call(&#39;pexpire&#39;, KEYS[1], ARGV[1]);  
    return nil;  
end;  
// 当前有锁，持有锁的不是自己，返回锁过期时间
return redis.call(&#39;pttl&#39;, KEYS[1]);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,5),u=n("div",{class:"custom-container tip"},[n("svg",{xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 24 24"},[n("g",{fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"},[n("circle",{cx:"12",cy:"12",r:"9"}),n("path",{d:"M12 8h.01"}),n("path",{d:"M11 12h1v4h1"})])]),n("p",{class:"custom-container-title"},"获取锁互斥阻塞"),n("p",null,"如果客户端A加锁成功，客户端B尝试加锁肯定会失败。 脚本执行返回锁的过期时间，客户端B会监听锁信道，阻塞自己直到锁释放。 再开始循环获取锁，直至成功。")],-1),d=s(`<h3 id="自动续约机制-看门狗" tabindex="-1"><a class="header-anchor" href="#自动续约机制-看门狗" aria-hidden="true">#</a> 自动续约机制（看门狗）</h3><p>看门狗机制可以保证锁的自动续期，从而避免死锁问题。 当一个线程获取到了锁，但是业务执行时间超过了锁的有效期，那么看门狗就会起作用，自动（10s的周期）给线程续期（30s），直到业务执行完成或者锁过期。 如果看门狗检测到线程已经宕机，那么它会自动释放锁，避免死锁问题的发生。</p><h3 id="锁释放" tabindex="-1"><a class="header-anchor" href="#锁释放" aria-hidden="true">#</a> 锁释放</h3><p>Redis客户端释放锁，如果被重入了，将hash值-1，重新设置过期时间。 如果锁未被重入，就释放锁并移除看门狗</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// 锁不存在, 发布消息到指定通道中
if (redis.call(&#39;exists&#39;, KEYS[1]) == 0) then  
    redis.call(&#39;publish&#39;, KEYS[2], ARGV[1]);  
    return 1;  
end; 
// 锁存在, 持有锁的不是自己
if (redis.call(&#39;hexists&#39;, KEYS[1], ARGV[3]) == 0) then  
    return nil; 
end;
// 持有锁的是自己, hash值-1
local counter = redis.call(&#39;hincrby&#39;, KEYS[1], ARGV[3], -1);  
// 锁被重入过, 重置过期时间为30s
if (counter &gt; 0) then  
    redis.call(&#39;pexpire&#39;, KEYS[1], ARGV[2]);  
    return 0;  
else  
// 锁被释放, 删除key, 发送消息到指定通道中
    redis.call(&#39;del&#39;, KEYS[1]);  
    redis.call(&#39;publish&#39;, KEYS[2], ARGV[1]);  
    return 1; 
end;  
return nil;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="可重入-公平锁" tabindex="-1"><a class="header-anchor" href="#可重入-公平锁" aria-hidden="true">#</a> 可重入-公平锁</h2><h2 id="联锁" tabindex="-1"><a class="header-anchor" href="#联锁" aria-hidden="true">#</a> 联锁</h2><p>RedissonMultiLock对象可以将多个RLock对象关联为一个联锁，实现加锁和解锁功能。每个RLock对象实例可以来自于不同的Redisson实例。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">// 获取RLock对象实例</span>
<span class="token class-name">RLock</span> lock1 <span class="token operator">=</span> redisson<span class="token punctuation">.</span><span class="token function">getLock</span><span class="token punctuation">(</span><span class="token string">&quot;lock1&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">RLock</span> lock2 <span class="token operator">=</span> redisson<span class="token punctuation">.</span><span class="token function">getLock</span><span class="token punctuation">(</span><span class="token string">&quot;lock2&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 创建RedissonMultiLock对象实例</span>
<span class="token class-name">RedissonMultiLock</span> multiLock <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">RedissonMultiLock</span><span class="token punctuation">(</span>redisson<span class="token punctuation">,</span> <span class="token string">&quot;multiLock&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 加锁</span>
multiLock<span class="token punctuation">.</span><span class="token function">lock</span><span class="token punctuation">(</span><span class="token string">&quot;lock1&quot;</span><span class="token punctuation">,</span> lock1<span class="token punctuation">)</span><span class="token punctuation">;</span>
multiLock<span class="token punctuation">.</span><span class="token function">lock</span><span class="token punctuation">(</span><span class="token string">&quot;lock2&quot;</span><span class="token punctuation">,</span> lock2<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">try</span> <span class="token punctuation">{</span>
    <span class="token comment">// 执行业务逻辑</span>
    <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">sleep</span><span class="token punctuation">(</span><span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
    <span class="token comment">// 解锁</span>
    multiLock<span class="token punctuation">.</span><span class="token function">unlock</span><span class="token punctuation">(</span><span class="token string">&quot;lock1&quot;</span><span class="token punctuation">,</span> lock1<span class="token punctuation">)</span><span class="token punctuation">;</span>
    multiLock<span class="token punctuation">.</span><span class="token function">unlock</span><span class="token punctuation">(</span><span class="token string">&quot;lock2&quot;</span><span class="token punctuation">,</span> lock2<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="加锁-1" tabindex="-1"><a class="header-anchor" href="#加锁-1" aria-hidden="true">#</a> 加锁</h3><ol><li>根据子锁拿到基础等待的时间（基础等待时间 = 每把子锁等待时间【1500ms】 * 子锁数量）</li><li>循环尝试给全部子锁上锁</li><li>尝试给子锁上锁，即依次调用子锁的加锁方法</li><li>在基础等待时间内给所有子锁加锁，就算成功；否则为失败，失败会释放所有子锁。</li></ol><h3 id="解锁" tabindex="-1"><a class="header-anchor" href="#解锁" aria-hidden="true">#</a> 解锁</h3><p>对联锁的所有子锁依次解锁，同步等待解锁完成</p><h2 id="红锁" tabindex="-1"><a class="header-anchor" href="#红锁" aria-hidden="true">#</a> 红锁</h2><h2 id="读写锁" tabindex="-1"><a class="header-anchor" href="#读写锁" aria-hidden="true">#</a> 读写锁</h2><h2 id="信号量" tabindex="-1"><a class="header-anchor" href="#信号量" aria-hidden="true">#</a> 信号量</h2><h2 id="闭锁" tabindex="-1"><a class="header-anchor" href="#闭锁" aria-hidden="true">#</a> 闭锁</h2>`,17),r=[c,o,p,u,d];function k(v,h){return e(),i("div",null,r)}const b=a(l,[["render",k],["__file","Redisson.html.vue"]]);export{b as default};
