import{_ as e,r as t,o as i,c as l,b as a,d as c,e as o,a as n}from"./app-a6bbcd8f.js";const p={},r={class:"custom-container tip"},u=a("svg",{xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 24 24"},[a("g",{fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"},[a("circle",{cx:"12",cy:"12",r:"9"}),a("path",{d:"M12 8h.01"}),a("path",{d:"M11 12h1v4h1"})])],-1),d=a("p",{class:"custom-container-title"},"TIP",-1),v={href:"https://arthas.aliyun.com/doc/download.html",target:"_blank",rel:"noopener noreferrer"},m=n(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 两种启动方式，启动之后会列出Java进程，输入前面的进程序号回车即可</span>
$ ./as.sh
$ <span class="token function">java</span> <span class="token parameter variable">-jar</span> arthas-boot.jar
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1),k=n(`<h2 id="dashboard" tabindex="-1"><a class="header-anchor" href="#dashboard" aria-hidden="true">#</a> dashboard</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ dashboard
<span class="token comment"># -i，多久刷新一次</span>
<span class="token comment"># -n，刷新次数</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当前系统实时数据面板</p><ul><li>ID，Java级别线程ID，不等于jstack中的NativeID</li><li>NAME，线程名</li><li>GROUP，线程组名</li><li>PRIORITY，线程优先级，1-10数字越大优先级越高</li><li>STATE，线程状态</li><li>CPU%，线程CPU使用率，线程增量cpu使用时间/采样间隔时间</li><li>DELTA_TIME，上次采样后线程增量cpu运行时间</li><li>TIME，线程运行总CPU时间</li><li>INTERRUPTED，线程中断状态</li><li>DAEMON，是否daemon线程</li></ul><p>Memory，JVM内存信息【used:已使用；total:总共；max最多；usage已使用比率；GC情况】</p><p>Runtime，当前运行服务器信息</p><h3 id="thread-threadid" tabindex="-1"><a class="header-anchor" href="#thread-threadid" aria-hidden="true">#</a> thread threadId</h3><p>定位线程代码</p><p>Option</p><ul><li>-b，找出当前阻塞其他线程的线程</li><li>-n，显示最忙的前n个线程</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ thread <span class="token number">14</span>
<span class="token string">&quot;pool-1-thread-1&quot;</span> <span class="token assign-left variable">Id</span><span class="token operator">=</span><span class="token number">14</span> RUNNABLE
    at java.io.FileOutputStream.writeBytes<span class="token punctuation">(</span>Native Method<span class="token punctuation">)</span>
    at java.io.FileOutputStream.write<span class="token punctuation">(</span>FileOutputStream.java:326<span class="token punctuation">)</span>
    at java.io.BufferedOutputStream.flushBuffer<span class="token punctuation">(</span>BufferedOutputStream.java:82<span class="token punctuation">)</span>
    at java.io.BufferedOutputStream.flush<span class="token punctuation">(</span>BufferedOutputStream.java:140<span class="token punctuation">)</span>
    at java.io.PrintStream.write<span class="token punctuation">(</span>PrintStream.java:482<span class="token punctuation">)</span>
    at sun.nio.cs.StreamEncoder.writeBytes<span class="token punctuation">(</span>StreamEncoder.java:221<span class="token punctuation">)</span>
    at sun.nio.cs.StreamEncoder.implFlushBuffer<span class="token punctuation">(</span>StreamEncoder.java:291<span class="token punctuation">)</span>
    at sun.nio.cs.StreamEncoder.flushBuffer<span class="token punctuation">(</span>StreamEncoder.java:104<span class="token punctuation">)</span>
    at java.io.OutputStreamWriter.flushBuffer<span class="token punctuation">(</span>OutputStreamWriter.java:185<span class="token punctuation">)</span>
    at java.io.PrintStream.write<span class="token punctuation">(</span>PrintStream.java:527<span class="token punctuation">)</span>
    at java.io.PrintStream.print<span class="token punctuation">(</span>PrintStream.java:669<span class="token punctuation">)</span>
    at java.io.PrintStream.println<span class="token punctuation">(</span>PrintStream.java:806<span class="token punctuation">)</span>
    at com.kingoin.king.shiro.Base64Test.lambda<span class="token variable">$main</span><span class="token variable">$0</span><span class="token punctuation">(</span>Base64Test.java:19<span class="token punctuation">)</span>
    at com.kingoin.king.shiro.Base64Test<span class="token variable">$$</span>Lambda<span class="token variable">$1</span>/942986815.run<span class="token punctuation">(</span>Unknown Source<span class="token punctuation">)</span>
    at java.util.concurrent.ThreadPoolExecutor.runWorker<span class="token punctuation">(</span>ThreadPoolExecutor.java:1149<span class="token punctuation">)</span>
    at java.util.concurrent.ThreadPoolExecutor<span class="token variable">$Worker</span>.run<span class="token punctuation">(</span>ThreadPoolExecutor.java:624<span class="token punctuation">)</span>
    at java.lang.Thread.run<span class="token punctuation">(</span>Thread.java:748<span class="token punctuation">)</span>
  
<span class="token comment"># 死锁，可以拿到造成死锁的线程ID</span>
<span class="token comment"># 然后可以通过Thread Id定位到死锁代码位置</span>
<span class="token comment"># 再通过jad 反编译class排查死锁</span>
$ thread <span class="token parameter variable">-b</span>
<span class="token string">&quot;t1&quot;</span> <span class="token assign-left variable">Id</span><span class="token operator">=</span><span class="token number">14</span> BLOCKED on java.lang.Object@58866807 owned by <span class="token string">&quot;t2&quot;</span> <span class="token assign-left variable">Id</span><span class="token operator">=</span><span class="token number">15</span>
    at com.kingoin.king.shiro.Base64Test.lambda<span class="token variable">$main</span><span class="token variable">$0</span><span class="token punctuation">(</span>Base64Test.java:27<span class="token punctuation">)</span>
    -  blocked on java.lang.Object@58866807
    -  locked java.lang.Object@10164397 <span class="token operator">&lt;</span>---- but blocks <span class="token number">1</span> other threads<span class="token operator">!</span>
    at com.kingoin.king.shiro.Base64Test<span class="token variable">$$</span>Lambda<span class="token variable">$1</span>/846063400.run<span class="token punctuation">(</span>Unknown Source<span class="token punctuation">)</span>
    at java.lang.Thread.run<span class="token punctuation">(</span>Thread.java:748<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="watch" tabindex="-1"><a class="header-anchor" href="#watch" aria-hidden="true">#</a> watch</h2><p>监听指定方法的调用情况，可观测入参、返回值、抛出异常</p><ul><li>四个观察点事件 <ul><li>-b，方法调用前</li><li>-s，方法返回后</li><li>-e，方法异常后</li><li>-f，方法结束后(默认)</li></ul></li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">watch</span> package<span class="token operator">&lt;</span>Class<span class="token operator">&gt;</span> method param
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>观察表达式，默认值是{param, target, returnObj}</p><h2 id="trace" tabindex="-1"><a class="header-anchor" href="#trace" aria-hidden="true">#</a> trace</h2><p>方法调用路径，并输出方法路径上节点耗时</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ trace package<span class="token operator">&lt;</span>Class<span class="token operator">&gt;</span> method
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="jad" tabindex="-1"><a class="header-anchor" href="#jad" aria-hidden="true">#</a> jad</h2><p>反编译已加载类的源码</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ jad package<span class="token operator">&lt;</span>Class<span class="token operator">&gt;</span>
<span class="token comment"># --source-only，只打印源码【默认情况会有ClassLoader信息】</span>
$ jad --source-only com.xx.Base64Test
/*
* Decompiled with CFR.
*/
package com.xx<span class="token punctuation">;</span>

<span class="token function">import</span> java.util.concurrent.Executor<span class="token punctuation">;</span>
<span class="token function">import</span> java.util.concurrent.Executors<span class="token punctuation">;</span>

public class Base64Test <span class="token punctuation">{</span>
   private static Executor threadPool <span class="token operator">=</span> Executors.newFixedThreadPool<span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

   public static void main<span class="token punctuation">(</span>String<span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
/*17*/         threadPool.execute<span class="token punctuation">((</span><span class="token punctuation">)</span> -<span class="token operator">&gt;</span> <span class="token punctuation">{</span>
           <span class="token keyword">while</span> <span class="token punctuation">(</span>true<span class="token punctuation">)</span> <span class="token punctuation">{</span>
/*19*/                 System.out.println<span class="token punctuation">(</span><span class="token string">&quot;cpu work..&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
           <span class="token punctuation">}</span>
       <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="retransform" tabindex="-1"><a class="header-anchor" href="#retransform" aria-hidden="true">#</a> retransform</h2><p>加载JVM外部的class文件到JVM容器内</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ retransform classFilePath
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="mc" tabindex="-1"><a class="header-anchor" href="#mc" aria-hidden="true">#</a> mc</h2><p>Memory Compiler 内存编译器，编译java文件为class文件</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">mc</span> javaFilePath
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,28);function h(b,g){const s=t("ExternalLinkIcon");return i(),l("div",null,[a("div",r,[u,d,a("p",null,[a("a",v,[c("Arthas下载地址"),o(s)])]),m]),k])}const f=e(p,[["render",h],["__file","Arthaschangyongmingling.html.vue"]]);export{f as default};
