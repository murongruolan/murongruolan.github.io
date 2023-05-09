//引入express
const express = require("express")
//创建web服务器
const app = express()


//跨域设置
app.all("/home",function(req,res,next){
    //传输安全信息
    // res.setHeader()
      //允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin","*");
     //允许的header类型
    res.header("Access-Control-Allow-Headers","*");
      //允许跨域的请求方式
    res.header("Access-Control-Allow-Methods","GET,POST");
    next()
})

// 静态资源的托管 assets/imgs
// http://localhost:3000/assets/imgs/fenlei.gng 不推荐
// http://localhost3oe/imgs/fenlei.png 推荐
app.use('/' ,express.static( '../assets'))

// 声明函数fun1并返回字符串test
const CryptoJS = require("crypto-js");

const encrypt = function (e) {
    var f = CryptoJS.enc.Utf8.parse("learnspaceaes123");
    var d = CryptoJS.AES.encrypt(e, f, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    });
    return d.toString()
};

const decrypt = function (e) {
    var cipherParams = CryptoJS.lib.CipherParams.create({
        ciphertext: CryptoJS.enc.Base64.parse(e)
   });
    var f = CryptoJS.enc.Utf8.parse("learnspaceaes123");
    var res = CryptoJS.AES.decrypt(cipherParams,f,{
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    });
    return res.toString(CryptoJS.enc.Utf8);

}

const timeToSeconds = function (f) {
    var b = f.split(":");
    var d = parseInt(b[0]);
    var a = parseInt(b[1]);
    var c = parseInt(b[2]);
    var e = d * 3600 + a * 60 + c;
    return e
};

const formatStr = function (c, a) {
    var l = "";
    var k = (c + "").length;
    if (k > 0) {
        if (k + 2 > a) {
            return c + ""
        } else {
            var g = a - k - 2;
            var h = 1;
            for (var e = 0; e < g; e++) {
                h = h * 10
            }
            var b = parseInt(Math.random() * h);
            var f = (b + "").length;
            if (f < g) {
                for (var d = f; d < g; d++) {
                    b = b * 10
                }
            }
            if (k >= 10) {
                l += k
            } else {
                l += "0" + k
            } l += c + (b + "")
        }
    } else {
        return c + ""
    }
    return l
};

const getParams=function (p) {
    var q = {
        courseId: p.courseId,
        itemId: p.itemId,
        time1: formatStr(
            (new Date()).getTime(),
            20
        ),
        time2: formatStr(parseInt(p.startTime), 20),
        time3: formatStr(timeToSeconds(p.videoTotalTime), 20),
        time4: formatStr(parseInt(p.endTime), 20),
        videoIndex: p.videoIndex || 0,
        time5: formatStr(p.studyTimeLong, 20),
        terminalType: p.terminalType || 0
    };
    return q
}

var itemids = process.argv[2];
var start = process.argv[3]
var end = process.argv[4]
var p = {
    "interval": true,
    "playComplete": true,
    "courseId": "26ae32dc2dcd4c9cbace10894d9a172b___",
    "itemId": itemids,
    "position": 4,
    "videoTotalTime": "00:10:35",
    "startTime": parseInt(start),
    "endTime": parseInt(end),
    "studyTimeLong": end-start
}
//接口
// console.log(encrypt(JSON.stringify(getParams(p))))
app.get("/aes",(req,res)=>{
// 返回fun1的返回值
    // res.send(encrypt(JSON.stringify(getParams(p))))
    res.send({
    "aes":encrypt(JSON.stringify(getParams(p))),
    "start":100,
    "start1":parseInt(100),
    "studyTimeLong": end-start,
    str:JSON.stringify(getParams(p)),
    p:p
    })

})

//使用express
// app.get("/home",(req,res)=>{
//     // req:客户端
//     // res:服务器端返回信息
//     //      send("服务器返回的数据")
//         res.send({
//             //十张商品列表图
//             goods_list:[
//                 {
//                     img_id:1,
//                     img_title:"苏宁家电",
//                     img_src:"http://localhost:3000/imgs/goods1.png"
//                 },{
//                     img_id:2,   
//                     img_title:"苏宁超市",
//                     img_src:"http://localhost:3000/imgs/goods2.png"
//                 },{
//                     img_id:3,
//                     img_title:"手机数码",
//                     img_src:"http://localhost:3000/imgs/goods3.png"
//                 },{
//                     img_id:4,
//                     img_title:"家具家装",
//                     img_src:"http://localhost:3000/imgs/goods4.png"
//                 },{
//                     img_id:5,
//                     img_title:"生活家电",
//                     img_src:"http://localhost:3000/imgs/goods5.png"
//                 },{
//                     img_id:6,
//                     img_title:"服饰百货",
//                     img_src:"http://localhost:3000/imgs/goods6.png"
//                 },{
//                     img_id:7,
//                     img_title:"场景购",
//                     img_src:"http://localhost:3000/imgs/goods7.png"
//                 },{
//                     img_id:8,
//                     img_title:"签到有礼",
//                     img_src:"http://localhost:3000/imgs/goods8.png"
//                 },{
//                     img_id:9,
//                     img_title:"领卷中心",
//                     img_src:"http://localhost:3000/imgs/goods9.png"
//                 },{
//                     img_id:10,
//                     img_title:"更多频道",
//                     img_src:"http://localhost:3000/imgs/goods10.png"
//                 },
//                 // {
//                 //     img_id:11,
//                 //     img_title:"mp3",
//                 //     img_src:"http://localhost:3000/imgs/goods11.mp3"
//                 // }
//             ],
//             goods_message:"首页中的商品列表"
//         })
// })

//启动web服务器
app.listen(3000, () => {
    console.log("web服务器启动成功");
})
//接口数据
// method: post delete put get


//跨域设置
//静态资源路由