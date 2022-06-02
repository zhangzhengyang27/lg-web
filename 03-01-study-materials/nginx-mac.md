本文介绍一下，如何在Mac系统中安装nginx把详细过程记录下来，方便以后查看。

## Homebrew

homebrew是什么？它是Mac中的一款软件包管理工具，通过brew可以很方便的在Mac中安装软件或者是卸载软件。不了解的同学看以看官网(https://brew.sh/index_zh-cn.html), 然后在我们命令行中复制如下命令:

```js
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

安装成功后的话，我们可以使用命令 “brew update”更新下；如下命令：

```js
brew update
```



有关brew常用的指令如下：

1. brew搜索软件命令： brew search nginx
2. brew安装软件命令： brew install nginx
3. brew卸载软件命令: brew uninstall nginx
4. brew升级命令： sudo brew update
5. 查看安装信息(比如查看安装目录等) sudo brew info nginx
6. 查看已经安装的软件：brew list

## brew安装nginx

### brew安装nginx

```bash
brew install nginx
```

![image-20220601182836473](https://interview-aliyun.oss-cn-beijing.aliyuncs.com/myBlog/image-20220601182836473.png)

### 查看nginx的配置信息

```bash
brew info nginx
```

![image-20220601182940482](https://interview-aliyun.oss-cn-beijing.aliyuncs.com/myBlog/image-20220601182940482.png)

![img](https://interview-aliyun.oss-cn-beijing.aliyuncs.com/myBlog/102c75a6d26a922ca87a5b2db7f3c597.png)

如上面的截图，From:xxx 这样的，是nginx的来源，Docroot默认为 /usr/local/var/www, 在/usr/local/etc/nginx/nginx.conf 配置文件中默认的端口为8080， 且nginx将在/usr/local/etc/nginx/servers 目录中加载所有文件。并且我们可以通过最简单的命令'nginx' 来启动nginx。

### 查看nginx安装目录

```bash
open /usr/local/etc/nginx/
```

![image-20220601183258934](https://interview-aliyun.oss-cn-beijing.aliyuncs.com/myBlog/image-20220601183258934.png)

打开目录下 **/usr/local/Cellar/nginx**，执行如下命令可以查看到：

```bash
open /usr/local/Cellar/nginx
```

![image-20220601183442469](https://interview-aliyun.oss-cn-beijing.aliyuncs.com/myBlog/image-20220601183442469.png)

在该目录下可以看到一个名字为html的快捷方式的文件夹，进入该目录后，它有两个文件50.html和index.html。

### 启动nginx服务

```bash
brew services start nginx // 重启的命令是: brew services restart nginx
```

重启后，我们验证下，因为nginx默认的端口号是8080

![image-20220601183632825](https://interview-aliyun.oss-cn-beijing.aliyuncs.com/myBlog/image-20220601183632825.png)

###  nginx停止

```bash
ps -ef|grep nginx
```

终端输入ps -ef|grep nginx获取到nginx的进程号, 注意是找到“nginx:master”的那个进程号

**注意：**

- kill -QUIT 72 (从容的停止，即不会立刻停止)
- Kill -TERM 72 （立刻停止）
- Kill -INT 72 （和上面一样，也是立刻停止）