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
        cozeFileUploadURL: 'https://api.coze.cn/v1/files/upload',
        cozeChatURL: 'https://api.coze.cn/v3/chat',
        botId: '7511906415587016723',
        userId: '1024',
        pollInterval: 2000,
        maxPollAttempts: 90
    };

    // 当前配置
    let config = {...defaultConfig};

    // 设置配置参数
    const setConfig = (newConfig) => {
        config = {...config, ...newConfig};
    };

    // 上传文件到Coze
    const uploadToCoze = async (file, token) => {
        const formData = new FormData();
        formData.append('file', file);

        const response = await axios.post(
            config.cozeFileUploadURL,
            formData,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            }
        );

        return response.data.data.id;
    };

    // 发送查询请求
    const sendQuery = async (fileId, token) => {
        const requestData = {
            bot_id: config.botId,
            user_id: config.userId,
            stream: false,
            auto_save_history: true,
            additional_messages: [{
                role: 'user',
                content: JSON.stringify([{ type: 'image', file_id: fileId }]),
                content_type: 'object_string'
            }]
        };

        const response = await axios.post(
            config.cozeChatURL,
            requestData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        conversationId = response.data.data.conversation_id;
        chatId = response.data.data.id;

        return { conversationId, chatId };
    };

    // 轮询结果
    const pollForResult = async (token) => {
        const pollUrl = `${config.cozeChatURL}/retrieve?chat_id=${chatId}&conversation_id=${conversationId}`;
        let status = 'in_progress';
        let attempts = 0;

        while (status === 'in_progress' && attempts < config.maxPollAttempts) {
            await new Promise(resolve => setTimeout(resolve, config.pollInterval));

            try {
                const response = await axios.get(pollUrl, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                status = response.data.data.status;
                attempts++;

                if (status === 'completed') {
                    return true;
                }
            } catch (error) {
                console.error('轮询请求失败:', error);
                attempts++;
            }
        }

        throw new Error('轮询超时或识别未完成');
    };

    // 获取对话内容
    const getConversationContent = async (token) => {
        const contentUrl = `${config.cozeChatURL}/message/list?chat_id=${chatId}&conversation_id=${conversationId}`;

        const response = await axios.get(contentUrl, {
            headers: { Authorization: `Bearer ${token}` }
        });

        let responseData = '';
        answer = '';
        
        response.data.data.forEach(item => {
            if (item.type === 'tool_response') {
                responseData += item.content;
            }
            if (item.type === 'answer') {
                answer += item.content;
            }
        });

        console.log('识别结果!!!!');
        console.log(responseData)
        console.log('识别结果!!!!000');

        return responseData.replace(/null/g, '');
    };

    // 主识别函数
    const identifyImage = async (file, token) => {
        try {
            isIdentifying = true;
            // 1. 上传到Coze获取文件ID
            const fileId = await uploadToCoze(file, token);
            // 2. 发送查询请求
            await sendQuery(fileId, token);
            // 3. 轮询结果
            await pollForResult(token);
            // 4. 获取对话内容
            const content = await getConversationContent(token);
            return {
                success: true,
                analysisResult: content,
                answer: answer
            };
        } catch (error) {
            console.error('识别过程出错:', error);
            return {
                success: false,
                error: error.message || '图像识别失败'
            };
        } finally {
            isIdentifying = false;
        }
    };

    // 暴露到全局对象
    window.CozeImageIdentifier = {
        identifyImage,
        setConfig,
        getStatus: () => ({ isIdentifying })
    };
})();