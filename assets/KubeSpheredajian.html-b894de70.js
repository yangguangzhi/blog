import{_ as i,r as t,o as u,c as o,b as n,e as a,w as p,d as s,a as l}from"./app-a6bbcd8f.js";const r={},k=n("h2",{id:"环境准备",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#环境准备","aria-hidden":"true"},"#"),s(" 环境准备")],-1),d=n("h3",{id:"安装docker",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#安装docker","aria-hidden":"true"},"#"),s(" 安装Docker")],-1),v=n("h3",{id:"安装k8s",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#安装k8s","aria-hidden":"true"},"#"),s(" 安装K8S")],-1),m=l(`<h3 id="前置环境" tabindex="-1"><a class="header-anchor" href="#前置环境" aria-hidden="true">#</a> 前置环境</h3><ol><li>安装nfs文件系统</li></ol><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ yum <span class="token function">install</span> <span class="token parameter variable">-y</span> nfs-utils
<span class="token comment"># 在每个机器。</span>
$ <span class="token builtin class-name">echo</span> <span class="token string">&quot;/nfs/data/ *(insecure,rw,sync,no_root_squash)&quot;</span> <span class="token operator">&gt;</span> /etc/exports
<span class="token comment"># 在master 执行以下命令 </span>
$ <span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /nfs/data
<span class="token comment"># 执行以下命令，启动 nfs 服务;创建共享目录</span>
$ systemctl <span class="token builtin class-name">enable</span> rpcbind
$ systemctl <span class="token builtin class-name">enable</span> nfs-server
$ systemctl start rpcbind
$ systemctl start nfs-server
<span class="token comment"># 在master执行</span>
$ exportfs <span class="token parameter variable">-r</span>
<span class="token comment"># 使配置生效</span>
$ exportfs
<span class="token comment">#检查配置是否生效</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li>配置nfs-client</li></ol><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ showmount <span class="token parameter variable">-e</span> masterIP
$ <span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /nfs/data
$ <span class="token function">mount</span> <span class="token parameter variable">-t</span> nfs masterIP:/nfs/data /nfs/data
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3"><li>配置默认存储</li></ol><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token comment">## 创建了一个存储类</span>
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> storage.k8s.io/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> StorageClass
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> nfs<span class="token punctuation">-</span>storage
  <span class="token key atrule">annotations</span><span class="token punctuation">:</span>
    <span class="token key atrule">storageclass.kubernetes.io/is-default-class</span><span class="token punctuation">:</span> <span class="token string">&quot;true&quot;</span>
<span class="token key atrule">provisioner</span><span class="token punctuation">:</span> k8s<span class="token punctuation">-</span>sigs.io/nfs<span class="token punctuation">-</span>subdir<span class="token punctuation">-</span>external<span class="token punctuation">-</span>provisioner
<span class="token key atrule">parameters</span><span class="token punctuation">:</span>
  <span class="token key atrule">archiveOnDelete</span><span class="token punctuation">:</span> <span class="token string">&quot;true&quot;</span>  <span class="token comment">## 删除pv的时候，pv的内容是否要备份</span>

<span class="token punctuation">---</span>
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> apps/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Deployment
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> nfs<span class="token punctuation">-</span>client<span class="token punctuation">-</span>provisioner
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> nfs<span class="token punctuation">-</span>client<span class="token punctuation">-</span>provisioner
  <span class="token comment"># replace with namespace where provisioner is deployed</span>
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> default
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">replicas</span><span class="token punctuation">:</span> <span class="token number">1</span>
  <span class="token key atrule">strategy</span><span class="token punctuation">:</span>
    <span class="token key atrule">type</span><span class="token punctuation">:</span> Recreate
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">matchLabels</span><span class="token punctuation">:</span>
      <span class="token key atrule">app</span><span class="token punctuation">:</span> nfs<span class="token punctuation">-</span>client<span class="token punctuation">-</span>provisioner
  <span class="token key atrule">template</span><span class="token punctuation">:</span>
    <span class="token key atrule">metadata</span><span class="token punctuation">:</span>
      <span class="token key atrule">labels</span><span class="token punctuation">:</span>
        <span class="token key atrule">app</span><span class="token punctuation">:</span> nfs<span class="token punctuation">-</span>client<span class="token punctuation">-</span>provisioner
    <span class="token key atrule">spec</span><span class="token punctuation">:</span>
      <span class="token key atrule">serviceAccountName</span><span class="token punctuation">:</span> nfs<span class="token punctuation">-</span>client<span class="token punctuation">-</span>provisioner
      <span class="token key atrule">containers</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> nfs<span class="token punctuation">-</span>client<span class="token punctuation">-</span>provisioner
          <span class="token key atrule">image</span><span class="token punctuation">:</span> registry.cn<span class="token punctuation">-</span>hangzhou.aliyuncs.com/lfy_k8s_images/nfs<span class="token punctuation">-</span>subdir<span class="token punctuation">-</span>external<span class="token punctuation">-</span>provisioner<span class="token punctuation">:</span>v4.0.2
          <span class="token comment"># resources:</span>
          <span class="token comment">#    limits:</span>
          <span class="token comment">#      cpu: 10m</span>
          <span class="token comment">#    requests:</span>
          <span class="token comment">#      cpu: 10m</span>
          <span class="token key atrule">volumeMounts</span><span class="token punctuation">:</span>
            <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> nfs<span class="token punctuation">-</span>client<span class="token punctuation">-</span>root
              <span class="token key atrule">mountPath</span><span class="token punctuation">:</span> /persistentvolumes
          <span class="token key atrule">env</span><span class="token punctuation">:</span>
            <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> PROVISIONER_NAME
              <span class="token key atrule">value</span><span class="token punctuation">:</span> k8s<span class="token punctuation">-</span>sigs.io/nfs<span class="token punctuation">-</span>subdir<span class="token punctuation">-</span>external<span class="token punctuation">-</span>provisioner
            <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> NFS_SERVER
              <span class="token key atrule">value</span><span class="token punctuation">:</span> 172.31.0.4 <span class="token comment">## 指定自己nfs服务器地址</span>
            <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> NFS_PATH
              <span class="token key atrule">value</span><span class="token punctuation">:</span> /nfs/data  <span class="token comment">## nfs服务器共享的目录</span>
      <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> nfs<span class="token punctuation">-</span>client<span class="token punctuation">-</span>root
          <span class="token key atrule">nfs</span><span class="token punctuation">:</span>
            <span class="token key atrule">server</span><span class="token punctuation">:</span> 172.31.0.4
            <span class="token key atrule">path</span><span class="token punctuation">:</span> /nfs/data
<span class="token punctuation">---</span>
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> ServiceAccount
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> nfs<span class="token punctuation">-</span>client<span class="token punctuation">-</span>provisioner
  <span class="token comment"># replace with namespace where provisioner is deployed</span>
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> default
<span class="token punctuation">---</span>
<span class="token key atrule">kind</span><span class="token punctuation">:</span> ClusterRole
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> rbac.authorization.k8s.io/v1
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> nfs<span class="token punctuation">-</span>client<span class="token punctuation">-</span>provisioner<span class="token punctuation">-</span>runner
<span class="token key atrule">rules</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">apiGroups</span><span class="token punctuation">:</span> <span class="token punctuation">[</span> <span class="token string">&quot;&quot;</span> <span class="token punctuation">]</span>
    <span class="token key atrule">resources</span><span class="token punctuation">:</span> <span class="token punctuation">[</span> <span class="token string">&quot;nodes&quot;</span> <span class="token punctuation">]</span>
    <span class="token key atrule">verbs</span><span class="token punctuation">:</span> <span class="token punctuation">[</span> <span class="token string">&quot;get&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;list&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;watch&quot;</span> <span class="token punctuation">]</span>
  <span class="token punctuation">-</span> <span class="token key atrule">apiGroups</span><span class="token punctuation">:</span> <span class="token punctuation">[</span> <span class="token string">&quot;&quot;</span> <span class="token punctuation">]</span>
    <span class="token key atrule">resources</span><span class="token punctuation">:</span> <span class="token punctuation">[</span> <span class="token string">&quot;persistentvolumes&quot;</span> <span class="token punctuation">]</span>
    <span class="token key atrule">verbs</span><span class="token punctuation">:</span> <span class="token punctuation">[</span> <span class="token string">&quot;get&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;list&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;watch&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;create&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;delete&quot;</span> <span class="token punctuation">]</span>
  <span class="token punctuation">-</span> <span class="token key atrule">apiGroups</span><span class="token punctuation">:</span> <span class="token punctuation">[</span> <span class="token string">&quot;&quot;</span> <span class="token punctuation">]</span>
    <span class="token key atrule">resources</span><span class="token punctuation">:</span> <span class="token punctuation">[</span> <span class="token string">&quot;persistentvolumeclaims&quot;</span> <span class="token punctuation">]</span>
    <span class="token key atrule">verbs</span><span class="token punctuation">:</span> <span class="token punctuation">[</span> <span class="token string">&quot;get&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;list&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;watch&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;update&quot;</span> <span class="token punctuation">]</span>
  <span class="token punctuation">-</span> <span class="token key atrule">apiGroups</span><span class="token punctuation">:</span> <span class="token punctuation">[</span> <span class="token string">&quot;storage.k8s.io&quot;</span> <span class="token punctuation">]</span>
    <span class="token key atrule">resources</span><span class="token punctuation">:</span> <span class="token punctuation">[</span> <span class="token string">&quot;storageclasses&quot;</span> <span class="token punctuation">]</span>
    <span class="token key atrule">verbs</span><span class="token punctuation">:</span> <span class="token punctuation">[</span> <span class="token string">&quot;get&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;list&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;watch&quot;</span> <span class="token punctuation">]</span>
  <span class="token punctuation">-</span> <span class="token key atrule">apiGroups</span><span class="token punctuation">:</span> <span class="token punctuation">[</span> <span class="token string">&quot;&quot;</span> <span class="token punctuation">]</span>
    <span class="token key atrule">resources</span><span class="token punctuation">:</span> <span class="token punctuation">[</span> <span class="token string">&quot;events&quot;</span> <span class="token punctuation">]</span>
    <span class="token key atrule">verbs</span><span class="token punctuation">:</span> <span class="token punctuation">[</span> <span class="token string">&quot;create&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;update&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;patch&quot;</span> <span class="token punctuation">]</span>
<span class="token punctuation">---</span>
<span class="token key atrule">kind</span><span class="token punctuation">:</span> ClusterRoleBinding
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> rbac.authorization.k8s.io/v1
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> run<span class="token punctuation">-</span>nfs<span class="token punctuation">-</span>client<span class="token punctuation">-</span>provisioner
<span class="token key atrule">subjects</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">kind</span><span class="token punctuation">:</span> ServiceAccount
    <span class="token key atrule">name</span><span class="token punctuation">:</span> nfs<span class="token punctuation">-</span>client<span class="token punctuation">-</span>provisioner
    <span class="token comment"># replace with namespace where provisioner is deployed</span>
    <span class="token key atrule">namespace</span><span class="token punctuation">:</span> default
<span class="token key atrule">roleRef</span><span class="token punctuation">:</span>
  <span class="token key atrule">kind</span><span class="token punctuation">:</span> ClusterRole
  <span class="token key atrule">name</span><span class="token punctuation">:</span> nfs<span class="token punctuation">-</span>client<span class="token punctuation">-</span>provisioner<span class="token punctuation">-</span>runner
  <span class="token key atrule">apiGroup</span><span class="token punctuation">:</span> rbac.authorization.k8s.io
<span class="token punctuation">---</span>
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Role
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> rbac.authorization.k8s.io/v1
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> leader<span class="token punctuation">-</span>locking<span class="token punctuation">-</span>nfs<span class="token punctuation">-</span>client<span class="token punctuation">-</span>provisioner
  <span class="token comment"># replace with namespace where provisioner is deployed</span>
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> default
<span class="token key atrule">rules</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">apiGroups</span><span class="token punctuation">:</span> <span class="token punctuation">[</span> <span class="token string">&quot;&quot;</span> <span class="token punctuation">]</span>
    <span class="token key atrule">resources</span><span class="token punctuation">:</span> <span class="token punctuation">[</span> <span class="token string">&quot;endpoints&quot;</span> <span class="token punctuation">]</span>
    <span class="token key atrule">verbs</span><span class="token punctuation">:</span> <span class="token punctuation">[</span> <span class="token string">&quot;get&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;list&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;watch&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;create&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;update&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;patch&quot;</span> <span class="token punctuation">]</span>
<span class="token punctuation">---</span>
<span class="token key atrule">kind</span><span class="token punctuation">:</span> RoleBinding
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> rbac.authorization.k8s.io/v1
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> leader<span class="token punctuation">-</span>locking<span class="token punctuation">-</span>nfs<span class="token punctuation">-</span>client<span class="token punctuation">-</span>provisioner
  <span class="token comment"># replace with namespace where provisioner is deployed</span>
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> default
<span class="token key atrule">subjects</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">kind</span><span class="token punctuation">:</span> ServiceAccount
    <span class="token key atrule">name</span><span class="token punctuation">:</span> nfs<span class="token punctuation">-</span>client<span class="token punctuation">-</span>provisioner
    <span class="token comment"># replace with namespace where provisioner is deployed</span>
    <span class="token key atrule">namespace</span><span class="token punctuation">:</span> default
<span class="token key atrule">roleRef</span><span class="token punctuation">:</span>
  <span class="token key atrule">kind</span><span class="token punctuation">:</span> Role
  <span class="token key atrule">name</span><span class="token punctuation">:</span> leader<span class="token punctuation">-</span>locking<span class="token punctuation">-</span>nfs<span class="token punctuation">-</span>client<span class="token punctuation">-</span>provisioner
  <span class="token key atrule">apiGroup</span><span class="token punctuation">:</span> rbac.authorization.k8s.io
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ kubectl get sc
<span class="token comment"># 检测是否生效</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ol start="4"><li>metrics-server（集群指标监控组件）</li></ol><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> ServiceAccount
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">k8s-app</span><span class="token punctuation">:</span> metrics<span class="token punctuation">-</span>server
  <span class="token key atrule">name</span><span class="token punctuation">:</span> metrics<span class="token punctuation">-</span>server
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> kube<span class="token punctuation">-</span>system
<span class="token punctuation">---</span>
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> rbac.authorization.k8s.io/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> ClusterRole
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">k8s-app</span><span class="token punctuation">:</span> metrics<span class="token punctuation">-</span>server
    <span class="token key atrule">rbac.authorization.k8s.io/aggregate-to-admin</span><span class="token punctuation">:</span> <span class="token string">&quot;true&quot;</span>
    <span class="token key atrule">rbac.authorization.k8s.io/aggregate-to-edit</span><span class="token punctuation">:</span> <span class="token string">&quot;true&quot;</span>
    <span class="token key atrule">rbac.authorization.k8s.io/aggregate-to-view</span><span class="token punctuation">:</span> <span class="token string">&quot;true&quot;</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> system<span class="token punctuation">:</span>aggregated<span class="token punctuation">-</span>metrics<span class="token punctuation">-</span>reader
<span class="token key atrule">rules</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">apiGroups</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> metrics.k8s.io
    <span class="token key atrule">resources</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> pods
      <span class="token punctuation">-</span> nodes
    <span class="token key atrule">verbs</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> get
      <span class="token punctuation">-</span> list
      <span class="token punctuation">-</span> watch
<span class="token punctuation">---</span>
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> rbac.authorization.k8s.io/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> ClusterRole
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">k8s-app</span><span class="token punctuation">:</span> metrics<span class="token punctuation">-</span>server
  <span class="token key atrule">name</span><span class="token punctuation">:</span> system<span class="token punctuation">:</span>metrics<span class="token punctuation">-</span>server
<span class="token key atrule">rules</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">apiGroups</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token string">&quot;&quot;</span>
    <span class="token key atrule">resources</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> pods
      <span class="token punctuation">-</span> nodes
      <span class="token punctuation">-</span> nodes/stats
      <span class="token punctuation">-</span> namespaces
      <span class="token punctuation">-</span> configmaps
    <span class="token key atrule">verbs</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> get
      <span class="token punctuation">-</span> list
      <span class="token punctuation">-</span> watch
<span class="token punctuation">---</span>
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> rbac.authorization.k8s.io/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> RoleBinding
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">k8s-app</span><span class="token punctuation">:</span> metrics<span class="token punctuation">-</span>server
  <span class="token key atrule">name</span><span class="token punctuation">:</span> metrics<span class="token punctuation">-</span>server<span class="token punctuation">-</span>auth<span class="token punctuation">-</span>reader
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> kube<span class="token punctuation">-</span>system
<span class="token key atrule">roleRef</span><span class="token punctuation">:</span>
  <span class="token key atrule">apiGroup</span><span class="token punctuation">:</span> rbac.authorization.k8s.io
  <span class="token key atrule">kind</span><span class="token punctuation">:</span> Role
  <span class="token key atrule">name</span><span class="token punctuation">:</span> extension<span class="token punctuation">-</span>apiserver<span class="token punctuation">-</span>authentication<span class="token punctuation">-</span>reader
<span class="token key atrule">subjects</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">kind</span><span class="token punctuation">:</span> ServiceAccount
    <span class="token key atrule">name</span><span class="token punctuation">:</span> metrics<span class="token punctuation">-</span>server
    <span class="token key atrule">namespace</span><span class="token punctuation">:</span> kube<span class="token punctuation">-</span>system
<span class="token punctuation">---</span>
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> rbac.authorization.k8s.io/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> ClusterRoleBinding
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">k8s-app</span><span class="token punctuation">:</span> metrics<span class="token punctuation">-</span>server
  <span class="token key atrule">name</span><span class="token punctuation">:</span> metrics<span class="token punctuation">-</span>server<span class="token punctuation">:</span>system<span class="token punctuation">:</span>auth<span class="token punctuation">-</span>delegator
<span class="token key atrule">roleRef</span><span class="token punctuation">:</span>
  <span class="token key atrule">apiGroup</span><span class="token punctuation">:</span> rbac.authorization.k8s.io
  <span class="token key atrule">kind</span><span class="token punctuation">:</span> ClusterRole
  <span class="token key atrule">name</span><span class="token punctuation">:</span> system<span class="token punctuation">:</span>auth<span class="token punctuation">-</span>delegator
<span class="token key atrule">subjects</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">kind</span><span class="token punctuation">:</span> ServiceAccount
    <span class="token key atrule">name</span><span class="token punctuation">:</span> metrics<span class="token punctuation">-</span>server
    <span class="token key atrule">namespace</span><span class="token punctuation">:</span> kube<span class="token punctuation">-</span>system
<span class="token punctuation">---</span>
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> rbac.authorization.k8s.io/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> ClusterRoleBinding
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">k8s-app</span><span class="token punctuation">:</span> metrics<span class="token punctuation">-</span>server
  <span class="token key atrule">name</span><span class="token punctuation">:</span> system<span class="token punctuation">:</span>metrics<span class="token punctuation">-</span>server
<span class="token key atrule">roleRef</span><span class="token punctuation">:</span>
  <span class="token key atrule">apiGroup</span><span class="token punctuation">:</span> rbac.authorization.k8s.io
  <span class="token key atrule">kind</span><span class="token punctuation">:</span> ClusterRole
  <span class="token key atrule">name</span><span class="token punctuation">:</span> system<span class="token punctuation">:</span>metrics<span class="token punctuation">-</span>server
<span class="token key atrule">subjects</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">kind</span><span class="token punctuation">:</span> ServiceAccount
    <span class="token key atrule">name</span><span class="token punctuation">:</span> metrics<span class="token punctuation">-</span>server
    <span class="token key atrule">namespace</span><span class="token punctuation">:</span> kube<span class="token punctuation">-</span>system
<span class="token punctuation">---</span>
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Service
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">k8s-app</span><span class="token punctuation">:</span> metrics<span class="token punctuation">-</span>server
  <span class="token key atrule">name</span><span class="token punctuation">:</span> metrics<span class="token punctuation">-</span>server
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> kube<span class="token punctuation">-</span>system
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">ports</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> https
      <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">443</span>
      <span class="token key atrule">protocol</span><span class="token punctuation">:</span> TCP
      <span class="token key atrule">targetPort</span><span class="token punctuation">:</span> https
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">k8s-app</span><span class="token punctuation">:</span> metrics<span class="token punctuation">-</span>server
<span class="token punctuation">---</span>
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> apps/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Deployment
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">k8s-app</span><span class="token punctuation">:</span> metrics<span class="token punctuation">-</span>server
  <span class="token key atrule">name</span><span class="token punctuation">:</span> metrics<span class="token punctuation">-</span>server
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> kube<span class="token punctuation">-</span>system
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">matchLabels</span><span class="token punctuation">:</span>
      <span class="token key atrule">k8s-app</span><span class="token punctuation">:</span> metrics<span class="token punctuation">-</span>server
  <span class="token key atrule">strategy</span><span class="token punctuation">:</span>
    <span class="token key atrule">rollingUpdate</span><span class="token punctuation">:</span>
      <span class="token key atrule">maxUnavailable</span><span class="token punctuation">:</span> <span class="token number">0</span>
  <span class="token key atrule">template</span><span class="token punctuation">:</span>
    <span class="token key atrule">metadata</span><span class="token punctuation">:</span>
      <span class="token key atrule">labels</span><span class="token punctuation">:</span>
        <span class="token key atrule">k8s-app</span><span class="token punctuation">:</span> metrics<span class="token punctuation">-</span>server
    <span class="token key atrule">spec</span><span class="token punctuation">:</span>
      <span class="token key atrule">containers</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">args</span><span class="token punctuation">:</span>
            <span class="token punctuation">-</span> <span class="token punctuation">-</span><span class="token punctuation">-</span>cert<span class="token punctuation">-</span>dir=/tmp
            <span class="token punctuation">-</span> <span class="token punctuation">-</span><span class="token punctuation">-</span>kubelet<span class="token punctuation">-</span>insecure<span class="token punctuation">-</span>tls
            <span class="token punctuation">-</span> <span class="token punctuation">-</span><span class="token punctuation">-</span>secure<span class="token punctuation">-</span>port=4443
            <span class="token punctuation">-</span> <span class="token punctuation">-</span><span class="token punctuation">-</span>kubelet<span class="token punctuation">-</span>preferred<span class="token punctuation">-</span>address<span class="token punctuation">-</span>types=InternalIP<span class="token punctuation">,</span>ExternalIP<span class="token punctuation">,</span>Hostname
            <span class="token punctuation">-</span> <span class="token punctuation">-</span><span class="token punctuation">-</span>kubelet<span class="token punctuation">-</span>use<span class="token punctuation">-</span>node<span class="token punctuation">-</span>status<span class="token punctuation">-</span>port
          <span class="token key atrule">image</span><span class="token punctuation">:</span> registry.cn<span class="token punctuation">-</span>hangzhou.aliyuncs.com/lfy_k8s_images/metrics<span class="token punctuation">-</span>server<span class="token punctuation">:</span>v0.4.3
          <span class="token key atrule">imagePullPolicy</span><span class="token punctuation">:</span> IfNotPresent
          <span class="token key atrule">livenessProbe</span><span class="token punctuation">:</span>
            <span class="token key atrule">failureThreshold</span><span class="token punctuation">:</span> <span class="token number">3</span>
            <span class="token key atrule">httpGet</span><span class="token punctuation">:</span>
              <span class="token key atrule">path</span><span class="token punctuation">:</span> /livez
              <span class="token key atrule">port</span><span class="token punctuation">:</span> https
              <span class="token key atrule">scheme</span><span class="token punctuation">:</span> HTTPS
            <span class="token key atrule">periodSeconds</span><span class="token punctuation">:</span> <span class="token number">10</span>
          <span class="token key atrule">name</span><span class="token punctuation">:</span> metrics<span class="token punctuation">-</span>server
          <span class="token key atrule">ports</span><span class="token punctuation">:</span>
            <span class="token punctuation">-</span> <span class="token key atrule">containerPort</span><span class="token punctuation">:</span> <span class="token number">4443</span>
              <span class="token key atrule">name</span><span class="token punctuation">:</span> https
              <span class="token key atrule">protocol</span><span class="token punctuation">:</span> TCP
          <span class="token key atrule">readinessProbe</span><span class="token punctuation">:</span>
            <span class="token key atrule">failureThreshold</span><span class="token punctuation">:</span> <span class="token number">3</span>
            <span class="token key atrule">httpGet</span><span class="token punctuation">:</span>
              <span class="token key atrule">path</span><span class="token punctuation">:</span> /readyz
              <span class="token key atrule">port</span><span class="token punctuation">:</span> https
              <span class="token key atrule">scheme</span><span class="token punctuation">:</span> HTTPS
            <span class="token key atrule">periodSeconds</span><span class="token punctuation">:</span> <span class="token number">10</span>
          <span class="token key atrule">securityContext</span><span class="token punctuation">:</span>
            <span class="token key atrule">readOnlyRootFilesystem</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
            <span class="token key atrule">runAsNonRoot</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
            <span class="token key atrule">runAsUser</span><span class="token punctuation">:</span> <span class="token number">1000</span>
          <span class="token key atrule">volumeMounts</span><span class="token punctuation">:</span>
            <span class="token punctuation">-</span> <span class="token key atrule">mountPath</span><span class="token punctuation">:</span> /tmp
              <span class="token key atrule">name</span><span class="token punctuation">:</span> tmp<span class="token punctuation">-</span>dir
      <span class="token key atrule">nodeSelector</span><span class="token punctuation">:</span>
        <span class="token key atrule">kubernetes.io/os</span><span class="token punctuation">:</span> linux
      <span class="token key atrule">priorityClassName</span><span class="token punctuation">:</span> system<span class="token punctuation">-</span>cluster<span class="token punctuation">-</span>critical
      <span class="token key atrule">serviceAccountName</span><span class="token punctuation">:</span> metrics<span class="token punctuation">-</span>server
      <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">emptyDir</span><span class="token punctuation">:</span> <span class="token punctuation">{</span> <span class="token punctuation">}</span>
          <span class="token key atrule">name</span><span class="token punctuation">:</span> tmp<span class="token punctuation">-</span>dir
<span class="token punctuation">---</span>
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> apiregistration.k8s.io/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> APIService
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">k8s-app</span><span class="token punctuation">:</span> metrics<span class="token punctuation">-</span>server
  <span class="token key atrule">name</span><span class="token punctuation">:</span> v1beta1.metrics.k8s.io
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">group</span><span class="token punctuation">:</span> metrics.k8s.io
  <span class="token key atrule">groupPriorityMinimum</span><span class="token punctuation">:</span> <span class="token number">100</span>
  <span class="token key atrule">insecureSkipTLSVerify</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
  <span class="token key atrule">service</span><span class="token punctuation">:</span>
    <span class="token key atrule">name</span><span class="token punctuation">:</span> metrics<span class="token punctuation">-</span>server
    <span class="token key atrule">namespace</span><span class="token punctuation">:</span> kube<span class="token punctuation">-</span>system
  <span class="token key atrule">version</span><span class="token punctuation">:</span> v1beta1
  <span class="token key atrule">versionPriority</span><span class="token punctuation">:</span> <span class="token number">100</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="安装kubesphere" tabindex="-1"><a class="header-anchor" href="#安装kubesphere" aria-hidden="true">#</a> 安装KubeSphere</h2><ol><li>下载核心文件</li></ol><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code>wget https<span class="token punctuation">:</span>//github.com/kubesphere/ks<span class="token punctuation">-</span>installer/releases/download/v3.1.1/kubesphere<span class="token punctuation">-</span>installer.yaml
wget https<span class="token punctuation">:</span>//github.com/kubesphere/ks<span class="token punctuation">-</span>installer/releases/download/v3.1.1/cluster<span class="token punctuation">-</span>configuration.yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div>`,13),b={start:"2"},y={href:"https://kubesphere.io/zh/docs/v3.4/pluggable-components/overview/",target:"_blank",rel:"noopener noreferrer"},h=n("li",null,"执行安装",-1),g=l(`<div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code>$ kubectl apply <span class="token punctuation">-</span>f kubesphere<span class="token punctuation">-</span>install.yaml
$ kubectl apply <span class="token punctuation">-</span>f cluster<span class="token punctuation">-</span>configuration.yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ol start="4"><li>查看安装进度</li></ol><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ kubectl logs <span class="token parameter variable">-n</span> kubesphere-system <span class="token variable"><span class="token variable">$(</span>kubectl get pod <span class="token parameter variable">-n</span> kubesphere-system <span class="token parameter variable">-l</span> <span class="token assign-left variable">app</span><span class="token operator">=</span>ks-install <span class="token parameter variable">-o</span> <span class="token assign-left variable">jsonpath</span><span class="token operator">=</span><span class="token string">&#39;{.items[0].metadata.name}&#39;</span><span class="token variable">)</span></span> <span class="token parameter variable">-f</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>::: warn Etcd找不到监控证书</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ kubectl <span class="token parameter variable">-n</span> kubesphere-monitoring-system create secret generic kube-etcd-client-certs  --from-file<span class="token operator">=</span>etcd-client-ca.crt<span class="token operator">=</span>/etc/kubernetes/pki/etcd/ca.crt  --from-file<span class="token operator">=</span>etcd-client.crt<span class="token operator">=</span>/etc/kubernetes/pki/apiserver-etcd-client.crt  --from-file<span class="token operator">=</span>etcd-client.key<span class="token operator">=</span>/etc/kubernetes/pki/apiserver-etcd-client.key
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>:::</p>`,6);function f(q,_){const e=t("RouterLink"),c=t("ExternalLinkIcon");return u(),o("div",null,[k,d,n("p",null,[a(e,{to:"/blogs/middleware/docker/docker%E5%AE%89%E8%A3%85.html"},{default:p(()=>[s("docker安装")]),_:1})]),v,n("p",null,[a(e,{to:"/blogs/middleware/kubernetes/k8s%E7%8E%AF%E5%A2%83%E6%90%AD%E5%BB%BA.html"},{default:p(()=>[s("k8s环境搭建")]),_:1})]),m,n("ol",b,[n("li",null,[s("修改cluster-configuration.yml，指定我们需要开启的功能 "),n("a",y,[s("官网"),a(c)])]),h]),g])}const x=i(r,[["render",f],["__file","KubeSpheredajian.html.vue"]]);export{x as default};
