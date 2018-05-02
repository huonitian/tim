var util = require('../../utils/util.js')
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
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
                if (res.data.OutData.Table[0].f_itil_1801090100_005) {
                    res.data.OutData.Table[0].f_itil_1801090100_005 = res.data.OutData.Table[0].f_itil_1801090100_005.split(",");
                    for (var i = 0; i < res.data.OutData.Table[0].f_itil_1801090100_005.length; i++) {
                        if (res.data.OutData.Table[0].f_itil_1801090100_005[i].indexOf('http') == -1) {
                            res.data.OutData.Table[0].f_itil_1801090100_005[i] = app.globalData.domain + res.data.OutData.Table[0].f_itil_1801090100_005[i];
                        }
                    }
                }
                res.data.OutData.Table[0].f_itil_1801090100_016 = res.data.OutData.Table[0].f_itil_1801090100_016.replace(/\//g, " > ");
                that.setData({
                    orderInfo: res.data.OutData.Table[0],
                })
            }
        })
    },

    please: function () {
        var that = this;
        wx.request({
            url: app.globalData.domain + '/Iams/face/V1801090100.G.JSON',
            data: {
                action: 'urge',
                f_itil_1801090100_P01: that.data.f_itil_1801090100_P01,
                IM_Token: app.globalData.Token,
                IM_AppID: app.globalData.IM_AppID,
                IM_KeyID: util.getSign(app.globalData.mkey, {
                    action: 'urge',
                    f_itil_1801090100_P01: that.data.f_itil_1801090100_P01,
                })
            },
            success: function (res) {
                console.log(res);
                if (res.data.RetCode == 200) {
                    wx.showToast({
                        title: '已为您催单',
                    })
                } else {
                    wx.showModal({
                        title: '提示',
                        content: res.data.Message,
                    })
                }
            }
        })
    }
})