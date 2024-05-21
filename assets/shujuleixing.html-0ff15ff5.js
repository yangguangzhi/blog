import{_ as e,o as i,c as l,a as n}from"./app-a6bbcd8f.js";const s={},d=n(`<h2 id="key操作" tabindex="-1"><a class="header-anchor" href="#key操作" aria-hidden="true">#</a> Key操作</h2><div class="language-redis line-numbers-mode" data-ext="redis"><pre class="language-redis"><code>$ select
-- 切换数据库
$ dbsize
-- 查看当前数据库key的数量
$ flushdb
-- 清空当前库
$ flushall
-- 通杀所有库
$ keys
-- 查看当前库所有key
$ exists key
-- 判断key是否存在
$ type key
-- 查看key类型
$ del key
-- 删除key
$ unlink key
-- 异步上传key，仅仅将key从keyspace元数据中删除，真正的删除在后续异步操作中进行
$ expire key seconds
-- 指定key的过期时间
$ ttl key
-- 查看key还有多久过期，-1（永不过期）、-2（已经过期）
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="string" tabindex="-1"><a class="header-anchor" href="#string" aria-hidden="true">#</a> String</h2><p>String类型可以包含任何数据（图片/序列化的对象），一个String 类型的value最多可以存放512M。</p><h3 id="常用指令" tabindex="-1"><a class="header-anchor" href="#常用指令" aria-hidden="true">#</a> 常用指令</h3><div class="language-redis line-numbers-mode" data-ext="redis"><pre class="language-redis"><code>$ set &lt;key&gt;&lt;value&gt;
-- 设置值
$ get &lt;key&gt;
-- 查询键的值
$ append &lt;key&gt;&lt;value&gt;
-- 将value追加到原值的末尾
$ strlen &lt;key&gt;
-- 获取值的长度
$ setnx &lt;key&gt;&lt;value&gt;
-- 在key不存在时，设置key的值
$ incr &lt;key&gt;
-- 将key中存储的数字加一（只能对数字操作），如果为空新增值为1
$ decr &lt;key&gt;
-- 将key中存储的数字减一（只能对数字操作），如果为空新增值为-1
$ incrby/decrBy &lt;key&gt; step
-- 加/减 指定的步长（数字）
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="数据结构" tabindex="-1"><a class="header-anchor" href="#数据结构" aria-hidden="true">#</a> 数据结构</h3><ul><li>使用SDS（Simple Dynamic String）数据结构来实现，采用预分配冗余空间的方式来减少内存的频繁分配。</li><li>SDS兼容C语言标准字符串处理函数，且在此基础上保证了二进制安全。</li><li>当字符串小于1M时，扩容都是加倍扩容，大于1M时，扩容每次只会扩容1M。</li></ul><h2 id="list" tabindex="-1"><a class="header-anchor" href="#list" aria-hidden="true">#</a> List</h2><p>List类型是一个双向链表，可以在两端进行插入和删除操作。 它支持从头部或尾部添加元素、从头部或尾部获取元素、获取指定范围的元素等功能。</p><h3 id="常用指令-1" tabindex="-1"><a class="header-anchor" href="#常用指令-1" aria-hidden="true">#</a> 常用指令</h3><div class="language-redis line-numbers-mode" data-ext="redis"><pre class="language-redis"><code>$ lpush/rpush &lt;key&gt;&lt;value1&gt;&lt;value2&gt;
-- 从左边/右边 插入一个或多个值
$ lpop/rpop &lt;key&gt;
-- 从左边/右边 弹出一个值（值在键在，值没键没）
$ rpoplpush &lt;key1&gt;&lt;key2&gt;
-- 从key1右边弹出一个值插入key2左边
$ lrange &lt;key&gt;&lt;start&gt;&lt;end&gt;
-- 按照索引下标获取元素（0 -1代表获取所有值）
$ lindex &lt;key&gt;&lt;index&gt;
-- 按照索引下标获取元素
$ llen &lt;key&gt;
-- 获取列表长度
$ linsert &lt;key&gt; before &lt;value&gt;&lt;newValue&gt;
-- 在value后面插入newValue
$ lrem &lt;key&gt;&lt;n&gt;&lt;value&gt;
-- 从左边删除n个value
$ lset &lt;key&gt;&lt;index&gt;&lt;value&gt;
-- 将列表下标为index的值替换
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="数据结构-1" tabindex="-1"><a class="header-anchor" href="#数据结构-1" aria-hidden="true">#</a> 数据结构</h3><ul><li>List的底层数据结构是快速链表（quickList）。</li><li>在元素较少的情况下会使用一段连续的内存存储，这时还是压缩列表（zipList），当元素比较多的时候才会改成quickList。</li><li>因为普通链表所需的附加指针空间比较浪费空间（比如：列表里只存int类型的数据，还要维护前后指针）， Redis将链表和zipList结合起来组成了quickList。也就是将多个zipList使用双向指针串起来使用。</li></ul><h2 id="set" tabindex="-1"><a class="header-anchor" href="#set" aria-hidden="true">#</a> Set</h2><p>Set类型是一种无序的集合，它可以用来存储不重复的数据。 由于Set类型是无序的，因此不能按照元素的添加顺序进行排序。 Set提供了某个元素是否存在集合中的重要接口，这个是List不能提供的。</p><h3 id="常用指令-2" tabindex="-1"><a class="header-anchor" href="#常用指令-2" aria-hidden="true">#</a> 常用指令</h3><div class="language-redis line-numbers-mode" data-ext="redis"><pre class="language-redis"><code>$ sadd &lt;key&gt;&lt;value1&gt;&lt;value2&gt;
-- 将一个或多个元素加入到集合中，已经存在的元素将被忽略
$ smembers &lt;key&gt;
-- 取出该集合的所有值
$ sismember &lt;key&gt;&lt;value&gt;
-- 判断集合中是否含有该value值（1 有，0 没有）
$ scard &lt;key&gt;
-- 返回该集合的元素个数
$ srem &lt;key&gt;&lt;value1&gt;&lt;value2&gt;
-- 删除集合中的某个元素
$ spop &lt;key&gt;
-- 随机弹出一个值
$ srandmember &lt;key&gt;&lt;n&gt;
-- 随机从集合中去除n个值，不会从集合中删除
$ smove &lt;source&gt;&lt;dest&gt; value
-- 把集合中的一个值移动到另一个集合
$ sinter &lt;key1&gt;&lt;key2&gt;
-- 返回两个集合的交集元素
$ sunion &lt;key1&gt;&lt;key2&gt;
-- 返回两个集合的并集元素
$ sdiff &lt;key1&gt;&lt;key2&gt;
-- 返回两个集合的差集元素（key1中的，在key2中不存在的元素）
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="数据结构-2" tabindex="-1"><a class="header-anchor" href="#数据结构-2" aria-hidden="true">#</a> 数据结构</h3><ul><li>set数据结构是dict字典，字典使用哈希表（value为null）实现。每个元素都对应着一个唯一的field和value。</li></ul><h2 id="hash" tabindex="-1"><a class="header-anchor" href="#hash" aria-hidden="true">#</a> Hash</h2><p>Hash类型是一个键值对，是String类型field和value的映射表。一个key可对应多个field，一个field对应一个value。 将一个对象存储为hash类型，较于每个字段都存储成string类型更能节省内存。</p><h3 id="常用指令-3" tabindex="-1"><a class="header-anchor" href="#常用指令-3" aria-hidden="true">#</a> 常用指令</h3><div class="language-redis line-numbers-mode" data-ext="redis"><pre class="language-redis"><code>$ hset &lt;key&gt;&lt;field&gt;&lt;value&gt;
-- 给key集合中的field赋值value
$ hget &lt;key&gt;&lt;field&gt;
-- 从key集合中获取field的value
$ hmset &lt;key&gt;&lt;field1&gt;&lt;value1&gt;&lt;field2&gt;&lt;value2&gt;
-- 批量设置hash的值
$ hexists &lt;key&gt;&lt;field&gt;
-- 查看hash中给定的field是否存在
$ hkeys &lt;key&gt;
-- 列出该key的所有field
$ hvals &lt;key&gt;
-- 列出该key的所有value
$ hincrby &lt;key&gt;&lt;field&gt;&lt;increment&gt;
-- 为key中的field的value加1
$ hsetnx &lt;key&gt;&lt;field&gt;&lt;value&gt;
-- 将key中的field设置value值（当field不存在才设置值）
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="数据结构-3" tabindex="-1"><a class="header-anchor" href="#数据结构-3" aria-hidden="true">#</a> 数据结构</h3><ul><li>zipList，field-value长度较短且个数较少时使用</li><li>hashTable，field-value长度较长且个数较多时使用</li></ul><h2 id="zset" tabindex="-1"><a class="header-anchor" href="#zset" aria-hidden="true">#</a> Zset</h2><p>Zset类型是一种有序的集合，每个元素都有一个分数（score），用于排序。 在Redis中，Zset类型的value是一个哈希表，其中包含一个field和value的映射关系。</p><h3 id="常用指令-4" tabindex="-1"><a class="header-anchor" href="#常用指令-4" aria-hidden="true">#</a> 常用指令</h3><div class="language-redis line-numbers-mode" data-ext="redis"><pre class="language-redis"><code>$ zadd &lt;key&gt;&lt;score1&gt;&lt;value1&gt;&lt;score2&gt;&lt;value2&gt;
-- 将一个或多个元素及其分数加入到有序集合key中
$ zrange &lt;key&gt;&lt;start&gt;&lt;end&gt;[withScores]
-- 返回有序集合key中，下标在start到end之间的元素。WITHSCORE，可以让分数一起返回到结果集
$ zrangebyscore &lt;key&gt; minmax [withScores] [limit offset count]
-- 返回有序集合key中，所有score介于min和max之间（包含），有序集合的元素按score升序排列
$ zrevrangebyscore &lt;key&gt; maxmin [withScores] [limit offset count]
-- 返回有序集合key中，所有score介于min和max之间（包含），有序集合的元素按score降序排列
$ zincrby &lt;key&gt;&lt;increment&gt;&lt;value&gt;
-- 为元素的score加上增量value
$ zrem &lt;key&gt;&lt;value&gt;
-- 删除该集合下，指定的value
$ zcount &lt;key&gt;&lt;min&gt;&lt;max&gt;
-- 统计该集合，[min,max]之间的元素个数
$ zrank &lt;key&gt;&lt;value&gt;
-- 返回该集合中的排名（0开始）
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="数据结构-4" tabindex="-1"><a class="header-anchor" href="#数据结构-4" aria-hidden="true">#</a> 数据结构</h3><ul><li>hash，hash的作用就是关联元素value和权重score，保障元素value的唯—性，可以通过元素value找到相应的score值。</li><li>skipTable，跳跃表的目的在于给元素value排序，根据score的范围获取元素列表。</li></ul>`,32),a=[d];function t(r,v){return i(),l("div",null,a)}const c=e(s,[["render",t],["__file","shujuleixing.html.vue"]]);export{c as default};
