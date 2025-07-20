// =====================
// 数据库管理器 (IndexedDB)
// =====================

const DBUtil = {

    // 获取所有数据
    async getAllDB(email) {
        this.getDatabase(email);
    },
    // 获取所有数据
    async getHistory(email) {
        this.getDatabase(email);
    },
    // 获取所有数据
    async  getLibrary(email) {
        this.getDatabase(email);
    },
    // 插入数据（单条）
    async insert(email,aibank,wrongbook) {

        this.insertDatabase(email,"\"insert\"",aibank,wrongbook);
    },
    getDatabase(email){
        try{
            if(email == "" || email == null){
                email =  LocalStorageManager.getEmail();
            }
            // 调用工作流
          return  CozeWorkFlow.runWorkflowStream(token,'7528711580566880291',{
                email: email
            }).then(result => {
                console.log('工作流执行结果:', result)
                try{
                    let obj  = JSON.parse(this.extractAndSerializeOutput(result));
                    LocalStorageManager.saveHistory(JSON.parse(obj[0].wrongbook));
                    LocalStorageManager.saveLibrary(JSON.parse(obj[0].aibank));
                    return obj;
                }catch (e) {}

            }
            ).catch(error => {
                console.error('执行失败:', error)
            });
        }catch (e) { }
    },
     extractAndSerializeOutput(inputString) {
    // 1. 提取包含 "event: Message" 的数据块
    const messageBlock = inputString.split('\n\n').find(block =>
        block.includes('event: Message') && block.includes('data:')
    );

    if (!messageBlock) {
        throw new Error('Message block not found');
    }

    // 2. 提取 data 字段的 JSON 字符串
    const dataMatch = messageBlock.match(/data: (\{[\s\S]*?\})\s*$/m);
    if (!dataMatch || !dataMatch[1]) {
        throw new Error('Data field not found');
    }

    try {
        // 3. 解析 data 字段的第一层 JSON
        const dataObj = JSON.parse(dataMatch[1]);

        // 4. 解析 content 字段的第二层 JSON
        const contentObj = JSON.parse(dataObj.content);

        // 5. 提取 output 对象
        const output = contentObj.output;

        // 6. 序列化 output 对象为 JSON 字符串
        return JSON.stringify(output, null, 2);
    } catch (e) {
        throw new Error('Error parsing JSON: ' + e.message);
    }
  },
    //邮箱注册 以及邮箱验证
    insertDatabase (email,flag,aibank,wrongbook) {
        try{
            if(email == "" || email == null){
                console.log('邮箱为空')
                email =  LocalStorageManager.getEmail();
                if(email == null || email == undefined ||email == "" ){
                   email = document.getElementById('emailInput').value
                }
            }
            // 调用工作流
            CozeWorkFlow.runWorkflow(token,'7528031947148574772',{
                email: email,
                aiBank:aibank,
                wrongBook:wrongbook,
                flag:flag
            }).then(result => {}).catch(error => {
                console.error('执行失败:', error)
            });
        }catch (e) {}
    }


};

