import{_ as n,o as e,c as s,b as a,a as l,d as t}from"./app-a6bbcd8f.js";const c={},i=a("div",{class:"custom-container tip"},[a("svg",{xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 24 24"},[a("g",{fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"},[a("circle",{cx:"12",cy:"12",r:"9"}),a("path",{d:"M12 8h.01"}),a("path",{d:"M11 12h1v4h1"})])]),a("p",{class:"custom-container-title"},"引用级别"),a("p",null,"强 > 软 > 弱 > 虚")],-1),o=l(`<h2 id="强引用" tabindex="-1"><a class="header-anchor" href="#强引用" aria-hidden="true">#</a> 强引用</h2><p><code>java.lang.ref.FinalReference&lt;T&gt;</code></p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token class-name">Object</span> obj<span class="token operator">=</span><span class="token keyword">new</span> <span class="token class-name">Object</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>失效时机</p><ul><li>生命周期结束（作用域失效）</li><li>引用置为null，引用对象会被GC回收</li></ul><h2 id="软引用" tabindex="-1"><a class="header-anchor" href="#软引用" aria-hidden="true">#</a> 软引用</h2><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token class-name">SoftReference</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">SoftObject</span><span class="token punctuation">&gt;</span></span> softRef<span class="token operator">=</span><span class="token keyword">new</span> <span class="token class-name">SoftReference</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">SoftObject</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>失效时机</p><ul><li>JVM内存不足，GC会主动回收软引用对象（内存充足不会自动回收）</li></ul><h2 id="弱引用" tabindex="-1"><a class="header-anchor" href="#弱引用" aria-hidden="true">#</a> 弱引用</h2><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token class-name">WeakReference</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">WeakObject</span><span class="token punctuation">&gt;</span></span> weakRef<span class="token operator">=</span><span class="token keyword">new</span> <span class="token class-name">WeakReference</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">WeakObject</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>回收时机</p><ul><li>只要GC执行，弱引用对象就会被回收</li></ul><h2 id="虚引用" tabindex="-1"><a class="header-anchor" href="#虚引用" aria-hidden="true">#</a> 虚引用</h2><p><code>java.lang.ref.PhantomReference&lt;T&gt;</code></p><ul><li>是否使用虚引用和引用对象本身没有关系，即无法通过虚引用来获取对象本身</li><li>虚引用的get()返回null，所以虚引用不会单独使用，一般和ReferenceQueue一起使用</li><li>结合引用队列使用的意义，当GC回收一个对象，如果GC发现此对象有虚引用，就会将这个虚引用放到引用队列中 ，当虚引用出队之后再回收该对象；因此可以使用虚引用+引用队列来实现对象被GC回收之前做一些额外操作</li><li>如果虚引用的对象重写了finalize()，那么JVM会延迟虚引用的入队时间</li></ul>`,16),p=a("div",{class:"custom-container tip"},[a("svg",{xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 24 24"},[a("g",{fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"},[a("circle",{cx:"12",cy:"12",r:"9"}),a("path",{d:"M12 8h.01"}),a("path",{d:"M11 12h1v4h1"})])]),a("p",{class:"custom-container-title"},"Java终结器"),a("p",null,[a("code",null,"final class Finalizer extends FinalReference<Object>"),t(" 用于在对象被垃圾回收器回收之前执行一些清理操作。它的主要作用如下：")]),a("ul",null,[a("li",null,"资源释放：Finalizer可以用于释放对象持有的资源，例如文件句柄、数据库连接等。通过覆盖Finalize方法并在其中关闭或释放这些资源，可以避免资源泄漏问题。"),a("li",null,"对象清理：Finalizer可以用于清理对象内部的其他资源，例如线程、锁等。通过覆盖Finalize方法并在其中终止或清理这些资源，可以避免对象状态不一致的问题。"),a("li",null,"对象销毁：Finalizer是在对象被垃圾回收器回收之前执行的，因此它可以用于销毁对象。通过覆盖Finalize方法并在其中将对象引用设置为null，可以使对象成为垃圾回收器的候选对象，从而触发垃圾回收操作。")]),a("p",null,"需要注意的是，Finalizer并不是强制性的，如果没有覆盖Finalize方法，则对象不会被垃圾回收器回收。此外，Finalizer的执行时间是不确定的，因为它取决于垃圾回收器的运行策略。因此，在使用Finalizer时需要谨慎处理，避免出现意外情况。")],-1),r=[i,o,p];function u(d,k){return e(),s("div",null,r)}const v=n(c,[["render",u],["__file","Javaduixiangyinyong.html.vue"]]);export{v as default};
