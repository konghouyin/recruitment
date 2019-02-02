const sql = require('./public_sql');
//组长组员公共功能

module.exports = {
    serachSelfInfo: function (res, pool, result) {//个人信息
        let info = {};
        sql.sever(pool, serachSelfInfoState(result), function (data) {
            if (data.length) {
                info.selfInfo = data[0];
                info.style = 1;
                info.msg = "查找成功";
            } else {
                info.style = 0;
                info.msg = "查无信息";
            }
            res.write(JSON.stringify(info));
            res.end();
        })
        function serachSelfInfoState(result) {
            let where = "phoneNum=" + sql.escape(result.name);
            return sql.select(["*"], "registryinformation", where);
        }
    },
    showInfoOfView: function (res, pool, result) {//查询本组报名数据
        let gruopViews = {};
        sql.sever(pool, serachViewsState(result), function (data) {
            if (data.length) {
                gruopViews.selfInfo = data;
                gruopViews.style = 1;
                gruopViews.msg="查找成功";
            } else {
                gruopViews.style = 0;
                gruopViews.msg = "暂无数据";
            }
            res.write(JSON.stringify(gruopViews));
            res.end();
        });
        function serachViewsState(result) {
            let where = "selfgroup=" + result.selfgroup + " and level=1";
            return sql.select(["xuehao", "name", "xueyuan", "zhuanye", "banji", "phoneNum", "style"], "registryinformation", where);
        }
    },
    rank: function (res, pool, result, number) {//查询排名 number表示几面
        let rankList = {};
        sql.sever(pool, rankState(result, number), function (data) {//成绩信息
            if (data.length) {
                rankList.score = data;
                sql.sever(poll, infoState(result, number), function (data) {//个人信息
                    rankList.info = data;
                    rankList.style = 1;
                    rankList.msg = "查询成功";
                    res.write(JSON.stringify(rankList));
                    res.end();
                });
            } else {
                rankList.style = 0;
                rankList.msg = "暂无数据";
                res.write(JSON.stringify(rankList));
                res.end();
            }
        });

        function rankState(result, number) {
            let where = "selfgroup=" + result.selfgroup + "and level=" + "1" + "and pass=" + sql.escape(number) + " GROUP BY xuehao";
            return sql.select(["*"], "scoringrecord", where);
        }
        function infoState(result, number) {
            let where = "selfgroup=" + result.selfgroup + "and level=" + "1" + "and pass>" + sql.escape(number);
            return sql.select(["xuehao", "name", "xueyuan", "zhuanye", "banji", "xingbie"], "registryinformation", where);
        }
    },
    rankDetails: function (res, pool, result, xuehao) {//每面具体成绩信息(前端加号的信息)!!!
        sql.sever(pool, detailsState(result, xuehao), function (data) {
            let info = {};
            if (data.length) {
                info.scoreInfo = data;
                info.style = 1;

            } else {
                info.style = 0;
                info.msg = "暂无数据";
            }
            res.write(JSON.stringify(info));
            res.end();
        });
        function detailsState(result, xuehao) {
            let where = "selfgroup=" + result.selfgroup + "and xuehao=" + sql.escape(xuehao);
            return sql.select(["*"], "scoringrecord", where);
        }
    },
    searchMarkRules: function (res, pool, result) {//查找打分规则
        let markRlues = {};
        sql.sever(pool, sql.select(["obj"], "scoringstandard", "selfgroup=" + result.selfgroup), function (data) {//打分规则
            if (data.length) {
                markRlues.rules = data[0].obj;
                markRlues.style = 1;//查找成功
                markRlues.msg="查找成功";
            } else {
                markRlues.style = 0;
                markRlues.msg = "暂无数据";
            }
            res.write(JSON.stringify(markRlues));
            res.end();
        })
    },
    //查个人信息
    //查找几面 查找二面上一次打分实践 分开 
    mark: function (res, pool, result, markText) {//打分 从一面未面试 二面未面试 里找 几面从流程表里找 markText为前端发来的对象，内容为打分内容+advince+history的对象
        let markInfo = {};
        sql.sever(pool, sql.select(["style"], "process"), function (data) {//查看现在是几面
            let state = data[0].style;
            if (state == 0) {
                res.write(JSON.stringify(
                    markInfo.style = 0,
                    markInfo.msg = "面试未开始"
                ));
                res.end();

            } else if (state == 4) {
                res.write(JSON.stringify(
                    markInfo.style = 0,
                    markInfo.msg = "面试已结束"
                ));
                res.end();

            } else {
                //几面前端发来 匹配
                xuehao = sql.escape(markText.xuehao);//转义
                if (state == markText.present) {
                    sql.sever(pool, markState(result, state, xuehao), function (data) {//result登录人所携带session,state当前是第几面,xuehao面试者学号,markText打分内容
                        if (data.length) {//若找到这个人 插入
                            sql.sever(pool, sql.insert("scoringrecord", ["xuehao", "selfgroup", "type", "time", "person", "obj", "advince", "history"], [markText.xuehao, result.selfgroup, state, CURRENT_TIMESTAMP(), result.name, sql.escape(markText.obj), sql.escape(markText.advice), sql.escape(markText.history)]), function () {
                                sql.sever(pool, sql.update("registryinformation", ["style"], [1], "xuehao=" + sql.escape(markText.xuehao)), function (res) {
                                    res.write(JSON.stringify(
                                        markInfo.style = 1,
                                        markInfo.msg = "打分记录提交成功"
                                    ));
                                    res.end();
                                });
                            });
                        } else if (!data.length) {

                            res.write(JSON.stringify(
                                markInfo.style = 0,
                                markInfo.msg = "该学生未报名或上一轮已淘汰"
                            ));
                            res.end();
                        }
                    })
                } else {
                    markInfo.style = 0;
                    markInfo.msg = "所提交的信息与当前面试状态不符";
                    res.write(JSON.stringify(markInfo));
                    res.end();
                }


            }
        })
        function markState(result, state, xuehao) {//查找一面未面试和二面未面试进行打分 
            let where = "selfgroup=" + result.selfgroup + "and pass=" + state + "and xuehao=" + xuehao;
            return sql.select(["*"], "registryinformation", where);
        }
    },
    searchState: function (res, pool) {//查找当前面试状态
        sql.sever(pool, sql.select(["style"], "process"), function (data) {
            if (data.length) {
                res.write(JSON.stringify(
                    style = 1,
                    msg = "查找成功",
                    state = data[0].style
                ));
                res.end();
            } else {
                res.write(JSON.stringify(
                    style = 0,
                    msg = "无数据"
                ));
                res.end();
            }
        });
    },
    findSecondTime: function (res, pool, xuehao) {//查找二面上次打分时间
        sql.sever(pool, sql.select(["time"], "scoringrecord", "xuehao=" + sql.escape(xuehao) + "and type=2"), function (data) {
            if (data.length) {
                res.write(JSON.stringify(
                    style = 1,
                    msg = "查找成功",
                    lastTime = data[0].time
                ));
                res.end();
            }else{
                res.write(JSON.stringify(
                    style = 0,
                    msg = "暂无二面打分数据"
                ));
                res.end();
            }
        });
    },
    addNotice:function(res,pool,result){//添加公告至公告队列，并用邮件通知管理员审核

    },
    showNotice: function (res,pool, result) {//显示公告
        let notice = {};
        sql.server(pool, sql.select(["obj"], "notice", "type=" + result.group), function (data) {
            if (data.length) {
                res.write(JSON.stringify(
                    notice.text = data[0].obj,
                    notice.style = 1,
                    notice.msg = "查找成功"
                ));
                res.end();
            } else {
                res.write(JSON.stringify(
                    notice.style = 0,
                    notice.msg = "暂无公告"
                ));
                res.end();
                
            }
            
        })

    }
}

