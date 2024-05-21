import{_ as i,r as l,o,c as t,b as a,e as r,w as c,d as n,a as s}from"./app-a6bbcd8f.js";const d={},p=s(`<h2 id="悲观锁、乐观锁" tabindex="-1"><a class="header-anchor" href="#悲观锁、乐观锁" aria-hidden="true">#</a> 悲观锁、乐观锁</h2><h3 id="悲观锁" tabindex="-1"><a class="header-anchor" href="#悲观锁" aria-hidden="true">#</a> 悲观锁</h3><p>是一种自己在操作共享资源的时候认为一定有其他线程来掺和， 所以在获取数据的之前会先加锁，确保数据不会被其他线程修改。<code>synchronized和Lock都是悲观锁</code></p><ul><li>适合写操作多的场景</li><li>显示的锁定之后再操作共享资源</li></ul><h3 id="乐观锁" tabindex="-1"><a class="header-anchor" href="#乐观锁" aria-hidden="true">#</a> 乐观锁</h3><p>是一种自己在操作共享资源的时候认为其他线程不会来干扰自己， 在执行操作的时候再判断资源有没有被更新过，如果没有更新当前线程就会修改； 如果已经修改，则会放弃修改，等待下次执行。</p><ul><li>适合读操作多的场景</li><li>最常采用的就是CAS算法 + 版本号</li></ul><h2 id="公平锁、非公平锁" tabindex="-1"><a class="header-anchor" href="#公平锁、非公平锁" aria-hidden="true">#</a> 公平锁、非公平锁</h2><h3 id="公平锁" tabindex="-1"><a class="header-anchor" href="#公平锁" aria-hidden="true">#</a> 公平锁</h3><p>是指多个线程按照申请锁的顺序来获取锁。类似买票排队，先来的人先买票，后来的人排队后面。</p><ul><li>优点：本机不会出现饥饿现象，先申请的线程一定能够申请到锁</li><li>缺点：吞吐量会下降</li></ul><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">// true 表示公平锁，false 表示非公平锁</span>
<span class="token class-name">Lock</span> lock<span class="token operator">=</span><span class="token keyword">new</span> <span class="token class-name">ReentrantLock</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="非公平锁" tabindex="-1"><a class="header-anchor" href="#非公平锁" aria-hidden="true">#</a> 非公平锁</h3><p>是指多个线程获取锁的顺序并不是按照申请锁的顺序，有可能后申请的线程比先申请的线程优先获取锁。</p><ul><li>优点：吞吐量会提高，不会出现饥饿现象</li><li>缺点：本机可能会出现饥饿现象</li></ul><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token class-name">Lock</span> lock<span class="token operator">=</span><span class="token keyword">new</span> <span class="token class-name">ReentrantLock</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">synchronized</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
        <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="可重入锁" tabindex="-1"><a class="header-anchor" href="#可重入锁" aria-hidden="true">#</a> 可重入锁</h2><p>指能够支持一个线程在获取锁之后，再次获取该锁，并且不发生死锁。 在一个synchronized修饰的方法或代码块的内部调用本类的其他synchronized修饰的方法或代码块时，是永远可以得到锁的。<code>synchronized和ReentrantLock都是可重入锁</code></p><ul><li>优点：避免死锁</li></ul><h2 id="读-写锁-共享-独占锁" tabindex="-1"><a class="header-anchor" href="#读-写锁-共享-独占锁" aria-hidden="true">#</a> 读/写锁（共享/独占锁）</h2><h3 id="读锁-共享锁" tabindex="-1"><a class="header-anchor" href="#读锁-共享锁" aria-hidden="true">#</a> 读锁（共享锁）</h3><p>是指当一个线程获取读锁之后，允许其他线程进行读操作，但不允许获取写锁。</p><ul><li>优点：读操作可以并发进行，提高了程序的效率</li><li>缺点：写操作会被阻塞，降低了程序的效率</li></ul><h3 id="写锁-独占锁" tabindex="-1"><a class="header-anchor" href="#写锁-独占锁" aria-hidden="true">#</a> 写锁（独占锁）</h3><p>是指当一个线程获取写锁之后，不允许其他线程进行读操作和写操作。</p><ul><li>优点：写操作不受阻塞，提高了程序的效率</li><li>缺点：读操作会被阻塞，降低了程序的效率</li></ul><h2 id="自旋锁" tabindex="-1"><a class="header-anchor" href="#自旋锁" aria-hidden="true">#</a> 自旋锁</h2><p>无锁-&gt;偏向锁-&gt;轻量级锁-&gt;重量级锁</p><h2 id="synchronized和reentrantlock的区别" tabindex="-1"><a class="header-anchor" href="#synchronized和reentrantlock的区别" aria-hidden="true">#</a> Synchronized和ReentrantLock的区别</h2><h3 id="相同点" tabindex="-1"><a class="header-anchor" href="#相同点" aria-hidden="true">#</a> 相同点</h3><ol><li>都是可重入锁</li><li>都保证代码块或者方法互斥执行</li><li>都保证代码块或方法在运行时，线程拥有锁</li></ol><h3 id="不同点" tabindex="-1"><a class="header-anchor" href="#不同点" aria-hidden="true">#</a> 不同点</h3>`,32),h=a("li",null,[n("Synchronized在发生异常时，会自动释放线程占有的锁，ReentrantLock在发生异常时，如果没有主动通过 "),a("code",null,"unlock()"),n("去释放锁，则很可能造成死锁现象，因此使用ReentrantLock时需要在finally中释放锁")],-1),u=a("li",null,"ReentrantLock通过代码来判断，比synchronized更灵活",-1),k=a("li",null,"ReentrantLock需要手动获取锁和释放锁，synchronized不需要",-1),v=a("li",null,"ReentrantLock可指定是公平锁还是非公平锁，synchronized只能是非公平锁",-1),b=a("li",null,"性能上：synchronized关键字性能比ReentrantLock性能高",-1),m=s(`<h2 id="死锁及排查" tabindex="-1"><a class="header-anchor" href="#死锁及排查" aria-hidden="true">#</a> 死锁及排查</h2><p>是指两个或两个以上的进程在执行过程中，因争夺资源而造成的一种互相等待的现象， 若无外力作用，它们都将无法推进下去。</p><h3 id="死锁产生的四个必要条件" tabindex="-1"><a class="header-anchor" href="#死锁产生的四个必要条件" aria-hidden="true">#</a> 死锁产生的四个必要条件</h3><ol><li>互斥条件：进程要求对所分配的资源进行排它性控制，即在一段时间内某资源仅为一进程所占用。</li><li>请求和保持条件：当进程因请求资源而阻塞时，对已获得的资源保持不放。</li><li>不可剥夺条件：进程已获得的资源在未使用完之前，不能被剥夺，只能在使用完时由自己释放。</li><li>环路等待条件：存在一种进程资源的循环等待链，链中每一个进程已获得的资源同时被下一个进程所请求。</li></ol><h3 id="排查" tabindex="-1"><a class="header-anchor" href="#排查" aria-hidden="true">#</a> 排查</h3><ol><li>找到死锁的进程（jps -l）</li><li>找到死锁的线程</li></ol><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ jstack <span class="token parameter variable">-l</span> pId
Found one Java-level deadlock:
<span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">=</span>
<span class="token string">&quot;Thread-1&quot;</span><span class="token builtin class-name">:</span>
  waiting <span class="token keyword">for</span> ownable synchronizer 0x0000000761881000, <span class="token punctuation">(</span>a java.util.concurrent.locks.ReentrantLock<span class="token variable">$NonfairSync</span><span class="token punctuation">)</span>,
  <span class="token function">which</span> is held by <span class="token string">&quot;Thread-0&quot;</span>
<span class="token string">&quot;Thread-0&quot;</span><span class="token builtin class-name">:</span>
  waiting <span class="token keyword">for</span> ownable synchronizer 0x0000000761881000, <span class="token punctuation">(</span>a java.util.concurrent.locks.ReentrantLock<span class="token variable">$NonfairSync</span><span class="token punctuation">)</span>,
  <span class="token function">which</span> is held by <span class="token string">&quot;Thread-1&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="避免死锁" tabindex="-1"><a class="header-anchor" href="#避免死锁" aria-hidden="true">#</a> 避免死锁</h3><ol><li>加锁顺序（线程按照一定的顺序加锁）</li><li>加锁时限（线程尝试获取锁的时候加上一定的时限，超过时限则放弃对该锁的请求，并释放自己占有的锁）</li><li>死锁检测</li></ol>`,9);function f(_,x){const e=l("RouterLink");return o(),t("div",null,[p,a("ol",null,[a("li",null,[r(e,{to:"/blogs/java/Synchronized%E9%94%81%E5%8D%87%E7%BA%A7.html"},{default:c(()=>[n("Synchronized")]),_:1}),n("是关键字，ReentrantLock是类，synchronized无法判断是否获取锁失败，ReentrantLock可以")]),h,u,k,v,b]),m])}const g=i(d,[["render",f],["__file","suo.html.vue"]]);export{g as default};
