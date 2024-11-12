## 1.创建仓库

### 1.1 普通仓库

1. 进入gitee页面,注册账号,登入,点击右上角"+"创建新仓库

2. 创建好仓库之后进行如下操作

3. Git 全局设置:
   
   ```bash
   git config --global user.name "黄威圣" # 带参数设置,不带参数查看
   git config --global user.email "1056349552@qq.com" # 再次设置可以覆盖原有设置
   ```
   
   创建 git 仓库:
   
   ```bash
   mkdir h52008 #创建一个文件夹
   cd h52008 #切换进入h52008
   git init # 初始化一个git
   touch README.md # 创建一个README.md文件 非常重要,如果没有readme.md是无法推送的
   git add README.md # 添加文件到仓库门口
   git commit -m "first commit" # 提交版本号
   git remote add origin git@gitee.com:d718781500/h52008.git #添加远程仓库 
   git push -u origin master # 将代码推到远程仓库 
   ```
   
   > 注意: `.git`这个文件夹不能删除,因为它是本地的版本控制代码

>
> 查看远程的仓库地址:`git remote -v`

已有仓库?

   ```
   cd existing_git_repo
   git remote add origin git@gitee.com:d718781500/h52008.git
   git push -u origin master
   ```

## 总结:将代码推送到码云的流程

1. 在码云上新建一个仓库
2. 添加全局的user.name email
3. 打开已有的项目 进入代码目录
4. 创建两个文件 一个是`readme.md` 另一个是 `.gitignore`(可以忽略文件,忽略的文件不会添加到仓库)
5. 右键=>git bash here => 输入 touch readme.md回车再输入 touch .gitignore
6. 再次输入指令 vim ./.gitignore 按回车,然后输入i进行插入 node_modules 再按esc 输入:wq 按回车
7. 初始化一个仓库 输入git init
8. 关联远程仓库 git remote add origin xxxxx你创建的仓库地址
9. 依次输入 git add . git commit -m"描述xxx" git push -u origin master 回车
10. 刷新码云的远程仓库 代码就上传好了

### 1.2 ssh方式

SSH 为 **Secure Shell** 的缩写，由 IETF 的网络小组（Network Working Group）所制定；SSH 为建立在应用层基础上的安全协议。 SSH 是较可靠，专为 远程登录 会话和其他网络服务提供安全性的协议。 利用 SSH
协议可以有效防止远程管理过程中的信息泄露问题。 SSH最初是UNIX系统上的一个

程序，后来又迅速扩展到其他操作平台

#### 首先，检查下自己之前有没有已经生成, 在开始菜单中打开git下的git bash

```bash
ls -al ~/.ssh 
```

如果能进入到.ssh文件目录下 ，则证明，之前生成过.ssh秘钥，可以直接使用里面的秘钥

#### 检测下自己之前有没有配置：

```bash
git config user.name和git config user.email（直接分别输入这两个命令）
```

#### 如果之前没有创建，则执行以下命令：

```bash
git config –global user.name ‘xxxxx’ 
git config –global user.email ‘xxx@xx.xxx’
```

#### 生成秘钥

```bash
ssh-keygen -t rsa -C ‘上面的邮箱’
```

代码参数含义：

> -t 指定密钥类型，默认是 rsa ，可以省略。
> -C 设置注释文字，比如邮箱。
> -f 指定密钥文件存储文件名

最后在.ssh目录下(C盘用户文件夹下)得到了两个文件：id_rsa（私有秘钥）和id_rsa.pub（公有密钥

#### 将rsa.pub里的秘钥添加到远端

首先，打开`~/.ssh`目录下找到`id_rsa.pub`这个文件,用记事本打开复制全部内容,然后登入码云,`点击右上角头像`=>`设置`=>`ssh公钥`中进行添加

#### 拉取代码

使用ssh拉取代码的时候,记得输入当是创建密钥的密码passphrase

### 在企业中ssh协作流程

1. 生成自己的公钥和私钥
2. 将自己的公钥发给相关负责人,让其添加到账户中

## 2.git常用指令

### 1.git add(掌握)

将代码添加至仓库门口,可以在后面跟上文件名,

将文件放到暂存区

### 2.git commit (掌握)

-m 描述

用于提交代码到仓库中

#### 2.1 git commit --amend 修改描述(面试题)

通过这个指令可以修改已经提交的描述

### git status 查看状态

### git diff 查看变更内容(冲突的时候)

### git rm 删除文件(把文件从仓库中删除)

### git rm --cached 停止追踪但不删除

### 3. git pull(掌握)

拉取代码

比如 远程代码版本已经发生了变更,本地代码不同步的时候,需要使用git pull拉取最新的代码

git pull指令在本地有仓库的时候才可以使用

#### 3.1 git pull origin 指定拉取分支

用于拉取指定分支代码

比如拉取远程dev分支的代码

```
git pull origin dev
```

### 4.git push(掌握)

git push把本地仓库的代码,推送到远程的仓库

> git push -u origin master 将本地的代码推送到远程仓库上的主分支

> 后续在提交代码的时候,不需要输入完整指令了

> 只需要输入 git push指令就可以直接推送代码了

### 5. git remote add origin

用于添加远程源

### 6. git remote -v

查看远程源

### 7. 修改远程源

先移除,后添加

```bash
 git remote rm origin
 git remote add origin...
```

### 8.git branch -a 查看所有的分支,包括远程分支

### 9.git clone

克隆代码,将远程仓库的代码克隆到本地;

```bash
git clone https://gitee.com/d718781500/shopping-mall.git
```

## 3.进阶指令

### 1. git stash 缓存代码

#### 1.1. stash当前修改

