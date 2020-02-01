$(function(){
    //返回本地数据
    console.log('我在看着你哦👁');
    console.log('按下q键则显示图片');
    load();
    function back(){
        var local = localStorage.getItem("list");
        if(local) {
            return JSON.parse(local);
        } else {
            return [];
        }
    }
    //将新输入的数据保存到本地
    function setdata(){
        var local = back();
        var data = $('header input').val();
        local.push({title: data, done: false})
        localStorage.setItem("list" ,JSON.stringify(local));
    }
    //将local的数据刷新页面
    function load(){
        var local = back();
        if(local !== []){
            $('ul,ol').empty();
            $.each(local, function(i, con){
                var li = $('<li></li>');
                li.attr('index', i);
                if(con.done) {
                    li.html('<input type="checkbox" class = "btn center" checked> <p class="center text">'+con.title+'</p> <a class = "center" href="javascript:;"></a>');
                    $('.content ol').prepend(li);
                } else {
                    li.html('<input type="checkbox" class = "btn center"> <p class="center text">'+con.title+'</p> <a class = "center" href="javascript:;"></a>');
                    $('.content ul').prepend(li);
                }
            })
        }
    }
    // 按下回车键，将新输入的数据存储在local并刷新到html页面
    $('header input').on('keydown', function(e){
            if(e.keyCode === 13) {
                if($(this).val()) {
                    setdata();
                    $(this).val("");
                    load();
                } else {
                    alert('请输入事项');
                }
            }
    })
    // 若复选框被改变，则重新刷新html页面
    $('.content ul, .content ol').on('click', '.btn', function(){
        var index = $(this).parent('li').attr('index');             
        var local = back();
        local[index].done = $(this).prop('checked'); 
        localStorage.setItem('list', JSON.stringify(local));
        load();
    })
     // 按下删除
    $('ul, ol').on('click', 'a', function(){
        var local = back();
        var index = $(this).parent('li').attr('index');
        local.splice(index, 1);
        localStorage.setItem('list', JSON.stringify(local));
        load();
    })
    //按下q键则显示图片
    console.log('q'.keyCode);
    
    $(document).keydown(function(e){
        if(e.keyCode === 81){
            $('.left, .right').slideToggle(1500);
        }
    })
})