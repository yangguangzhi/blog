import{_ as a,r as e,o as l,c as i,b as t,e as c,w as d,d as r,a as s}from"./app-a6bbcd8f.js";const o={},p=s(`<p>k8s，是一个基于容器技术的分布式架构方案，他的本质上是一组服务器集群， 可以在集群的每个节点上运行特定的程序，来对节点中的容器进行管理。</p><ul><li>自我修复，一旦某个容器崩溃，能够在1s中左右迅速启动新容器</li><li>弹性伸缩，根据需要自动对集群中正在运行的容器数量进行调整</li><li>服务发现，服务可以通过自动发现的形式找到它所依赖的服务</li><li>负载均衡，若一个服务启动了多个容器，能够自动实现请求的负载均衡</li><li>版本回退，若新发布的程序版本有问题，可以立即回退到原来的版本</li><li>存储编排，根据容器自身的需求自动创建存储卷</li></ul><h2 id="组件" tabindex="-1"><a class="header-anchor" href="#组件" aria-hidden="true">#</a> 组件</h2><p>一个k8s集群由控制节点（master）、工作节点（node）构成</p><h3 id="master" tabindex="-1"><a class="header-anchor" href="#master" aria-hidden="true">#</a> master</h3><p>集群的控制平面，集群的管理决策</p><ul><li>ApiServer，资源操作入口，接收用户输入命令，提供认证、授权、Api注册和发现等功能</li><li>Scheduler，集群资源调度，按照预定的调度策略将Pod调度到相应的node上</li><li>ControllerManager，维护集群的状态，程序部署、故障检测、自动扩展、滚动更新等</li><li>Etcd，存储集群中各种资源对象信息</li></ul><h3 id="node" tabindex="-1"><a class="header-anchor" href="#node" aria-hidden="true">#</a> node</h3><p>集群的数据平面，为容器提供docker的运行环境，由master分配容器到node节点上</p><ul><li>Kubelet，维护容器的生命周期，控制docker来创建、更新、销毁容器</li><li>KubeProxy，提供集群内部服务发现和负载均衡</li><li>Docker，节点上容器的各种操作</li></ul><h3 id="pod" tabindex="-1"><a class="header-anchor" href="#pod" aria-hidden="true">#</a> Pod</h3><p>k8s的最小控制单位，容器都是运行在pod中的，一个pod中可以有1个或者多个容器</p><h3 id="controller" tabindex="-1"><a class="header-anchor" href="#controller" aria-hidden="true">#</a> Controller</h3><p>通过它来对pod进行管理，启动、停止、伸缩等</p><h3 id="service" tabindex="-1"><a class="header-anchor" href="#service" aria-hidden="true">#</a> Service</h3><p>pod对外服务的统一入口，可以维护同一类的多个pod</p><h3 id="label" tabindex="-1"><a class="header-anchor" href="#label" aria-hidden="true">#</a> Label</h3><p>用于对pod进行分类，同一类的pod拥有相同的标签</p><h3 id="namespace" tabindex="-1"><a class="header-anchor" href="#namespace" aria-hidden="true">#</a> NameSpace</h3><p>用来隔离pod的运行环境</p><h2 id="安装" tabindex="-1"><a class="header-anchor" href="#安装" aria-hidden="true">#</a> 安装</h2><h3 id="环境准备" tabindex="-1"><a class="header-anchor" href="#环境准备" aria-hidden="true">#</a> 环境准备</h3><ul><li>虚拟主机准备</li></ul><table><thead><tr><th style="text-align:center;">主机</th><th style="text-align:center;">IP</th><th style="text-align:center;">配置</th></tr></thead><tbody><tr><td style="text-align:center;">master</td><td style="text-align:center;">192.168.0.100</td><td style="text-align:center;">2CPU 2G内存 50G硬盘</td></tr><tr><td style="text-align:center;">node</td><td style="text-align:center;">192.168.0.101</td><td style="text-align:center;">2CPU 2G内存 50G硬盘</td></tr><tr><td style="text-align:center;">node</td><td style="text-align:center;">192.168.0.102</td><td style="text-align:center;">2CPU 2G内存 50G硬盘</td></tr></tbody></table><ul><li>设置每个机器的hostname</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ hostnamectl set-hostname master
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>禁用selinux（linux的一个安全服务）</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">sudo</span> setenforce <span class="token number">0</span>
$ <span class="token function">sudo</span> <span class="token function">sed</span> <span class="token parameter variable">-i</span> <span class="token string">&#39;s/^SELINUX=enforcing$/SELINUX=permissive/&#39;</span> /etc/selinux/config
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>禁用swap分区</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ swapoff <span class="token parameter variable">-a</span>
$ <span class="token function">sed</span> <span class="token parameter variable">-ri</span> <span class="token string">&#39;s/.*swap.*/#&amp;/&#39;</span> /etc/fstab
<span class="token comment"># /etc/fstab，注释掉swap一行</span>
<span class="token comment"># /dev/mapper/centos-swap swap</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>所有机器添加master主机名解析</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#/etc/hosts</span>
<span class="token number">192.168</span>.0.100 master
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>时间同步，k8s要求集群中的时间必须精确一致</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 使用chronyd同步网络时间</span>
$ systemctl start chronyd
$ systemctl <span class="token builtin class-name">enable</span> chronyd
$ <span class="token function">date</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>允许iptables检查桥接流量</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">cat</span> <span class="token operator">&lt;&lt;</span><span class="token string">EOF<span class="token bash punctuation"> <span class="token operator">|</span> <span class="token function">sudo</span> <span class="token function">tee</span> /etc/modules-load.d/k8s.conf</span>
br_netfilter
EOF</span>
$ <span class="token function">cat</span> <span class="token operator">&lt;&lt;</span><span class="token string">EOF<span class="token bash punctuation"> <span class="token operator">|</span> <span class="token function">sudo</span> <span class="token function">tee</span> /etc/sysctl.d/k8s.conf</span>
net.bridge.bridge-nf-call-ip6tables = 1
net.bridge.bridge-nf-call-iptables = 1
net.ipv4.ip_forward = 1
EOF</span>
$ <span class="token function">sysctl</span> <span class="token parameter variable">-p</span>
<span class="token comment"># 重新加载配置</span>
$ modprobe br_netfilter
<span class="token comment"># 加载网桥过滤模块</span>
$ lsmod <span class="token operator">|</span> <span class="token function">grep</span> br_netfilter
<span class="token comment"># 检查过滤模块是否加载</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>配置ipvs功能，k8s中service有两种代理模型（iptables和ipvs），ipvs性能好，需要手动加载ipvs模块</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ yum <span class="token parameter variable">-y</span> <span class="token function">install</span> ipset ipvsadmin 
<span class="token comment"># 安装ipset 和ipvsadmin</span>
$ <span class="token function">cat</span> <span class="token operator">&lt;</span> /etc/sysconfig/modules/ipvs.modules
<span class="token comment"># 添加需要加载的模块写入脚本文件</span>
$ <span class="token function">chmod</span> +x /etc/sysconfig/modules/ipvs.modules
<span class="token comment"># 为脚本添加执行权限</span>
$ /bin/bash /etc/sysconfig/modules/ipvs.modules
<span class="token comment"># 执行脚本</span>
$ lsmod <span class="token operator">|</span> <span class="token function">grep</span> <span class="token parameter variable">-e</span> ip_vs <span class="token parameter variable">-e</span> nf_conntrack_ipv4
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>重启服务器</li></ul><h3 id="安装docker" tabindex="-1"><a class="header-anchor" href="#安装docker" aria-hidden="true">#</a> 安装docker</h3>`,40),u=s(`<h3 id="安装k8s" tabindex="-1"><a class="header-anchor" href="#安装k8s" aria-hidden="true">#</a> 安装k8s</h3><ol><li>修改k8s镜像源</li></ol><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># /etc/yum.repos.d/kubernetes.repo，添加配置</span>
<span class="token function">cat</span> <span class="token operator">&lt;&lt;</span><span class="token string">EOF<span class="token bash punctuation"> <span class="token operator">|</span> <span class="token function">sudo</span> <span class="token function">tee</span> /etc/yum.repos.d/kubernetes.repo</span>
[kubernetes]
name=Kubernetes
baseurl=http://mirrors.aliyun.com/kubernetes/yum/repos/kubernetes-el7-x86_64
enabled=1
gpgcheck=0
repo_gpgcheck=0
gpgkey=http://mirrors.aliyun.com/kubernetes/yum/doc/yum-key.gpg
   http://mirrors.aliyun.com/kubernetes/yum/doc/rpm-package-key.gpg
exclude=kubelet kubeadm kubectl
EOF</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li>安装kubeadm、kubectl和kubelet</li></ol><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ yum <span class="token function">install</span> <span class="token parameter variable">--setopt</span><span class="token operator">=</span>obsoletes<span class="token operator">=</span><span class="token number">0</span> kubelet-1.20.9 kubeadm-1.20.9 kubectl-1.20.9 <span class="token parameter variable">--disableexcludes</span><span class="token operator">=</span>kubernetes <span class="token parameter variable">-y</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="3"><li>配置kubelet的cgroup</li></ol><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># /etc/sysconfig/kubelet，添加配置</span>
<span class="token assign-left variable">KUBELET_CGROUP_ARGS</span><span class="token operator">=</span><span class="token string">&quot;--cgroup-driver=systemd&quot;</span>
<span class="token assign-left variable">KUBE_PROXY_MODE</span><span class="token operator">=</span><span class="token string">&quot;ipvs&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="4"><li>设置kubectl自启</li></ol><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ systemctl <span class="token builtin class-name">enable</span> <span class="token parameter variable">--now</span> kubelet
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="准备集群镜像" tabindex="-1"><a class="header-anchor" href="#准备集群镜像" aria-hidden="true">#</a> 准备集群镜像</h3><p>安装k8s集群前，必须提前准备好集群所需镜像</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">sudo</span> <span class="token function">tee</span> ./images.sh <span class="token operator">&lt;&lt;-</span><span class="token string">&#39;EOF&#39;
#!/bin/bash
images=(
kube-apiserver:v1.20.9
kube-proxy:v1.20.9
kube-controller-manager:v1.20.9
kube-scheduler:v1.20.9
coredns:1.7.0
etcd:3.4.13-0
pause:3.2
)
for imageName in \${images[@]} ; do
docker pull registry.cn-hangzhou.aliyuncs.com/lfy_k8s_images/$imageName
done
EOF</span>

$ <span class="token function">chmod</span> +x ./images.sh <span class="token operator">&amp;&amp;</span> ./images.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="集群主节点初始化" tabindex="-1"><a class="header-anchor" href="#集群主节点初始化" aria-hidden="true">#</a> 集群主节点初始化</h3><ol><li>创建集群</li></ol><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ kubeadm init <span class="token punctuation">\\</span>
  --apiserver-advertise-address<span class="token operator">=</span><span class="token number">192.168</span>.0.100 <span class="token punctuation">\\</span>
  --control-plane-endpoint<span class="token operator">=</span>master <span class="token punctuation">\\</span>
  --image-repsoitory registry.cn-hangzhou.aliyuncs.com/lfy_k8s_images <span class="token punctuation">\\</span>
  --kubernetes-version<span class="token operator">=</span>v1.20.9 <span class="token punctuation">\\</span>
  --pod-network-cidr<span class="token operator">=</span><span class="token number">10.244</span>.0.0/16 <span class="token punctuation">\\</span>
  --service-cidr<span class="token operator">=</span><span class="token number">10.96</span>.0.0/12 <span class="token punctuation">\\</span>
<span class="token comment">#所有网络范围不重叠</span>

<span class="token comment"># 创建几个必要文件</span>
$ <span class="token function">mkdir</span> <span class="token parameter variable">-p</span> <span class="token environment constant">$HOME</span>/.kube
$ <span class="token function">sudo</span> <span class="token function">cp</span> <span class="token parameter variable">-i</span> /etc/kubernetes/admin.conf <span class="token environment constant">$HOME</span>/.kube/config
$ <span class="token function">sudo</span> chomd <span class="token variable"><span class="token variable">$(</span><span class="token function">id</span> <span class="token parameter variable">-u</span><span class="token variable">)</span></span><span class="token builtin class-name">:</span><span class="token variable"><span class="token variable">$(</span><span class="token function">id</span> <span class="token parameter variable">-g</span><span class="token variable">)</span></span> <span class="token environment constant">$HOME</span>/.kube/config
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li>将node加入集群</li></ol><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ kubeadm <span class="token function">join</span> master:6443 <span class="token punctuation">\\</span>
    <span class="token parameter variable">--token</span> 8507uc.o0knircuri8etnw2 <span class="token punctuation">\\</span>
    --discovery-token-ca-cert-hash <span class="token punctuation">\\</span>
    sha256:acc37967fb5b0acf39d7598f8a439cc7dc88f439a3f4d0c9cae88e7901b9d3f
<span class="token comment"># 还没有真正加入集群，还需要配置网络插件</span>
<span class="token comment"># token 可以在master节点执行kubeadm token list获取token（注意查看是否过期）</span>
<span class="token comment"># hash  openssl x509 -in /etc/kubernetes/pki/apiserver-authorized-client-root.crt -text -noout</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3"><li>安装网络插件，k8s支持flannel、calico、canal等网络插件</li></ol><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">wget</span> https://raw.githubusercontent.com/coreos/flannel/master/Documentation/kube-flannel.yml
<span class="token comment"># 获取flannel配置文件</span>
<span class="token comment"># 修改文件中quay.io 仓库为quay-mirror.qiniu.com</span>
$ kubectl apply <span class="token parameter variable">-f</span> kube-flannel.yml
<span class="token comment"># 激活flannel配置</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="4"><li>查看集群状态</li></ol><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ kubectl get nodes
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="部署服务测试" tabindex="-1"><a class="header-anchor" href="#部署服务测试" aria-hidden="true">#</a> 部署服务测试</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ kubectl create deployment nginx <span class="token parameter variable">--image</span><span class="token operator">=</span>nginx:1.14-alpine
<span class="token comment"># 部署nginx</span>
$ kubectl expose deployment nginx <span class="token parameter variable">--port</span><span class="token operator">=</span><span class="token number">80</span> <span class="token parameter variable">--type</span><span class="token operator">=</span>NodePort
<span class="token comment"># 暴露端口</span>
$ kubectl get pods,service
<span class="token comment"># 查看服务 </span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="部署dashboard" tabindex="-1"><a class="header-anchor" href="#部署dashboard" aria-hidden="true">#</a> 部署dashboard</h3><ol><li>获取dashboard yaml</li></ol><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">wget</span> https://raw.githubusercontent.com/kubernetes/dashboard/v2.3.1/aio/deploy/recommended.yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="2"><li>应用yaml</li></ol><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ cubectl apply <span class="token parameter variable">-f</span> dashboard.yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="3"><li>设置访问端口</li></ol><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code>$ kubectl edit svc kubernetes<span class="token punctuation">-</span>dashboard <span class="token punctuation">-</span>n kubernetes<span class="token punctuation">-</span>dashboard
<span class="token comment"># ClusterIP 改成 NodePort</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ol start="4"><li>创建访问账号</li></ol><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token comment">#创建访问账号，准备一个yaml文件； vi dash.yaml</span>
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> ServiceAccount
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> admin<span class="token punctuation">-</span>user
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> kubernetes<span class="token punctuation">-</span>dashboard
<span class="token punctuation">---</span>
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> rbac.authorization.k8s.io/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> ClusterRoleBinding
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> admin<span class="token punctuation">-</span>user
<span class="token key atrule">roleRef</span><span class="token punctuation">:</span>
  <span class="token key atrule">apiGroup</span><span class="token punctuation">:</span> rbac.authorization.k8s.io
  <span class="token key atrule">kind</span><span class="token punctuation">:</span> ClusterRole
  <span class="token key atrule">name</span><span class="token punctuation">:</span> cluster<span class="token punctuation">-</span>admin
<span class="token key atrule">subjects</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">kind</span><span class="token punctuation">:</span> ServiceAccount
    <span class="token key atrule">name</span><span class="token punctuation">:</span> admin<span class="token punctuation">-</span>user
    <span class="token key atrule">namespace</span><span class="token punctuation">:</span> kubernetes<span class="token punctuation">-</span>dashboard
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code>$ kubectl apply <span class="token punctuation">-</span>f dash.yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="5"><li>获取访问令牌</li></ol><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token comment">#获取访问令牌</span>
kubectl <span class="token parameter variable">-n</span> kubernetes-dashboard get secret <span class="token variable"><span class="token variable">$(</span>kubectl <span class="token parameter variable">-n</span> kubernetes-dashboard get sa/admin-user <span class="token parameter variable">-o</span> <span class="token assign-left variable">jsonpath</span><span class="token operator">=</span><span class="token string">&quot;{.secrets[0].name}&quot;</span><span class="token variable">)</span></span> <span class="token parameter variable">-o</span> go-template<span class="token operator">=</span><span class="token string">&quot;{{.data.token | base64decode}}&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div>`,35);function v(m,b){const n=e("RouterLink");return l(),i("div",null,[p,t("p",null,[c(n,{to:"/blogs/middleware/docker/docker%E5%AE%89%E8%A3%85.html"},{default:d(()=>[r("docker环境搭建")]),_:1})]),u])}const h=a(o,[["render",v],["__file","k8shuanjingdajian.html.vue"]]);export{h as default};
