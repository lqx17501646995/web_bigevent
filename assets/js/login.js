$(function(){
  // 点击“去注册”的链接
  $('#link_reg').on('click',function(){
    $('.login-box').hide();
    $('.reg-box').show();
  })

  // 点击“去登录”的链接
  $('#link_login').on('click',function(){
    $('.login-box').show();
    $('.reg-box').hide();
  })

  // 先获取layUI的form对象
  var form = layui.form;
  var layer = layui.layer;
  // 通过form.verify自定义密码框的调用规则
  form.verify({
    pwd: [/^[\S]{6,12}$/,'密码必须6到12位，且不能出现空格'],
    // 校验两次密码的规则是否一样
    repwd:function(value){
      var pwd = $('.reg-box [name=password]').val()
      if(pwd !== value) {
        return '两次输入的密码不一致'
      }
    }
  })

  // 监听注册表单的提交事件
  $('#form_reg').on('submit',function(e){
    e.preventDefault();
    var data = {username:$('#form_reg [name=user]').val(),password:$('#form_reg [name=password]').val()}
    $.post('http://ajax.frontend.itheima.net/api/reguser',data,function(res){
      if(res.status !==0){
        return layer.msg(res.message)
      }
      layer.msg('注册成功！！！请登录🙂')
      $('#link_login').click()
    })
  })

  // 监听登录表单的提交事件
  $('#form_login').submit(function(e) {
    // 阻止默认提交行为
    e.preventDefault()
    $.ajax({
      url: '/api/login',
      method: 'POST',
      // 快速获取表单中的数据
      data: $(this).serialize(),
      success: function(res) {
        if (res.status !== 0) {
          return layer.msg('登录失败！')
        }
        layer.msg('登录成功！')
        // 将登录成功得到的 token 字符串，保存到 localStorage 中
        localStorage.setItem('token', res.token)
        // 跳转到后台主页
        location.href = '/index.html'
      }
    })
  })
  

})



