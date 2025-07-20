// =====================
// 本地存储管理器
// =====================
let isOnly = true;
const LocalStorageManager = {
    // 本地存储键名
    KEYS: {
        HISTORY: 'mistakeHistory',
        LIBRARY: 'aiLibrary',
        TRIAL_COUNT: 'trialCount',
        Email:'improveScoreEmail'
    },

    //获取用户信息
    getEmail() {
        const data = localStorage.getItem(this.KEYS.Email);
        return data ? data : null;
    },
    // 保存错题本数据
    saveEmail(email) {
        localStorage.setItem(this.KEYS.Email, email);
        DBUtil.insert(CurrentUser,JSON.stringify(libraryData),JSON.stringify(historyItems));
    },

    // 获取错题本数据
    getHistory() {
        let data = localStorage.getItem(this.KEYS.HISTORY);
        return data ? JSON.parse(data) : null;
    },

    // 保存错题本数据
    saveHistory(historyItems) {
        try{
            localStorage.setItem(this.KEYS.HISTORY, JSON.stringify(historyItems));
            DBUtil.insert(CurrentUser,JSON.stringify(libraryData),JSON.stringify(historyItems))
        }catch (e) {}
    },

    // 获取题库数据
    getLibrary() {
        const data = localStorage.getItem(this.KEYS.LIBRARY);
        return data ? JSON.parse(data) : null;
    },

    // 保存题库数据
    saveLibrary(libraryData) {
        try{
        localStorage.setItem(this.KEYS.LIBRARY, JSON.stringify(libraryData));
        DBUtil.insert(CurrentUser,JSON.stringify(libraryData),JSON.stringify(historyItems))
        }catch (e) { }
    },

    // 获取试用次数
    getTrialCount() {
        const count = localStorage.getItem(this.KEYS.TRIAL_COUNT);
        return count ? parseInt(count) : 5; // 默认5次试用
    },

    // 保存试用次数
    saveTrialCount(count) {
        localStorage.setItem(this.KEYS.TRIAL_COUNT, count.toString());
    },

    // 减少试用次数
    decrementTrialCount() {
        const current = this.getTrialCount();
        if (current > 0) {
            this.saveTrialCount(current - 1);
            return current - 1;
        }
        return 0;
    },

    // 清除所有用户数据
    clearUserData() {
        localStorage.removeItem(this.KEYS.HISTORY);
        localStorage.removeItem(this.KEYS.LIBRARY);
        localStorage.removeItem(this.KEYS.TRIAL_COUNT);
    }
};