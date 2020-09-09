$(function(){
    var form = layui.form
    var layer = layui.layer
    form.verify({
        nickname:function(value){
            if(value.length > 6){
                return '昵称长度必须是1~6个字符之间！！！'
            }
        }
    })
    initUserInfo();

    // 初始化用户的基本信息
    function initUserInfo(){
        $.ajax({
            url:'/my/userinfo',
            method:'GET',
            success:function(res){
                if(res.status !== 0){
                    return layer.msg('用户访问失败')
                }
                console.log(res.data);
                // 调用form.val()快速为表单赋值
                form.val('formUserInfo',res.data)
            }
                
        })
    }

    // 重置表单的数据
    $('#btnReset').on('click',function(e){
        e.preventDefault()
        
        initUserInfo()
    })
})