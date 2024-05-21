import{_ as n,o as s,c as a,a as e}from"./app-a6bbcd8f.js";const t={},p=e(`<h2 id="背景" tabindex="-1"><a class="header-anchor" href="#背景" aria-hidden="true">#</a> 背景</h2><ol><li>分库: 整个数据库出现性能瓶颈，需要将数据库拆分成多个数据库，每个数据库保存部分数据。</li><li>分表: 单个表的数据量出现性能瓶颈，需要将表拆分成多个表，每个表保存部分数据。</li></ol><h2 id="读写分离" tabindex="-1"><a class="header-anchor" href="#读写分离" aria-hidden="true">#</a> 读写分离</h2><p>读写分离是指将数据库的读操作和写操作分别放置在不同的数据库上，从而提高数据库的性能和可用性。</p><ul><li>主库负责处理写操作，从库负责处理读操作。有效避免数据更新导致行锁带来的性能损耗</li></ul><h2 id="数据分片" tabindex="-1"><a class="header-anchor" href="#数据分片" aria-hidden="true">#</a> 数据分片</h2><p>数据分片是指将数据库的数据拆分成多个部分，每个部分保存在不同的数据库或表中，从而提高数据库的性能和可用性。</p><h3 id="垂直分片" tabindex="-1"><a class="header-anchor" href="#垂直分片" aria-hidden="true">#</a> 垂直分片</h3><ul><li>垂直分库</li></ul><p>按照业务拆分，核心思想专库专用。按照业务拆分将表分类，分布到不同的数据库中</p><ul><li>垂直分表</li></ul><p>按照字段拆分，将表中不常用的字段拆分到另一个表中</p><h3 id="水平分片" tabindex="-1"><a class="header-anchor" href="#水平分片" aria-hidden="true">#</a> 水平分片</h3><p>水平分库和水平分表是同一个概念的不同角度描述。</p><ul><li>水平分表</li></ul><p>按照行数拆分，将表中的数据拆分到多个表中</p><ul><li>水平分库</li></ul><p>拆分成多表后，单台服务器依然无法满足性能要求，需要将部分表分布到不同的服务器上，实现水平扩展</p><h2 id="shardingsphere-jdbc" tabindex="-1"><a class="header-anchor" href="#shardingsphere-jdbc" aria-hidden="true">#</a> ShardingSphere-JDBC</h2><h3 id="添加依赖" tabindex="-1"><a class="header-anchor" href="#添加依赖" aria-hidden="true">#</a> 添加依赖</h3><div class="language-xml line-numbers-mode" data-ext="xml"><pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>org.apache.shardingsphere<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>shardingsphere-jdbc-core-spring-boot-starter<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>5.1.1<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="配置读写分离" tabindex="-1"><a class="header-anchor" href="#配置读写分离" aria-hidden="true">#</a> 配置读写分离</h3><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token key atrule">shardingsphere</span><span class="token punctuation">:</span>
    <span class="token key atrule">mode</span><span class="token punctuation">:</span>
      <span class="token key atrule">type</span><span class="token punctuation">:</span> Memory  <span class="token comment"># 内存模式</span>
    <span class="token key atrule">datasources</span><span class="token punctuation">:</span>
      <span class="token key atrule">names</span><span class="token punctuation">:</span> <span class="token comment"># 数据源名称</span>
        <span class="token punctuation">-</span> master
        <span class="token punctuation">-</span> slave1
        <span class="token punctuation">-</span> slave2
      <span class="token key atrule">master</span><span class="token punctuation">:</span> <span class="token comment"># 主库配置</span>
        <span class="token key atrule">type</span><span class="token punctuation">:</span> com.alibaba.druid.pool.DruidDataSource
        <span class="token key atrule">driver-class-name</span><span class="token punctuation">:</span> org.postgresql.Driver
        <span class="token key atrule">url</span><span class="token punctuation">:</span> jdbc<span class="token punctuation">:</span>postgresql<span class="token punctuation">:</span>//localhost<span class="token punctuation">:</span>5433/dbname
        <span class="token key atrule">username</span><span class="token punctuation">:</span> root
        <span class="token key atrule">password</span><span class="token punctuation">:</span> root
      <span class="token key atrule">slave1</span><span class="token punctuation">:</span> <span class="token comment"># 从库配置</span>
        <span class="token key atrule">type</span><span class="token punctuation">:</span> com.alibaba.druid.pool.DruidDataSource
        <span class="token key atrule">driver-class-name</span><span class="token punctuation">:</span> org.postgresql.Driver
        <span class="token key atrule">url</span><span class="token punctuation">:</span> jdbc<span class="token punctuation">:</span>postgresql<span class="token punctuation">:</span>//localhost<span class="token punctuation">:</span>5434/dbname
        <span class="token key atrule">username</span><span class="token punctuation">:</span> root
        <span class="token key atrule">password</span><span class="token punctuation">:</span> root
      <span class="token key atrule">slave2</span><span class="token punctuation">:</span> <span class="token comment"># 从库配置</span>
        <span class="token key atrule">type</span><span class="token punctuation">:</span> com.alibaba.druid.pool.DruidDataSource
        <span class="token key atrule">driver-class-name</span><span class="token punctuation">:</span> org.postgresql.Driver
        <span class="token key atrule">url</span><span class="token punctuation">:</span> jdbc<span class="token punctuation">:</span>postgresql<span class="token punctuation">:</span>//localhost<span class="token punctuation">:</span>5435/dbname
        <span class="token key atrule">username</span><span class="token punctuation">:</span> root
        <span class="token key atrule">password</span><span class="token punctuation">:</span> root
    <span class="token key atrule">rules</span><span class="token punctuation">:</span> 
      <span class="token key atrule">read-write-splitting</span><span class="token punctuation">:</span>
        <span class="token key atrule">data-sources</span><span class="token punctuation">:</span>
          <span class="token key atrule">myds</span><span class="token punctuation">:</span>
            <span class="token key atrule">type</span><span class="token punctuation">:</span> Static <span class="token comment"># Static静态配置/Dynamic动态配置</span>
            <span class="token key atrule">props</span><span class="token punctuation">:</span>
              <span class="token key atrule">write-data-source-name</span><span class="token punctuation">:</span> master  <span class="token comment"># 写库名称</span>
              <span class="token key atrule">read-data-source-names</span><span class="token punctuation">:</span> slave1<span class="token punctuation">,</span>slave2 <span class="token comment"># 从库名称</span>
            <span class="token key atrule">load-balancer-name</span><span class="token punctuation">:</span> alg_round <span class="token comment"># 负载均衡算法名称</span>
      <span class="token key atrule">load-balancers</span><span class="token punctuation">:</span> <span class="token comment">#负载配置</span>
        <span class="token key atrule">alg_round</span><span class="token punctuation">:</span>
          <span class="token key atrule">type</span><span class="token punctuation">:</span> ROUND_ROBIN <span class="token comment"># 轮询</span>
        <span class="token key atrule">alg_random</span><span class="token punctuation">:</span>
          <span class="token key atrule">type</span><span class="token punctuation">:</span> RANDOM <span class="token comment"># 随机</span>
        <span class="token key atrule">alg_weight_round</span><span class="token punctuation">:</span>
          <span class="token key atrule">type</span><span class="token punctuation">:</span> WEIGHT <span class="token comment"># 权重</span>
          <span class="token key atrule">props</span><span class="token punctuation">:</span>
            <span class="token key atrule">slave1</span><span class="token punctuation">:</span> <span class="token number">1</span>
            <span class="token key atrule">slave2</span><span class="token punctuation">:</span> <span class="token number">2</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">// 【事务一致性】</span>
<span class="token annotation punctuation">@Transactional</span>
<span class="token comment">// 添加注解：insert select 都是操作主库</span>
<span class="token comment">// 不添加注解: insert 是主库 select 是从库</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="水平分片-1" tabindex="-1"><a class="header-anchor" href="#水平分片-1" aria-hidden="true">#</a> 水平分片</h3><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token key atrule">shardingsphere</span><span class="token punctuation">:</span>
    <span class="token key atrule">mode</span><span class="token punctuation">:</span>
      <span class="token key atrule">type</span><span class="token punctuation">:</span> Memory  <span class="token comment"># 内存模式</span>
    <span class="token key atrule">datasources</span><span class="token punctuation">:</span>
      <span class="token key atrule">names</span><span class="token punctuation">:</span> m1
      <span class="token key atrule">m1</span><span class="token punctuation">:</span>
        <span class="token key atrule">type</span><span class="token punctuation">:</span> com.alibaba.druid.pool.DruidDataSource
        <span class="token key atrule">driver-class-name</span><span class="token punctuation">:</span> org.postgresql.Driver
        <span class="token key atrule">url</span><span class="token punctuation">:</span> jdbc<span class="token punctuation">:</span>postgresql<span class="token punctuation">:</span>//localhost<span class="token punctuation">:</span>5433/dbname
        <span class="token key atrule">username</span><span class="token punctuation">:</span> root
        <span class="token key atrule">password</span><span class="token punctuation">:</span> root
    <span class="token key atrule">sharding</span><span class="token punctuation">:</span>
        <span class="token key atrule">tables</span><span class="token punctuation">:</span>
            <span class="token key atrule">t_order</span><span class="token punctuation">:</span>
              <span class="token key atrule">actual-data-nodes</span><span class="token punctuation">:</span> m1.t_order_$<span class="token punctuation">-</span><span class="token punctuation">&gt;</span><span class="token punctuation">{</span>1..12<span class="token punctuation">}</span> <span class="token comment"># 按月水平分片</span>
              <span class="token key atrule">key-generator</span><span class="token punctuation">:</span>   <span class="token comment"># 主键生成算法</span>
                <span class="token key atrule">column</span><span class="token punctuation">:</span> id
                <span class="token key atrule">type</span><span class="token punctuation">:</span> SNOWFLAKE
              <span class="token key atrule">table-strategy</span><span class="token punctuation">:</span> <span class="token comment"># 分表策略</span>
                <span class="token key atrule">standard</span><span class="token punctuation">:</span>
                    <span class="token key atrule">sharding-column</span><span class="token punctuation">:</span> create_time <span class="token comment"># 分片列</span>
                    <span class="token key atrule">precise-algorithm-class-name</span><span class="token punctuation">:</span> com.example.sharding.PreciseShardingAlgorithm <span class="token comment"># 分片算法</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,26),l=[p];function c(i,o){return s(),a("div",null,l)}const r=n(t,[["render",c],["__file","ShardingSphere.html.vue"]]);export{r as default};
