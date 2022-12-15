import TinCan from "tincanjs";
let tincan;
export const tinCanWrapper = {
    init: function() {
        let xapiFlag = "testing";
        if (xapiFlag == "testing"){
            //testing
            let _endpointValDef = "https://cloud.scorm.com/lrs/TAY8R5KWJU/";
            let _username = "TAY8R5KWJU";
            let _pwd = "8Kctb4ivsP4VY6scwaMSPYsPwD1kg0h0AoRNuHEx";
            tincan = new TinCan({
                recordStores: [{
                    endpoint: _endpointValDef,
                    username: _username,
                    password: _pwd,
                    //auth: authVal,
                    allowFail: false,
                    version:  "1.0.0"
                }]
            });
        }else{
            //live 
            tincan = new TinCan({ url: window.location.href });
        }
    },
    getAllStatementlistFunc: function(aCurVal){

        return new Promise((resolve, reject) => {
            tincan.getStatements({
                'callback': function(err, result) {
                    if (err) {
                        return reject(err);
                    }
                   const courseData = tinCanWrapper.getAllStatementsList(err,result,aCurVal);
                   resolve(courseData);
                }
            });
        });
    },
    getMonthlyActiveUser: function(){
        return new Promise((resolve, reject) => {
            tincan.getStatements({
                'callback': function(err, result) {
                    if (err) {
                        return reject(err);
                    }
                   const courseData = tinCanWrapper.renderMonthlyActiveUser(err,result);
                   resolve(courseData);
                }
            });
        });
    },
    getAllStatementsList: function(err,result,acurVal){
        let statements,
        html,
        learners = [],
        learnerObjs = {},
        i,
        j,
        l,
        name,
        obj,
        activityType,
        answer,
        corrAnswer,
        mbox,
        stmtStr = "",
        statmentObj = {},
        dt,
        aDate;

        statements = result.statements;
        for (i = 1; i < statements.length; i++) {
            
            var _getDateTime = tinCanWrapper.getDateTimeFunc(statements[i].stored);
            name = statements[i].actor.toString();
            if (statements[i].actor === null) {
                continue;
            }
            //mbox = statements[i].actor.account.name;
            mbox = statements[i].context.registration;
            
            //console.log(mbox);
            if (typeof learnerObjs[mbox] === "undefined") {

                learners.push(mbox);
                learnerObjs[mbox] = {};
                learnerObjs[mbox].complete = 'incomplete';
                learnerObjs[mbox].score = '-';
                
                learnerObjs[mbox].verbid = statements[i].verb.id;
                learnerObjs[mbox].objectVal = statements[i].target;

                if (statements[i].verb.id === "http://adlnet.gov/expapi/verbs/experienced") {
                    learnerObjs[mbox].cname = statements[i].target.definition.name.und;
                    learnerObjs[mbox].regid = mbox;
                    learnerObjs[mbox].courseid = statements[i].target.id;
                }
            }
            if (typeof learnerObjs[mbox].name === "undefined" || learnerObjs[mbox].name == mbox) {
                learnerObjs[mbox].name = statements[i].actor.toString();
                learnerObjs[mbox].verbid = statements[i].verb.id;
                learnerObjs[mbox].regid = mbox;
                learnerObjs[mbox].courseid = statements[i].target.id;
            }

            if (statements[i].verb.id === "http://adlnet.gov/expapi/verbs/completed") {
                learnerObjs[mbox].complete = 'complete';
                learnerObjs[mbox].cname = statements[i].target.definition.name.und
                learnerObjs[mbox].verbid = statements[i].verb.id;
                learnerObjs[mbox].regid = mbox;
                learnerObjs[mbox].courseid = statements[i].target.id;
            }
            if (statements[i].verb.id === "http://adlnet.gov/expapi/verbs/passed") {
                learnerObjs[mbox].complete = 'passed';
                learnerObjs[mbox].score = (statements[i].result.score.scaled * 100).toString() + "%";
                learnerObjs[mbox].cname = statements[i].target.definition.name.und
                learnerObjs[mbox].verbid = statements[i].verb.id;
                learnerObjs[mbox].regid = mbox;
                learnerObjs[mbox].courseid = statements[i].target.id;
            }
            if (statements[i].verb.id === "http://adlnet.gov/expapi/verbs/failed") {
                learnerObjs[mbox].complete = 'failed';
                learnerObjs[mbox].score = (statements[i].result.score.scaled * 100).toString() + "%";
                obj = (statements[i].target.definition.name.und == undefined) ? statements[i].target.definition.name["en-US"] : statements[i].target.definition.name.und;
                learnerObjs[mbox].cname = obj
                learnerObjs[mbox].verbid = statements[i].verb.id;
                learnerObjs[mbox].regid = mbox;
                learnerObjs[mbox].courseid = statements[i].target.id;
            }
            
        }
            
            for (const key in learnerObjs) {
            

                var statementsVal = result.statements.filter(selectedVal => key.includes(selectedVal.context.registration)).reverse();
                learnerObjs[key].cstatement = statementsVal;
                //console.log(statementsVal);
                
                let statementObj = {}, curObj, sid, curDateTime, aLeftSlideDate ="", objectId, staResult ="", aObjeVal;
                //statementObj[key] = {}
                //let sNo ="", sNo1 = "";
                
                for (j = 0; j < statementsVal.length; j++) {
                    staResult = statementsVal[j].result;
                    //console.log(statementsVal[j]);

                    //var statementsValReturn = result.statements.filter(selectedVal1 => statementsVal[j].target.id.includes(selectedVal1.object.id));
                    //console.log(statementsValReturn);
                    
                    //const curDate1 = statements[j].stored;
                    //const curDate1 = tinCanWrapper.getDateTimeFunc(statements[j].stored);
                    //const curVerbId = "";
                    //if(statementsVal[j].target.id !="" && ){

                    //}
                    if (statementsVal[j].verb.id === "http://adlnet.gov/expapi/verbs/experienced") {
                        curDateTime = tinCanWrapper.getDateTimeFunc(statementsVal[j].stored);
                        objectId = statementsVal[j].target.id 
  
                        sid = statementsVal[j].id;
                        curObj = statementsVal[j].target.definition;
                        statementObj[sid] = {};
                        statementObj[sid].id = sid;
                        statementObj[sid].slidename = curObj;                      
                        statementObj[sid].slideresponse = "N/A"; 
                        statementObj[sid].sstatus = "N/A";                           
                        statementObj[sid].objid = objectId;
                        statementObj[sid].slidetype = "Static";
                        statementObj[sid].timespend = "0 Sec";
                        //statementObj[sid].resulttt = statementsVal[j];   
                    }
                    
                    if(statementsVal[j].verb.id === "http://adlnet.gov/expapi/verbs/answered" && statementsVal[j].target.id.includes(objectId)){
                        statementObj[sid].slidetype = "Assessment";
                        var _currStatus = (statementsVal[j].result.success ? "Correct" : "Incorrect")
                        statementObj[sid].sstatus = _currStatus;
                        statementObj[sid].slideresponse = statementsVal[j].result.response;
                        var _correctResPattern = statementsVal[j].target.definition.correctResponsesPattern.toString().split("[,]");
                        statementObj[sid].correctResponsePattern = _correctResPattern;
                         

                    }
                    if(statementsVal[j].verb.id === "http://adlnet.gov/expapi/verbs/closed" && statementsVal[j].target.id.includes(objectId)){
                        statementObj[sid].slidetype = "Hotspots";
                    }
                    if(statementsVal[j].verb.id === "http://adlnet.gov/expapi/verbs/clicked" && statementsVal[j].target.id.includes(objectId)){
                        statementObj[sid].slidetype = "Interactive";
                    }
                        
                    
                    if (statementsVal[j].verb.id == "http://activitystrea.ms/schema/1.0/leave" && statementsVal[j].target.id == objectId){
                        aLeftSlideDate = tinCanWrapper.getDateTimeFunc(statementsVal[j].stored);
                        var timeSpendVal = tinCanWrapper.getDuration(curDateTime,aLeftSlideDate);
                        statementObj[sid].timespend = timeSpendVal +" Sec";
                        statementObj[sid].timeStartAndLeft = curDateTime+" - "+aLeftSlideDate;   
                    }
                    
                    
                    //var currectObj = []
                    
                    /* var cacvitityType = "",
                    curObj = "",
                    cAnswer = "",
                    cCorrAnswer = "",
                    sid = statementsVal[j].id,
                    sname = statementsVal[j].actor.toString();
                    //const curDate1 = tinCanWrapper.getDateTimeFunc(statements[j].stored)

                    var aDate1 = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/.exec(statements[j].stored);
                    var dt1 = new Date(Date.UTC(aDate1[1], aDate1[2]-1, aDate1[3], aDate1[4], aDate1[5], aDate1[6]));
                    var curDate1 = dt1.toLocaleDateString() + " " + dt1.toLocaleTimeString();

                    
                    if (statementsVal[j].verb.id === "http://adlnet.gov/expapi/verbs/experienced") {
                        //let statementObj = {}
                        statementObj[sid] = {};
                        statementObj[sid].id = sid;
                        statementObj[sid].date = curDate1;
                        statementObj[sid].actor = sname;

                        var aDateFirst = statementsVal[j].stored;
                        var aDateSecond = statementsVal[j+1].stored;
                        var getTimeTaken = tinCanWrapper.getDuration(aDateFirst, aDateSecond);

                        statementObj[sid].timespend = getTimeTaken+ " Sec";

                        curObj = (statements[j].target.definition.name.und == undefined) ? statements[j].target.definition.name["en-US"] : statements[j].target.definition.name.und;
                        statementObj[sid].slidetype = statementsVal[j].verb.toString();
                        statementObj[sid].slidename = curObj; 
                        statementObj[sid].slideresponse = "N/A"; 
                        statementObj[sid].sstatus = "N/A";                               
                    }
                    */
                        
                }
                //console.log(key, statementObj);

                learnerObjs[key].textstatement = statementObj;
            }
        return learnerObjs;

    },
    getDateTimeFunc: function(aPassVal){
        var aDate = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/.exec(aPassVal);
        var dt = new Date(Date.UTC(aDate[1], aDate[2]-1, aDate[3], aDate[4], aDate[5], aDate[6]));
        return dt.toLocaleDateString() + " " + dt.toLocaleTimeString()
    },
//    getDuration: function(t0, t1){
    getDuration: function(startDate, endDate){
       /*  let d = (new Date(t1)) - (new Date(t0));
        let weekdays     = Math.floor(d/1000/60/60/24/7);
        let days         = Math.floor(d/1000/60/60/24 - weekdays*7);
        let hours        = Math.floor(d/1000/60/60    - weekdays*7*24            - days*24);
        let minutes      = Math.floor(d/1000/60       - weekdays*7*24*60         - days*24*60         - hours*60);
        let seconds      = Math.floor(d/1000          - weekdays*7*24*60*60      - days*24*60*60      - hours*60*60      - minutes*60);
        let milliseconds = Math.floor(d               - weekdays*7*24*60*60*1000 - days*24*60*60*1000 - hours*60*60*1000 - minutes*60*1000 - seconds*1000);
        let t = {};
        ['weekdays', 'days', 'hours', 'minutes', 'seconds', 'milliseconds'].forEach(q=>{ if (eval(q)>0) { t[q] = eval(q); } });
        return t; */

      /*  let delta = Math.abs(endDate - startDate) / 1000;
  const isNegative = startDate > endDate ? -1 : 1;
  return [
    ['days', 24 * 60 * 60],
    ['hours', 60 * 60],
    ['minutes', 60],
    ['seconds', 1]
  ].reduce((acc, [key, value]) => (acc[key] = Math.floor(delta / value) * isNegative, delta -= acc[key] * isNegative * value, acc), {}); */

        var fromTime = new Date(startDate);
        var toTime = new Date(endDate);

        var differenceTravel = toTime.getTime() - fromTime.getTime();
        var seconds = Math.floor((differenceTravel) / (1000));
        return seconds;

    },
    renderMonthlyActiveUser: function(err,result){
        let statements,
        html,
        learners = [],
        learnerObjs = {},
        i,
        aDate,
        aMonthYear,
        aCurMonYear,
        j,
        l,
        mbox;

        statements = result.statements;
        let currentTime = new Date()
        aCurMonYear =  currentTime.getFullYear()+"/"+(currentTime.getMonth() + 1);

        for (i = 0; i < statements.length; i++) {
            if (statements[i].actor === null) {
                continue;
            }
            //mbox = statements[i].actor.account.name;
            mbox = statements[i].context.registration;
            aDate = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/.exec(statements[i].stored);
            aMonthYear = aDate[1]+"/"+ aDate[2];
            //console.log(mbox);
            if (typeof learnerObjs[mbox] === "undefined") {

                learners.push(mbox);
                learnerObjs[mbox] = {};
                learnerObjs[mbox].complete = 'incomplete';
                learnerObjs[mbox].score = '-';
                
                learnerObjs[mbox].verbid = statements[i].verb.id;

                if (statements[i].verb.id === "http://adlnet.gov/expapi/verbs/experienced") {
                    learnerObjs[mbox].cname = statements[i].target.definition.name.und;
                    learnerObjs[mbox].regid = mbox;
                    learnerObjs[mbox].monthyear = aMonthYear;
                    learnerObjs[mbox].acyear = aCurMonYear;
                }
            }
            if (typeof learnerObjs[mbox].name === "undefined" || learnerObjs[mbox].name == mbox) {
                learnerObjs[mbox].name = statements[i].actor.toString();
                learnerObjs[mbox].verbid = statements[i].verb.id;
                learnerObjs[mbox].regid = mbox;
                learnerObjs[mbox].monthyear = aMonthYear;
            }

            if (statements[i].verb.id === "http://adlnet.gov/expapi/verbs/completed") {
                learnerObjs[mbox].complete = 'complete';
                learnerObjs[mbox].cname = statements[i].target.definition.name.und
                learnerObjs[mbox].verbid = statements[i].verb.id;
                learnerObjs[mbox].regid = mbox;
                learnerObjs[mbox].monthyear = aMonthYear;
            }
            if (statements[i].verb.id === "http://adlnet.gov/expapi/verbs/passed") {
                learnerObjs[mbox].complete = 'passed';
                learnerObjs[mbox].score = (statements[i].result.score.scaled * 100).toString() + "%";
                learnerObjs[mbox].cname = statements[i].target.definition.name.und
                learnerObjs[mbox].verbid = statements[i].verb.id;
                learnerObjs[mbox].regid = mbox;
                learnerObjs[mbox].monthyear = aMonthYear;
            }
            if (statements[i].verb.id === "http://adlnet.gov/expapi/verbs/failed") {
                learnerObjs[mbox].complete = 'failed';
                learnerObjs[mbox].score = (statements[i].result.score.scaled * 100).toString() + "%";
                const obj = (statements[i].target.definition.name.und == undefined) ? statements[i].target.definition.name["en-US"] : statements[i].target.definition.name.und;
                learnerObjs[mbox].cname = obj
                learnerObjs[mbox].verbid = statements[i].verb.id;
                learnerObjs[mbox].regid = mbox;
                learnerObjs[mbox].monthyear = aMonthYear;
            }
        }

        let returnArr = [];
        for (j in learners){
            l = learnerObjs[learners[j]];
            returnArr.push(l.name);
        }

        const resultArr = returnArr.filter((data,index)=>{
            return returnArr.indexOf(data) === index;
        });

        return resultArr.length;

    }
}