const fileInput = document.getElementById('cameraPreview-img');
const token = 'pat_ULdFRKFxHdaaUqxOb3T4p21LS7DgSxVB4YG1JoyT9Yh6fmiim0yZK6RMLidgUk7a';
let currentFile = '';

try{
    fileInput.addEventListener('change', async (e) => {
        const file = e.target.files[0];
        currentFile = file;
    });
}catch (e) {

}
//解析试题
async function recognizeQuestions() {
    try{
        try{
            if(AuthManager.isTrialUser()) {
                if(AuthManager.getTrialCount()<1){
                    alert('您的试用次数已用完，请登录后继续使用');
                    showLoginModal();
                    return;
                }
            }else{
                // 检查用户状态
                if (!AuthManager.isLoggedIn()) {
                    alert('请登录后继续使用');
                    showLoginModal();
                    return;
                }
            }

        }catch (e) {
            console.log('............8888888888888.............');
            console.log(e)
            console.log('............8888888888888999999999.............');
        }
        // 获取识别按钮并隐藏
        const recognizeBtn = document.getElementById('recognizeBtn');
        recognizeBtn.style.display = 'none';
        const preview = document.getElementById('cameraPreview');
        preview.innerHTML = '<i class="fas fa-spinner fa-spin fa-3x"></i><div style="margin-top: 20px; font-size: 18px;">正在识别习题...</div>';

        const result = await CozeImageIdentifier.identifyImage(currentFile, token);
        if (result.success) {

            console.log('分析结果:', result.analysisResult);
            console.log('完整答案:', result.answer);

            // 解析JSON字符串
            const analysisData = JSON.parse(result.analysisResult);
            const questions = analysisData.output;

            // 获取题目列表容器
            const questionList = document.getElementById('exercise-content-item');
            questionList.innerHTML = ''; // 清空现有内容

            // 动态生成题目项
            questions.forEach((q, index) => {
                console.log('题干:'+q.qeustion)
                // 获取当前日期和时间
                const now = new Date();
                const formattedDate = `${now.getFullYear()}-${(now.getMonth()+1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}`;

                const questionItem = document.createElement('div');
                questionItem.className = 'question-item';
                questionItem.innerHTML = `
                    <div class="history-item selected">
                        <div class="checkbox checked" onclick="toggleAiLibrary(event, this)"></div>
                        <div class="history-content">
                            <!-- 题干 -->
                            <div class="mistake-question">${q.question}</div>
                            
                            <!-- 答案 -->
                            <div class="mistake-answer">
                                <span class="mistake-label">答案：</span>
                                <span class="answer-content">${q.answer}</span>
                            </div>
                            
                            <!-- 解析 -->
                            <div class="mistake-analysis">
                                <span class="mistake-label">解析：</span>
                               <span class="analysis-content">${q.analysis}</span> 
                            </div>
                            
                            <!-- 考点 -->
                            <div class="mistake-points">
                                <span class="points-content">${q.points || '数学'}</span>
                            </div>
                        </div>
                        <div class="delete-btn" onclick="deleteHistoryItem(event, this,'identify')">
                            <i class="fas fa-times"></i>
                        </div>
                        <div class="time-tag">${formattedDate}</div>
                    </div>
                `;
                questionList.appendChild(questionItem);
            });

            setTimeout(() => {
                closeCamera();
                // 显示题目选择模态框
                document.getElementById('exerciseModal').style.display = 'flex';
                document.getElementById('exerciseTitle').innerHTML = '习题识别';
                document.getElementById('add-to-mistakes-button').style.display = 'flex';
            }, 2500);
            AuthManager.checkTrial();
            updateTrialCountDisplay(AuthManager.getTrialCount())
        } else {
            console.error('识别失败:', result.error);
        }

    }catch (e) {}
}
//AI智能出题
async function getAiIntelligenceExam(text,flag) {
    try{
        const container = document.getElementById('exercise-content-item');
        // 清空容器
        container.innerHTML = '';
        container.innerHTML = '<div class="exam-point-content-des"> <i class="fas fa-spinner fa-spin fa-3x"></i><div style="margin-top: 20px; font-size: 18px;">正在AI智能出题...</div></div>';


        console.log('11111111111智能出题11111111');
        console.log(text);
        console.log('11111111111智能出题111111122222222222222222222221');
        let title = "";
        text.forEach(item => {
            title+= item['title'];
        });
        console.log('11111111111智能出题13333333333333333333');
        console.log(title);
        console.log('11111111111智能出题4444444444444444444');




// 调用工作流
        CozeWorkFlow.runCozeWorkflow(token,'7524553212725903403',{
            input: title,
        }).then(result => {
            console.log('工作流执行结果:', result)
            try{
                const analysisData = JSON.parse(result.data);
                const questions = analysisData.output;
                container.innerHTML = '';
                addExerciseContentItem(JSON.parse(questions),flag);
                console.log('工作流执行结果77777777:', questions)
            }catch (e) {
                container.innerHTML = ''
            }

        }).catch(error => {
            console.error('执行失败:', error)
        });


    }catch (e) { }
}





