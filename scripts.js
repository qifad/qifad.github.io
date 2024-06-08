document.addEventListener('DOMContentLoaded', () => {
    const copyButtons = document.querySelectorAll('.copy-button');
    const searchInput = document.getElementById('search');
    const posts = document.querySelectorAll('.post');

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
                alert('代码已复制！');
            } catch (err) {
                alert('复制失败，请手动复制。');
            }
            selection.removeAllRanges();
        });
    });

    // 搜索功能
    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase();
        posts.forEach(post => {
            const title = post.querySelector('h2').textContent.toLowerCase();
            if (title.includes(query)) {
                post.style.display = '';
            } else {
                post.style.display = 'none';
            }
        });
    });
});
