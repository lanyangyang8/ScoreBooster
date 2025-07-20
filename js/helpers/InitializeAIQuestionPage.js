// 在js/utils/identify.js或js/helpers/InitializeAIQuestionPage.js中添加以下代码

// 初始化知识点筛选标签
function initFilterTags() {
    document.getElementById('filterTags').innerHTML ='';
    const container = document.getElementById('filterTags');
    const historyItemsNew = document.querySelectorAll('.history-item');
    const knowledgeSet = new Set();

    // 收集所有知识点
    historyItemsNew.forEach(item => {
        const pointsEl = item.querySelector('.history-points');
        if (pointsEl) {
            const points = pointsEl.textContent.trim();
            if (points) {
                // 处理多个知识点的情况（用·分隔）
                points.split('·').forEach(point => {
                    const trimmedPoint = point.trim();
                    if (trimmedPoint) {
                        knowledgeSet.add(trimmedPoint);
                    }
                });
            }
        }
    });

    // 添加"全部"标签
    const allTag = document.createElement('div');
    allTag.className = 'filter-tag active';
    allTag.textContent = '全部';
    allTag.addEventListener('click', () => {
        resetKnowledgeFilter();
        document.querySelectorAll('.filter-tag').forEach(tag => tag.classList.remove('active'));
        allTag.classList.add('active');
    });
    container.appendChild(allTag);

    // 添加知识点标签
    knowledgeSet.forEach(point => {
        const tag = document.createElement('div');
        tag.className = 'filter-tag';
        tag.textContent = point;

        tag.addEventListener('click', () => {
            filterByKnowledge(point);
            document.querySelectorAll('.filter-tag').forEach(tag => tag.classList.remove('active'));
            tag.classList.add('active');
        });

        container.appendChild(tag);
    });
}

// 按知识点筛选
function filterByKnowledge(knowledge) {
    let historyItemsTemp = document.querySelectorAll('.history-item');

    historyItemsTemp.forEach(item => {
        const pointsEl = item.querySelector('.history-points');
        if (pointsEl) {
            const pointsText = pointsEl.textContent;
            if (pointsText.includes(knowledge)) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        }
    });
}

// 重置筛选
function resetKnowledgeFilter() {
    document.querySelectorAll('.history-item').forEach(item => {
        item.style.display = 'flex';
    });
}

// 在错题本页面显示时调用初始化
document.querySelector('.tab[data-tab="history"]').addEventListener('click', () => {
    setTimeout(() => {
        initFilterTags();
    }, 300);
});