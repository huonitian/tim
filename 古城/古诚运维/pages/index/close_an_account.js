var app = getApp();
var util = require('../../utils/util.js')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        f_itil_1801090100_P01: '',
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(options);
        var that = this;
        that.setData({
            f_itil_1801090100_P01: options.f_itil_1801090100_P01
        })
        var Find = '{"f_itil_1801090100_P01":["==","' + options.f_itil_1801090100_P01 + '"]}';
        wx.request({
            url: app.globalData.domain + '/Iams/face/V1801090100.G.JSON',
            data: {
                Find: Find,
                IM_Token: app.globalData.Token,
                IM_AppID: app.globalData.IM_AppID,
                IM_KeyID: util.getSign(app.globalData.mkey, {
                    Find: Find,
                })
            },
            success: function (res) {
                console.log(res);
                res.data.OutData.Table[0].f_itil_1801090100_016 = res.data.OutData.Table[0].f_itil_1801090100_016.replace(/\//g, " > ");
                console.log(res.data.OutData.Table[0].f_itil_1801090100_016);
                that.setData({
                    orderInfo: res.data.OutData.Table[0],
                })
            }
        })
    },
    goPay: function (e) {
        var that = this;
        wx.request({
            url: app.globalData.domain + '/Iams/face/V1801090100.G.JSON?action=wxpay',
            data: {
                f_itil_1801090100_P01: that.data.f_itil_1801090100_P01,
                IM_Token: app.globalData.Token,
                IM_AppID: app.globalData.IM_AppID,
                IM_KeyID: util.getSign(app.globalData.mkey, {
                    f_itil_1801090100_P01: that.data.f_itil_1801090100_P01,
                })
            },
            success: function (ress) {
                console.log(ress);
                wx.requestPayment({
                    'appId': ress.data.OutData.wxpay.appid,
                    'timeStamp': ress.data.OutData.iTime,
                    'nonceStr': ress.data.OutData.wxpay.nonce_str,
                    'signType': 'MD5',
                    'package': "prepay_id=" + ress.data.OutData.wxpay.prepay_id,
                    'paySign': ress.data.OutData.jsapi,
                    success: function () {
                        wx.showToast({
                            title: '支付成功',
                            icon: 'success',
                            duration: 2000,
                            mask: true,
                            success: function () {
                                wx.setStorage({
                                    key: 'show',
                                    data: 'SmallBlack',
                                })
                                setTimeout(function () {
                                    wx.redirectTo({
                                        url: 'query?f_itil_1801090100_P01=' + that.data.f_itil_1801090100_P01,
                                    })
                                }, 1800)
                            }
                        })
                    },
                    fail: function (resssa) {
                        wx.showToast({
                            title: '非法',
                        })
                        wx.hideLoading();
                    }
                })
            }
        })
    }
})