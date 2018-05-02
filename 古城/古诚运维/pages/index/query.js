var util = require('../../utils/util.js')
var app = getApp();
Page({
    data: {
        showView: true,
        isShow: true,
        isBack: false,
    },
    onLoad: function (options) {
        // 生命周期函数--监听页面加载
        var show = wx.getStorageSync('show');
        if (show && show == 'SmallBlack') {
            wx.clearStorage('show');
            this.setData({
                isBack: true
            })
        }
        var that = this;
        this.setData({
            UserId: app.globalData.UserId
        })

        if (options.f_itil_1801090100_P01) {
            var Find = '{"f_itil_1801090100_P01":["==","' + options.f_itil_1801090100_P01 + '"]}';
        } else {
            var Find = '{"f_itil_1801090100_011":["==","' + app.globalData.UserId + '"],"f_itil_1801090100_007":["==","1"]}';
        }
        var myDate = new Date();
        var Month = myDate.getMonth() + 1;
        var Day = myDate.getDate();
        if (Month < 10) {
            Month = '0' + Month;
        }
        if (Day < 10) {
            Day = '0' + Day;
        }
        var theDay = myDate.getFullYear() + '-' + Month + '-' + Day;
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
                if (res.data.OutData.Table != '') {
                    if (res.data.OutData.Table[0].f_itil_1801090100_S00 != 0) {
                        if (res.data.OutData.Table[0].f_itil_1801090100_005) {
                            res.data.OutData.Table[0].f_itil_1801090100_005 = res.data.OutData.Table[0].f_itil_1801090100_005.split(",");
                            for (var i = 0; i < res.data.OutData.Table[0].f_itil_1801090100_005.length; i++) {
                                if (res.data.OutData.Table[0].f_itil_1801090100_005[i].indexOf('http') == -1) {
                                    res.data.OutData.Table[0].f_itil_1801090100_005[i] = app.globalData.domain + res.data.OutData.Table[0].f_itil_1801090100_005[i];
                                }
                            }
                        }
                        that.setData({
                            orderInfo: res.data.OutData.Table[0],
                            f_itil_1801090100_P01: res.data.OutData.Table[0].f_itil_1801090100_P01
                        })
                        var LFind = '{"f_itil_1801090101_E01":["==","' + res.data.OutData.Table[0].f_itil_1801090100_P01 + '"]}';
                        wx.request({
                            url: app.globalData.domain + '/Iams/face/V1801090101.G.JSON',
                            data: {
                                Find: LFind,
                                IM_Token: app.globalData.Token,
                                IM_AppID: app.globalData.IM_AppID,
                                IM_KeyID: util.getSign(app.globalData.mkey, {
                                    Find: LFind,
                                })
                            },
                            success: function (ress) {
                                for (var i = 0; i < ress.data.OutData.Table.length; i++) {
                                    if (ress.data.OutData.Table[i].f_itil_1801090101_S03) {
                                        var time = (ress.data.OutData.Table[i].f_itil_1801090101_S03).substr(11, 5);
                                        var date = (ress.data.OutData.Table[i].f_itil_1801090101_S03).substr(0, 10);
                                        console.log(theDay)
                                        if (theDay == date) {
                                            date = '今天';
                                        }
                                        ress.data.OutData.Table[i].f_itil_1801090101_S03 = date + ' ' + time
                                    }
                                }
                                that.setData({
                                    process: ress.data.OutData.Table
                                })
                            }
                        })
                    } else {
                        that.setData({
                            isShow: false,
                        })
                        wx.showModal({
                            title: '提示',
                            content: '暂无报障信息',
                            showCancel: false,
                            success: function () {
                                wx.navigateBack({

                                })
                            }
                        })
                    }
                } else {
                    that.setData({
                        isShow: false,
                    })
                    wx.showModal({
                        title: '提示',
                        content: '暂无报障信息',
                        showCancel: false,
                        success: function () {
                            wx.navigateBack({

                            })
                        }
                    })
                }
            }
        })
    },
    onChangeShowState: function () {
        var that = this;
        that.setData({
            showView: (!that.data.showView)
        })
    },
    bigImg: function (e) {
        var i = e.currentTarget.dataset.index;
        var imgList = this.data.orderInfo.f_itil_1801090100_005;
        wx.previewImage({
            current: imgList[i], // 当前显示图片的http链接
            urls: imgList // 需要预览的图片http链接列表
        })
    },
    goDetail: function () {
        var that = this;
        wx.navigateTo({
            url: 'close_an_details?f_itil_1801090100_P01=' + that.data.f_itil_1801090100_P01,
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