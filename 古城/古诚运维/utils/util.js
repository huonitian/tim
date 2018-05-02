var md5 = require('../md5.js')

function formatTime(date) {
        var year = date.getFullYear()
        var month = date.getMonth() + 1
        var day = date.getDate()

        var hour = date.getHours()
        var minute = date.getMinutes()
        var second = date.getSeconds()


        return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
        n = n.toString()
        return n[1] ? n : '0' + n
}

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

module.exports = {
        formatTime: formatTime,
        getSign: getSign,
}
