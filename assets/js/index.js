$(function(){
    getUserInfo()

    // 点击按钮，实现退出功能
    $('#btnLogout').on('click',function(){
        layer.confirm('是否确认退出?', {icon: 3, title:'提示'}, function(index){
            //do something
            // console.log('ok');
            // 1 清楚缓存
            localStorage.removeItem('token')

            // 2 跳转到登录页面
            layer.close(index);
            location.href = '/login.html'
          });
    })
})

function getUserInfo (){
    $.ajax({
        method:'GET',
        url:'/my/userinfo',
        // header:localStorage.getItem('token')||'',
        success:function(res){
            if(res.status !== 0){
                return layui.layer.msg('用户信息获取失败！！！')
            }
                
            // console.log(res);
            // 调用renderAvatar渲染用户头像
            renderAvater(res.data)
        },
        // 不论成功还是失败都会调用该函数
        // complete:function(res){
        //     // console.log('执行了complete回调函数');
        //     // console.log(res);
        //     if(res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！'){
        //         localStorage.removeItem('token')
        //         location.href = '/login.html'
        //     }
        // }
    })
}

function renderAvater(user){
    name = user.nickname || user.username
//    1 渲染文本头像 
    $('#welcome').html('欢迎&nbsp;&nbsp;'+name)
    // 2 渲染用户的头像
    if(user.user_pic !==null){
        $('.layui-nav-img').attr('src',user.user_pic).show()
        $('.text-avater').hide();
    }else{
        $('.layui-nav-img').hide();
        var first = name[0].toUpperCase()
        $('.text-avater').html(first).show()
    }
}