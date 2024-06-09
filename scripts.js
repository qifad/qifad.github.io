document.addEventListener("DOMContentLoaded", function () {
    // 点击博客卡片跳转
    var blogCards = document.querySelectorAll(".blog-card");
    blogCards.forEach(function (blogCard) {
        blogCard.addEventListener("click", function () {
            var page = blogCard.getAttribute("data-page");
            if (page) {
                window.location.href = "Page/" + page + ".html";
            }
        });
    });

    // 复制代码块内容
    const copyButtons = document.querySelectorAll('.copy-button');
    copyButtons.forEach(button => {
        button.addEventListener('click', () => {
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
                console.error('复制失败：', err);
            });
        });
    });
});
