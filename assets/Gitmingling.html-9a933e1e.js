import{_ as n,o as s,c as a,b as e}from"./app-a60018d3.js";const i={},t=e(`<h2 id="pull" tabindex="-1"><a class="header-anchor" href="#pull" aria-hidden="true">#</a> pull</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">git</span> pull origin master
<span class="token comment"># 拉取远程的origin分支到本地master分支</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="push" tabindex="-1"><a class="header-anchor" href="#push" aria-hidden="true">#</a> push</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">git</span> push origin master
<span class="token comment"># 将本地master推送至远程origin分支</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="branch" tabindex="-1"><a class="header-anchor" href="#branch" aria-hidden="true">#</a> branch</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">git</span> branch testB
<span class="token comment"># 创建分支testB</span>
$ <span class="token function">git</span> checkout branchName
<span class="token comment"># 切换分支</span>
$ <span class="token function">git</span> checkout <span class="token parameter variable">-b</span> branchName
<span class="token comment"># 创建分支并切换</span>
$ <span class="token function">git</span> merge branchName
<span class="token comment"># 合并分支（将远程分支合并到本地）</span>
$ <span class="token function">git</span> branch <span class="token parameter variable">-d</span> branchName
<span class="token comment"># 删除分支，如果有修改还未merge，就会提示失败【可以使用-D来删除】</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="status" tabindex="-1"><a class="header-anchor" href="#status" aria-hidden="true">#</a> status</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">git</span> status
<span class="token comment"># 检查当前文件夹/文件的状态</span>
$ <span class="token function">git</span> status <span class="token parameter variable">-s</span>
<span class="token comment"># 打印简洁版的文件状态信息</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="add" tabindex="-1"><a class="header-anchor" href="#add" aria-hidden="true">#</a> add</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">git</span> <span class="token function">add</span> fileName
<span class="token comment"># 把当前文件添加到本地暂存区中</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="diff" tabindex="-1"><a class="header-anchor" href="#diff" aria-hidden="true">#</a> diff</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">git</span> <span class="token function">diff</span> <span class="token function">diff</span> <span class="token parameter variable">--git</span> a/filenameA b/filenameA 
<span class="token comment"># 查看暂存区和工作目录的差异</span>
$ <span class="token function">git</span> <span class="token function">diff</span> <span class="token parameter variable">--staged</span>
<span class="token comment"># 查看暂存区和git库之间的差异</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="commit" tabindex="-1"><a class="header-anchor" href="#commit" aria-hidden="true">#</a> commit</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">git</span> commit <span class="token parameter variable">-m</span> <span class="token string">&quot;msg&quot;</span>
<span class="token comment"># 提交更新(暂存区)</span>
$ <span class="token function">git</span> commit <span class="token parameter variable">-m</span> <span class="token parameter variable">-a</span> <span class="token string">&quot;msg&quot;</span>
<span class="token comment"># 提交更新（跳过暂存区）</span>
$ <span class="token function">git</span> commit <span class="token parameter variable">-amend</span>
<span class="token comment"># 重新提交</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="restore" tabindex="-1"><a class="header-anchor" href="#restore" aria-hidden="true">#</a> restore</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">git</span> restore <span class="token parameter variable">--staged</span> fileName
<span class="token comment"># 撤销暂存区的文件</span>
$ <span class="token function">git</span> restore fileName
<span class="token comment"># 撤销对文件的修改</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="revert" tabindex="-1"><a class="header-anchor" href="#revert" aria-hidden="true">#</a> revert</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">git</span> revert commitId
<span class="token comment"># 撤销对仓库文件的修改（已经commit的）</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="remote" tabindex="-1"><a class="header-anchor" href="#remote" aria-hidden="true">#</a> remote</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">git</span> remote
<span class="token comment"># 查看本地仓库对应的远程仓库</span>
$ <span class="token function">git</span> remote <span class="token parameter variable">-v</span>
<span class="token comment"># 远程仓库的详细信息</span>
$ <span class="token function">git</span> remote <span class="token function">add</span> rr git@gitee.com:yanguangzhi/new-project.git
<span class="token comment"># 添加远程仓库</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="log" tabindex="-1"><a class="header-anchor" href="#log" aria-hidden="true">#</a> log</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">git</span> log
<span class="token comment"># 查看全部提交记录</span>
$ <span class="token function">git</span> log <span class="token parameter variable">-num</span>
<span class="token comment"># 查看全部提交记录（限制查看num条数）</span>
$ <span class="token function">git</span> log <span class="token parameter variable">--patch</span>
<span class="token comment"># 显示每次提交所引入的差异</span>
$ <span class="token function">git</span> log <span class="token parameter variable">--stat</span>
<span class="token comment"># 显示简略信息</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="stash" tabindex="-1"><a class="header-anchor" href="#stash" aria-hidden="true">#</a> stash</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">git</span> stash <span class="token punctuation">[</span>save <span class="token string">&quot;&quot;</span><span class="token punctuation">]</span>
<span class="token comment"># 暂存未commit的代码（切分支常备）</span>
$ <span class="token function">git</span> stash apply <span class="token punctuation">[</span>stash@<span class="token punctuation">{</span>num<span class="token punctuation">}</span><span class="token punctuation">]</span>
<span class="token comment"># 恢复未commit的代码</span>
$ <span class="token function">git</span> stash list
<span class="token comment"># 列出stash记录</span>
$ <span class="token function">git</span> stash <span class="token function">clear</span>
<span class="token comment"># 删除stash所有记录</span>
$ <span class="token function">git</span> stash pop
<span class="token comment"># 应用最近一次stash记录并删除</span>
$ <span class="token function">git</span> stash drop
<span class="token comment"># 删除最近一次stash</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="reset" tabindex="-1"><a class="header-anchor" href="#reset" aria-hidden="true">#</a> reset</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">git</span> reset <span class="token parameter variable">--soft</span>
<span class="token comment"># 恢复最近一次的commit，如果是已经push的，需要强制使用git push -f来覆盖reset 的commit</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="revert-1" tabindex="-1"><a class="header-anchor" href="#revert-1" aria-hidden="true">#</a> revert</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">git</span> revert commitId
<span class="token comment"># 回退代码可以指定commit</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div>`,28),l=[t];function c(d,r){return s(),a("div",null,l)}const p=n(i,[["render",c],["__file","Gitmingling.html.vue"]]);export{p as default};
