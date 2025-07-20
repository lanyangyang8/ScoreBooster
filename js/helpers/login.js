// 用户状态管理
const AuthManager = {
    // 检查用户是否登录
    isLoggedIn: function() {
        return localStorage.getItem('isLoggedIn') === 'true';
    },

    // 用户登录
    login: function() {
        localStorage.setItem('isLoggedIn', 'true');

        localStorage.removeItem('isTrialUser');
        closeLoginModal();
        // 更新UI显示登录状态
        updateUIForLogin();
    },

    // 用户登出
    logout: function() {
        localStorage.setItem('isLoggedIn', 'false');
        // localStorage.removeItem('isLoggedIn');
        // 更新UI显示登出状态
        updateUIForLogout();

    },
    // 标记为试用用户
    setTrialUser:function(){
        localStorage.setItem('isTrialUser', 'true');
    },
    // 检查试用状态
    checkTrial: function() {
        // 获取试用次数，如果没有则初始化为5
        let trialCount = this.getTrialCount();
        if (trialCount > 0) {
            // 减少试用次数
            trialCount--;
            localStorage.setItem('trialCount', trialCount);
            document.getElementById('trialCount').textContent = trialCount;
            //localStorage.setItem('isTrialUser', 'true');
            return true;
        }
        return false;
    },

    // 获取剩余试用次数
    getTrialCount: function() {
        // 从localStorage获取试用次数，如果没有则返回5
        const storedCount = localStorage.getItem('trialCount');
        return storedCount !== null ? parseInt(storedCount) : 5;
    },

    // 检查是否是试用用户
    isTrialUser: function() {
        return localStorage.getItem('isTrialUser') === 'true';
    }
};

// 页面加载时初始化
document.addEventListener('DOMContentLoaded', function() {
    // 初始化试用次数显示
    document.getElementById('trialCount').textContent = AuthManager.getTrialCount();


    // 如果用户已登录或试用用户，更新UI
    if (AuthManager.isLoggedIn() || AuthManager.isTrialUser()) {
        updateUIForLogin();

        // 如果是试用用户，添加试用标识
        if (AuthManager.isTrialUser()) {
            startTrialMode();
        }
    }

    // 试用按钮事件
    document.getElementById('trialBtn').addEventListener('click', function() {

        if (AuthManager.getTrialCount()>0) {
            //标记为试用户
            AuthManager.setTrialUser();
            // 试用成功，关闭登录弹窗
            closeLoginModal();

            // 更新UI
            updateUIForLogin();
        } else {
            alert('您的试用次数已用完，请登录后继续使用');
        }
    });

    // 登录表单提交
    document.getElementById('loginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        AuthManager.login();
    });

    // 退出登录事件
    document.getElementById('logoutOption').addEventListener('click', function() {
        AuthManager.logout();
    });
});

// 更新UI显示登录状态
function updateUIForLogin() {

    // 隐藏登录按钮，显示用户信息
    if (AuthManager.isTrialUser()) {
        document.querySelector('.user-name').textContent = "试用用户";
        document.querySelector('.desktop-user-name').textContent = "试用用户";
    } else {

      //  initPageData();

        document.querySelector('.user-name').textContent = "张同学";
        document.querySelector('.desktop-user-name').textContent = "张同学";
        document.querySelector('.user-grade').textContent = "初三";
        document.querySelector('.desktop-user-grade').textContent = "初三";
        // 隐藏试用卡片
        const trialCard = document.querySelector('.trial-card');
        if (trialCard) {
            trialCard.style.display = 'none';
        }
    }

    // 更新拍照按钮状态
  //  document.getElementById('cameraBtn').style.display = 'flex';
}

// 更新UI显示登出状态
function updateUIForLogout() {
    // 显示登录按钮，隐藏用户信息
    document.querySelector('.user-name').textContent = "未登录";
    document.querySelector('.desktop-user-name').textContent = "未登录";

    // 隐藏拍照按钮
    document.getElementById('cameraBtn').style.display = 'none';

    // 跳转到首页
    switchPage('homePage');
    const trialCard = document.querySelector('.trial-card');
    if (trialCard) {
        trialCard.style.display = 'block';
    }
}

// 开始试用模式
function startTrialMode() {

}




// 新增函数：更新试用次数显示
function updateTrialCountDisplay(count) {
    // 更新拍照按钮气泡
    document.getElementById('cameraTrialCount').textContent = count;
    // 更新首页卡片
    const trialCard = document.querySelector('.trial-card p');
    if (trialCard) {
        trialCard.innerHTML = `剩余 <strong>${count}</strong> 次免费识别机会`;
    }
    // 更新登录模态框
    document.getElementById('trialCount').textContent = count;

}

// 在DOM加载完成后初始化试用次数
document.addEventListener('DOMContentLoaded', function() {
    // 初始试用次数（实际应用中应从服务器获取）
    let initialTrialCount = AuthManager.getTrialCount();



    updateTrialCountDisplay(initialTrialCount);
    checkTrialButtonState(initialTrialCount);
    // 试用按钮点击事件

});

// 检查试用按钮状态
function checkTrialButtonState (d) {
    const trialBtn = document.getElementById('trialBtn');

    if (d === 0) {
        // 禁用按钮
        trialBtn.disabled = true;
        trialBtn.classList.add('disabled');
        trialBtn.innerHTML = '<i class="fas fa-ban"></i> 试用次数已用完';
    } else {
        trialBtn.disabled = false;
        trialBtn.classList.remove('disabled');
        trialBtn.innerHTML = '<i class="fas fa-camera"></i> 继续试用';
    }
}

//邮箱注册 以及邮箱验证
async function LoginVerification (email,isverification,verification) {
    try{
        // 调用工作流
        CozeWorkFlow.runCozeWorkflow(token,'7526570252667715584',{
            email: email,
            isverification:isverification,
            verification:verification
        }).then(result => {
            console.log('工作流执行结果:', result)
            try{
                if(isverification){
                    console.log('这是验证！！！！');
                    if(result.msg=="Success"){
                        initPageData(email);
                    }
                }
            }catch (e) {
                container.innerHTML = ''
            }

        }).catch(error => {
            console.error('执行失败:', error)
        });
    }catch (e) { }
}
//初始化页面数据
function  initPageData(email) {
    try{
        let data = LocalStorageManager.getHistory();
        let dataWrong = LocalStorageManager.getLibrary();
        data = null;
        if(data == null||dataWrong == null){
            DBUtil.getDatabase(email).then(
                finalResult => {
                    LoginSuccess(email);
                }
            ).catch(err => console.error("外部捕获错误:", err));
        }else{
            LoginSuccess(email);
        }
    }catch (e) {}
}
//登录成功后更新页面
function LoginSuccess(email) {
    try{

        // 模拟登录成功
        isLoggedIn = true;
        CurrentUser = email;
        closeLoginModal();
        localStorage.setItem('isTrialUser', 'false');
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('email', email);
        LocalStorageManager.saveEmail(email);
        document.getElementById('emailInput').value = email;
        updateUIForLogin();
    }catch (e) { }
}
//检查登录
function checkLogin() {
    try{
        if(AuthManager.isLoggedIn){
            setTimeout(function () {
                const trialCard = document.querySelector('.trial-card');
                if (trialCard) {
                    trialCard.style.display = 'none';
                }
                let email = localStorage.getItem('email');
                if(email == null || email == "null"){
                    localStorage.setItem('isLoggedIn', 'false');
                    trialCard.style.display = 'block';
                }else{
                    document.getElementById('emailInput').value= email;
                    initPageData(email);
                }
            },500)
        }
    }catch (e) {}
}