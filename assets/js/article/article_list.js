$(function(){
    var layer = layui.layer
    var form = layui.form
    var laypage = layui.laypage
    // 定义一个查询的参数对象，将来请求数据的时候，需要将请求参数对象提交到服务器
    
    // 定义美化时间的过滤器
    template.defaults.imports.dataFormat = function(data){
        const dt = new Data(data)

        var y = padZero(dt.getFullyYear())
        var m = padZero(dt.getMouth()+1)
        var d = padZero(dt.getDate())

        var hh = padZero(dt.getHours())
        var mm = padZero(dt.getMinutes())
        var ss = padZero(dt.getSeconds())

        return y + '-' + m + '' + d + '' + hh + ':' + 'mm' + ':' + 'ss'
    }

    // 定义补零的函数
    function padZero(n){
        return n > 9 ? n : '0' + n
    } 
    var q = {
        pagenum:1,//页码值
        pagesize:2,//每页显示几条数据
        cate_id:'',//文章分类的ID
        state:''//文章的发布状态
        
    }

    initTable()
    initCate()
    // 获取文章列表的数据
    function initTable(){
        $.ajax({
            method:'GET',
            url:'/my/article/list',
            data:q,
            success:function(res){
                if(res.status !== 0){
                    return layer.msg('获取文章列表失败！！！')
                }
               
                // 使用模板引擎渲染页面的数据
                var htmlStr = template('tpl-table',res) 
                $('tbody').html(htmlStr)
                renderPage(res.total)

            }
        })
    }

    // 初始化文章分类的方法
    function initCate(){
        $.ajax({
            method:'GET',
            url:'/my/article/cates',
            success:function(res){
                if(res.status !== 0){
                    return layer.msg('获取文章分类列表失败！！！')
                }
                // console.log(res);
                // 将服务器响应的数据用模板引擎进行渲染
                var htmlStr = template('tpl-cate',res)
                
                // console.log(htmlStr);
                $('[name=cate_id]').html(htmlStr)
                // 通知layui重新渲染表单
                form.render()

            }
        })
    }

    // 为筛选按钮绑定submit事件
    $('#form-search').on('submit',function(e){
        e.preventDefault()
        // 获取选中项的属性值
        var cate_id = $('[name=cate_id]').val()
        var state = $('[name=state]').val()
        // 把选中项的属性值给q赋值
        q.cate_id = cate_id
        q.state = state
        initTable()
    }) 

    // 定义渲染分页的方法
    function renderPage(total){
        laypage.render({
            elem: 'pageBox',
            count:total,
            limit:q.pagesize,
            curr:q.pagenum,
            layout:['count','limit','prev','page','next','skip'],
            limits:[2,3,5,10],
            // 分页发生切换的时候调用jump回调函数（1）点击页码时（2）调用renderPage方法时
            jump:function(obj,first){
                // 最新的页码值
                q.pagenum = obj.curr
                // 把每页最新的条目数赋值给q的pagesize属性
                q.pagesize = obj.limit
                // 首次不执行initTable（）  
                if(!first){
                    initTable()
                }
            }
          });
    }

    // 通过代理的形式为删除按钮绑定点击事件
    $('tbody').on('click','.btn-delete',function(){
        // 获取删除按钮的个数
        var len = $('.btn-delete').length
        var id = $(this).attr('data-id')
        layer.confirm('是否确认删除?', {icon: 3, title:'提示'}, function(index){
            
            $.ajax({
                method:'GET',
                url:'/my/article/delete/' + id,
                success:function(res){
                    if(res.status !== 0){
                        return layer.msg('文章删除失败!!!')
                    }
                    console.log(res);
                    layer.msg('文章删除成功')
                    // 当数据删除完之后需要判定当前页是否还有数据,若没有数据,则页码需减1
                    if(len === 1){
                        // 页码值最小是1
                        q.pagenum = q.pagenum===1?1:q.pagenum-1
                    }
                    initTable()
                     
                }
            })
            
            layer.close(index);
        })
    })

})