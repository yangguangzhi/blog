import{_ as n,o as s,c as a,a as t}from"./app-a6bbcd8f.js";const e={},p=t(`<h2 id="refresh" tabindex="-1"><a class="header-anchor" href="#refresh" aria-hidden="true">#</a> refresh()</h2><p>启动流程中做了那些事AbstractApplicationContext#refresh</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code>
<span class="token annotation punctuation">@Override</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">refresh</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">BeansException</span><span class="token punctuation">,</span> <span class="token class-name">IllegalStateException</span> <span class="token punctuation">{</span>
    <span class="token keyword">synchronized</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>startupShutdownMonitor<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 做一些准备工作：设置启动时间、关闭状态、开启状态；</span>
        <span class="token comment">// 验证当前环境得启动属性是否可解析</span>
        <span class="token comment">// 添加预加载的监听器、初始化早期的事件监听队列（在multicaster可用之后推送事件）</span>
        <span class="token function">prepareRefresh</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

		<span class="token comment">// 初始化BeanFactory容器（标记refreshed状态&amp;&amp;设置beanFactory的ID也就是使用的是那种容器启动项目的这里是AnnotationConfigApplicationContext）</span>
		<span class="token comment">// 获得由之前构造器调用父类构造器（GenericApplicationContext）初始化的DefaultListableBeanFactory</span>
		<span class="token class-name">ConfigurableListableBeanFactory</span> beanFactory <span class="token operator">=</span> <span class="token function">obtainFreshBeanFactory</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

		<span class="token comment">// 准备BeanFactory启动工作</span>
		<span class="token comment">// 1、设置BeanFactory上下文使用的类加载器（也就是当前线程的类加载器）</span>
		<span class="token comment">// 2、设置Bean表达式解析器（StandardBeanExpressionResolver）</span>
		<span class="token comment">// 3、设置属性编辑器（ResourceEditorRegistrar）</span>
		<span class="token comment">// 4、添加了一个后置处理器（ApplicationContextAwareProcessor）</span>
		<span class="token comment">// 5、设置了一些忽略自动装配的接口（配置忽略掉回调的类【EnvironmentAware、EmbeddedValueResolverAware、ResourceLoaderAware、ApplicationEventPublisherAware、MessageSourceAware、ApplicationContextAware、ApplicationStartupAware】）</span>
		<span class="token comment">// 6、设置一些允许自动装配的接口（将BeanFactory在工厂中添加解析功能【BeanFactory、ResourceLoader、ApplicationEventPublisher、ApplicationContext】）</span>
		<span class="token comment">// 7、添加ApplicationListener探测器（将实现了ApplicationListener接口的类注册到容器中，在事件发布时能够触发相应的处理方法）</span>
		<span class="token comment">// 7、初始化一些内置的Singleton Bean（environment、systemProperties、systemEnvironment、applicationStartup）</span>
		<span class="token function">prepareBeanFactory</span><span class="token punctuation">(</span>beanFactory<span class="token punctuation">)</span><span class="token punctuation">;</span>

		<span class="token keyword">try</span> <span class="token punctuation">{</span>
			<span class="token comment">// Spring扩展点、如果有bean实现了BeanFactoryPostProcessor在容器初始化后，Spring会调用实现的postProcessorFactory方法对BeanFactory进行处理</span>
			<span class="token function">postProcessBeanFactory</span><span class="token punctuation">(</span>beanFactory<span class="token punctuation">)</span><span class="token punctuation">;</span>

			<span class="token comment">// 调用BeanFactoryPostProcessor各个实现类的postProcessorFactory方法</span>
			<span class="token function">invokeBeanFactoryPostProcessors</span><span class="token punctuation">(</span>beanFactory<span class="token punctuation">)</span><span class="token punctuation">;</span>

			<span class="token comment">// 注册BeanPostProcessor的实现类</span>
			<span class="token function">registerBeanPostProcessors</span><span class="token punctuation">(</span>beanFactory<span class="token punctuation">)</span><span class="token punctuation">;</span>

			<span class="token comment">// 初始化上下文的MessageSource（国际化操作）</span>
			<span class="token function">initMessageSource</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

			<span class="token comment">// 初始化上下文ApplicationContext的事件广播器</span>
			<span class="token function">initApplicationEventMulticaster</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

			<span class="token comment">// 扩展点，初始化上下文子类中其他的bean对象</span>
			<span class="token function">onRefresh</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

			<span class="token comment">// 检查并注册事件监听器</span>
			<span class="token function">registerListeners</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

			<span class="token comment">// 初始化所有（不包含lazy）的单例bean</span>
			<span class="token function">finishBeanFactoryInitialization</span><span class="token punctuation">(</span>beanFactory<span class="token punctuation">)</span><span class="token punctuation">;</span>

			<span class="token comment">// 完成启动，发布启动完成事件</span>
			<span class="token function">finishRefresh</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>

		<span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">BeansException</span> ex<span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token keyword">if</span> <span class="token punctuation">(</span>logger<span class="token punctuation">.</span><span class="token function">isWarnEnabled</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
				logger<span class="token punctuation">.</span><span class="token function">warn</span><span class="token punctuation">(</span><span class="token string">&quot;Exception encountered during context initialization - &quot;</span> <span class="token operator">+</span>
						<span class="token string">&quot;cancelling refresh attempt: &quot;</span> <span class="token operator">+</span> ex<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token punctuation">}</span>

			<span class="token comment">// 销毁已经初始化完成的单例bean</span>
			<span class="token function">destroyBeans</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

			<span class="token comment">// 重置当前容器的active状态</span>
			<span class="token function">cancelRefresh</span><span class="token punctuation">(</span>ex<span class="token punctuation">)</span><span class="token punctuation">;</span>

			<span class="token comment">// Propagate exception to caller.</span>
			<span class="token keyword">throw</span> ex<span class="token punctuation">;</span>
		<span class="token punctuation">}</span>

		<span class="token keyword">finally</span> <span class="token punctuation">{</span>
			<span class="token comment">// 清除公用缓存（bean的一些元数据，已经没用了）</span>
			<span class="token function">resetCommonCaches</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="preparerefresh" tabindex="-1"><a class="header-anchor" href="#preparerefresh" aria-hidden="true">#</a> prepareRefresh();</h2><p>AnnotationConfigApplicationContext#AnnotationConfigApplicationContext()</p><p>|-AbstractApplicationContext#refresh()</p><p>|-AbstractApplicationContext#prepareRefresh()</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code>
<span class="token comment">// 准备当前上下文进行刷新，设置启动时间、活动标记以及一些属性的初始化</span>
<span class="token keyword">protected</span> <span class="token keyword">void</span> <span class="token function">prepareRefresh</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// Switch to active.</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>startupDate <span class="token operator">=</span> <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">currentTimeMillis</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>closed<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>active<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

	<span class="token comment">// 初始化加载配置文件的方法，扩展点，默认啥都没做</span>
	<span class="token function">initPropertySources</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

	<span class="token comment">// 检查所需的环境参数是可以解析的</span>
	<span class="token function">getEnvironment</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">validateRequiredProperties</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

	<span class="token comment">// 给应用刷新前置监听器赋值</span>
	<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>earlyApplicationListeners <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>earlyApplicationListeners <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">LinkedHashSet</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>applicationListeners<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">else</span> <span class="token punctuation">{</span>
		<span class="token comment">// 重置应用监听器状态</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>applicationListeners<span class="token punctuation">.</span><span class="token function">clear</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>applicationListeners<span class="token punctuation">.</span><span class="token function">addAll</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>earlyApplicationListeners<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// 初始化事件的容器添加早期事件，在多播器可用时发送事件</span>
	<span class="token keyword">this</span><span class="token punctuation">.</span>earlyApplicationEvents <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">LinkedHashSet</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="obtainfreshbeanfactory" tabindex="-1"><a class="header-anchor" href="#obtainfreshbeanfactory" aria-hidden="true">#</a> obtainFreshBeanFactory();</h2><p>AbstractApplicationContext#refresh()</p><p>|-AbstractApplicationContext#obtainFreshBeanFactory()</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">// 告诉子类刷新工厂并返回</span>
<span class="token keyword">protected</span> <span class="token class-name">ConfigurableListableBeanFactory</span> <span class="token function">obtainFreshBeanFactory</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 子类GenericApplicationContext#refreshBeanFactory()</span>
    <span class="token comment">// 设置工厂的refreshed状态为true、设置当前BeanFactory的序列化ID为org.springframework.context.annotation.AnnotationConfigApplicationContext@192b07fd</span>
    <span class="token function">refreshBeanFactory</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 返回子类GenericApplicationContext的BeanFactory</span>
    <span class="token keyword">return</span> <span class="token function">getBeanFactory</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,12),c=[p];function o(i,l){return s(),a("div",null,c)}const r=n(e,[["render",o],["__file","qidongliucheng-3.1.html.vue"]]);export{r as default};
