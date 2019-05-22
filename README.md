### 健康度

[/mobile/yps/load_health_values](/mobile/yps?load_health_values)

"status": 0绿色/1黄色/2红色,

> 请求参数
>

- site[可选]: string   jd/wgq


```json
{
    "trends": {
		"categories": ["11:11","11:12","11:13","11:14","11:15","11:16","11:17","11:18","11:19"],
        "values": [66,77,71,88,90,88,78,70,80],
        "alarms":[
            {time:"11:14",body:[{msg:"异常1"},{msg:"异常2"},{msg:"异常3"}]},
            {time:"11:16",body:[{msg:"异常1"}]},
            {time:"11:20",body:[{msg:"异常1"},{msg:"异常2"},{msg:"异常3"},{msg:"异常4"}]}
        ]
	}
    "site": "jd/wgq",
    "items": [
    	{
    		"name" : "交易率(笔/秒)",
    		"status_information": "13829",
    		"status": 0,
		},
    	{
    		"name" : "响应时间(秒)",
    		"status_information": "0.03",
    		"status": 0,
		},
    	{
    		"name" : "总体CPU(%)",
    		"status_information": "46.25%",
    		"status": 1
		},
		{
    		"name" : "联机CPU(%)",
    		"status_information": "22.25%",
    		"status": 0
		},
		{
    		"name" : "Q复制延迟(秒)",
    		"status_information": "1.17",
    		"status": 0
		},
		{
    		"name" : "异地灾备",
    		"status_information": "正常",
    		"status": 0
		},
		{
    		"name" : "双活切换",
    		"status_information": "正常",
    		"status": 0
		},
		{
    		"name" : "表空间",
    		"status_information": "正常",
    		"status": 0
		},
		{
    		"name" : "关键事件",
    		"status_information": "正常",
    		"status": 0
		},
		{
    		"name" : "智能应急",
    		"status_information": "正常",
    		"status": 0
		}
]
    
}
```

### 平台播报

[/mobile/yps/load_broadcasts](/mobile/yps/load_broadcasts)

```json
{
    broadcasts: [
        {
            "timestamp": "2018-07-11 13:42:00",
            "content": "PLEXPP2:TWS中有系统相关作业异常中断"
        },
        {
            "timestamp": "2018-07-11 10:42:00",
            "content": "PLEXPP2:资源不可用。CORRELATIO-ID字段标示线程名称，REASON表示REASON CODE，TYPE和NAME字段描述不可用资源的类型和名称"
        },
        {
            "timestamp": "2018-07-11 09:33:00",
            "content": "PLEXPP2:TWS中有作业报错需要处理，每隔30分钟自动检查TWS中是否有作业报错。"
        },
                {
            "timestamp": "2018-07-07 13:42:00",
            "content": "PLEXPP2:TWS中有系统相关作业异常中断"
        },
        {
            "timestamp": "2018-07-04 10:42:00",
            "content": "PLEXPP2:DB2中有STOPPED状态utility"
        },
        {
            "timestamp": "2018-07-02 09:33:00",
            "content": "PLEXPP1:SA中有报错脚本"
        }
    ]
}
```

### 智能应急

[/mobile/yps/load_auto_yj](/mobile/yps/load_auto_yj)

```json
{
    yjs: [
        {
            "timestamp": "2018-07-11 09:03:00",
            "content": "PLEXPP2通道异常已自动隔离"
        },
        {
            "timestamp": "2018-07-10 08:24:00",
            "content": "可分离交易已被自动回切"
        },
        {
            "timestamp": "2018-07-08 07:13:00",
            "content": "PLEXPP1通道31异常已自动隔离"
        },
        {
            "timestamp": "2018-07-07 11:22:00",
            "content": "PLEXPP2通道44异常已自动隔离"
        },
    ]
}
```

### 详细指标

#### TAB列表

[/mobile/yps/load_tab_list](/mobile/yps/load_tab_list)

index_type 可选          address/lpar/ch

```json
{
    tabs: [
        {
            "name": "CICS",
            "display": "联机"
        },
        {
            "name": "DB2",
            "display": "DB2"
        },
        {
            "name": "OS",
            "display": "系统"      
        }
    ]
}
{
    tabs: [
        {
            "name": "CPU",
            "display": "CPU"
        },
        {
            "name": "CF",
            "display": "CF"
        },
        {
            "name": "ECSA",
            "display": "ECSA内存"      
        },
        {
            "name": "CSA",
            "display": "CSA内存"      
        },
        {
            "name": "ESQA",
            "display": "ECQA内存"      
        }
    ]
}
```



#### 列表数据:

[/mobile/yps/load_index_list](/mobile/yps/load_index_list)

> 请求参数
>

- index_type 可选                   address/lpar/ch

- index_sub_type可选             


	当index_type=address时
	
	index_sub_type  可以选择 CICS/DB2/OS
	
	当index_type=lpar时
	
	index_sub_type  可以选择 CPU/CF/ECSA/CSA/ESQA

##### status状态说明

- status为0时表示绿色,状态为1时为黄色, 其他状态都为红色

```json
{
    "indexes" : [
        {
            "id" : "CICS",
            "name": "CI2DCAD2",
            "value": "126", // 交易率
            "reference": "124", //响应时间
            index_type:"adress",
            "status": 0
        },
        {
            "id" : "CICS",
            "name": "CI2CCAC3",
            "value": "112",
            "reference": "101",
            index_type:"adress",
            "status": 0
        },
        {
            "id" : "CICS",
            "name": "CI2CCAC3",
            "value": "100",
            "reference": "111",
            index_type:"adress",
            "status": 0
        },
        {
            "id" : "CICS",
            "name": "CI2ECAD2",
            "value": "101",
            "reference": "77",
            index_type:"adress",
            "status": 0
        },
        {
            "id" : "CICS",
            "name": "CI2FCAC3",
            "value": "87",
            "reference": "65",
            index_type:"adress",
            "status": 0
        },
        {
            "id" : "CICS",
            "name": "CI2GCAC3",
            "value": "88",
            "reference": "65",
            index_type:"adress",
            "status": 0
        }
    ] 
}

```

#### 图表数据

[/mobile/yps/load_index_detail](/mobile/yps/load_index_detail)

> 请求参数
>

- index_type  可以选择 cics/db2/os  //一级
- index_sub_type 可以选择  cpu/cf/memory //二级
- index_name 取list接口中的name值  //list
- lpar  //lpar




```json
{
     "categories": ["11:11","11:12","11:13","11:14","11:15","11:16","11:17","11:18","11:19"],
      "values": [66,77,71,88,90,88,78,70,80], //交易率
    "responses": [66,77,71,88,90,88,78,70,80], //响应时间
}
```

