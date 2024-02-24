/* gitalk.js */
var gitalk = new Gitalk({
    clientID: 'd03a4e53950eab2aa611',
    clientSecret: '30c998f32d98a344c5f0ba427fe90deee653993d',
    repo: 'https://github.com/qifad/qifad.github.io/discussions/1',
    owner: 'qifad',
    admin: ['qifad'],
    id: location.pathname,      // 页面的唯一标识
    distractionFreeMode: false  // 弹幕模式
  });
  gitalk.render('gitalk-container');
  