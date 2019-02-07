const sql = require('./public_sql');
const mysql = require('mysql')
const mail = require('./public_mail.js')
var querystring = require('querystring');
//组长组员公共功能

module.exports = {
    serachSelfInfo: function (req, res, pool) {//登录用户个人信息*
        let info = {};
        sql.sever(pool, serachSelfInfoState(req.session.name), function (data) {
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
        function serachSelfInfoState(name) {
            let where = "phoneNum=" + sql.escape(name);
            return sql.select(["*"], "registryinformation", where);
        }
    },
    searchInfoBynum: function (req, res, pool) {//输入学号查看个人信息*
        let message = "";
        res.on('data', function (data) {
            message += data;
        });
        req.on('end', function () {
            let num = querystring.parse(message);
            sql.sever(pool, sql.select(["*"], "registryinformation", "xuehao=" + num.xuehao), function (data) {
                if (data.length) {
                    res.write(JSON.stringify({
                        info: data[0],
                        style: 1,
                        msg: "查找成功"
                    }));
                    res.end();
                } else {
                    res.write(JSON.stringify({
                        style: 0,
                        msg: "查无此人"
                    }));
                    res.end();
                }

            })
        })
    },
    showInfoOfView: function (req, res, pool) {//查询本组报名数据*
        let gruopViews = {};
        sql.sever(pool, serachViewsState(req.session.selfgroup), function (data) {
            if (data.length) {
                gruopViews.selfInfo = data;
                gruopViews.style = 1;
                gruopViews.msg = "查找成功";
            } else {
                gruopViews.style = 0;
                gruopViews.msg = "暂无数据";
            }
            res.write(JSON.stringify(gruopViews));
            res.end();
        });
        function serachViewsState(selfgroup) {
            let where = "selfgroup=" + selfgroup + " and level=1";
            return sql.select(["xuehao", "name", "xueyuan", "zhuanye", "banji", "phoneNum", "style"], "registryinformation", where);
        }
    },
    rank: function (req, res, pool) {//查询排名 number表示几面*
        let rankList = {};
        let message = "";
        res.on('data', function (data) {
            message += data;
        });
        req.on('end', function () {
            let number = querystring.parse(message).number;
            sql.sever(pool, rankState(req.session.selfgroup, number), function (data) {//成绩信息
                if (data.length) {
                    rankList.score = data;
                    sql.sever(pool, infoState(req.session.selfgroup, number), function (data) {//个人信息
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
        });

        function rankState(selfgroup, number) {
            let where = "selfgroup=" + selfgroup + " and type=" + sql.escape(number) + " ORDER BY xuehao";
            return sql.select(["*"], "scoringrecord", where);
        }
        function infoState(selfgroup, number) {
            let where = "selfgroup=" + selfgroup + " and level=" + "1" + " and pass>=" + sql.escape(number);
            return sql.select(["xuehao", "name", "xueyuan", "zhuanye", "banji", "xingbie"], "registryinformation", where);
        }
    },
    rankDetails: function (req, res, pool) {//每面具体成绩信息*
        let message = "";
        res.on('data', function (data) {
            message += data;
        });
        req.on('end', function () {
            let xuehao = querystring.parse(message).xuehao;
            sql.sever(pool, detailsState(selfgroup, xuehao), function (data) {
                let info = {};
                if (data.length) {
                    info.scoreInfo = data;
                    info.style = 1;
                    info.msg = "查找成功";
                } else {
                    info.style = 0;
                    info.msg = "暂无数据";
                }
                res.write(JSON.stringify(info));
                res.end();
            });
        })
        function detailsState(selfgroup, xuehao) {
            let where = "selfgroup=" + selfgroup + " and xuehao=" + sql.escape(xuehao);
            return sql.select(["*"], "scoringrecord", where);
        }
    },
    searchMarkRules: function (req, res, pool) {//查找打分规则*
        let markRlues = {};
        sql.sever(pool, sql.select(["obj"], "scoringstandard", "selfgroup=" + req.session.selfgroup), function (data) {//打分规则
            if (data.length) {
                markRlues.rules = data[0].obj;
                markRlues.style = 1;//查找成功
                markRlues.msg = "查找成功";
            } else {
                markRlues.style = 0;
                markRlues.msg = "暂无数据";
            }
            res.write(JSON.stringify(markRlues));
            res.end();
        })
    },
    firstmark: function (req, res, pool) {//一面打分 从一面未面试找*
        let markText = {};
        let message = "";
        req.on('data', function (data) {
            message += data;
        });
        req.on('end', function () {
            markText = JSON.parse(message);
            sql.sever(pool, sql.select(["style"], "process"), function (data) {//查看现在是几面
                let state = data[0].style;
                if (state == 0) {
                    res.write(JSON.stringify({
                        style: 0,
                        msg: "面试未开始"
                    }));
                    res.end();
                } else if (state == 4) {
                    res.write(JSON.stringify({
                        style: 0,
                        msg: "面试已结束"
                    }));
                    res.end();
                } else {
                    if (state == markText.present) {
                        sql.sever(pool, markState(req, xuehao), function (data) {//result登录人所携带session,state当前是第几面,xuehao面试者学号,markText打分内容
                            if (data.length) {
                                sql.sever(pool, sql.insert("scoringrecord", ["xuehao", "selfgroup", "type", "time", "person", "obj", "advice", "history"], [sql.escape(markText.xuehao), req.session.selfgroup, state, "NOW()", sql.escape(req.session.name), sql.escape(markText.obj), sql.escape(markText.advice), sql.escape(markText.history)]), function () {
                                    sql.sever(pool, sql.update("registryinformation", ["style"], [1], "xuehao=" + sql.escape(markText.xuehao)), function () {
                                        res.write(JSON.stringify({
                                            style: 1,
                                            msg: "打分记录提交成功"
                                        }));
                                        res.end();
                                    });
                                });
                            } else if (!data.length) {
                                res.write(JSON.stringify({
                                    style: 0,
                                    msg: "该学生未报名或上一轮已淘汰"
                                }));
                                res.end();
                            }
                        })
                    } else {
                        res.write(JSON.stringify({
                            style: 0,
                            msg: "所提交的信息与当前面试状态不符"
                        }));
                        res.end();
                    }
                }
            })
        })
        function markState(req, xuehao) {//查找状态为一面的人进行打分 
            let where = "selfgroup=" + req.session.selfgroup + " and pass=1" + " and xuehao=" + xuehao;
            return sql.select(["*"], "registryinformation", where);
        }
    },
    secondmark: function (req, res, pool) {//二面打分 从二面未面试的人中找*
        let markText = {};
        let message = "";
        req.on('data', function (data) {
            message += data;
        });
        req.on('end', function () {
            markText = JSON.parse(message);
            console.log(markText.xuehao);
            sql.sever(pool, sql.select(["style"], "process"), function (data) {//查看现在是几面
                let state = data[0].style;
                if (state == 0) {
                    res.write(JSON.stringify({
                        style: 0,
                        msg: "面试未开始"
                    }));
                    res.end();
                } else if (state == 4) {
                    res.write(JSON.stringify({
                        style: 0,
                        msg: "面试已结束"
                    }));
                    res.end();
                } else {
                    if (state == markText.present) {
                        sql.sever(pool, sql.select(["*"], "scoringrecord", "xuehao=" + sql.escape(markText.xuehao) + " and type=2"), function (data) {
                            if (data.length) {//非首次打分
                                sql.sever(pool, sql.update("scoringrecord", ["time", "person", "obj", "history"], ["NOW()", sql.escape(name), sql.escape(markText.obj), sql.escape(markText.history)], "xuehao=" + sql.escape(markText.xuehao) + " and type=2"), function () {
                                    res.write(JSON.stringify({
                                        style: 0,
                                        msg: "打分记录提交成功"
                                    }));
                                    res.end();
                                })
                            } else {//二面首次打分
                                sql.sever(pool, markState(req, markText.xuehao), function (data) {//result登录人所携带session,state当前是第几面,xuehao面试者学号,markText打分内容
                                    if (data.length) {
                                        sql.sever(pool, sql.insert("scoringrecord", ["xuehao", "selfgroup", "type", "time", "person", "obj", "history"], [sql.escape(markText.xuehao), req.session.selfgroup, state, "NOW()", sql.escape(name), sql.escape(markText.obj), sql.escape(markText.history)]), function () {
                                            sql.sever(pool, sql.update("registryinformation", ["style"], [1], "xuehao=" + sql.escape(markText.xuehao)), function () {
                                                res.write(JSON.stringify({
                                                    style: 1,
                                                    msg: "打分记录提交成功"
                                                }));
                                                res.end();
                                            });
                                        });
                                    } else if (!data.length) {
                                        res.write(JSON.stringify({
                                            style: 0,
                                            msg: "该学生未报名或上一轮已淘汰"
                                        }));
                                        res.end();
                                    }
                                })
                            }
                        })
                    } else {
                        res.write(JSON.stringify({
                            style: 0,
                            msg: "所提交的信息与当前面试状态不符"
                        }));
                        res.end();
                    }
                }
            })
            function markState(req, xuehao) {//查找状态为二面的人进行打分 
                let where = "selfgroup=" + req.session.selfgroup + " and pass=2" + " and xuehao=" + sql.escape(xuehao);
                return sql.select(["*"], "registryinformation", where);
            }
        });

    },
    searchState: function (res, pool) {//查找当前面试状态*
        sql.sever(pool, sql.select(["style"], "process"), function (data) {
            if (data.length) {
                res.write(JSON.stringify({
                    style: 1,
                    msg: "查找成功",
                    state: data[0].style
                }));
                res.end();
            } else {
                res.write(JSON.stringify({
                    style: 0,
                    msg: "无数据"
                }));
                res.end();
            }
        });
    },
    findSecondTime: function (req, res, pool) {//查找二面上次打分时间和打分数据*
        let message = ""
        req.on('data', function (data) {
            message += data;
        });
        req.on('end', function () {
            let xuehao = querystring.parse(message).xuehao;
            sql.sever(pool, sql.select(["time","obj"], "scoringrecord", "xuehao=" + sql.escape(xuehao) + " and type=2"), function (data) {
                if (data.length) {
                    res.write(JSON.stringify({
                        style: 1,
                        msg: "查找成功",
                        lastTime: data[0].time,
                        lastobj:data[0].obj
                    }));
                    res.end();
                } else {
                    res.write(JSON.stringify({
                        style: 0,
                        msg: "暂无二面打分数据"
                    }));
                    res.end();
                }
            });
        })

    },
    addNotice: function (req, res, pool) {//添加公告至公告队列，并用邮件通知管理员审核*
        let message = "";
        req.on('data', function (data) {
            message += data;
        })
        req.on('end', function () {
            let text = JSON.stringify(message);
            sql.sever(pool, sql.insert("noticequeue", ["type", "obj", "time"], [req.session.selfgroup, sql.escape(text), "NOW()"]), function () {
                let allGroup = ['Android', 'ios', 'Web', '后台','产品'];
                let group = allGroup[req.session.selfgroup - 1];
                let mailmsg = "您好，" + group + "组新公告已提交，请您尽快审核！";
                mail.mailepass(mailmsg);
                res.write(JSON.stringify({
                    style: 1,
                    msg: "公告已添加至公告队列，等待管理员审核"
                }));
                res.end();
            });
        })
    },
    showNotice: function (req, res, pool) {//查询本组公告*
        let group = req.session.selfgroup;
        sql.sever(pool, sql.select(["obj"], "notice", "type=" + group), function (data) {
            if (data.length) {
                res.write(JSON.stringify({
                    text: data[0].obj,
                    style: 1,
                    msg: "查找成功"
                }));
                res.end();
            } else {
                res.write(JSON.stringify({
                    style: 0,
                    msg: "暂无本组公告"
                }));
                res.end();
            }

        })

    }
    /* selectViews: function (res, req, pool) {//通过人员选择
        message = {
            xuehao: [4171196,4171195],
            present: 1
        }
        message=JSON.stringify(message);
        //let message = "";
         req.on('data', function (data) {
            message += data;
        }); 
        req.on('end', function () {
            views=JSON.parse(message);
            selfgroup=3;
            level=3;
            sql.sever(pool,sql.select(""))
       })
    } */
}

