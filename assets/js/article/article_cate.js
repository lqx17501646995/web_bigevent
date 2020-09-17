$(function(){
    var layer = layui.layer
    var form = layui.form
    initArtCateList()
    // 获取文章分类列表
    function initArtCateList(){
        $.ajax({
            method:'GET',
            url:'/my/article/cates',
            success:function(res){
                if(res.status !== 0){
                    return layer.msg('获取文章分类列表失败！！！')
                }
                // console.log(res);
                var htmlStr = template('catelist',res)
                $('.layui-table tbody').html(htmlStr)
            }
        })  
    }

    var indexAdd = null
    $('#btnAddCate').on('click',function(){
        indexAdd = layer.open({
            type:1,
            area:['500px','250px'],
            title: '添加文章分类',
            content: $('#dialog-add').html()
        })
    })

    // 通过代理的形式为form-add表单事件绑定提交事件
    $('body').on('submit','#form-add',function(e){
        e.preventDefault()
        $.ajax({
            method:'POST',
            url:'/my/article/addcates',
            data:$(this).serialize(),
            success:function(res){
                if(res.status !== 0){
                    return layer.msg('新增文章分类失败！！！')
                }
                initArtCateList()
                layer.msg('新增文章分类成功！！！')
                layer.close(indexAdd)
            }
        })
    })

    // 通过代理的形式给btn-edit事件绑定点击事件
    var indexEdit = null
    $('body').on('click','#btn-edit',function(){
        // e.preventDefault()
        indexEdit = layer.open({
            type:1,
            area:['500px','250px'],
            title: '添加文章分类',
            content: $('#dialog-edit').html()
        })
        var id = $(this).attr('data-id')
        $.ajax({
            method:'GET',
            url:'/my/article/cates/'+id,
            success:function(res){
                form.val('form-edit', res.data);

            }
        })
    })

    $('body').on('submit','#form-edit',function(e){
        e.preventDefault()

        $.ajax({
            method:'POST',
            url:'/my/article/updatecate',
            data:$(this).serialize(),
            success:function(res){
                if(res.status !== 0){
                    return layer.msg('文章类别更新失败！！！')
                }
                layer.msg('文章类别更新成功')
                layer.close(indexEdit)
                initArtCateList()
            }
        })

    })

    // 通过代理的形式给删除文章分类列表事件绑定点击事件
    $('body').on('click','#btn-del',function(){
        var id = $(this).attr('data-id')
        layer.confirm('亲，是否确认删除?', {icon: 3, title:'提示'}, function(index){
            $.ajax({
                method:'GET',
                url:'/my/article/deletecate/'+id,
                success:function(res){
                    if(res.status !== 0){
                        return layer.msg('删除失败！！！')
                    }
                    layer.msg('删除成功')
                    layer.close(index);
                    initArtCateList()  
                }
            })
            
            
          });

    })
})