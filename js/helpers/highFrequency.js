let highFrequency = [
    {
        "module": "数与代数",
        "highFrequencyTopic": "实数的运算",
        "briefIntroduction": "初中数学运算基础，重点考查科学计数法转换、绝对值化简及根式混合计算，要求精确处理近似值和符号规则。",
        "specificContent": "科学计数法（如1286.6万→1.2866×10⁷）、二次根式混合运算（含√3≈1.73）",
        "scorePercentage": "35%-40%",
        "commonMistakes": "混淆平方根与算术平方根；负指数幂计算错误（如2⁻²=0.25错为-4）",
        "pastExamQuestions": [
            "（2024北京）计算：|1-√2| + (1/2)⁻² - ∛27",
            "（2023江苏）将'2035万人次'用科学计数法表示为______",
            "（2022浙江）计算：√12 - 3√(1/3) + (√3-1)⁰"
        ]
    },
    {
        "module": "数与代数",
        "highFrequencyTopic": "方程与不等式",
        "briefIntroduction": "一元二次方程是核心内容，重点考查解法（公式法/因式分解）、Δ判别根的数量（>0两实根），分式方程需验根防增根。",
        "specificContent": "一元二次方程求根公式；分式方程应用题（工程、行程）",
        "scorePercentage": "",
        "commonMistakes": "分式方程漏检增根（未验证分母≠0）",
        "pastExamQuestions": [
            "（2024广东）解方程：2x/(x-1) - 1/(x²-1) = 1",
            "（2023湖北）若关于x的一元二次方程(k-1)x² + 2x + 1=0有实根，求k范围",
            "（2022河南）工程队修路，原计划每天修300米，提前2天完成；实际每天修400米，提前4天完成，求路长"
        ]
    },
    {
        "module": "数与代数",
        "highFrequencyTopic": "分式与二次根式",
        "briefIntroduction": "考查代数式化简能力，需掌握分式约分、通分技巧及二次根式隐含条件（被开方数≥0），常与求值结合命题。",
        "specificContent": "分式化简求值（先因式分解→约分→代值）；二次根式有意义的条件",
        "scorePercentage": "",
        "commonMistakes": "忽略二次根式中a≥0的限制条件",
        "pastExamQuestions": [
            "（2024福建）先化简：(x-4)/(x²-9) ÷ (x²-3x)/(x+3)，再求x=√5时的值",
            "（2023山东）若√(2a-1) + √(3-4a)有意义，求a的范围",
            "（2022河北）已知a=√3+1，b=√3-1，求(a²-b²)/(ab)的值"
        ]
    },
    {
        "module": "图形与几何",
        "highFrequencyTopic": "三角形与全等",
        "briefIntroduction": "几何推理的核心工具，需熟练运用SSS/SAS/ASA判定全等，掌握中位线性质及折叠问题中的等量关系转化。",
        "specificContent": "全等证明；中位线定理（DE=½BC）；折叠问题（勾股定理求边长）",
        "scorePercentage": "30%-35%",
        "commonMistakes": "全等条件缺失（如误用SSA）；折叠对应边找错",
        "pastExamQuestions": [
            "（2024江苏）矩形ABCD沿EF折叠使C落在C'，AB=6，BC=8，求△BFC'周长",
            "（2023浙江）△ABC中，D、E为AB、AC中点，F为BC中点，证四边形ADFE为平行四边形",
            "（2022广东）如图，∠B=∠E，AB=DE，添加条件______使△ABC≌△DEF（SSS/SAS/ASA）"
        ]
    },
    {
        "module": "图形与几何",
        "highFrequencyTopic": "圆与相似三角形",
        "briefIntroduction": "圆的性质综合应用，重点考查切线垂直半径、垂径定理求弦长，圆周角定理需注意弦对两角互补（优/劣弧多解）。",
        "specificContent": "切线性质+垂径定理综合题；圆周角定理（同弧所对圆周角=½圆心角）",
        "scorePercentage": "",
        "commonMistakes": "圆周角多解遗漏（未分优/劣弧讨论）",
        "pastExamQuestions": [
            "（2024河南）⊙O中弦AB=8，OC⊥AB于D，CD=2，求半径",
            "（2023江苏）PA切⊙O于A，PB过圆心交圆于B、C，PA=6，PC=4，求⊙O半径",
            "（2022湖北）圆内接△ABC，∠A=50°，弦BC所对圆周角度数为______（两解）"
        ]
    },
    {
        "module": "图形与几何",
        "highFrequencyTopic": "几何最值模型",
        "briefIntroduction": "动态几何难点，费马点通过旋转化折为直求最值；隐圆模型依据定点定长确定动点轨迹（常考最值问题）。",
        "specificContent": "费马点（旋转60°构造等边三角形）；隐圆模型（如定弦定角→轨迹为圆）",
        "scorePercentage": "",
        "commonMistakes": "旋转角度计算错误；轨迹圆圆心定位偏差",
        "pastExamQuestions": [
            "（2024广东）正方形ABCD边长为4，P为对角线AC动点，求PB+PD最小值",
            "（2023浙江）Rt△ABC中∠C=90°，AC=3，BC=4，点P在AB上，求PC的最小值",
            "（2022河南）定点A(0,0)、B(4,0)，动点P满足∠APB=90°，求OP的最大值"
        ]
    },
    {
        "module": "函数与分析",
        "highFrequencyTopic": "一次/反比例函数",
        "briefIntroduction": "函数图像与性质的基础，需理解k的符号对增减性和象限分布的影响，常考交点坐标求解及铅垂法求三角形面积。",
        "specificContent": "k值意义（k>0时一次函数上升）；求交点（联立方程）；铅垂法求面积（S=½×水平宽×铅垂高）",
        "scorePercentage": "15%-25%",
        "commonMistakes": "忽略k对图像的影响；面积公式漏乘½",
        "pastExamQuestions": [
            "（2024北京）直线y=kx+b过(1,2)且与y=2/x交于A、B，S△AOB=3，求k值",
            "（2023上海）反比例函数y=k/x与y=2x-4交于A、B，C为x轴动点，求S△ABC最大时C坐标",
            "（2022江苏）一次函数y=mx+4与y=3/x交于第一象限点P，且OP=√5，求m"
        ]
    },
    {
        "module": "函数与分析",
        "highFrequencyTopic": "二次函数压轴题",
        "briefIntroduction": "中考压轴核心，动态最值（顶点公式）、参数范围（Δ判交点）、几何综合（与特殊图形结合）是三大命题方向，强调数形结合。",
        "specificContent": "顶点坐标（h=-b/2a, k=(4ac-b²)/4a）；Δ分析交点个数；与平行四边形/直角三角形的综合问题",
        "scorePercentage": "",
        "commonMistakes": "顶点坐标符号记错；Δ>0误判为无交点",
        "pastExamQuestions": [
            "（2024湖北）抛物线y=x²-2x-3与直线y=x+k有唯一交点，求k及交点坐标",
            "（2023江苏）y=-x²+4x与x轴交A、B，y轴交C，P为抛物线上点，使以P、A、B、C为顶点的四边形为平行四边形，求P坐标",
            "（2022浙江）y=ax²+bx+c过(1,0)，顶点在y=2x-1上，最小值为-3，求解析式"
        ]
    },
    {
        "module": "函数与分析",
        "highFrequencyTopic": "坐标系变换",
        "briefIntroduction": "考查点对称与距离计算，需掌握关于坐标轴、原点的对称规律，灵活应用距离公式解决实际位置问题。",
        "specificContent": "点对称（如关于x轴：(x,-y)）；点到x轴距离|y|，到原点距离√(x²+y²)",
        "scorePercentage": "",
        "commonMistakes": "对称坐标符号混淆（如原点对称错为(x,-y)）",
        "pastExamQuestions": [
            "（2024四川）点P(3,-4)关于直线y=x对称点Q坐标为______",
            "（2023陕西）点A(a,b)到x轴距离为3，到y轴距离为4，求√(a²+b²)的最小值",
            "（2022重庆）在坐标系中，点M(2,3)绕原点逆时针转90°得M'，求M'坐标"
        ]
    },
    {
        "module": "统计与概率",
        "highFrequencyTopic": "数据分析",
        "briefIntroduction": "数据处理能力考查，重点包括统计图补全、中位数（需先排序）、方差计算，需从多角度（平均数/众数）对比分析数据特征。",
        "specificContent": "补全条形图/扇形图；中位数计算（奇数取中间，偶数取均值）；方差公式s²=⅟ₙ∑(xᵢ-x̄)²",
        "scorePercentage": "10%-25%",
        "commonMistakes": "中位数未排序直接取值；方差与标准差公式混淆",
        "pastExamQuestions": [
            "（2024北京）九年级20名学生跳绳成绩：178,185,176,...（数据略），求中位数、方差",
            "（2023江苏）补全频数分布直方图（60-70分12人，70-80分占30%，80-90分15人，总数50人）",
            "（2022浙江）甲、乙班数学成绩对比：甲班平均分85、方差18；乙班平均分83、方差6，分析哪个班成绩更稳定"
        ]
    },
    {
        "module": "统计与概率",
        "highFrequencyTopic": "概率计算",
        "briefIntroduction": "生活场景中的概率应用，需区分'放回'与'不放回'模型，用树状图/列表法枚举所有情况，判断游戏公平性需比较概率。",
        "specificContent": "树状图法求概率（标注是否放回）；公平性判断（P(A)=P(B)?）",
        "scorePercentage": "",
        "commonMistakes": "抽取模型混淆；概率未化简导致比较错误",
        "pastExamQuestions": [
            "（2024广东）口袋有2红1白球，不放回取两次，求两次颜色相同的概率",
            "（2023湖北）A转盘三等份标1,2,3；B转盘四等份标1,2,3,4，同时转动求两数和为偶数的概率",
            "（2022河南）游戏规则：掷骰子，点数为质数得2分，合数得1分。问是否公平？说明理由"
        ]
    }
]