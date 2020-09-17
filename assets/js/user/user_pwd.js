$(function(){
    var form = layui.form
    var layer = layui.layer

    form.verify({
        pwd:[
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
          ],
        samePwd:function(value){
            if(value === $('[name=oldPwd]').val()){
                return '新密码不能与旧密码一致，请重新输入'
            }
        },
        rePwd:function(value){
            if(value !== $('[name=newPwd]').val()){
                return '请重新输入新密码'
            }
        }
    })

    // 监控修改密码表单的提交事件
    $('.layui-form').on('submit'    ,function(e){
        e.preventDefault()
        $.ajax({
            method:'POST',
            url:'/my/updatepwd',
            data:$(this).serialize(),
            success:function(res){
                if(res.status !== 0){
                    return layui.layer.msg('更新密码失败！！！')
                    console.log(res.status);
                }
                layui.layer.msg('更新密码成功😄！！！')
                // 重置表单 先把Jquery对象转换为js对象
                $('.layui-form')[0].reset();
            }
        })
    })
})