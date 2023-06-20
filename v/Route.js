
eval(fetch('hiker://files/cache/fileLinksᴰⁿ.txt'));
var Route = {
    jxLazy: "require('./v/Route.js');aytmParse(input)",
    setParse: function() {
        eval(fetch('hiker://files/cache/fileLinksᴰⁿ.txt'));
        if (!getVar('jxItemV')) {
            require(fLinks.jxItUrl);
        }
        d.push({
            desc: 'auto',
            url: fLinks.x5Route + 'Parse_Dn.html',
            col_type: 'x5_webview_single'
        });
        var jxItNewV = getVar('jxItNewV', ''),
            jxItemV = getVar('jxItemV', '');
        var versionTips = jxItNewV == '' ? '‘‘' : '‘‘' + jxItNewV + '\n';
        var pics = [
            'https://tva1.sinaimg.cn/large/9bd9b167gy1fwri56wjhqj21hc0u0arr.jpg',
            'https://cdn.seovx.com/img/seovx-20-10%20(92).jpg',
            'https://cdn.seovx.com/img/mom2018%20(207).jpg',
            'https://tva4.sinaimg.cn/large/9bd9b167gy1fwrh5xoltdj21hc0u0tax.jpg',
            'https://tva1.sinaimg.cn/large/005BYqpggy1fwreyu4nl6j31hc0u0ahr.jpg',
            'https://s3.bmp.ovh/imgs/2021/10/d7e60b990742093d.jpeg',
            'https://s3.bmp.ovh/imgs/2021/10/91ad6d6538bf8689.jpg',
            'https://tva1.sinaimg.cn/large/005BYqpggy1fwresl5pmlj31hc0xcwka.jpg',
            'https://tva3.sinaimg.cn/large/005BYqpggy1fwrgjdk74oj31hc0u0dqn.jpg',
            'https://cdn.seovx.com/img/mom2018%20(803).jpg'
        ];
        d.push({
            img: pics[Math.floor(Math.random() * 10)],
            标题: versionTips + '’’<small><span style="color:#6EB897">　　点击此处查看操作指引<br>点击上方头像进入编辑',
            desc: '当前版本: ' + jxItemV,
            url: fLinks.czzy,
            col_type: 'movie_1'
        });
    }
};

function addLanJie(d) {
    let lanjie = ['baidu.*.png', '\.jpg', 'baidu\.', 'cnzz\.', 'dykj\.'];
    try {
        eval('var ylanjie =' + fetchCache(fLinks.kT + 'x5ParseLanJie.txt', 12));
    } catch (e) {}
    lanjie = typeof(ylanjie) == 'object' ? ylanjie : lanjie;
    for (let i = 0; i < d.length; i++) {
        let durl = d[i]。url;
        if (durl != undefined && /lazyRule/。test(durl) && /aytmParse|defaultParse/。test(durl)) {
            d[i]。extra = d[i]。extra == undefined ? {} : d[i]。extra;
            d[i]。extra。blockRules = lanjie;
        }
    }
    setResult(d);
}

function x5Parse(Url) {
    return $(Url)。lazyRule((cfRoute) => {
        try {
            eval('Config=' + fetch(cfRoute));
            eval(fetch(Config.cj));
        } catch (e) {}
        if (typeof ParseS == 'object') {
            return ParseS.defaultParse(input, tools.handleUrl);
        } else {
            return 'toast://没有插件或者设置的插件无效';
        }
    }, fLinks.config)
}

function aytmParse(vipUrl, parseName) {
    try {
        eval('Config=' + fetch(fLinks.config));
        eval(fetch(Config.cj));
    } catch (e) {}
    if (typeof ParseS == 'object') {
        return aytmParse(vipUrl, parseName);
    } else {
        return 'toast://没有插件或者设置的插件无效';
    }
}

function playerParse(jurl) {
    return $(jurl)。lazyRule((cfRoute) => {
        try {
            eval('Config=' + fetch(cfRoute));
            eval(fetch(Config.cj));
        } catch (e) {}
        if (typeof playParse == 'object') {
            return playParse.playerS(input);
        } else {
            return 'toast://没有插件或者设置的插件无效';
        }
    }, fLinks.config)
}

function setupPages(类型, ls) {
    var empty = ls != undefined ? 'hiker://empty#noHistory#' : 'hiker://empty#noRecordHistory##noHistory#';
    switch (类型) {
        case "设置":
            return $(empty)。rule((setParse) => {
                this。d = [];
                setParse();
                setResult(d);
            }, Route.setParse)
            break;
        case "编辑":
            return $(empty)。rule(() => {
                this。d = [];
                eval(fetch('hiker://files/cache/fileLinksᴰⁿ.txt'));
                require(fLinks.jxItUrl);
                jxItem.jxList();
                setResult(d);
            })
            break;
        默认:
            return 'toast://需要传入正确参数'
            break;
    }
}
Route.x5Parse = x5Parse;
Route.addLanJie = addLanJie;
