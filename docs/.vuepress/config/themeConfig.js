
const htmlModules = require('./themeConfig/htmlModules.js');
const fs = require('fs')
const { join } = require('path')

function getNav(rootPath, relativeDir) {
  relativeDir = relativeDir.replace(/\\/g, "/");
  const result = []
  fs.readdirSync(rootPath).forEach(str => {
    if(str !== '.vuepress' && str !== '@pages'){
      const isDirectory = fs.lstatSync(join(rootPath, str)).isDirectory()
      if (str.toLowerCase().includes('.md') && !isDirectory) {
        const content = fs.readFileSync(join(rootPath,str),'utf-8')
        const mathcArr = content.match(/\npermalink:\s(\/pages\/\w+\/)/)
        if(Array.isArray(mathcArr) && mathcArr.length > 1){
          result.push({ text: str.replace(/^[0-9\.]+/, '').replace(/\.md$/i, ''), link: mathcArr[1] })
        }
      } else if(isDirectory){
        let menu = { text: str.replace(/^[0-9\.]+/, ''), items: getNav(join(rootPath, str), join(relativeDir, str))}
        if(menu.items.length >0){
          result.push(menu)
        }
      }
    }
  })
  return result
}

const root = join(__dirname, '../..')
const nav = getNav(root, '/')
nav.push({
  text: '索引',
  link: '/archives/',
  items: [
    { text: '分类', link: '/categories/' },
    { text: '归档', link: '/archives/' },
  ],
})
// 主题配置
module.exports = {
  nav,
  sidebarDepth: 2, // 侧边栏显示深度，默认1，最大2（显示到h3标题）
  logo: '/img/EB-logo.png', // 导航栏logo
  // repo: 'xugaoyi/vuepress-theme-vdoing', // 导航栏右侧生成Github链接
  searchMaxSuggestions: 10, // 搜索结果显示最大数
  lastUpdated: '上次更新', // 开启更新时间，并配置前缀文字   string | boolean (取值为git提交时间)
  docsDir: 'docs', // 编辑的文件夹
  editLinks: true, // 启用编辑
  editLinkText: '编辑',

  // category: false, // 是否打开分类功能，默认true
  tag: false, // 是否打开标签功能，默认true
  // archive: false, // 是否打开归档功能，默认true
  sidebar: 'structuring', // 侧边栏目录
  author: {
    name: 'evan liu',
    link: 'https://github.com/XingtianLiu'
  },
  blogger: {
    avatar: 'https://gitee.com/liuxingtian/images/raw/master/avatars/girl.jpg',
    name: 'Evan Liu',
    slogan: '行百里者半九十',
  },
  social: {
    icons: [
      {
        iconClass: 'icon-youjian',
        title: '发邮件',
        link: 'mailto:nullpointer666@163.com',
      },
      {
        iconClass: 'icon-gitee',
        title: 'Gitee',
        link: 'https://gitee.com/liuxingtian',
      },
      {
        iconClass: 'icon-github',
        title: 'GitHub',
        link: 'https://github.com/XingtianLiu',
      },
      {
        iconClass: 'icon-douban',
        title: '豆瓣',
        link: 'https://www.douban.com/people/156225670/',
      },
    ],
  },
  footer: {
    createYear: 2021,
    copyrightInfo:
      'Evan Liu | <a href="https://beian.miit.gov.cn/" target="_blank">浙ICP备2021006993号-1</a>',
  },
  htmlModules // 插入hmtl(广告)模块
}
