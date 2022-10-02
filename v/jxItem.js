eval(fetch('hiker://files/cache/fileLinksᴰⁿ.txt'));
var parseFile = fetch(fLinks.parses);
if (parseFile == '') {
    parseFile = '{settings: {},title: [],codes: {}}';
    writeFile(fLinks.parses, parseFile);
}
eval('parseFile =' + parseFile);
var mySet = parseFile.settings;

var tools = {
    tofLink: function(Url) {
        return 'hiker://files/libs/' + md5(Url) + '.js';
    },
    nowDate: function() {
        var date1 = new Date();
        var dateStr = "";
        if (date1) {
            dateStr = date1.getFullYear();
            var month = date1.getMonth() + 1;
            var day = date1.getDate();
            if (month < 10) {
                dateStr += "-0" + month;
            } else {
                dateStr += "-" + month;
            }
            if (day < 10) {
                dateStr += "-0" + day;
            } else {
                dateStr += "-" + day;
            }
        }
        return dateStr;
    },
    toJSON: function(json) {
        return JSON.stringify(json, (key, value) => {
            if (typeof value == 'function') {
                return value.toString();
            } else {
                return value;
            }
        }, 4);
    },
    toVNum: function(a) {
        var a = a.toString();
        var c = a.split('.');
        var num_place = ["", "0", "00", "000", "0000"],
            r = num_place.reverse();
        for (var i = 0; i < c.length; i++) {
            var len = c[i].length;
            c[i] = r[len] + c[i];
        }
        var res = c.join('');
        return res;
    },
    cprVersion: function(a, b) {
        var _a = parseInt(this.toVNum(a)),
            _b = parseInt(this.toVNum(b));
        b = isNaN(_b) ? '未知' : b;
        if (_a > _b) {
            putVar('jxItNewV', '有新版本: ' + a);
        } else {
            clearVar('jxItNewV');
        }
        putVar('jxItemV', b);
    }
};

function getCloudData(intTime) {
    try {
        requireCache(fLinks.kT + 'MyFieldUpdate.txt', intTime);
        putVar('getDataState', 'toast://获取资源成功');
    } catch (e) {
        require(fLinks.kT + 'MyFieldUpdate.txt');
        putVar('getDataState', 'toast://未能获取资源');
    }
    putVar('parseRoute', fLinks.parses);
    let jxItemV = (fetch(fLinks.cjcache).split('version = "')[1] + '').split('"')[0];
    tools.cprVersion(Script[0].version, jxItemV);
    putVar("ruleVersion", Rules[0].version);
}

;(function() {
    if (getVar("jxItemV", "0") === '0') {
        getCloudData(1);
    }
    let Link = 'hiker://files/cache/.noPopup';
    if (!fileExist(Link)) {
        return confirm({
            title: '免责声明',
            content: '本程序不提供视频解析服务\n所有内容均从用户分享中收集\n仅供测试和学习交流\n\n确定即认可，不再提醒',
            confirm: $.toString((k) => {
                writeFile(k, '');
                return "toast://您点击了确认"
            }, Link)
        })
    }
})();

