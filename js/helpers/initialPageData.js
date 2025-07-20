// 页面加载时初始化
document.addEventListener('DOMContentLoaded', initHistoryItems);
//页面加载时初始化 AI题库
document.addEventListener('DOMContentLoaded', renderAILibraryCards);
// 页面加载时初始化 最近错题
document.addEventListener('DOMContentLoaded', initRecentItems);
// 页面加载时初始化 推荐题目
document.addEventListener('DOMContentLoaded', initRecommendItems);
//页面加载时初始化 高频考点
document.addEventListener('DOMContentLoaded', generatePointCards);
//初始化页面数据
checkLogin();
//用户名
let CurrentUser = '';

// 模拟错题本数据
let historyItems = [
    {
        id: 1,
        title: "一222元二次方程解法",
        answer: "x = [-b ± √(b²-4ac)] / 2a",
        analysis: "利用求根公式解方程，注意判别式的值",
        points: "一元方程",
        iconClass: "fas fa-calculator",
        date: "2023-10-15"
    },
    {
        id: 2,
        title: "三333角形证明题",
        answer: "利用SSS全等证明",
        analysis: "通过对应边相等证明三角形全等",
        points: "几何证明",
        iconClass: "fas fa-shapes",
        date: "2023-10-12"
    },
    {
        id: 3,
        title: "函数444图像分析",
        answer: "顶点在(2, -1)，开口向上",
        analysis: "二次函数图象由二次项系数a决定开口方向",
        points: "函数图像",
        iconClass: "fas fa-function",
        date: "2023-10-10"
    },
    {
        id: 4,
        title: "概率555统计应用题",
        answer: "P=1/6",
        analysis: "使用古典概率公式计算",
        points: "概率计算",
        iconClass: "fas fa-percentage",
        date: "2023-10-08"
    }
];

let historyItems2 = [
    {
        id: 1,
        title: "一222元二次方程解法",
        answer: "x = [-b ± √(b²-4ac)] / 2a",
        analysis: "利用求根公式解方程，注意判别式的值",
        points: "一元方程",
        iconClass: "fas fa-calculator",
        date: "2023-10-15"
    },
    {
        id: 2,
        title: "三333角形证明题",
        answer: "利用SSS全等证明",
        analysis: "通过对应边相等证明三角形全等",
        points: "几何证明",
        iconClass: "fas fa-shapes",
        date: "2023-10-12"
    },
    {
        id: 3,
        title: "函数444图像分析",
        answer: "顶点在(2, -1)，开口向上",
        analysis: "二次函数图象由二次项系数a决定开口方向",
        points: "函数图像",
        iconClass: "fas fa-function",
        date: "2023-10-10"
    },
    {
        id: 4,
        title: "概率555统计应用题",
        answer: "P=1/6",
        analysis: "使用古典概率公式计算",
        points: "概率计算",
        iconClass: "fas fa-percentage",
        date: "2023-10-08"
    }
];

// 题库数据模型
let libraryData = [
    {
        id: 1,
        title: "代数方程",
        totalCount: 128,
        time: "2023-10-20",
        icon: "fas fa-superscript",
        exercises:[
            {
                id: 1,
                title: "一4444444222元二次方程解法",
                answer: "x = [-b ± √(b²-4ac)] / 2a",
                analysis: "利用求根公式解方程，注意判别式的值",
                points: "一元方程",
                iconClass: "fas fa-calculator",
                date: "2023-10-15"
            },
            {
                id: 2,
                title: "三333角形证明题",
                answer: "利用SSS全等证明",
                analysis: "通过对应边相等证明三角形全等",
                points: "几何证明",
                iconClass: "fas fa-shapes",
                date: "2023-10-12"
            }]
    },
    {
        id: 2,
        title: "几何证明",
        totalCount: 96,
        time: "2023-10-18",
        icon: "fas fa-shapes",
        exercises:[
            {
                id: 1,
                title: "一55555222元二次方程解法",
                answer: "x = [-b ± √(b²-4ac)] / 2a",
                analysis: "利用求根公式解方程，注意判别式的值",
                points: "一元方程",
                iconClass: "fas fa-calculator",
                date: "2023-10-15"
            },
            {
                id: 2,
                title: "三333角形证明题",
                answer: "利用SSS全等证明",
                analysis: "通过对应边相等证明三角形全等",
                points: "几何证明",
                iconClass: "fas fa-shapes",
                date: "2023-10-12"
            }]
    },
    {
        id: 3,
        title: "函数图像",
        totalCount: 112,
        time: "2023-10-15",
        icon: "fas fa-function",
        exercises:[
            {
                id: 1,
                title: "一6666222元二次方程解法",
                answer: "x = [-b ± √(b²-4ac)] / 2a",
                analysis: "利用求根公式解方程，注意判别式的值",
                points: "一元方程",
                iconClass: "fas fa-calculator",
                date: "2023-10-15"
            },
            {
                id: 2,
                title: "三333角形证明题",
                answer: "利用SSS全等证明",
                analysis: "通过对应边相等证明三角形全等",
                points: "几何证明",
                iconClass: "fas fa-shapes",
                date: "2023-10-12"
            }]
    },
    {
        id: 4,
        title: "概率统计",
        totalCount: 84,
        time: "2023-10-12",
        icon: "fas fa-chart-pie",
        exercises:[
            {
                id: 1,
                title: "一222元二次方程解法",
                answer: "x = [-b ± √(b²-4ac)] / 2a",
                analysis: "利用求根公式解方程，注意判别式的值",
                points: "一元方程",
                iconClass: "fas fa-calculator",
                date: "2023-10-15"
            },
            {
                id: 2,
                title: "三333角形证明题",
                answer: "利用SSS全等证明",
                analysis: "通过对应边相等证明三角形全等",
                points: "几何证明",
                iconClass: "fas fa-shapes",
                date: "2023-10-12"
            }]
    },
    {
        id: 5,
        title: "三角函数",
        totalCount: 78,
        time: "2023-10-08",
        icon: "fas fa-calculator",
        exercises:[
            {
                id: 1,
                title: "一222元二次方程解法",
                answer: "x = [-b ± √(b²-4ac)] / 2a",
                analysis: "利用求根公式解方程，注意判别式的值",
                points: "一元方程",
                iconClass: "fas fa-calculator",
                date: "2023-10-15"
            },
            {
                id: 2,
                title: "三333角形证明题",
                answer: "利用SSS全等证明",
                analysis: "通过对应边相等证明三角形全等",
                points: "几何证明",
                iconClass: "fas fa-shapes",
                date: "2023-10-12"
            }]
    }
];



