import{_ as s,o as e,c as l,b as n,a}from"./app-a6bbcd8f.js";const t={},p=n("div",{class:"custom-container tip"},[n("svg",{xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 24 24"},[n("g",{fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"},[n("circle",{cx:"12",cy:"12",r:"9"}),n("path",{d:"M12 8h.01"}),n("path",{d:"M11 12h1v4h1"})])]),n("p",{class:"custom-container-title"},"TIP"),n("ul",null,[n("li",null,"命令式对象管理[$ kubectl run nginx-pod --image=nginx1.17.1 --port=80]"),n("li",null,"命令式对象配置[$ kubectl create/patch -f nginx-pod.yaml]"),n("li",null,"声明式对象配置[$ kubectl apply -f nginx-pod.yaml]")])],-1),i=a(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ kubectl <span class="token punctuation">[</span>command<span class="token punctuation">]</span> <span class="token punctuation">[</span>type<span class="token punctuation">]</span> <span class="token punctuation">[</span>name<span class="token punctuation">]</span> <span class="token punctuation">[</span>options<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>command，执行操作（create、get、delete）</li><li>type，资源类型（deployment、pod、service）</li><li>name，资源名称</li><li>options，额外可选参数</li></ul><h2 id="namespace" tabindex="-1"><a class="header-anchor" href="#namespace" aria-hidden="true">#</a> Namespace</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ kubectl create namespace dev
<span class="token comment"># 创建一个namespace</span>
$ kubectl get ns
<span class="token comment"># 查看所有的namespace</span>
$ kubectl get ns dev
<span class="token comment"># 查看指定的namespace</span>
$ kubectl get ns dev <span class="token parameter variable">-o</span> yaml
<span class="token comment"># 查看指定的namespace，以yaml格式展示</span>
$ kubectl describe ns dev
<span class="token comment"># 查看ns详情信息</span>
$ kubectl delete ns dev
<span class="token comment"># 删除namespace</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Namespace
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> dev
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="pod" tabindex="-1"><a class="header-anchor" href="#pod" aria-hidden="true">#</a> Pod</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ kubectl run pod <span class="token parameter variable">--image</span><span class="token operator">=</span>nginx <span class="token parameter variable">-n</span> dev
<span class="token comment"># 在dev namespace下创建并运行一个nginx的pod</span>
$ kubectl get pod
<span class="token comment"># 查看所有的pod</span>
$ kubectl get pod podName
<span class="token comment"># 指定查看某个pod</span>
$ kubectl get pod podName <span class="token parameter variable">-o</span> yaml
<span class="token comment"># 查看某个pod，以yaml格式展示（常见格式wide、json、yaml）</span>
$ kubectl describe pod podName <span class="token parameter variable">-n</span> dev
<span class="token comment"># 查看dev namespace下的指定pod的详细信息</span>
$ kubectl get pod <span class="token parameter variable">-n</span> dev
<span class="token comment"># 查看dev下的pod</span>
$ kubectl logs Pod名字
<span class="token comment"># 查看Pod的运行日志</span>
$ kubectl delete pod NAME
<span class="token comment"># 删除指定NAME的pod</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="deployment" tabindex="-1"><a class="header-anchor" href="#deployment" aria-hidden="true">#</a> Deployment</h2><p>控制Pod部署、使Pod拥有多副本、自愈、扩缩容等能力</p><h3 id="多副本" tabindex="-1"><a class="header-anchor" href="#多副本" aria-hidden="true">#</a> 多副本</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ kubectl create deployment my-dep <span class="token parameter variable">--image</span><span class="token operator">=</span>nginx <span class="token parameter variable">--replicas</span><span class="token operator">=</span><span class="token number">3</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> apps/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Deployment
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> my<span class="token punctuation">-</span>dep
  <span class="token key atrule">name</span><span class="token punctuation">:</span> my<span class="token punctuation">-</span>dep
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">replicas</span><span class="token punctuation">:</span> <span class="token number">3</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">matchLabels</span><span class="token punctuation">:</span>
      <span class="token key atrule">app</span><span class="token punctuation">:</span> my<span class="token punctuation">-</span>dep
  <span class="token key atrule">template</span><span class="token punctuation">:</span>
    <span class="token key atrule">metadata</span><span class="token punctuation">:</span>
      <span class="token key atrule">labels</span><span class="token punctuation">:</span>
        <span class="token key atrule">app</span><span class="token punctuation">:</span> my<span class="token punctuation">-</span>dep
    <span class="token key atrule">spec</span><span class="token punctuation">:</span>
      <span class="token key atrule">containers</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">image</span><span class="token punctuation">:</span> nginx
          <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="扩缩容" tabindex="-1"><a class="header-anchor" href="#扩缩容" aria-hidden="true">#</a> 扩缩容</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ kubectl scale <span class="token parameter variable">--replicas</span><span class="token operator">=</span><span class="token number">5</span> deploymeny/my-dep
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ kubectl edit deployment my-dep
<span class="token comment"># 修改replicas</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="自愈故障转移" tabindex="-1"><a class="header-anchor" href="#自愈故障转移" aria-hidden="true">#</a> 自愈故障转移</h3><p>在机器停机、Pod移除、容器崩溃等情况，deploy会自动再部署</p><h3 id="滚动更新" tabindex="-1"><a class="header-anchor" href="#滚动更新" aria-hidden="true">#</a> 滚动更新</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ cubectl <span class="token builtin class-name">set</span> image deployment/my-dep <span class="token assign-left variable">nginx</span><span class="token operator">=</span>nginx:1.16.1 <span class="token parameter variable">--record</span>
$ cubectl rollout status deployment/my-dep
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="版本回退" tabindex="-1"><a class="header-anchor" href="#版本回退" aria-hidden="true">#</a> 版本回退</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ kubectl rollout <span class="token function">history</span> deployment/my-dep
<span class="token comment"># 历史记录</span>
$ kubectl rollout <span class="token function">history</span> deployment/my-dep <span class="token parameter variable">--version</span><span class="token operator">=</span><span class="token number">2</span>
<span class="token comment"># 查看某个历史详情</span>
$ kubectl rollout undo deployment/my-dep
<span class="token comment"># 回滚上次</span>
$ kubectl rollout undo deployment/my-dep --to-version<span class="token operator">=</span><span class="token number">2</span>
<span class="token comment"># 回滚到指定版本</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,21),c=n("div",{class:"custom-container tip"},[n("svg",{xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 24 24"},[n("g",{fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"},[n("circle",{cx:"12",cy:"12",r:"9"}),n("path",{d:"M12 8h.01"}),n("path",{d:"M11 12h1v4h1"})])]),n("p",{class:"custom-container-title"},"工作负载"),n("ul",null,[n("li",null,"Deployment，无状态副本集，比如服务模块"),n("li",null,"StatefulSet，有状态副本集，比如redis、mysql"),n("li",null,"DaemonSet，守护进程集，比如日志收集组件每个机器都可以运行一份"),n("li",null,"Job，任务/定时任务，比如垃圾清理组件，指定时间运行")])],-1),o=a(`<h2 id="service" tabindex="-1"><a class="header-anchor" href="#service" aria-hidden="true">#</a> Service</h2><p>将一组Pods公开为网络服务，集群内就可以使用service的IP: Port负载均衡的访问（也可以使用集群内域名访问[服务名.命名空间.svc:port]）</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ kubectl expose deployment my-dep <span class="token parameter variable">--port</span><span class="token operator">=</span><span class="token number">8000</span> --target-port<span class="token operator">=</span><span class="token number">80</span>
<span class="token comment"># 暴露deploy</span>
$ kubectl get pod <span class="token parameter variable">-l</span> <span class="token assign-left variable">app</span><span class="token operator">=</span>my-dep
<span class="token comment"># 根据标签检索pod</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Service
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> my<span class="token punctuation">-</span>dep
  <span class="token key atrule">name</span><span class="token punctuation">:</span> my<span class="token punctuation">-</span>dep
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> my<span class="token punctuation">-</span>dep
  <span class="token key atrule">ports</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">8000</span>
      <span class="token key atrule">protocol</span><span class="token punctuation">:</span> TCP
      <span class="token key atrule">targetPort</span><span class="token punctuation">:</span> <span class="token number">80</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="clusterip" tabindex="-1"><a class="header-anchor" href="#clusterip" aria-hidden="true">#</a> ClusterIP</h3><p>只能在集群内访问</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ kubectl expose deployment my-dep <span class="token parameter variable">--port</span><span class="token operator">=</span><span class="token number">8000</span> --target-port<span class="token operator">=</span><span class="token number">80</span> <span class="token parameter variable">--type</span><span class="token operator">=</span>ClusterIP
<span class="token comment"># 等同于没有设置type</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Service
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> my<span class="token punctuation">-</span>dep
  <span class="token key atrule">name</span><span class="token punctuation">:</span> my<span class="token punctuation">-</span>dep
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">ports</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">8000</span>
      <span class="token key atrule">protocol</span><span class="token punctuation">:</span> TCP
      <span class="token key atrule">targetPort</span><span class="token punctuation">:</span> <span class="token number">80</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> my<span class="token punctuation">-</span>dep
  <span class="token key atrule">type</span><span class="token punctuation">:</span> ClusterIP
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="nodeport" tabindex="-1"><a class="header-anchor" href="#nodeport" aria-hidden="true">#</a> NodePort</h3><p>可以在集群外访问，NodePort暴露的端口范围在30000-32767之间</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ kubectl expose deployment my-dep <span class="token parameter variable">--port</span><span class="token operator">=</span><span class="token number">8000</span> --target-port<span class="token operator">=</span><span class="token number">80</span> <span class="token parameter variable">--type</span><span class="token operator">=</span>NodePort
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Service
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> my<span class="token punctuation">-</span>dep
  <span class="token key atrule">name</span><span class="token punctuation">:</span> my<span class="token punctuation">-</span>dep
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">ports</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">8000</span>
      <span class="token key atrule">protocol</span><span class="token punctuation">:</span> TCP
      <span class="token key atrule">targetPort</span><span class="token punctuation">:</span> <span class="token number">80</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> my<span class="token punctuation">-</span>dep
  <span class="token key atrule">type</span><span class="token punctuation">:</span> NodePort
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,12),d=[p,i,c,o];function r(u,m){return e(),l("div",null,d)}const k=s(t,[["render",r],["__file","k8sziyuanguanli.html.vue"]]);export{k as default};
