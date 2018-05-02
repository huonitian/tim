  var md5 = require('./md5.js')
//app.js
App({
        onLaunch: function () {
                //调用API从本地缓存中获取数据
                var logs = wx.getStorageSync('logs') || [];
                logs.unshift(Date.now());
                this.getUserInfo();
                wx.setStorageSync('logs', logs);
        },
        //通用登陆函数
        IamsLogin: function (result, encryptedData = "", iv = "") {
                var that = this;
                console.log(result)
                //初始化加密参数
                wx.request({
                        url: that.globalData.domain + '/Iams/face/V1712250900.G.JSON',
                        //自己的服务接口地址
                        method: 'get',
                        header: {
                                'content-type': 'application/json'
                        },
                        //组装参数
                        data: {
                                UsrID: result.code,
                                UsrMD: that.globalData.UsrMD,
                                encryptedData: encryptedData,
                                iv: iv,
                                IM_AppID: that.globalData.IM_AppID,
                                IM_KeyID: getSign(that.globalData.mkey, {
                                        UsrID: result.code,
                                        UsrMD: that.globalData.UsrMD,
                                        encryptedData: encryptedData,
                                        iv: iv
                                })
                        },
                        success: function (data) {
                                wx.hideLoading();
                                console.log(data);
                                that.globalData.UserId = data.data.OutData.UsrID;
                                that.globalData.Token = data.data.TokenID;
                        },
                        fail: function () {
                                console.log('fail')
                        }
                })
        },
        getUserInfo: function (cb) {
                var that = this;
                wx.showLoading({
                        title: '加载中',
                        mask: true,
                });
                //调用登录接口
                wx.login({
                        success: function (result) {
                                wx.getUserInfo({
                                        success: function (res) {
                                                console.log(res)
                                                that.globalData.userInfo = res.userInfo;
                                                typeof cb == "function" && cb(that.globalData.userInfo);
                                                var openId = wx.getStorageSync('openId');
                                                //调用登录接口
                                                wx.login({
                                                        success: function (result) {
                                                                console.log(result)
                                                                that.IamsLogin(result, res.encryptedData, res.iv)
                                                        }
                                                })
                                        },
                                        fail: function () {
                                                that.IamsLogin(result)
                                        }
                                });
                        }
                })
        },
        //全局变量
        globalData: {
                mkey: "MY1234567890",//应用密钥
                Token: "",           //用户令牌
                IM_AppID: 'isme',    //应用APPID
                UsrMD: 8,             //登录模式
                domain: "https://python.iwifi.com"//统一域名
        }
        //END
})

//获取加密签名
function getSign(mKey, iArg) {
        var temp = []
        for (var k in Object.keys(iArg).sort()) {
                var v = iArg[k]
                if (v == "IM_KeyID" || k == "IM_KeyID") {
                        continue
                }
                var i = k + "=" + v;
                temp.push(i);
        }
        var m = 'key=' + mKey;
        temp.push(m);
        return md5.md5(temp.join("&")).toLowerCase();
}
//END