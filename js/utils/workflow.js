/**
 * @author:andy
 * @date 2025-06-04
 * Coze图像识别SDK
 */
(function() {
    // 内部状态变量
    let chatId = '';
    let conversationId = '';
    let isIdentifying = false;
    let answer = '';

    // 默认配置参数
    const defaultConfig = {
        url: 'https://api.coze.cn/v1/workflow/run',
        workflowId:'7524553212725903403',
    };

    // 当前配置
    let config = {...defaultConfig};

    // 设置配置参数
    const setConfig = (newConfig) => {
        config = {...config, ...newConfig};
    };

   /* const runWorkflow = async function (text,token) {
       /!* const url = 'https://api.coze.cn/v1/workflow/run';
        const token = 'pat_hfwkehfncaf****'; // 替换为你的实际令牌
        const workflowId = '73664689170551*****'; // 替换为你的实际工作流ID*!/

        try {
            const response = await fetch(defaultConfig.url, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    workflow_id: defaultConfig.workflowId,
                    parameters: {
                        input: text
                    },
                    is_async: true
                })
            });

            if (!response.ok) {
                throw new Error(`请求失败，状态码: ${response.status}`);
            }
            const data = await response.json();
            console.log('响应数据:', data);
            console.log('execute_id:::'+data.execute_id)

          return data;
         //   return  getWorkflowRunHistory(defaultConfig.workflowId,data.execute_id,token);

           //  data;
        } catch (error) {
            console.error('请求出错:', error);
            throw error;
        }
    };*/
    async function getWorkflowRunHistory(runHistoryId, token) {
        const url = `https://api.coze.cn/v1/workflows/${defaultConfig.workflowId}/run_histories/${runHistoryId}`;

        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`请求失败，状态码: ${response.status}`);
            }

            const data = await response.json();

            console.log('查询结果..............');
            console.log(data);
            console.log('查询结果....1111..........');
            return data;
        } catch (error) {
            console.error('获取工作流历史记录出错:', error);
            throw error;
        }
    }
    async function runCozeWorkflow(token,workflowId,parameters) {
        const url = 'https://api.coze.cn/v1/workflow/run';

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    workflow_id: workflowId,
                    parameters: parameters
                })
            });

            if (!response.ok) {
                throw new Error(`请求失败，状态码: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('执行工作流时出错:', error);
            throw error;
        }
    }

    async function runWorkflow(token,workflowId,parameters) {
        const url = 'https://api.coze.cn/v1/workflow/stream_run';
       // const token = 'pat_ULdFRKFxHdaaUqxOb3T4p21LS7DgSxVB4YG1JoyT9Yh6fmiim0yZK6RMLidgUk7a';

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                workflow_id: workflowId,
                parameters: parameters
            })
        });

        if (!response.ok) {
            throw new Error(`请求失败: ${response.status}`);
        }

        return response.json(); // 如果是流式响应，可能需要使用 response.body 处理
    }


    async function runWorkflowStream(token,workflowId,parameters) {
        const url = 'https://api.coze.cn/v1/workflow/stream_run';
       // const token = 'pat_ULdFRKFxHdaaUqxOb3T4p21LS7DgSxVB4YG1JoyT9Yh6fmiim0yZK6RMLidgUk7a';

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    workflow_id: workflowId, // 替换为你的实际workflow_id
                    parameters: parameters              // 替换为你的输入数据
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            // 处理流式响应
            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let result = '';

            while (true) {
                const { value, done } = await reader.read();
                if (done) break;

                // 将数据块解码并拼接
                const chunk = decoder.decode(value, { stream: true });
                result += chunk;

                // 可选：实时处理每个数据块
                console.log('Received chunk:', chunk);
            }

            console.log('Stream complete. Final data:', result);
            return result;
        } catch (error) {
            console.error('Request failed:', error);
            throw error;
        }
    }

    // 暴露到全局对象
    window.CozeWorkFlow = {
        runWorkflow,
        getWorkflowRunHistory,
        runCozeWorkflow,
        setConfig,
        runWorkflowStream,
        getStatus: () => ({ isIdentifying })
    };
})();