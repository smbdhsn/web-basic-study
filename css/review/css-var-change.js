// 获取主题切换按钮
const lightThemeBtn = document.getElementById('light-theme');
const darkThemeBtn = document.getElementById('dark-theme');
const colorfulThemeBtn = document.getElementById('colorful-theme');

// 获取 HTML 根元素
const root = document.documentElement;

// 检查本地存储中是否有保存的主题
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    applyTheme(savedTheme);
}

// 添加事件监听器
lightThemeBtn.addEventListener('click', () => {
    applyTheme('light');
});

darkThemeBtn.addEventListener('click', () => {
    applyTheme('dark');
});

colorfulThemeBtn.addEventListener('click', () => {
    applyTheme('colorful');
});

// 应用主题函数
function applyTheme(theme) {
    // 移除所有主题类
    root.classList.remove('dark-theme', 'colorful-theme');
    
    // 应用选择的主题
    if (theme === 'dark') {
        root.classList.add('dark-theme');
    } else if (theme === 'colorful') {
        root.classList.add('colorful-theme');
    }
    
    // 保存主题选择到本地存储
    localStorage.setItem('theme', theme);
}
