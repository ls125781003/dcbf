function saveButton(content, oldName) {
    var Merge = function(name, typ) {
        if (name != '') {
            typ = typ == undefined ? '保存' : typ;
            arrList = arrList.concat(json.title);
            json.title = Array.from(new Set(arrList));
            Object.assign(json.codes, objCode);
            writeFile(parseRoute, $.stringify(json));
            clearVar('isMerge');
            back();
            return "toast://已" + typ + "解析: " + name;
        } else {
            return 'toast://啥也没有存到'
        }
    }
    var data = content.split('★★★');
    if (data.length == 2) {
        var _dt = parsePaste(data[0]);
        content = _dt.substr(0, 6) != 'error:' ? _dt : '';
    }
    data = content.split('★');
    var type = data[0],
        objKey = data[1],
        arrList = [],
        objCode = {};
    if (data.length > 2 && type != '直链') {
        var objValue = data[2];
        if (type == 'MyParseS') {
            objValue = base64Decode(objValue);
        }
        if (objValue.split('function').length > 1) {
            eval('objValue=' + objValue);
        }
        arrList.splice(0, 0, objKey);
        objCode[objKey] = objValue;
    } else if (type == '直链') {
        arrList = data[1] == '' ? arrList : data;
        arrList.splice(0, 1);
    } else {
        arrList = null;
    }
    if (arrList != null) {
        var parseRoute = getVar('parseRoute');
        eval('var json =' + fetch(parseRoute));
        if (oldName && type == '修改' && oldName != objKey && json.codes[oldName]) {
            for (let a = 0; a < json.title.length; a++) {
                if (json.title[a] == oldName) {
                    json.title.splice(a, 1);
                }
            }
            delete json.codes[oldName];
        }
        if (typeof objKey != undefined && objKey != oldName && json.codes[objKey]) {
            if (getVar("isMerge") == "yes") {
                return Merge(objKey, '覆盖');
            } else {
                confirm({
                    title: '覆盖提醒',
                    content: objKey + '解析已存在\n如果要覆盖保存点确定后\n再次点击保存',
                    cancel: 'clearVar("isMerge")',
                    confirm: 'putVar("isMerge", "yes")'
                })
                return 'toast://确定后再次点击保存';
            }
        } else {
            objKey = type == '直链' ? arrList : objKey;
            return Merge(objKey);
        }
    } else {
        return "toast://无法识别这个内容呢"
    }
}

function sonSelect(input) {
    var parseRoute = getVar('parseRoute');
    eval('var json =' + fetch(parseRoute));
    var newInput = parseDomForHtml(input, 'span&&title').split('||');
    var type = newInput[0];
    var name = newInput[1];
    var num = newInput[2];
    var num2 = newInput[3];
    switch (type) {
        case "删除":
            return $("即将删除: " + name).confirm((k) => {
                var name = k[0];
                var num = k[1];
                var parseRoute = getVar('parseRoute');
                eval('var json =' + fetch(parseRoute));
                if (json.codes.hasOwnProperty(name)) {
                    delete json.codes[name];
                }
                json.title.splice(num, 1);
                writeFile(parseRoute, $.stringify(json));
                refreshPage(false);
                return "toast://已将〖" + name + "〗删除";
            }, [name, num]);
            break;
        case "隐藏":
            return $("hiker://empty#noLoading#").lazyRule((k) => {
                var name = k[0];
                var num = k[1];
                var parseRoute = getVar('parseRoute');
                eval('var json =' + fetch(parseRoute));
                if (json.codes.hasOwnProperty(name)) {
                    json.title.splice(num, 1);
                    writeFile(parseRoute, $.stringify(json));
                    refreshPage(false);
                    return "toast://已将〖" + name + "〗隐藏";
                } else {
                    return "toast://可能是个网址, 您可选择删除";
                }
            }, [name, num]);
            break;
        case "修改":
            //if (json.codes[name]) {
            var nCode = name;
            var nName = "这是名称";
            if (json.codes[name]) {
                nCode = json.codes[name].toString();
                nName = name;
            }
            return $("hiker://empty#noRecordHistory#").rule((k) => {
                var d = [];
                clearVar("isMerge");
                eval(fetch('hiker://files/cache/fileLinksᴰⁿ.txt'));
                require(fLinks._bjUrl);
                var name = k[0];
                var code = k[1];
                d.push({
                    title: '保 存',
                    //url: saveButton + "saveButton(getVar('input_edit'));back();",
                    col_type: "input",
                    desc: "建议按默认的代码格式修改哦",
                    extra: {
                        onChange: "putVar('input_edit', input)",
                        type: "textarea",
                        height: "-1",
                        titleVisible: false,
                        defaultValue: '修改★' + name + '★' + code,
                    }
                });
                d.push({
                    title: '‘‘’’<small><span style="color:#6EB897">格式为：操作类型★标题★function(){自定义内容}<br>请勿填入其他格式',
                    url: $('#noLoading#').lazyRule((data) => {
                        var saveButton = data[0],
                            oldName = data[1];
                        return saveButton(getVar('input_edit'), oldName);
                    }, [saveButton, name]),
                    desc: '‘‘’’<big><big><span style="color:#298A08">保 存',
                    col_type: 'text_center_1'
                });
                setResult(d);
            }, [nName, nCode]) //[name, json.codes[name].toString()])
            /*} else {
                return "toast://只有网址或者标题, 不支持修改"
            }*/
            break;
        case "置顶":
        case "置底":
            var item = json.title.splice(num, 1);
            json.title.splice(num2, 0, item[0]);
            writeFile(parseRoute, $.stringify(json));
            refreshPage(false);
            break;
        case "移动":
            return $('hiker://empty#noLoading#').lazyRule((k) => {
                putVar('bianji', '移动#' + k);
                refreshPage(false);
                return input;
            }, num);
            break;
        case "分享":
        case "云分享":
            if (json.codes[name]) {
                var parseText = typeof json.codes[name] == 'function' ? $.stringify(json.codes[name]) : json.codes[name];
                parseText = 'MyParseS★' + name + '★' + base64Encode(parseText);
            } else {
                var parseText = '直链★' + json.title[num];
            }
            if (type == '云分享' && parseText.substr(0, 8) == 'MyParseS') {
                parseText = sharePaste(parseText);
                return parseText.substr(0, 6) != 'error:' ? 'copy://' + parseText + '\n★★★\n' + 'MyParseS：' + name : 'toast://分享失败!!云剪贴板可能挂了';
            } else {
                return 'copy://' + parseText;
            }
        default:
            return 'toast://暂不支持';
            break;
    } //switch的
}