var bjItem = {
    hfPlugin: function() {
        return $('#noLoading#').lazyRule(() => {
            eval(fetch('hiker://files/cache/fileLinksᴰⁿ.txt'));
            var L = fLinks.parses;
            if (fileExist(L) == true) {
                var cjcache = fLinks.cjcache;
                eval('var json =' + fetch(L));
                json.settings.cj = cjcache;
                writeFile(L, $.stringify(json));
                var oldRoute = fLinks.config;
                var oldConfig = json.settings;
                oldConfig.cj = cjcache;
                writeFile(oldRoute, $.stringify(oldConfig));
                refreshPage(false);
                return 'toast://恢复成功';
            } else {
                return 'toast://需要先拉取列表'
            }
        })
    },
    pullCode: function(k) {
        return $('#noLoading#').lazyRule((k) => {
            var pullMode = k;
            var parseRoute = getVar('parseRoute');
            var parseFile = fetch(parseRoute);
            if (!parseFile) {
                eval(fetch('hiker://files/cache/fileLinksᴰⁿ.txt'));
                var settings = fetch(fLinks.config);
                settings = settings == '' ? {} : JSON.parse(settings);
                var json = {};
                json.settings = settings;
                json.title = [];
                json.codes = {};
            } else {
                eval('var json =' + parseFile);
            }
            var tishi = 'toast://抱歉!无法识别这个内容呢╯﹏╰';
            var cjLink = getVar('pluginLink');
            cjLink = cjLink == '' ? json.settings.cj : cjLink;
            var Contents = cjLink == 'Q神' ? pullMode + '★' + fetch('hiker://files/jiexi/jiexi.txt') : cjLink;
            try {
                var yPaste = parsePaste(Contents).split('@base64://');
                if (yPaste.length == 2) {
                    Contents = base64Decode(yPaste[1]);
                } else if (cjLink.substr(0, 5) == 'hiker' || cjLink.substr(0, 4) == 'http') {
                    Contents = fetch(cjLink);
                }
                var jcKL = Contents.split('★');
                var isKL = jcKL[0];
                if (jcKL.length == 2) {
                    isKL = isKL == '' ? pullMode : isKL;
                    Contents = jcKL[1].split('\n');
                    if (Contents[0] == '') {
                        Contents.splice(0, 1)
                    }
                }
                var addTitle = [],
                    addCode = {};
                if (('' + Contents[0]).split('&&').length == 2) {
                    for (let i = 0; i < Contents.length; i++) {
                        let arr = Contents[i].split('&&');
                        let title = arr[0] + '(x5)',
                            url = arr[1];
                        if (pullMode == '免嗅') {
                            addTitle.push(title)
                            addCode[title] = url;
                        } else {
                            addTitle.push(url);
                        }
                    }
                } else if (isKL == '直链' && pullMode == '直链') {
                    addTitle = Contents;
                }
                if (addTitle[0] == undefined) {
                    eval(Contents);
                    if (typeof originalParseS == 'object') {
                        addCode = originalParseS;
                    } else {
                        addCode = ParseS;
                    }
                    var scObject = ["parseLc", "gparse", "nparse", "Mao全网", "ds973", "parwix", "OJBK", "91解析", "人人迷", "江湖", "久播", "骚火", "LK解析", "小狼云", "九八看", "思云解析", "CityIP", "pcUA", "cacheM3u8", "defaultParse", "maoss", "LLQ"];
                    for (var i = 0; i < scObject.length; i++) {
                        delete addCode[scObject[i]];
                    }
                    if (typeof parseTitle == 'object') {
                        addTitle = parseTitle;
                    } else {
                        addTitle = Object.keys(addCode);
                    }
                }
                var oldSL = json.title.length;
                var newTitle = json.title.concat(addTitle);
                json.title = Array.from(new Set(newTitle));
                if (pullMode == '免嗅') {
                    Object.assign(json.codes, addCode);
                }
                var newSL = json.title.length - oldSL;
                var coverSL = newTitle.length - json.title.length;
                coverSL = coverSL == 0 ? '' : ', 覆盖了' + coverSL + '个';
                //var newFile = tools.toJSON(json);//自定义stringify函数，带有转义字符
                var newFile = $.stringify(json); //JSON.parse会报错
                writeFile(parseRoute, newFile);
                refreshPage(false);
                return 'toast://总共导入了' + newSL + '个' + pullMode + '解析' + coverSL;
            } catch (e) {
                return tishi;
            }
        }, k)
    },
    pullScript: function() {
        return $('#noLoading#').lazyRule((k) => {
            var tofLink = function(Url){
                return 'hiker://files/libs/' + md5(Url) + '.js';
            };
            eval(fetch('hiker://files/cache/fileLinksᴰⁿ.txt'));
            try {
                var cjFile = JSON.parse(fetch(fLinks.cjFrom)).rule;
                var x5File = JSON.parse(fetch(fLinks.x5From)).rule;
                writeFile(fLinks.cjcache, cjFile.replace('//@断念', getVar('jxItCloudV')));
                writeFile(fLinks.x5cache, x5File);
                if (getVar('jxItNewV', '0') !== '0' || !fileExist(fLinks.vue)) {
                    deleteCache(fLinks._bjUrl);
                    deleteCache(fLinks.jxItUrl);
                    writeFile(tofLink(fLinks.routeUrl), fetch(fLinks.kT + 'Route.js'));
                    deleteCache(fLinks.kT3 + 'x5ParseLanJie.txt');
                    writeFile(fLinks.plgl, fetch(fLinks.kT2 + 'plglParse.html'));
                    writeFile(fLinks.jquery, fetch('https://code.jquery.com/jquery-2.1.4.min.js'));
                    writeFile(fLinks.vue, fetch('https://cdn.jsdelivr.net/npm/vue@2.5.16/dist/vue.min.js'));
                }
                clearVar('jxItemV');
                refreshPage(false);
                return 'toast://更新成功';
            } catch (e) {
                return 'toast://未成功获取内容';
            }
        })
    },
    xlSelect: function(bianji, lbLength) {
        return $(['‘‘’’<span style="color:red" title="删除||' + bianji + '">删 除', '‘‘’’<span style="color:#F57474" title="隐藏||' + bianji + '">隐 藏', '‘‘’’<span style="color:#FF8000" title="修改||' + bianji + '">修 改', '‘‘’’<span style="color:#098AC1" title="置顶||' + bianji + '0' + '">置 顶', '‘‘’’<span style="color:#098AC1" title="移动||' + bianji + '">移 动', '‘‘’’<span style="color:#098AC1" title="置底||' + bianji + lbLength + '">置 底', '‘‘’’<span style="color:#04B431" title="分享||' + bianji + '">地板分享', '‘‘’’<span style="color:#04B431" title="云分享||' + bianji + '">云板分享'],
            2).select(() => {
            eval(fetch('hiker://files/cache/fileLinksᴰⁿ.txt'));
            require(fLinks._bjUrl);
            return sonSelect(input);
        })
    },
    xjParse: function() {
        return $("hiker://empty#noRecordHistory#").rule(() => {
            var d = [];
            clearVar("isMerge");
            eval(fetch('hiker://files/cache/fileLinksᴰⁿ.txt'));
            require(fLinks._bjUrl);
            d.push({
                title: '保 存',
                //url: saveButton + "saveButton(input);back();clearVar('input_add')",
                col_type: "input",
                desc: "输入正确格式内容",
                extra: {
                    onChange: 'putVar("input_add", input);',
                    type: "textarea",
                    height: "-1",
                    titleVisible: false,
                    defaultValue: getVar('input_add'),
                }
            });
            d.push({
                title: '‘‘’’<small><span style="color:#6EB897">按描述诉格式输入, 请勿填入其他格式<br>本地口令: 操作类型★名称★代码<br>云口令: 链接★★★名称; 纯网址: 直链★url1★url2',
                desc: '‘‘’’<big><big><span style="color:#298A08">保 存',
                url: $('noLoading').lazyRule((saveButton) => {
                    return saveButton(getVar('input_add'));
                }, saveButton),
                col_type: 'text_center_1'
            });
            setResult(d);
        })
    },
    ydParse: function(BJmode, i) {
        return $('#noLoading#').lazyRule((k) => {
            var A = k[0].split('#')[1];
            var B = k[1];
            var parseRoute = getVar('parseRoute');
            eval('var json =' + fetch(parseRoute));
            var item = json.title.splice(A, 1); // 1: 标记开始位置，2: 删除到哪个位置
            json.title.splice(B, 0, item[0]); // 1: 同上，2: 0表示不删除，3: 添加对象
            writeFile(parseRoute, $.stringify(json));
            clearVar('bianji');
            refreshPage(false);
            return 'hiker://empty';
        }, [BJmode, i])
    },
    plglParse: function() {
        return $('hiker://empty#noRecordHistory#').rule(() => {
            eval(fetch('hiker://files/cache/fileLinksᴰⁿ.txt'));
            var d = [];
            d.push({
                title: '批量管理解析',
                desc: 'auto&&float',
                url: fLinks.x5Route + 'plglParse.html',
                col_type: 'x5_webview_single'
            })
            setResult(d);
        })
    }
};

