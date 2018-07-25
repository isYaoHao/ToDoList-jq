$(function () {
    //加载时动态创建

    var arrlist = JSON.parse(getCookieByName("dolist") || "[]");

    if (arrlist[arrlist.length - 1]) {

        n = arrlist[arrlist.length - 1].datainfo + 1;
    } else {
        n = 0;
    }

    $.map(arrlist, function (ele, index) {




        if (ele.status == 0) {

            var str = `<li data-info=${ele.datainfo}><input type='checkbox' >`;

            str+=`<p>${ele.word}</p>`
            str += "<img src='img/delete.png'></li>";


            $(".doinglist").append(str)

        } else {

            var str = `<li data-info=${ele.datainfo}><input type='checkbox' checked>`;

            str+=`<p>${ele.word}</p>`
            str += "<img src='img/delete.png'></li>";

            $(".douplist").append(str)


        }


    })

    createLi();


    //enter事件
    $("#word").on("keydown", function (evt) {

        if (evt.keyCode == 13) {

            arrlist = JSON.parse(getCookieByName("dolist") || "[]");

            if (arrlist[arrlist.length - 1]) {

                n = arrlist[arrlist.length - 1].datainfo + 1;
            } else {
                var n = 0;
            }

            //读取cookie;


            //动态创建;

            var str = `<li data-info=${n}><input type='checkbox'>`;


            str+=`<p>${$("#word").val()}</p>`

            str += "<img src='img/delete.png'></li>";

            $.cookie()

            $(".doinglist").append(str)


            //保存cookie
            var obj = {"datainfo": n, "word": $("#word").val(), "status": 0};

            arrlist.push(obj);

            setCookie("dolist", JSON.stringify(arrlist), 8);

            $("#word").val("")



        }



        createLi()

    })


    function createLi() {

        //更新小图标数据


        $(".doinglogo").text($(".doinglist li").length);
        $(".douplogo").text($(".douplist li").length);







        //点击修改事件

        $("p").on("dblclick",function () {


/*
            $(this).append(`<input value=${$(this).text()} class="enterword">` )
*/
            $(this).html(`<input value=${$(this).text()} class="enterword">`);

            $(".enterword").on("change", function () {

                arrlist = JSON.parse(getCookieByName("dolist") || "[]");



                console.log($(this).parents("li").data("info"));



                for (var i = 0; i < arrlist.length; i++) {

                    if (arrlist[i].datainfo == $(this).parents("li").data("info")) {

                        var num;
                        if(arrlist.length==0){
                            num=0;

                        } else {
                            num=arrlist[i].status;

                        }



                        var obj = {"datainfo": arrlist[i].datainfo, "word": $(this).val(), "status":num}
                        arrlist.splice(i, 1, obj);

                        setCookie("dolist", JSON.stringify(arrlist), 8);
                        break;

                    }





                }

                $(this).parents("p").text($(this).val());
                $(this).remove();




                //

            })





        })




        //点击到下一列

        $("input:checkbox").on("click", function () {

            arrlist = JSON.parse(getCookieByName("dolist") || "[]");


            console.log($(this).parents("li").data("info"));

            $(".douplist").append($(this).parents("li"));


            for (var i = 0; i < arrlist.length; i++) {

                if (arrlist[i].datainfo == $(this).parents("li").data("info")) {




                    var obj = {"datainfo": arrlist[i].datainfo, "word": arrlist[i].word, "status": 1}
                    arrlist.splice(i, 1, obj);

                    setCookie("dolist", JSON.stringify(arrlist), 8);
                    break;

                }

            }

            $(".doinglogo").text($(".doinglist li").length);
            $(".douplogo").text($(".douplist li").length);



        })

        //删除

        $("img").on("click", function () {

            arrlist = JSON.parse(getCookieByName("dolist") || "[]");
            $(this).parents("li").remove();

            for (var i = 0; i < arrlist.length; i++) {

                if (arrlist[i].datainfo == $(this).parents("li").data("info")) {


                    arrlist.splice(i, 1);

                    setCookie("dolist", JSON.stringify(arrlist), 8);
                    break;

                }

            }

            $(".doinglogo").text($(".doinglist li").length);
            $(".douplogo").text($(".douplist li").length);




        })
    }


    //setCookie
    function setCookie(name, value, day, path, domain, secure) {
        var strCookie = ''
        if (name) {
            strCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value) + ";"
        }
        if (day) {
            var date = new Date()
            date.setDate(date.getDate() + Number(day))
            strCookie += "expires+" + date.toUTCString() + ";"
        }
        if (path) {
            strCookie += "path=" + path + ";"
        }
        if (domain) {
            strCookie += "domain=" + domain + ";"
        }
        if (secure) {
            strCookie += "secure"
        }
        document.cookie = strCookie
    }

//getCookie
    function getCookie() {
        var str = decodeURIComponent(document.cookie)
        var obj = {}
        var tmparr = str.split(";")
        for (var i = 0; i < tmparr.length; i++) {
            var tmp = tmparr[i].split("=");
            obj[tmp[0].trim()] = tmp[1]
        }
        return obj
    }

//getCookieByname
    function getCookieByName(name) {
        var obj = getCookie()
        return obj[name]
    }


})