果我们不想提交完成一半或者不完善的代码，但是却不得不去修改一个紧急Bug , stash是本地的，不会通过`git push`命令上传到git server上 实际应用中推荐给每个stash加一个message，用于记录版本，使用`git stash save`
取代`git stash`命令。示例如下：

```bash
$ git stash save "test-cmd-stash"
Saved working directory and index state On autoswitch: test-cmd-stash
HEAD 现在位于 296e8d4 remove unnecessary postion reset in onResume function
$ git stash list
stash@{0}: On autoswitch: test-cmd-stash
```

#### 1.2. 重新应用缓存的stash

可以通过`git stash pop`命令恢复之前缓存的工作目录

```bash
 git stash pop
```

#### 1.3. 查看现有stash

可以使用`git stash list`命令

```bash
git stash list
```

#### 1.4. 移除stash

可以使用`git stash drop`命令，后面可以跟着stash名字

```bash
git stash list
stash@{0}: WIP on master: 049d078 added the index file
stash@{1}: WIP on master: c264051 Revert "added file_size"
stash@{2}: WIP on master: 21d80a5 added number to log
git stash drop stash@{0}
Dropped stash@{0} (364e91f3f268f0900bc3ee613f9f733e82aaed43)
```

### 2. git rebase 筑基(变基)

在另一个分支基础之上重新应用，用于把一个分支的修改合并到当前分支。

```
git rebase 分支名
```

用于合并分支

在`rebase`的过程中，也许会出现冲突(conflict)。在这种情况，Git会停止`rebase`并会让你去解决冲突；在解决完冲突后，用”`git add`“命令去更新这些内容的索引(index), 然后，你无需执行 `git commit`,只要执行:

```shell
$ git rebase --continue
```

这样git会继续应用(apply)余下的补丁。

在任何时候，可以用`--abort`参数来终止`rebase`的操作，并且分支会回到`rebase`开始前的状态。

```shell
$ git rebase --abort
```

拉取带代码合并

```bash
$ git pull --rebase
```

## 4.冲突问题

1. git diff 对比不同

2. git status 查看提交状态

多人协作的时候,日常肯定会出现冲突问题,我们应当去解决这种冲突

## 5.分支操作

### 1.远程分支

1. git branch 查看分支
2. git branch -a 加上-a参数可以查看远程分支，远程分支会用红色表示出来
3. git checkout -b test origin/test 作用是checkout远程的test分支，在本地起名为test分支，并切换到本地的test分支
4. 克隆分支需要制定分支名 git clone -b 分支名 地址.

### 2.其它操作

1. git branch 分支名 创建分支
2. git checkout 分支名 切换分支
3. git checkout master + git merge 分支名 分支的合并
4. git branch -d 分支名 分支的删除

### 3. 一些问题处理

### 有的时候我们在进行项目分支合并 git merge 时会出现如下错误

**莫方**~可以按照以下步骤来解决：

1. 按键盘上的`“i”`键可进入插入模式
2. 这时可以修改最上方的黄色部分，改成你想写的合并原因
3. 按键盘上的`“Esc”`键退出插入模式
4. 最后在最下面输入`“ :wq ”`后按回车键即可

## 6.git回退版本

1. git log查看版本日志
2. 相当于进入了vi编辑,可以使用键盘上的上下箭头控制查看所有的记录,输入q退出日志查看
3. git reset --hard 版本号 回退到某个版本
4. git log -p 文件名 查看指定文件的提交历史
5. git blame 文件名 以列表的形式查看指定文件的提交历史

## 7.多人协作流程

1. 初次进入公司
    1. `索要获取git账号`
    2. `把自己的账户让项目负责人添加到仓库管理`
    3. `ssh方式,那么需要把自己的公钥提交给项目负责人`

2. 进行项目开发,将项目从远程拉取到本地 `git clone`

3. 进行开发,完成某个功能后,提交版本
    1. git add . `添加代码`
    2. git commit -m"描述完成的内容" `提交代码`
    3. git push `将代码推送到远程`
    4. `写完代码不提交-非常严重!!!!!!!!!!`

4. 多人协作会遇到的问题

5. `版本不一致的问题`

1. 远程仓库版本的变更的时候,开发者一定要先`提交本地代码`,然后使用`git pull`拉取代码

2. 再次`git push` 将代码推送到远程仓库即可

8. `冲突的问题`

1. 不知道冲突的代码在哪里=>`使用强大的vscode进行全局搜索=>ctrl+shift+f=>搜索内容<<<<`就会把冲突的文件搜索出来,我们只要解决冲突就可以了

2. 冲突之后,git会提示conflict,需要手动的解决冲突,可以通过vscode进行选择,处理冲突之后,再次add 和 commit 然后 push就可以了

9. `分支操作`
    
    1. 创建一个分支 `git branch xx分支名`
    2. 查看分支 `git branch`
    3. 切换进入分支 `git checkout 分支名`
    4. 合并分支 `git merge 分支名`
    5. 进行分支的情况,比如目前清蒸正在开发一个tab切换的功能,没有开发完成,如果推到`主分支master`,会影响代码的执行,所以可以`创建分支`,然后进行操作,开发完成之后再次`合并`到`主分支`即可
   
   git pull
   
   git add
   
   git commit
   
   git push

## 8.远程分支的操作(重要)

### 1.查看所有的远程分支

```bash
git branch -a
```

### 2.git checkout -b

通过本地的某个分支,来追踪远程的某个分支,可以理解为,将远程分支拉了下来

```bash
git checkout -b 本地分支 origin/远程分支
```

### 3.直接拉取远程分支

```bash
git clone -b 指定的分支名 项目地址
```

## 9.强制推送

```bash
git push -f
```
