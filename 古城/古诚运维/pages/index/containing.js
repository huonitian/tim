var sourceType = [['camera'], ['album'], ['camera', 'album']]
var sizeType = [['compressed'], ['original'], ['compressed', 'original']]
var app = getApp()
var util = require('../../utils/util.js')

var area = require('../../utils/area.js')

var areaInfo = [];//所有省市区县数据

var provinces = [];//省

var citys = [];//城市

var countys = [];//区县

var index = [0, 0, 0];

var cellId;

var t = 0;
var show = false;
var moveY = 200;
//动画事件
function animationEvents(that, moveY, show) {
    console.log("moveY:" + moveY + "\nshow:" + show);
    that.animation = wx.createAnimation({
        transformOrigin: "50% 50%",
        duration: 400,
        timingFunction: "ease",
        delay: 0
    })
    that.animation.translateY(moveY + 'vh').step()

    that.setData({
        animation: that.animation.export(),
        show: show
    })

}

// ---------------- 分割线 ---------------- 

//获取省份数据
function getProvinceData(that) {
    var s;
    provinces = [];
    var num = 0;
    for (var i = 0; i < areaInfo.length; i++) {
        s = areaInfo[i];
        if (s.di == "00" && s.xian == "00") {
            provinces[num] = s;
            num++;
        }
    }
    that.setData({
        provinces: provinces
    })

    //初始化调一次
    getCityArr(18, that);
    getCountyInfo(18, 0, that);
    that.setData({
        province: "广东省",
        city: "广州市",
        county: "市辖区",
    })

}

// 获取地级市数据
function getCityArr(count, that) {
    var c;
    citys = [];
    var num = 0;
    for (var i = 0; i < areaInfo.length; i++) {
        c = areaInfo[i];
        if (c.xian == "00" && c.sheng == provinces[count].sheng && c.di != "00") {
            citys[num] = c;
            num++;
        }
    }
    if (citys.length == 0) {
        citys[0] = { name: '' };
    }

    that.setData({
        city: "",
        citys: citys,
        value: [count, 0, 0]
    })
}

// 获取区县数据
function getCountyInfo(column0, column1, that) {
    var c;
    countys = [];
    var num = 0;
    for (var i = 0; i < areaInfo.length; i++) {
        c = areaInfo[i];
        if (c.xian != "00" && c.sheng == provinces[column0].sheng && c.di == citys[column1].di) {
            countys[num] = c;
            num++;
        }
    }
    if (countys.length == 0) {
        countys[0] = { name: '' };
    }
    that.setData({
        county: "",
        countys: countys,
        value: [column0, column1, 0]
    })
}



