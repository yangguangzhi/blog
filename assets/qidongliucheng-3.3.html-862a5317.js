import{_ as n,o as s,c as a,a as t}from"./app-a6bbcd8f.js";const p={},e=t(`<h2 id="registerbeanpostprocessors-beanfactory" tabindex="-1"><a class="header-anchor" href="#registerbeanpostprocessors-beanfactory" aria-hidden="true">#</a> registerBeanPostProcessors(beanFactory);</h2><p>|-AbstractApplicationContext#registerBeanPostProcessors(ConfigurableListableBeanFactory)</p><p>|-PostProcessorRegistrationDelegate#registerBeanPostProcessors(ConfigurableListableBeanFactory, AbstractApplicationContext)</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code>
<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">registerBeanPostProcessors</span><span class="token punctuation">(</span>
                        <span class="token class-name">ConfigurableListableBeanFactory</span> beanFactory<span class="token punctuation">,</span> <span class="token class-name">AbstractApplicationContext</span> applicationContext<span class="token punctuation">)</span> <span class="token punctuation">{</span>

	<span class="token comment">// 获取容器中所有的BeanPostProcessor</span>
	<span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> postProcessorNames <span class="token operator">=</span> beanFactory<span class="token punctuation">.</span><span class="token function">getBeanNamesForType</span><span class="token punctuation">(</span><span class="token class-name">BeanPostProcessor</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

	<span class="token comment">// 记录Processor处理计数的Bean数量</span>
	<span class="token keyword">int</span> beanProcessorTargetCount <span class="token operator">=</span> beanFactory<span class="token punctuation">.</span><span class="token function">getBeanPostProcessorCount</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token number">1</span> <span class="token operator">+</span> postProcessorNames<span class="token punctuation">.</span>length<span class="token punctuation">;</span>
	beanFactory<span class="token punctuation">.</span><span class="token function">addBeanPostProcessor</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">BeanPostProcessorChecker</span><span class="token punctuation">(</span>beanFactory<span class="token punctuation">,</span> beanProcessorTargetCount<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

	<span class="token comment">// 优先处理实现了PriorityOrdered的，再处理实现了Ordered，最后处理普通的BeanPostProcessor</span>
	<span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">BeanPostProcessor</span><span class="token punctuation">&gt;</span></span> priorityOrderedPostProcessors <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">BeanPostProcessor</span><span class="token punctuation">&gt;</span></span> internalPostProcessors <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span> orderedPostProcessorNames <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span> nonOrderedPostProcessorNames <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

	<span class="token comment">// 分类插入优先级集合</span>
	<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">String</span> ppName <span class="token operator">:</span> postProcessorPriorityOrderedNames<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token comment">// 实现了PriorityOrdered</span>
		<span class="token keyword">if</span> <span class="token punctuation">(</span>beanFactory<span class="token punctuation">.</span><span class="token function">isTypeMatch</span><span class="token punctuation">(</span>ppName<span class="token punctuation">,</span> <span class="token class-name">PriorityOrdered</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token class-name">BeanPostProcessor</span> pp <span class="token operator">=</span> beanFactory<span class="token punctuation">.</span><span class="token function">getBean</span><span class="token punctuation">(</span>ppName<span class="token punctuation">,</span> <span class="token class-name">BeanPostProcessor</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
			priorityOrderedPostProcessors<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>pp<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token comment">// 是MergedBeanDefinitionPostProcessor的子类</span>
			<span class="token keyword">if</span> <span class="token punctuation">(</span>pp <span class="token keyword">instanceof</span> <span class="token class-name">MergedBeanDefinitionPostProcessor</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
				internalPostProcessors<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>pp<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token punctuation">}</span>
		<span class="token punctuation">}</span>
		<span class="token comment">// 实现了Ordered</span>
		<span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>beanFactory<span class="token punctuation">.</span><span class="token function">isTypeMatch</span><span class="token punctuation">(</span>ppName<span class="token punctuation">,</span> <span class="token class-name">Ordered</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			orderedPostProcessorNames<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>ppName<span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
		<span class="token comment">// 其他普通的</span>
		<span class="token keyword">else</span> <span class="token punctuation">{</span>
			nonOrderedPostProcessorNames<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>ppName<span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// 首先注册实现PriorityOrdered的</span>
	<span class="token function">sortPostProcessors</span><span class="token punctuation">(</span>priorityOrderedPostProcessors<span class="token punctuation">,</span> beanFactory<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token function">registerBeanPostProcessors</span><span class="token punctuation">(</span>beanFactory<span class="token punctuation">,</span> priorityOrderedPostProcessors<span class="token punctuation">)</span><span class="token punctuation">;</span>

	<span class="token comment">// 其次注册实现了Ordered的</span>
	<span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">BeanPostProcessor</span><span class="token punctuation">&gt;</span></span> orderedPostProcessors <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span>orderedPostProcessorNames<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">String</span> ppName <span class="token operator">:</span> orderedPostProcessorNames<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token class-name">BeanPostProcessor</span> pp <span class="token operator">=</span> beanFactory<span class="token punctuation">.</span><span class="token function">getBean</span><span class="token punctuation">(</span>ppName<span class="token punctuation">,</span> <span class="token class-name">BeanPostProcessor</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		orderedPostProcessors<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>pp<span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token keyword">if</span> <span class="token punctuation">(</span>pp <span class="token keyword">instanceof</span> <span class="token class-name">MergedBeanDefinitionPostProcessor</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			internalPostProcessors<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>pp<span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
	<span class="token function">sortPostProcessors</span><span class="token punctuation">(</span>orderedPostProcessors<span class="token punctuation">,</span> beanFactory<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token function">registerBeanPostProcessors</span><span class="token punctuation">(</span>beanFactory<span class="token punctuation">,</span> orderedPostProcessors<span class="token punctuation">)</span><span class="token punctuation">;</span>

	<span class="token comment">// 注册普通的BeanPostProcessor</span>
	<span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">BeanPostProcessor</span><span class="token punctuation">&gt;</span></span> nonOrderedPostProcessors <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span>nonOrderedPostProcessorNames<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">String</span> ppName <span class="token operator">:</span> nonOrderedPostProcessorNames<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token class-name">BeanPostProcessor</span> pp <span class="token operator">=</span> beanFactory<span class="token punctuation">.</span><span class="token function">getBean</span><span class="token punctuation">(</span>ppName<span class="token punctuation">,</span> <span class="token class-name">BeanPostProcessor</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		nonOrderedPostProcessors<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>pp<span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token keyword">if</span> <span class="token punctuation">(</span>pp <span class="token keyword">instanceof</span> <span class="token class-name">MergedBeanDefinitionPostProcessor</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			internalPostProcessors<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>pp<span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
	<span class="token function">registerBeanPostProcessors</span><span class="token punctuation">(</span>beanFactory<span class="token punctuation">,</span> nonOrderedPostProcessors<span class="token punctuation">)</span><span class="token punctuation">;</span>

	<span class="token comment">// 最后注册内部的BeanPostProcessors</span>
	<span class="token function">sortPostProcessors</span><span class="token punctuation">(</span>internalPostProcessors<span class="token punctuation">,</span> beanFactory<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token function">registerBeanPostProcessors</span><span class="token punctuation">(</span>beanFactory<span class="token punctuation">,</span> internalPostProcessors<span class="token punctuation">)</span><span class="token punctuation">;</span>

	<span class="token comment">// 内部的ApplicationListener放到调用链最后，用于获取代理</span>
	beanFactory<span class="token punctuation">.</span><span class="token function">addBeanPostProcessor</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">ApplicationListenerDetector</span><span class="token punctuation">(</span>applicationContext<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注册到BeanFactory，其实就是把beanPostProcessor加入到BeanFactory的beanPostProcessors中</p><h2 id="initmessagesource" tabindex="-1"><a class="header-anchor" href="#initmessagesource" aria-hidden="true">#</a> initMessageSource();</h2><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">// 初始化国际化，如果当前ApplicationContext没有定义就使用父类的</span>
<span class="token keyword">protected</span> <span class="token keyword">void</span> <span class="token function">initMessageSource</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">ConfigurableListableBeanFactory</span> beanFactory <span class="token operator">=</span> <span class="token function">getBeanFactory</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>beanFactory<span class="token punctuation">.</span><span class="token function">containsLocalBean</span><span class="token punctuation">(</span><span class="token constant">MESSAGE_SOURCE_BEAN_NAME</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>messageSource <span class="token operator">=</span> beanFactory<span class="token punctuation">.</span><span class="token function">getBean</span><span class="token punctuation">(</span><span class="token constant">MESSAGE_SOURCE_BEAN_NAME</span><span class="token punctuation">,</span> <span class="token class-name">MessageSource</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 设置当前上下文的MessageSource为父MessageSource</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>parent <span class="token operator">!=</span> <span class="token keyword">null</span> <span class="token operator">&amp;&amp;</span> <span class="token keyword">this</span><span class="token punctuation">.</span>messageSource <span class="token keyword">instanceof</span> <span class="token class-name">HierarchicalMessageSource</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">HierarchicalMessageSource</span> hms <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">HierarchicalMessageSource</span><span class="token punctuation">)</span> <span class="token keyword">this</span><span class="token punctuation">.</span>messageSource<span class="token punctuation">;</span>
            <span class="token comment">// 如果当前没有父MessageSource，设置父级的上下文为父MessageSource</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>hms<span class="token punctuation">.</span><span class="token function">getParentMessageSource</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                hms<span class="token punctuation">.</span><span class="token function">setParentMessageSource</span><span class="token punctuation">(</span><span class="token function">getInternalParentMessageSource</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token comment">// 没有MessageSource就注册一个空的MessageSource到上下文中，供调用</span>
        <span class="token class-name">DelegatingMessageSource</span> dms <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">DelegatingMessageSource</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        dms<span class="token punctuation">.</span><span class="token function">setParentMessageSource</span><span class="token punctuation">(</span><span class="token function">getInternalParentMessageSource</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>messageSource <span class="token operator">=</span> dms<span class="token punctuation">;</span>
        beanFactory<span class="token punctuation">.</span><span class="token function">registerSingleton</span><span class="token punctuation">(</span><span class="token constant">MESSAGE_SOURCE_BEAN_NAME</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>messageSource<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="initapplicationeventmulticaster" tabindex="-1"><a class="header-anchor" href="#initapplicationeventmulticaster" aria-hidden="true">#</a> initApplicationEventMulticaster();</h2><p>|- AbstractApplicationContext#initApplicationEventMulticaster</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">// 初始化ApplicationEventMulticaster</span>
<span class="token keyword">protected</span> <span class="token keyword">void</span> <span class="token function">initApplicationEventMulticaster</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">ConfigurableListableBeanFactory</span> beanFactory <span class="token operator">=</span> <span class="token function">getBeanFactory</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 当前BeanFactory中有ApplicationEventMulticaster【用户自定义】就从容器中取</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>beanFactory<span class="token punctuation">.</span><span class="token function">containsLocalBean</span><span class="token punctuation">(</span><span class="token constant">APPLICATION_EVENT_MULTICASTER_BEAN_NAME</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>applicationEventMulticaster <span class="token operator">=</span>
            beanFactory<span class="token punctuation">.</span><span class="token function">getBean</span><span class="token punctuation">(</span><span class="token constant">APPLICATION_EVENT_MULTICASTER_BEAN_NAME</span><span class="token punctuation">,</span> <span class="token class-name">ApplicationEventMulticaster</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// 没有就把applicationEventMulticaster声明为SimpleApplicationEventMulticaster</span>
    <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>applicationEventMulticaster <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">SimpleApplicationEventMulticaster</span><span class="token punctuation">(</span>beanFactory<span class="token punctuation">)</span><span class="token punctuation">;</span>
        beanFactory<span class="token punctuation">.</span><span class="token function">registerSingleton</span><span class="token punctuation">(</span><span class="token constant">APPLICATION_EVENT_MULTICASTER_BEAN_NAME</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>applicationEventMulticaster<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="registerlisteners" tabindex="-1"><a class="header-anchor" href="#registerlisteners" aria-hidden="true">#</a> registerListeners();</h2><p>|-AbstractApplicationContext#registerListeners</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code>
<span class="token comment">// 添加实现了ApplicationListener的监听器</span>
<span class="token keyword">protected</span> <span class="token keyword">void</span> <span class="token function">registerListeners</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 首先注册静态指定的监听器</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">ApplicationListener</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span><span class="token punctuation">&gt;</span></span> listener <span class="token operator">:</span> <span class="token function">getApplicationListeners</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">getApplicationEventMulticaster</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">addApplicationListener</span><span class="token punctuation">(</span>listener<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

	<span class="token comment">// 获取ApplicationListener侦听器并注册</span>
	<span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> listenerBeanNames <span class="token operator">=</span> <span class="token function">getBeanNamesForType</span><span class="token punctuation">(</span><span class="token class-name">ApplicationListener</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">String</span> listenerBeanName <span class="token operator">:</span> listenerBeanNames<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token function">getApplicationEventMulticaster</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">addApplicationListenerBean</span><span class="token punctuation">(</span>listenerBeanName<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// 这会有了多播器，发布应用早期事件</span>
	<span class="token class-name">Set</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">ApplicationEvent</span><span class="token punctuation">&gt;</span></span> earlyEventsToProcess <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>earlyApplicationEvents<span class="token punctuation">;</span>
	<span class="token keyword">this</span><span class="token punctuation">.</span>earlyApplicationEvents <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
	<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token class-name">CollectionUtils</span><span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span>earlyEventsToProcess<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">ApplicationEvent</span> earlyEvent <span class="token operator">:</span> earlyEventsToProcess<span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token function">getApplicationEventMulticaster</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">multicastEvent</span><span class="token punctuation">(</span>earlyEvent<span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,13),o=[e];function c(i,l){return s(),a("div",null,o)}const r=n(p,[["render",c],["__file","qidongliucheng-3.3.html.vue"]]);export{r as default};