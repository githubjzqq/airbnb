# airbnb

> public部分为公共头部和尾部，以及登陆注册；

### 克隆

+ cd //进入项目要新建项目的文件夹（应为根目录的父级目录）
+ & git clone https://github.com/githubjzqq/airbnb.git

### 从githun仓库同步

& git pull

### 提交当前的代码

+ & git pull
+ & git add .
+ & git commit -m '提交日期+次数'  //如（9.29-01）
+ & git push

### 若删除本地文件后，想从远程仓库中从新Pull最新版文件(强行覆盖本体文件)

+ ！！务必先先提交当前的文件到仓库,然后运行下面的代码

```git

git fetch --all
git reset --hard origin/master
git pull
```

>git log模式退出 按下q