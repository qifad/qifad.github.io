document.addEventListener('DOMContentLoaded', () => {
    const copyButtons = document.querySelectorAll('.copy-button');
    const searchInput = document.getElementById('search');
    const posts = document.querySelectorAll('.post');

    // 自定义要加载的文件名
    const contentCard = document.getElementById('content-card');
    // 复制代码块内容
    copyButtons.forEach(button => {
        button.addEventListener('click', () => {
            const codeBlock = button.previousElementSibling;
            const range = document.createRange();
            range.selectNodeContents(codeBlock);
            const selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);
            try {
                document.execCommand('copy');
            } catch (err) {
                alert('复制失败，请手动复制。');
            }
            selection.removeAllRanges();
        });
    });
    // 加载指定页面的标题和部分内容
    function loadContent(page) {
        fetch(`/Page/${page}.html`)
            .then(response => response.text())
            .then(data => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(data, 'text/html');
                const title = doc.querySelector('h2').textContent;
                const snippet = doc.querySelector('p').textContent.substring(0, 100) + '...';

                contentCard.innerHTML = `
                    <h2>${title}</h2>
                    <p>${snippet}</p>
                `;
            });
    }
    // 点击卡片跳转到指定页面
    contentCard.addEventListener('click', () => {
        const page = contentCard.getAttribute('Page');
        window.location.href = '/Page/' + `${page}.html`;
    });

    // 默认加载 Lit 页面内容
    loadContent('Lit');
});

