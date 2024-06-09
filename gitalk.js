document.addEventListener("DOMContentLoaded", function () {
    // 初始化Gitalk
    const gitalk = new Gitalk({
        clientID: 'Ov23lioponYdUWU4JRqw',
        clientSecret: 'b40b7b1e354921b35a339b73da76bd7d52f39a24',
        repo: 'qifad.github.io',
        owner: 'qifad',
        admin: ['qifad'],
        id: location.pathname, // 确保唯一性
        distractionFreeMode: false // 类似Facebook的无干扰模式
    });

    gitalk.render('gitalk-container');
});
