if(me === undefined || me.username != "admin"){
    cancel("No authorization", 401);
}

// me 代表当前用户,cancael函数函数终止指定消息消息和 HTTP 状态码
// 这段代码的含义是允许验证后并且是 admin 的用户访问，当终止其它401状态的请求