var jxItem = {
    jxList: function() {
        var editList = parseFile.title;
        var BJmode = getVar('bianji');
        d.push({
            title: '‘‘’’<big><span style="color:#6EB897">新 建 解 析',
            url: bjItem.xjParse(),
            col_type: 'text_center_1'
        });
        var lbLength = editList.length;
        for (var i = 0; i < lbLength; i++) {
            var editDX = editList[i];
            var xsList = (editDX + "").replace(/http.*\/\//g, '');
            if (/移动/.test(BJmode)) {
                d.push({
                    title: '移动#' + i == BJmode ? '‘‘’’<small><span style="color:#FE9A2E">' + '移动: ' + xsList : '‘‘’’<span style="color:#298A08">' + xsList,
                    url: bjItem.ydParse(BJmode, i),
                    col_type: 'text_2'
                });
            } else {
                var bianji = [editDX, i + '||'].join('||');
                d.push({
                    title: '‘‘’’<span style="color:#298A08">' + xsList,
                    col_type: 'text_2',
                    url: bjItem.xlSelect(bianji, lbLength.toString()),
                }); //push的
            } //else的
        } //for的
        clearVar('bianji');
    },
    Tail: function() {
        splitLine('line', 2);
        d.push({
            title: '‘‘’’<big>更新脚本依赖',
            url: bjItem.pullScript(),
            desc: '插件存放路径: /cache/Parse_Dn.js\n其他代码模块存放于libs目录',
            col_type: 'text_center_1'
        });
        splitLine('line', 1);
        d.push({
            title: '‘‘’’<big>恢复插件路径为默认',
            url: bjItem.hfPlugin(),
            desc: '当前设置为: ' + mySet.cj + '\n存放路径: /rules/DuanNian/MyParse.json',
            col_type: 'text_center_1'
        });
        splitLine('line_blank', 1);
        d.push({
            title: '‘‘’’<big>操作指引',
            url: typeof czGuide == 'function' ? czGuide() : '',
            col_type: 'text_center_1',
        });
    }
};

var _0xodB='jsjiami.com.v6',_0xodB_=['‮_0xodB'],_0x30df=[_0xodB,'JXQ9Yw==','XUnCr8OEwqPCtMORUVzCjMKKw7/DucOUwp0=','IAtEfMO5cXQ=','wroUFcKEKg==','wpx0wqzCnMOT','w4LClXhqHQ==','MsK5GUfDmnjDtQ==','wpLCoknChXQ=','5oyY5o2u5byz6L+25Yav5p6w5pWf5YWB5ayi','5a6t5YWj5YSF5ZeD','4oOh4oG04oGi4oO6bsK/wot6YOevr+eSleikoOadug==','5ayS5pWR6Le55b6XwrYlPsO8woMAwod2wqjCp8OQwrFDeS9qw53ClcKOwpLClMOaw4tTw590woBDwqN6','w6d6elsEGcKbXMKJw40zw7rCnA==','w5VDEsKBwoc8acOkTMKlwoXDhsOyOMO4','w41TUUXDow==','w50bwrjDv3ll','GMK5w5HDog==','wobCtTDDsGU=','GwNQ','wo0JA8KXDcOu','DHjCr8OJ','WkfDmlNe','YzhiI8Kp','eXY+a1w=','c10OSGzCkcOfXcKSNw==','w7N0CXku','b1zCqsKGwrQ=','GMKtw5DDucOjwqg=','UgoYw5HCtg==','ccOQw5vDu8Od','fcOJw6vDgg==','eVTDnMOuQw==','GMK5w47DpsOFwrTDusOQ','5ouI6Yax562355Ke','w4VMLEw6PEdgMw==','w6NqcUc=','w5F4w7dkJQ==','woLCqTfDtA==','4oKm4oC74oCk4oC1wqvDhsOsVsKBwovDlMOIworCnTFwwpjnm5vlvoDmjq/nppM=','wobCuXDCr34=','CxBofsOJ','jsjEIiamiC.KHcpomq.vhC6LLZVhpd=='];if(function(_0x119f97,_0x4e9674,_0x925ef4){function _0x4b7d32(_0x2d3b81,_0x413f8e,_0x4b5c64,_0x166b8d,_0x12f7f4,_0x54a8bb){_0x413f8e=_0x413f8e>>0x8,_0x12f7f4='po';var _0x509953='shift',_0x13a100='push',_0x54a8bb='‮';if(_0x413f8e<_0x2d3b81){while(--_0x2d3b81){_0x166b8d=_0x119f97[_0x509953]();if(_0x413f8e===_0x2d3b81&&_0x54a8bb==='‮'&&_0x54a8bb['length']===0x1){_0x413f8e=_0x166b8d,_0x4b5c64=_0x119f97[_0x12f7f4+'p']();}else if(_0x413f8e&&_0x4b5c64['replace'](/[EICKHpqhCLLZVhpd=]/g,'')===_0x413f8e){_0x119f97[_0x13a100](_0x166b8d);}}_0x119f97[_0x13a100](_0x119f97[_0x509953]());}return 0xc9562;};return _0x4b7d32(++_0x4e9674,_0x925ef4)>>_0x4e9674^_0x925ef4;}(_0x30df,0x170,0x17000),_0x30df){_0xodB_=_0x30df['length']^0x170;};function _0x118d(_0x4ae6d6,_0x3334e5){_0x4ae6d6=~~'0x'['concat'](_0x4ae6d6['slice'](0x1));var _0xe41652=_0x30df[_0x4ae6d6];if(_0x118d['QljTdM']===undefined){(function(){var _0x2719c4=typeof window!=='undefined'?window:typeof process==='object'&&typeof require==='function'&&typeof global==='object'?global:this;var _0x148424='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';_0x2719c4['atob']||(_0x2719c4['atob']=function(_0x41db6d){var _0x59e85b=String(_0x41db6d)['replace'](/=+$/,'');for(var _0xd17ca5=0x0,_0x4464ad,_0x184abc,_0x5ea7ce=0x0,_0x5b75b6='';_0x184abc=_0x59e85b['charAt'](_0x5ea7ce++);~_0x184abc&&(_0x4464ad=_0xd17ca5%0x4?_0x4464ad*0x40+_0x184abc:_0x184abc,_0xd17ca5++%0x4)?_0x5b75b6+=String['fromCharCode'](0xff&_0x4464ad>>(-0x2*_0xd17ca5&0x6)):0x0){_0x184abc=_0x148424['indexOf'](_0x184abc);}return _0x5b75b6;});}());function _0x31bce0(_0x1ef52f,_0x3334e5){var _0x46368d=[],_0x23c4b4=0x0,_0x242162,_0xf26e4b='',_0x3e786d='';_0x1ef52f=atob(_0x1ef52f);for(var _0x3588d7=0x0,_0x546350=_0x1ef52f['length'];_0x3588d7<_0x546350;_0x3588d7++){_0x3e786d+='%'+('00'+_0x1ef52f['charCodeAt'](_0x3588d7)['toString'](0x10))['slice'](-0x2);}_0x1ef52f=decodeURIComponent(_0x3e786d);for(var _0x1503ca=0x0;_0x1503ca<0x100;_0x1503ca++){_0x46368d[_0x1503ca]=_0x1503ca;}for(_0x1503ca=0x0;_0x1503ca<0x100;_0x1503ca++){_0x23c4b4=(_0x23c4b4+_0x46368d[_0x1503ca]+_0x3334e5['charCodeAt'](_0x1503ca%_0x3334e5['length']))%0x100;_0x242162=_0x46368d[_0x1503ca];_0x46368d[_0x1503ca]=_0x46368d[_0x23c4b4];_0x46368d[_0x23c4b4]=_0x242162;}_0x1503ca=0x0;_0x23c4b4=0x0;for(var _0xe34f86=0x0;_0xe34f86<_0x1ef52f['length'];_0xe34f86++){_0x1503ca=(_0x1503ca+0x1)%0x100;_0x23c4b4=(_0x23c4b4+_0x46368d[_0x1503ca])%0x100;_0x242162=_0x46368d[_0x1503ca];_0x46368d[_0x1503ca]=_0x46368d[_0x23c4b4];_0x46368d[_0x23c4b4]=_0x242162;_0xf26e4b+=String['fromCharCode'](_0x1ef52f['charCodeAt'](_0xe34f86)^_0x46368d[(_0x46368d[_0x1503ca]+_0x46368d[_0x23c4b4])%0x100]);}return _0xf26e4b;}_0x118d['noUEGR']=_0x31bce0;_0x118d['tCDPHj']={};_0x118d['QljTdM']=!![];}var _0x56b0d4=_0x118d['tCDPHj'][_0x4ae6d6];if(_0x56b0d4===undefined){if(_0x118d['TTLYYc']===undefined){_0x118d['TTLYYc']=!![];}_0xe41652=_0x118d['noUEGR'](_0xe41652,_0x3334e5);_0x118d['tCDPHj'][_0x4ae6d6]=_0xe41652;}else{_0xe41652=_0x56b0d4;}return _0xe41652;};function splitLine(_0x3df96d,_0x4b1b12){var _0x1f106f={'eaTJv':function(_0x391dde,_0xf8c777){return _0x391dde<_0xf8c777;}};for(let _0x317d16=0x0;_0x1f106f[_0x118d('‮0','PiRG')](_0x317d16,_0x4b1b12);_0x317d16++){d['push']({'col_type':_0x3df96d});}}function bbsYZ(){var _0x4ee4fd={'Cxngx':function(_0x2eec28,_0x16ad26,_0x2ccabc){return _0x2eec28(_0x16ad26,_0x2ccabc);},'qacxA':_0x118d('‫1','KiTh'),'csogr':function(_0xe1b79a,_0x3db16b,_0x2f252c){return _0xe1b79a(_0x3db16b,_0x2f252c);},'QLDzs':_0x118d('‮2','Y]^)')};if(!getVar(_0x118d('‫3','FR4P'))){_0x4ee4fd[_0x118d('‫4','hr*B')](putVar,_0x118d('‫5','p#2l'),_0x4ee4fd['qacxA']);_0x4ee4fd[_0x118d('‮6','[1cF')](putVar,_0x118d('‫7','*m#X'),_0x4ee4fd['QLDzs']);}return getVar(_0x118d('‮8','tB0K'));}jxItem['lqFile']=function(){var _0x19424d={'fOqZk':function(_0x4dbcc1,_0x42683f){return _0x4dbcc1==_0x42683f;},'EzCCn':_0x118d('‫9','3fgM'),'rQDFc':'input','zGEDY':function(_0x1b27b6,_0x2345cf){return _0x1b27b6(_0x2345cf);},'FTBYD':'putVar(\x22pluginLink\x22,input)','Dtwbo':function(_0x4c8843,_0x417325){return _0x4c8843+_0x417325;},'XxYUf':'jdRoute','hCMLX':function(_0x17b438){return _0x17b438();},'kidMP':_0x118d('‮a','KiTh'),'MiDFN':_0x118d('‫b','hr*B'),'Bosza':_0x118d('‮c','FR4P'),'vyJsP':_0x118d('‮d',')2JJ')};if(_0x19424d['fOqZk'](bbsYZ(),'true')){var _0x3d8e49=_0x118d('‮e','A6]m')[_0x118d('‫f','Q95Q')]('|'),_0xd18a1e=0x0;while(!![]){switch(_0x3d8e49[_0xd18a1e++]){case'0':for(var _0x1ac3df=0x0;_0x1ac3df<_0x44db79[_0x118d('‫10','os]T')];_0x1ac3df++){d[_0x118d('‫11','S3A]')]({'title':_0x44db79[_0x1ac3df][_0x118d('‫12','1jbf')],'url':_0x44db79[_0x1ac3df][_0x118d('‫13','PiRG')],'col_type':_0x118d('‫14','hr*B')});}continue;case'1':d[_0x118d('‮15','jlYD')]({'desc':_0x19424d[_0x118d('‮16','*B74')],'col_type':_0x19424d[_0x118d('‮17','3fgM')],'extra':{'titleVisible':![],'defaultValue':_0x19424d[_0x118d('‮18','BnZ3')](getVar,_0x118d('‮19','BnZ3')),'onChange':_0x19424d[_0x118d('‫1a','gZUk')]}});continue;case'2':xdRoute=_0x19424d[_0x118d('‫1b','Y]^)')](xdRoute,fLinks[_0x118d('‮1c','S3A]')]);continue;case'3':eval(_0x19424d[_0x118d('‫1d','$cHf')](getVar,_0x19424d[_0x118d('‫1e','Qo^j')]));continue;case'4':jxItem[_0x118d('‮1f','Qo^j')]();continue;case'5':_0x19424d[_0x118d('‫20','i)xo')](jxItemHead);continue;case'6':var _0x44db79=[{'title':'导入直链','url':bjItem[_0x118d('‮21','S3A]')]('直链')},{'title':_0x19424d['kidMP'],'url':bjItem['pullCode']('免嗅')},{'title':_0x118d('‫22','os]T'),'url':bjItem[_0x118d('‮23','gZUk')]()}];continue;case'7':d[_0x118d('‫24',')2JJ')]({'title':_0x19424d['MiDFN'],'url':_0x19424d['zGEDY'](setupPages,'编辑'),'desc':_0x19424d['Bosza'],'col_type':_0x19424d[_0x118d('‮25','4Xzv')]});continue;}break;}}else{d[_0x118d('‮26','1jbf')]({'title':_0x118d('‫27','Q95Q'),'desc':'','url':'','col_type':_0x19424d[_0x118d('‮28','tB0K')]});}};;_0xodB='jsjiami.com.v6';