// 初始化错题本
function initHistoryItems() {

    const container = document.getElementById('historyContent');
   // const counter = document.getElementById('itemCount');

    // 清空容器
    container.innerHTML = '';

    let data = historyItems;
    let curHistoryItems = LocalStorageManager.getHistory();
    if(curHistoryItems == null ){return;}
    try{

        console.log('获取存储的 错题');
        console.log(curHistoryItems)
        console.log('获取存储的 错题 end');
        if(curHistoryItems != null && curHistoryItems.length !=0){
            data = curHistoryItems;
            historyItems = curHistoryItems;
        }else{
            var csss = DBUtil.getAllDB();
        }
    }catch (e) {}
    // 遍历数据创建元素
    data.forEach(item => {
        const itemElement = createHistoryItem(item,true);
        container.appendChild(itemElement);
    });

    // 更新计数器
   // counter.textContent = historyItems.length;
}

// 初始化最近错题
function initRecentItems() {
    const container = document.getElementById('mistake-list-recent');
    var i=0;
    // 清空容器
    container.innerHTML = '';
    // 遍历数据创建元素
    historyItems.forEach(item => {
        if(i<3){
            const itemElement = createHistoryItem(item,false);
            container.appendChild(itemElement);
            i++;
        }
    });
}
// 初始化最近错题
function initRecommendItems() {
    const container = document.getElementById('mistake-list-recommend');
    var i=0;
    // 清空容器
    container.innerHTML = '';
    // 遍历数据创建元素
    historyItems.forEach(item => {
        if(i<2){
            const itemElement = createHistoryItem(item);
            container.appendChild(itemElement,false);
            i++;
        }
    });
}

// 创建单个错题项DOM元素
function createHistoryItem(item,flag) {
    const itemElement = document.createElement('div');
    itemElement.className = 'history-item';
    itemElement.setAttribute('data-id', item.id);
    if(flag){
        itemElement.innerHTML = `
                    <div class="checkbox" onclick="toggleSelect(event, this)"></div>
                    <div class="history-icon">
                        <i class="${item.iconClass}"></i>
                    </div>
                    <div class="history-content">
                        <div class="history-title">${item.title}</div>
                        <div class="history-answer-hide">${item.answer}</div>
                        <div class="history-analysis-hide">${item.analysis}</div>
                        <div class="history-points">${item.points}</div>
                    </div>
                    <div class="delete-btn" onclick="deleteHistoryItem(event, this,'errorBook')">
                        <i class="fas fa-times"></i>
                    </div>
                    <div class="time-tag">${item.date}</div>
                `;
    }else{
        itemElement.innerHTML = `
                <div class="history-icon">
                    <i class="${item.iconClass}"></i>
                </div>
                <div class="history-content">
                    <div class="history-title">${item.title}</div>
                    <div class="history-answer-hide">${item.answer}</div>
                    <div class="history-analysis-hide">${item.analysis}</div>
                    <div class="history-points">${item.points}</div>
                </div>
                
                <div class="time-tag">${item.date}</div>
            `;
    }


    // 添加点击事件显示详情
    itemElement.addEventListener('click', function(e) {
        // 防止删除按钮触发
        if (!e.target.closest('.delete-btn') && !e.target.closest('.checkbox')) {
            showDetail(item.title, item.answer, item.analysis, item.points,item.date);
        }
    });

    return itemElement;
}

