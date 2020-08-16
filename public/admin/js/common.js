//将serializeArray得到的数组形式转化为我们想要的形式{email: "add@qq.com", password: "1"}
function serializeToJson(form){
    //serializeArray 是获取表单中用户输入的所有值
    //他的返回值是一个数组，数组里包含对象
    //有几个输入就有几个对象，对象里以键值对的形式存储{name：'email'，value：'add@qq.com''}
    var result ={};
    var f = form.serializeArray();
    f.forEach(function(item){
        result[item.name] = item.value
    });
    return result;
}