Page({
    data: {
        imageList: [],
        sourceTypeIndex: 2,
        sourceType: ['拍照', '相册', '拍照或相册'],
        sizeTypeIndex: 2,
        sizeType: ['压缩', '原图', '压缩或原图'],
        countIndex: 3,
        count: [1, 2, 3, 4],
        price: 150,
        num: 0,
        phone: '',
        name: '',
        describes: '',
        submit: false,
        picList: '',
        APars: '',
        BPars: '',
        f_itil_1801090100_012: '',//省
        f_itil_1801090100_013: '',//市
        f_itil_1801090100_014: '',//区
        f_itil_1801090100_015: '',//详细地址
        arrayOne: '',
        arrayTwo: '',
        arrayThree: '',
        selectOne: '',
        selectTwo: '',
        selectThree: '',
        showTen: true,
    },
    onLoad: function (options) {
        var that = this;
        if (options.APars || options.BPars) {
            this.setData({
                APars: options.APars,
                BPars: options.BPars,
            })
        }
        area.getAreaInfo(function (arr) {
            areaInfo = arr;
            //获取省份数据
            getProvinceData(that);
        });

        wx.request({
            url: app.globalData.domain + '/Iams/face/V1801090103.G.JSON',
            success: function (res) {
                that.setData({
                    arrayOne: res.data.OutData,
                    selectOne: res.data.OutData[0].text,
                    arrayTwo: res.data.OutData[0].children,
                    selectTwo: res.data.OutData[0].children[0].text,
                    arrayThree: res.data.OutData[0].children[0].children,
                    selectThree: res.data.OutData[0].children[0].children[0].text,
                })
            }
        })

        wx.request({
            url: app.globalData.domain + '/Iams/face/V1801090100.G.JSON',
            data: {
                f_itil_1801090100_011: app.globalData.UserId,
                APars: that.data.APars,
                BPars: that.data.BPars,
                action: 'getprice',
                IM_Token: app.globalData.Token,
                IM_AppID: app.globalData.IM_AppID,
                IM_KeyID: util.getSign(app.globalData.mkey, {
                    f_itil_1801090100_011: app.globalData.UserId,
                    APars: that.data.APars,
                    BPars: that.data.BPars,
                    action: 'getprice',
                })
            },
            success: function (info) {
                if (info.data.OutData.price) {
                    that.setData({
                        price: info.data.OutData.price
                    })
                }
            }
        })
    },
    sourceTypeChange: function (e) {
        this.setData({
            sourceTypeIndex: e.detail.value
        })
    },
    sizeTypeChange: function (e) {
        this.setData({
            sizeTypeIndex: e.detail.value
        })
    },
    // countChange: function (e) {
    //     this.setData({
    //         countIndex: e.detail.value
    //     })
    // },
    chooseImg: function () {
        var that = this;
        var imageLis = that.data.imageList;
        var countIndex = that.data.countIndex;
        wx.chooseImage({
            sourceType: sourceType[that.data.sourceTypeIndex],
            sizeType: sizeType[that.data.sizeTypeIndex],
            count: 4 - that.data.imageList.length,
            success: function (res) {
                console.log(typeof (imageLis));
                if (imageLis.length != 0) {
                    // if(imageLis.length+res.tempFilePaths.length>4){
                    //   wx.showToast({
                    //     title: '最多只能上传四张图片'
                    //   });
                    //   return;
                    // }
                    for (var i = 0; i < res.tempFilePaths.length; i++) {
                        imageLis.push(res.tempFilePaths[i]);
                    }
                } else {
                    imageLis = res.tempFilePaths;
                }
                countIndex = countIndex - res.tempFilePaths.length;
                var showTen;
                if (imageLis.length >= 4) {
                    showTen = false;
                } else {
                    showTen = true;
                }
                that.setData({
                    imageList: imageLis,
                    showTen: showTen,
                    countIndex: countIndex
                })
                that.isSubmit();
            }
        });
    },
    previewImage: function (e) {
        console.log(e)
        var current = e.target.dataset.src

        wx.previewImage({
            current: current,
            urls: this.data.imageList
        })
    },
    describe: function (e) {
        this.setData({
            num: e.detail.value.length,
            describes: e.detail.value
        })
        this.isSubmit();
    },
    isPhone: function () {
        if (this.data.phone.length != 11) {
            wx.showToast({
                icon: 'none',
                title: '手机格式有误',
                duration: 2500
            })
        }
    },
    userName: function (e) {
        this.setData({
            name: e.detail.value,
        })
        this.isSubmit();
    },
    phone: function (e) {
        this.setData({
            phone: e.detail.value,
        });
        this.isSubmit();
    },
    isSubmit: function () {
        if (this.data.name != '' && this.data.phone != '' && this.data.describes != '' && this.data.f_itil_1801090100_012 != '' && this.data.f_itil_1801090100_013 != '' && this.data.f_itil_1801090100_014 != '' && this.data.f_itil_1801090100_015 != '' && this.data.selectThree != '') {
            if (this.data.phone.length == 11) {
                if (!(/^1[0-9]\d{9}$/.test(this.data.phone))) {
                    wx.showToast({
                        icon: 'none',
                        title: '手机格式有误',
                        duration: 2500
                    })
                    return;
                }
                this.setData({
                    submit: true,
                })
            } else if (this.data.phone.length > 11) {
                wx.showToast({
                    icon: 'none',
                    title: '手机格式有误',
                    duration: 2500
                })
                return;
            }
        } else {
            this.setData({
                submit: false,
            })
        }
    },
    surePay: function () {
        wx.showLoading({
            title: '加载中',
            mask: true,
        })
        this.setData({
            picList: '',
        })
        var f_itil_1801090100_002 = this.data.name;
        var f_itil_1801090100_003 = this.data.phone;
        var f_itil_1801090100_004 = this.data.describes;
        var f_itil_1801090100_005 = this.data.picList;
        if (this.data.name == '') {
            wx.hideLoading();
            wx.showToast({
                title: '请输入姓名',
                icon: 'none',
                duration: 2500
            }); return;
        }
        if (this.data.phone == '') {
            wx.hideLoading();
            wx.showToast({
                title: '请输入电话',
                icon: 'none',
                duration: 2500
            }); return;
        }
        if (this.data.phone.length < 11) {
            wx.showToast({
                title: '手机格式有误',
                icon: 'none',
                duration: 2500
            })
            return;
        }
        if (this.data.describes == '') {
            wx.hideLoading();
            wx.showToast({
                title: '请描述故障',
                icon: 'none',
                duration: 2500
            }); return;
        }
        console.log(this.data.imageList);
        if (this.data.imageList != '') {
            var filePaths = this.data.imageList, successUp = 0, failUp = 0, i = 0, length = this.data.imageList.length;
            this.uploadDIY(filePaths, successUp, failUp, i, length);
        } else {
            this.isUpload();
        }

    },

    uploadDIY(filePaths, successUp, failUp, i, length) {
        var that = this;
        wx.uploadFile({
            url: app.globalData.domain + '/Iams/face/V1802011000.G.JSON?upload_file=wx',
            filePath: filePaths[i],
            name: 'file',
            success: function (resp) {
                console.log(resp);
                resp.data = JSON.parse(resp.data);
                console.log(resp.data.OutData.IM_Files.path);
                var picList = that.data.picList;
                picList = picList + resp.data.OutData.IM_Files.path + ',';
                var isClear = i + 1;
                console.log(isClear);
                if (isClear == length) {
                    picList = picList.substring(0, picList.length - 1);
                }
                that.setData({
                    picList: picList
                })
                successUp++;
            },
            fail: function (res) {
                failUp++;
            },
            complete: function (ress) {
                i++;
                if (i == length) {
                    that.isUpload();
                }
                else {  //递归调用uploadDIY函数
                    that.uploadDIY(filePaths, successUp, failUp, i, length);
                }
            },
        });
    },
    isUpload: function () {
        var f_itil_1801090100_002 = this.data.name;
        var f_itil_1801090100_003 = this.data.phone;
        var f_itil_1801090100_004 = this.data.describes;
        var f_itil_1801090100_005 = this.data.picList;
        if (this.data.selectOne && this.data.selectTwo && this.data.selectThree) {
            var f_itil_1801090100_016 = this.data.selectOne + '/' + this.data.selectTwo + '/' + this.data.selectThree;
        } else {
            wx.showToast({
                title: '请选择故障类型',
                icon: 'none'
            }); return;
        }
        // var f_itil_1801090100_006 = 0.01;
        var that = this;
        wx.request({
            url: app.globalData.domain + '/Iams/face/V1801090100.I.JSON',
            data: {
                f_itil_1801090100_002: f_itil_1801090100_002,
                f_itil_1801090100_003: f_itil_1801090100_003,
                f_itil_1801090100_004: f_itil_1801090100_004,
                f_itil_1801090100_005: f_itil_1801090100_005,
                f_itil_1801090100_012: that.data.f_itil_1801090100_012,
                f_itil_1801090100_013: that.data.f_itil_1801090100_013,
                f_itil_1801090100_014: that.data.f_itil_1801090100_014,
                f_itil_1801090100_015: that.data.f_itil_1801090100_015,
                f_itil_1801090100_016: f_itil_1801090100_016,
                APars: that.data.APars,
                BPars: that.data.BPars,
                PayMode: 'wxpay',
                IM_Token: app.globalData.Token,
                IM_AppID: app.globalData.IM_AppID,
                IM_KeyID: util.getSign(app.globalData.mkey, {
                    f_itil_1801090100_002: f_itil_1801090100_002,
                    f_itil_1801090100_003: f_itil_1801090100_003,
                    f_itil_1801090100_004: f_itil_1801090100_004,
                    f_itil_1801090100_005: f_itil_1801090100_005,
                    f_itil_1801090100_012: that.data.f_itil_1801090100_012,
                    f_itil_1801090100_013: that.data.f_itil_1801090100_013,
                    f_itil_1801090100_014: that.data.f_itil_1801090100_014,
                    f_itil_1801090100_015: that.data.f_itil_1801090100_015,
                    f_itil_1801090100_016: f_itil_1801090100_016,
                    APars: that.data.APars,
                    BPars: that.data.BPars,
                    PayMode: 'wxpay'
                })
            },
            success: function (res) {
                console.log(res);
                wx.navigateTo({
                    url: 'close_an_account?f_itil_1801090100_P01=' + res.data.OutData.Table[0].f_itil_1801090100_P01,
                })
                // wx.requestPayment({
                //     'appId': res.data.OutData.wxpay.appid,
                //     'timeStamp': res.data.OutData.iTime,
                //     'nonceStr': res.data.OutData.wxpay.nonce_str,
                //     'signType': 'MD5',
                //     'package': "prepay_id=" + res.data.OutData.wxpay.prepay_id,
                //     'paySign': res.data.OutData.jsapi,
                //     success: function () {
                //         wx.showToast({
                //             title: '提交成功',
                //             icon: 'success',
                //             duration: 2000,
                //             mask: true,
                //             success: function () {
                //                 setTimeout(function () {
                //                     wx.redirectTo({
                //                         url: 'query?f_itil_1801090100_P01=' + res.data.OutData.Table[0].f_itil_1801090100_P01,
                //                     })
                //                 }, 1800)
                //             }
                //         })
                //     },
                //     fail: function (resssa) {
                //         console.log(resssa)
                //         wx.hideLoading();
                //     }
                // })
            }
        })

    },
    //兼容地址选择
    bindChange: function (e) {
        var val = e.detail.value
        // console.log(e)
        //判断滑动的是第几个column
        //若省份column做了滑动则定位到地级市和区县第一位
        if (index[0] != val[0]) {
            val[1] = 0;
            val[2] = 0;
            getCityArr(val[0], this);//获取地级市数据
            getCountyInfo(val[0], val[1], this);//获取区县数据
        } else {    //若省份column未做滑动，地级市做了滑动则定位区县第一位
            if (index[1] != val[1]) {
                val[2] = 0;
                getCountyInfo(val[0], val[1], this);//获取区县数据
            }
        }
        index = val;

        console.log(index + " => " + val);

        //更新数据
        this.setData({
            value: [val[0], val[1], val[2]],
            province: provinces[val[0]].name,
            city: citys[val[1]].name,
            county: countys[val[2]].name
        })

    },
    onShow: function () {
        wx.hideLoading();
        wx.clearStorage('show');
        // this.setData({
        //     imageList: '',
        //     picList: ''
        // })
    },
    onReady: function () {
        this.animation = wx.createAnimation({
            transformOrigin: "50% 50%",
            duration: 0,
            timingFunction: "ease",
            delay: 0
        }
        )
        this.animation.translateY(200 + 'vh').step();
        this.setData({
            animation: this.animation.export(),
            show: show
        })
    },
    //移动按钮点击事件
    translate: function (e) {
        if (t == 0) {
            moveY = 0;
            show = false;
            t = 1;
        } else {
            moveY = 200;
            show = true;
            t = 0;
        }
        // this.animation.translate(arr[0], arr[1]).step();
        animationEvents(this, moveY, show);

    },
    //隐藏弹窗浮层
    hiddenFloatView: function (e) {
        console.log(e.target.dataset.id);
        if (e.target.dataset.id == '666') {
            var province = this.data.province,
                city = this.data.city,
                county = this.data.county
            this.setData({
                f_itil_1801090100_012: province,
                f_itil_1801090100_013: city,
                f_itil_1801090100_014: county,
            })
        }
        moveY = 200;
        show = true;
        t = 0;
        animationEvents(this, moveY, show);
        this.isSubmit();
    },
    address: function (e) {
        this.setData({
            f_itil_1801090100_015: e.detail.value
        })
        this.isSubmit();
    },
    selOne: function (e) {
        var num = e.detail.value;
        console.log(num);
        if (this.data.arrayOne[num]['text'] != this.data.selectOne) {
            this.setData({
                selectTwo: '',
                selectThree: '',
                arrayTwo: '',
                arrayThree: '',
            })
        }
        this.setData({
            selectOne: this.data.arrayOne[num]['text'],
            arrayTwo: this.data.arrayOne[num]['children']
        })
        this.isSubmit();
    },
    selTwo: function (e) {
        
        if (!this.data.selectOne) {
            wx.showToast({
                title: '请先选择行业',
                icon: 'none'
            });
            return;
        }
        var num = e.detail.value;
        console.log(e);
        if(num){
            if (this.data.arrayTwo[num]['text'] != this.data.selectTwo) {
                this.setData({
                    selectThree: '',
                    arrayThree: '',
                })
            }
            this.setData({
                selectTwo: this.data.arrayTwo[num]['text'],
                arrayThree: this.data.arrayTwo[num]['children']
            })
            this.isSubmit();
        }
    },
    selThree: function (e) {
        if (!this.data.selectTwo) {
            wx.showToast({
                title: '请先选择行业',
                icon: 'none'
            });
            return;
        }
        var num = e.detail.value;
        if (num) {
            this.setData({
                selectThree: this.data.arrayThree[num]['text'],
            })
            this.isSubmit();
        }
        
    },
    deleteImg: function (e) {
        var imgList = this.data.imageList;
        var imgLis = [];
        for (var i = 0; i < imgList.length; i++) {
            if (i == e.target.dataset.id) {
                continue;
            }
            imgLis.push(imgList[i]);
        }
        var showTen;
        if (imgLis.length >= 4) {
            showTen = false;
        } else {
            showTen = true;
        }
        this.setData({
            imageList: imgLis,
            showTen: showTen
        })
        this.isSubmit();
    },
    clearData: function (e) {
        if (e.target.dataset.type == 'name') {
            this.setData({
                name: ''
            })
        } else if (e.target.dataset.type == 'phone') {
            this.setData({
                phone: ''
            })
        } else if (e.target.dataset.type == 'address') {
            this.setData({
                f_itil_1801090100_015: ''
            })
        }
    },

})