//AI题库
// 渲染AI题库卡片
function renderAILibraryCards() {
    let data = libraryData;
    try{
        let curLibrary = LocalStorageManager.getLibrary();
        console.log('获取存储的 AI题库');
        console.log(curLibrary)
        console.log('获取存储的 AI题库 end');
        if(curLibrary !=null &&curLibrary.length != 0){
            console.log('获取存储的 AI题库 空空空');
            console.log(curLibrary)
            data = curLibrary;
            libraryData = curLibrary;
            console.log('获取存储的 AI题库 空空空3333333333');
            console.log(curLibrary)
        }
    }catch (e) {}

    const container = document.getElementById('smartContent');

    // 清空容器
    container.innerHTML = '';
    if (!data || data.length === 0) {
        container.innerHTML = `
                    <div class="empty-state">
                        <i class="fas fa-folder-open"></i>
                        <h3>暂无题库数据</h3>
                        <p>点击上方按钮创建新的AI题库</p>
                    </div>
                `;
        return;
    }
    // 生成卡片HTML
    data.forEach(item => {
        const card = document.createElement('div');
        card.className = 'category-card';
        card.innerHTML = `
                    <div class="delete-btn" onclick="deleteCard(event, this)">
                        <i class="fas fa-times"></i>
                    </div>
                    <div class="category-header">
                        <div class="category-icon">
                            <i class="${item.icon}"></i>
                        </div>
                        <div>
                            <div class="category-title">${item.title}</div>
                            <div class="question-count">共${item.totalCount}道题目</div>
                        </div>
                    </div>
                  
                    <div class="knowledge-time">
                        <i class="far fa-clock"></i>
                        <span>${item.time}</span>
                    </div>
                `;

        // 添加点击事件
        card.addEventListener('click', () => {
            showAILibraryDetail(item.title,item.exercises);
        });
        container.appendChild(card);
    });
}

function removeObjectAtIndex(arr, index) {
    // 验证索引是否有效
    if (index < 0 || index >= arr.length) {
        console.error(`无效索引: ${index}。数组长度: ${arr.length}`);
        return arr.slice(); // 返回原数组的副本
    }
    // 使用 filter 创建新数组（跳过指定索引的元素）
    return arr.filter((_, i) => i !== index);
}

//初始化 - 高频
function generatePointCards() {
    let jsonData = highFrequency;
    // 创建容器元素
    const container = document.getElementById('point-grid-card');
    container.innerHTML = "";
    // 模块图标映射表
    const moduleIcons = {
        "数与代数": "fa-superscript",
        "图形与几何": "fa-draw-polygon",
        "函数与分析": "fa-chart-line",
        "统计与概率": "fa-chart-pie"
    };
    // 遍历JSON数据生成卡片
    jsonData.forEach(item => {
        const card = document.createElement('div');
        card.className = 'point-card';
        // 使用内联HTML字符串创建卡片内容
        card.innerHTML = `
            <div class="icon">
                <i class="fas ${moduleIcons[item.module]}"></i>
            </div>
            <div class="point-name">${item.highFrequencyTopic}</div>
            <div class="point-frequency">分值占比: ${item.scorePercentage || '模块内主要考点'}</div>
        `;

        // 添加点击事件
        card.addEventListener('click', () => {
            //showPointDetail(item);
            showAllExamPoints(item);
        });
        container.appendChild(card);
        // 添加到容器
    });

    return container;
}

// 示例点击事件处理函数
/*function showPointDetail(pointData) {
    console.log('展示考点详情:', pointData.highFrequencyTopic);
    console.log('真题示例:', pointData.pastExamQuestions);
    alert(`考点详情: ${pointData.highFrequencyTopic}\n\n真题示例:\n${pointData.pastExamQuestions.join('\n')}`);
}*/

// 使用示例
/*
const jsonData = [/!* 你的JSON数据 *!/];
const cardsContainer = generatePointCards(jsonData);
document.body.appendChild(cardsContainer);*/
function renderExamPointDetail(data) {
    // 获取容器元素
    const container = document.querySelector('.exam-point-detail');

    // 清空容器（避免重复内容）
    container.innerHTML = '';

    // 创建HTML结构
    const html = `
        <div class="exam-point-title">
            <i class="fas fa-star"></i>
            <span>${data.highFrequencyTopic}</span>
        </div>
        
        <div class="exam-point-meta">
            <div class="exam-point-meta-item">
                <div class="meta-label">考查重点</div>
                <div class="meta-value">${data.specificContent}</div>
            </div>
            <div class="exam-point-meta-item">
                <div class="meta-label">常见错误</div>
                <div class="meta-value">${data.commonMistakes}</div>
            </div>
        </div>
        
        <div class="exam-point-content">
            <p><strong>核心概念：</strong>${data.briefIntroduction}</p>
        </div>
        
        <div class="exam-point-examples">
            <div class="examples-title">
                <i class="fas fa-lightbulb"></i>
                <span>历年真题</span>
            </div>
            ${data.pastExamQuestions.map((question, index) => `
                <div class="example-item">
                    <strong>题目${index + 1}：</strong> ${question}
                </div>
            `).join('')}
        </div>
        
     
    `;

    // 插入HTML
    container.innerHTML = html;
}
