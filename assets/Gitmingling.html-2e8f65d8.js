import{_ as s,o as a,c as n,a as e}from"./app-a6bbcd8f.js";const i={},l=e(`<h2 id="工作区" tabindex="-1"><a class="header-anchor" href="#工作区" aria-hidden="true">#</a> 工作区</h2><ol><li>工作区: 当前开发的目录【流水线】</li><li>暂存区: git cache缓存的目录【传输带】</li><li>版本库: 本地仓库【仓库】</li><li>远程仓库: 远程仓库【仓库】</li></ol><ul><li><p>设置用户签名【和代码托管平台的账号没有关系】</p><ul><li>git config --global user.name &quot;yanguangzhi&quot;</li><li>git config --global user.email &quot;ygz160101@163.com&quot;</li><li>git config --global credential store</li><li>git config list【查看当前配置】</li></ul></li><li><p>git init 【初始化仓库】</p></li></ul><h2 id="文件状态" tabindex="-1"><a class="header-anchor" href="#文件状态" aria-hidden="true">#</a> 文件状态</h2><ul><li><p>Untracked: 未跟踪</p></li><li><p>Modified: 已修改</p></li><li><p>Staged: 已暂存</p></li><li><p>Committed: 已提交</p></li><li><p>main/master 【主分支】</p></li><li><p>origin 【默认远程仓库】</p></li><li><p>HEAD 【指向当前分支的指针】</p></li><li><p>HEAD^ 【上一个版本】</p></li><li><p>HEAD^^ 【上上一个版本】</p></li></ul><h2 id="添加和提交" tabindex="-1"><a class="header-anchor" href="#添加和提交" aria-hidden="true">#</a> 添加和提交</h2><h3 id="add【添加】" tabindex="-1"><a class="header-anchor" href="#add【添加】" aria-hidden="true">#</a> add【添加】</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">git</span> <span class="token function">add</span> <span class="token operator">&lt;</span>fileName<span class="token operator">&gt;</span>
<span class="token comment"># 把当前文件添加到本地暂存区中</span>
<span class="token comment"># . 添加当前目录所有文件到暂存区【除开ignore的文件】</span>
<span class="token comment"># *.class 添加当前目录所有class文件到暂存区</span>
$ <span class="token function">git</span> status
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="commit【提交】" tabindex="-1"><a class="header-anchor" href="#commit【提交】" aria-hidden="true">#</a> commit【提交】</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">git</span> commit <span class="token parameter variable">-m</span> <span class="token string">&quot;msg&quot;</span>
<span class="token comment"># 提交更新(暂存区)到本地仓库</span>
$ <span class="token function">git</span> commit <span class="token parameter variable">-m</span> <span class="token parameter variable">-a</span> <span class="token string">&quot;msg&quot;</span>
<span class="token comment"># 提交所有已更新文件到本地仓库</span>
$ <span class="token function">git</span> commit <span class="token parameter variable">-amend</span>
<span class="token comment"># 重新提交</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="分支" tabindex="-1"><a class="header-anchor" href="#分支" aria-hidden="true">#</a> 分支</h2><h3 id="branch" tabindex="-1"><a class="header-anchor" href="#branch" aria-hidden="true">#</a> branch</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">git</span> branch
<span class="token comment"># 查看所有本地分支【当前分支会有*】</span>
<span class="token comment"># options: -r【查看远程分支】 -a【查看所有分支】</span>
$ <span class="token function">git</span> branch testB
<span class="token comment"># 创建新分支testB</span>
$ <span class="token function">git</span> checkout branchName
<span class="token comment"># 切换分支</span>
$ <span class="token function">git</span> checkout <span class="token parameter variable">-b</span> branchName
<span class="token comment"># 创建分支并切换</span>
$ <span class="token function">git</span> branch <span class="token parameter variable">-d</span> branchName
<span class="token comment"># 删除分支，如果有修改还未merge，就会提示失败【可以使用-D来删除】</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="merge【分支合并】" tabindex="-1"><a class="header-anchor" href="#merge【分支合并】" aria-hidden="true">#</a> merge【分支合并】</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$<span class="token punctuation">[</span>dev<span class="token punctuation">]</span> <span class="token function">git</span> merge main
<span class="token comment"># 合并分支main分支到dev分支</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="撤销-恢复" tabindex="-1"><a class="header-anchor" href="#撤销-恢复" aria-hidden="true">#</a> 撤销&amp;恢复</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">git</span> <span class="token function">mv</span> <span class="token operator">&lt;</span>file<span class="token operator">&gt;</span> <span class="token operator">&lt;</span>new-file<span class="token operator">&gt;</span>
<span class="token comment"># 移动文件到新位置</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">git</span> <span class="token function">rm</span> <span class="token operator">&lt;</span>file<span class="token operator">&gt;</span>
<span class="token comment"># 删除文件【把该文件工作区和暂存区删除，删除记录放在暂存区】</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">git</span> <span class="token function">rm</span> <span class="token parameter variable">--cached</span> <span class="token operator">&lt;</span>file<span class="token operator">&gt;</span>
<span class="token comment"># 删除暂存区文件【保留工作区文件，只是希望本文件不纳入版本控制】</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">git</span> checkout <span class="token operator">&lt;</span>file<span class="token operator">&gt;</span> <span class="token operator">&lt;</span>commitId<span class="token operator">&gt;</span>
<span class="token comment"># 恢复指定文件到指定commitId【提交】</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">git</span> reset <span class="token parameter variable">--soft</span> commitId
<span class="token comment"># -- soft 重置指定到commit，保留其工作区和暂存区的内容</span>
<span class="token comment"># -- hard 重置指定到commit，删除其工作区和暂存区的内容</span>
<span class="token comment"># -- mixed 重置指定到commit，保留其工作区内容，删除暂存区的内容</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">git</span> revert commitId
<span class="token comment"># 撤销对文件的修改【创建新提交，commitId的变化会抵消本地】</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">git</span> restore <span class="token parameter variable">--staged</span> fileName
<span class="token comment"># 撤销暂存区的文件【重新放回工作区】</span>
$ <span class="token function">git</span> restore fileName
<span class="token comment"># 撤销对文件的修改【回滚文件】</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="状态-差异" tabindex="-1"><a class="header-anchor" href="#状态-差异" aria-hidden="true">#</a> 状态 &amp; 差异</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">git</span> status
<span class="token comment"># 查看仓库状态，列出未提交/新/修改的文件</span>
<span class="token comment"># options: -s【打印简洁版的文件状态信息】</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">git</span> log <span class="token operator">&lt;</span>file<span class="token operator">&gt;</span>
<span class="token comment"># 查看全部提交记录 &lt;指定文件&gt;</span>
<span class="token comment"># options: --author=authorName【查看指定作者的提交记录】</span>
<span class="token comment">#          --since=date【查看指定日期之后的提交记录】</span>
<span class="token comment">#          --until=date【查看指定日期之前的提交记录】</span>
<span class="token comment">#          --author【查看指定提交人的提交记录】</span>
<span class="token comment">#          -num【查看全部提交记录（限制查看num条数）】</span>
<span class="token comment">#          --patch【显示每次提交所引入的差异】</span>
<span class="token comment">#          --stat【显示简略信息】</span>
<span class="token comment">#          --oneline【显示简略信息】</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">git</span> <span class="token function">diff</span> <span class="token operator">&lt;</span>commitIdA<span class="token operator">&gt;</span> <span class="token operator">&lt;</span>commitIdB<span class="token operator">&gt;</span> 
<span class="token comment"># 比较两个commitId之间的差异</span>
<span class="token comment"># options: --cached</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="stash" tabindex="-1"><a class="header-anchor" href="#stash" aria-hidden="true">#</a> Stash</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">git</span> stash save <span class="token string">&quot;Msg&quot;</span>
<span class="token comment"># 暂存未commit的代码（切分支常备）</span>
<span class="token comment"># options: -u 把所有未跟踪的文件也一并存储</span>
<span class="token comment">#          -a 把所有未跟踪和忽略的文件都一并存储</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">git</span> stash list
<span class="token comment"># 列出stash记录</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">git</span> stash pop
<span class="token comment"># 应用最近一次stash记录并删除</span>
$ <span class="token function">git</span> stash pop stash@<span class="token punctuation">{</span><span class="token number">2</span><span class="token punctuation">}</span>
<span class="token comment"># 应用指定stash记录并删除【2表示第三个stash、0表示最近的stash】</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">git</span> stash apply <span class="token punctuation">[</span>stash@<span class="token punctuation">{</span>num<span class="token punctuation">}</span><span class="token punctuation">]</span>
<span class="token comment"># 恢复未commit的代码</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">git</span> stash <span class="token function">clear</span>
<span class="token comment"># 删除stash所有记录</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">git</span> stash drop
<span class="token comment"># 删除最近一次stash</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="远程仓库" tabindex="-1"><a class="header-anchor" href="#远程仓库" aria-hidden="true">#</a> 远程仓库</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">git</span> remote <span class="token function">add</span> <span class="token operator">&lt;</span>remoteName<span class="token operator">&gt;</span> <span class="token operator">&lt;</span>remoteUrl<span class="token operator">&gt;</span>
<span class="token comment"># 添加远程仓库</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">git</span> remote <span class="token parameter variable">-v</span>
<span class="token comment"># 查看远程仓库的详细信息</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">git</span> remote <span class="token function">rm</span> <span class="token operator">&lt;</span>remoteName<span class="token operator">&gt;</span>
<span class="token comment"># 删除远程仓库</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">git</span> remote <span class="token function">rename</span> <span class="token operator">&lt;</span>oldName<span class="token operator">&gt;</span> <span class="token operator">&lt;</span>newName<span class="token operator">&gt;</span>
<span class="token comment"># 重命名远程仓库</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">git</span> pull <span class="token operator">&lt;</span>remoteName<span class="token operator">&gt;</span> <span class="token operator">&lt;</span>branchName<span class="token operator">&gt;</span>
<span class="token comment"># 从远程仓库拉取代码【默认拉取远程仓库名为origin的master/main分支】</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">git</span> push <span class="token operator">&lt;</span>remoteName<span class="token operator">&gt;</span> <span class="token operator">&lt;</span>branchName<span class="token operator">&gt;</span>
<span class="token comment"># 推送代码到远程仓库</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div>`,41),t=[l];function c(d,o){return a(),n("div",null,t)}const p=s(i,[["render",c],["__file","Gitmingling.html.vue"]]);export{p as default};
