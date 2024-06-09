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
    // 点击卡片跳转到指定页面
    contentCard.addEventListener('click', () => {
        const page = contentCard.getAttribute('Page');
        window.location.href = '/Page/' + `${page}.html`;
    });
});
document.addEventListener("DOMContentLoaded", () => {
    const copyButtons = document.querySelectorAll(".copy-button");

    copyButtons.forEach(button => {
        button.addEventListener("click", () => {
            const codeBlock = button.previousElementSibling.innerText;
            navigator.clipboard.writeText(codeBlock).then(() => {
                const originalText = button.innerText;
                button.innerText = "已复制";
                button.classList.add("transition");

                // 添加烟花效果
                const firework = document.createElement("div");
                firework.classList.add("firework");
                button.appendChild(firework);

                // 3秒后恢复按钮文本和移除烟花效果
                setTimeout(() => {
                    button.innerText = originalText;
                    button.classList.remove("transition");
                    button.removeChild(firework);
                }, 3000);
            }).catch(err => {
                console.error('Failed to copy text: ', err);
            });
        });
    });
});

