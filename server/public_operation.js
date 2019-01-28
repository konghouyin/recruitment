const sql = require('./server/public_sql');
//组长组员公共功能

module.exports = {
    serachSelfInfo: function(pool,result){//个人信息
        let info={};
        sql.server(pool,serachSelfInfoState(result),function(data){
            if(data.length){
                info.selfInfo = data;
                info.style = 1;
            }else{
                info.style = 0;
                info.msg = "查无信息";
            }
            return info;
        })
        function serachSelfInfoState(result){
            let where = result.nametype +"="+ sql.escape(result.name);
            return sql.select(["*"], "registryinformation", where);
        }
    },
    showInfoOfView:function(pool,result,number){//查询本组报名数据（报名，一面，二面，三面，四面）
        let info={};
        sql.server(pool,serachViewsState(result,number),function(data){
            if(data.length){
                info.selfInfo = data;
                info.style = 1;
            }else{
                info.style = 0;
                info.msg = "暂无数据";
            }
            return info;
        });
        function serachViewsState(result,number){
            let where = "group="+result.group+"and level="+"1"+"and pass="+sql.escape(number);
            return sql.select(["xuehao","name","xueyuan","zhuanye","banji","phoneNum","style"],"registryinformation",where);
        }
    },
    rank:function(pool,result,number){//查询排名 number表示几面
        let rankList = {};
        sql.server(pool,rankState(result,number),function(data){//成绩信息
            if(data.length){
                rankList.score = data;
                sql.server(poll,infoState(result,number),function(data){//个人信息
                    rankList.info  = data;
                    rankList.style = 1;  
                })
            }else{
                rankList.style = 0;
                rankList.msg = "暂无数据";
            }
            return rankList;
        });
        
        function rankState(result,number){
            let where = "group="+result.group+"and pass="+sql.escape(number)+" GROUP BY xuehao";
            return sql.select(["*"],"scoringrecord",where);
        }
        function infoState(result,number){
            let where = "group="+result.group+"and pass>"+sql.escape(number);
            return sql.select(["xuehao","name","xueyuan","zhuanye","banji","xingbie"],"registryinformation",where);
        }
    },
    rankDetails: function(result,xuehao){//每面具体成绩信息(前端加号的信息)
        sql.server(pool,detailsState(result,xuehao),function(data){
            let info={};
            if(data.length){
                info.scoreInfo = data;
                info.style=1;
            }else{
                info.style=0;
                info.msg="暂无数据";
            }
            return info;
        });
        function detailsState(result,xuehao){
            let where ="group="+result.group+"and xuehao="+sql.escape(xuehao);
            return sql.select(["*"],"scoringrecord",where);
        }
    },
    searchMarkRules:function(pool,result){//查找打分规则
        let markRlues={};
        sql.server(pool,sql.select(["obj"],"scoringstandard","group="+result.group),function(data){//打分规则
            if(data.length){
                markRlues.rules = data;
                markRlues.style = 1;//查找成功
            }else {
                markRlues.style = 0;
                markRlues.msg = "暂无数据";
            }
            return markRlues;
        })
    },
    mark:function(pool,result,xuehao,markText){//打分 从一面未面试 二面未面试 里找 几面从流程表里找 markText为前端发来的对象，内容为打分内容+advince+history的对象
        let markInfo = {};
        sql.server(pool,sql.select(["style"],"process"),function(data){//查看现在是几面
            let state = data[0];
            if(state==0){
                markInfo.style = 0;
                markInfo.msg = "面试未开始";
            }else if(state == 4){
                markInfo.style = 0;
                markInfo.msg = "面试已结束";
            }else{
                sql.server(pool,markState(result,state,xuehao),function(data){//result登录人所携带session,state当前是第几面,xuehao面试者学号,markText打分内容
                    if(data.length){
                        if(data[10]==1){//1代表已面试待审核
                            markInfo.style = 0;
                            markInfo.msg = "该学生已面试";
                        }else{
                            sql.server(pool,sql.insert("scoringrecord",["xuehao","group","type","time","person","obj","advince","history"],[xuehao,result.group,state,CURRENT_TIMESTAMP(),result.name,markText.obj,markText.advice,markText.history]),function(){
                                markInfo.style = 1;
                                markInfo.msg = "打分记录提交成功";
                            });
                        } 
                    }
                    else if(!data.length){ 
                        markInfo.style = 0;
                        markInfo.msg = "该学生已被淘汰";
                    } 
                    return markInfo;
                })
            }    
        })
        function markState(result,state,xuehao){//查找一面未面试和二面未面试进行打分
            let where = "group="+result.group+"and pass="+state+"and style=0"+"and xuehao="+sql.escape(xuehao);
            return sql.select(["*"],"registryinformation",where);
        }
    }
}

