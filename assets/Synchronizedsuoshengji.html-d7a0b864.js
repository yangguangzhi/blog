import{_ as i,o as l,c as o,a as e}from"./app-a6bbcd8f.js";const n={},t=e('<h2 id="原理" tabindex="-1"><a class="header-anchor" href="#原理" aria-hidden="true">#</a> 原理</h2><p>synchronized底层通过一个monitor对象来完成，线程在进入同步代码块之前会去monitor对象中申请锁，如果monitor 对象中当前线程的锁，线程就可以进入代码块，否则就等待。</p><ul><li><p>同步代码块</p><ul><li>实现使用的是monitorenter和monitorexit指令，其中monitorenter指令指向同步代码块的开始位置，monitorexit指令指向同步代码块的结束位置</li><li>执行monitorenter指令时，线程试图获取锁也就是获取monitor对象的锁，如果monitor对象的锁的计数器为0 则表示锁可以被获取，获取后锁的计数器+1，此时线程拥有锁，可以进入同步代码块，否则 线程进入BLOCKED状态等待锁的释放重新获取锁</li><li>执行monitorexit指令时，线程执行完毕，锁的计数器-1，当计数器为0时 锁释放，此时其他线程可以获取该锁</li><li>一般是一个monitorenter对应两个monitorexit，一个在同步代码块结束，一个在异常处理时</li></ul></li><li><p>同步方法</p><ul><li>实现使用的是ACC_SYNCHRONIZED指令，JVM通过该指令判断哪些方法是同步方法</li><li>执行该指令时，会先尝试获取monitor对象锁，然后执行方法，执行完毕后释放monitor对象锁</li></ul></li></ul><h2 id="锁升级" tabindex="-1"><a class="header-anchor" href="#锁升级" aria-hidden="true">#</a> 锁升级</h2><p>synchronized的锁升级是指锁从无锁升级到重量级锁的过程，升级过程是不可逆的，只能通过释放锁来降级</p><ul><li>无锁状态 <ul><li>没有加锁，线程可以访问同步代码块，其他线程也可以访问同步代码块</li></ul></li><li>偏向锁状态 <ul><li>线程加锁时，会判断同步代码块是否只被一个线程访问，如果是，则将线程ID记录到对象头中， 该线程以后每次进入该同步代码块时，只需要比较对象头中的线程ID是否是自己的ID，如果是， 则不需要再次加锁，直接执行同步代码块</li><li>线程加锁时，会判断同步代码块是否被其他线程访问，如果是，则通过自旋（CAS）的方式尝试替换线程ID获取锁， 如果获取不到，检查原有持有偏向锁的线程状态，未退出同步代码块，则升级为轻量级锁</li></ul></li><li>轻量级锁状态 <ul><li>线程加锁时，会判断同步代码块是否被其他线程访问，如果是，则通过自旋的方式尝试获取锁， 如果获取不到，则升级为重量级锁</li></ul></li><li>重量级锁状态 <ul><li>线程加锁时，会判断同步代码块是否被其他线程访问，如果是，则通过自旋的方式尝试获取锁， 如果获取不到，则阻塞等待，当其他线程释放锁时，被阻塞的线程会唤醒，并尝试获取锁</li></ul></li></ul>',6),r=[t];function a(c,u){return l(),o("div",null,r)}const h=i(n,[["render",a],["__file","Synchronizedsuoshengji.html.vue"]]);export{h as default};