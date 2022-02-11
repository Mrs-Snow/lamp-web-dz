interface GroupItem {
  title: string;
  icon: string;
  color: string;
  desc: string;
  date: string;
  group: string;
}

interface NavItem {
  title: string;
  icon: string;
  color: string;
}

interface DynamicInfoItem {
  avatar: string;
  name: string;
  date: string;
  desc: string;
}

export const navItems: NavItem[] = [
  {
    title: '首页',
    icon: 'ion:home-outline',
    color: '#1fdaca',
  },
  {
    title: '仪表盘',
    icon: 'ion:grid-outline',
    color: '#bf0c2c',
  },
  {
    title: '组件',
    icon: 'ion:layers-outline',
    color: '#e18525',
  },
  {
    title: '系统管理',
    icon: 'ion:settings-outline',
    color: '#3fb27f',
  },
  {
    title: '权限管理',
    icon: 'ion:key-outline',
    color: '#4daf1bc9',
  },
  {
    title: '图表',
    icon: 'ion:bar-chart-outline',
    color: '#00d8ff',
  },
];

export const dynamicInfoItems: DynamicInfoItem[] = [
  {
    avatar: 'dynamic-avatar-1|svg',
    name: '4.4.0 即将发布：',
    date: '刚刚',
    desc: `<a href="https://tangyh.top/">正在开发中，敬请期待</a>`,
  },
  {
    avatar: 'dynamic-avatar-2|svg',
    name: '4.3.0 已发布：',
    date: '2022-01-17',
    desc: `<a href="https://www.oschina.net/news/178821">新增完整的数据权限配置、控制、鉴权、拦截流程</a> `,
  },
  {
    avatar: 'dynamic-avatar-3|svg',
    name: '4.2.0 已发布：',
    date: '2021-12-29',
    desc: `<a href="https://www.oschina.net/news/176035">spring boot单体版首发、4.x版本文档首发</a> `,
  },
  {
    avatar: 'dynamic-avatar-4|svg',
    name: '4.1.0 已发布：',
    date: '2021-12-16',
    desc: `<a href="https://www.oschina.net/news/173976/lamp-cloud-pro-4-1-released">服务合并、租户库合并、URI权限校验等近百余项更新</a> `,
  },
  {
    avatar: 'dynamic-avatar-5|svg',
    name: '4.0.0 已发布：',
    date: '2021-11-18',
    desc: `<a href="https://www.oschina.net/news/169502/lamp-cloud-pro-4-0-released">全新的租户体系、应用体系、权限体系</a>`,
  },
];

export const groupItems: GroupItem[] = [
  {
    title: '基础平台',
    icon: 'carbon:logo-github',
    color: '',
    desc: '不要等待机会，而要创造机会。',
    group: '有效',
    date: '2021-04-01',
  },
  {
    title: '运营系统',
    icon: 'ion:logo-vue',
    color: '#3fb27f',
    desc: '现在的你决定将来的你。',
    group: '已过期',
    date: '2021-04-01',
  },
  {
    title: 'Html5',
    icon: 'ion:logo-html5',
    color: '#e18525',
    desc: '没有什么才能比努力更重要。',
    group: '上班摸鱼',
    date: '2021-04-01',
  },
  {
    title: 'Angular',
    icon: 'ion:logo-angular',
    color: '#bf0c2c',
    desc: '热情和欲望可以突破一切难关。',
    group: 'UI',
    date: '2021-04-01',
  },
  {
    title: 'React',
    icon: 'bx:bxl-react',
    color: '#00d8ff',
    desc: '健康的身体是实目标的基石。',
    group: '技术牛',
    date: '2021-04-01',
  },
  // {
  //   title: 'Js',
  //   icon: 'ion:logo-javascript',
  //   color: '#4daf1bc9',
  //   desc: '路是走出来的，而不是空想出来的。',
  //   group: '架构组',
  //   date: '2021-04-01',
  // },
];
