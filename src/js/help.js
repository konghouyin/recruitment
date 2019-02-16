var html = document.getElementsByTagName('html')[0];
html.style.height = document.body.clientHeight + "px";

var button = document.getElementsByClassName("card")[0];
var list = document.getElementsByClassName("list")[0];

list.addEventListener("webkitAnimationEnd", function () {
    list.classList.remove("updown");
});
document.addEventListener("touchmove", function (e) {
    e.preventDefault();
}, false);//禁止页面滑动

var flag = 0;
var page = -1;
var go = 0;
var type = 0;
function topMove(j) {
    if (page == j || go==1) {
        return;
    }
    var m = j
    if (type == 1) {
        var m = 3+j;
    }
    go = 1;
    setTimeout(function () { go = 0 },1500)
    page = j;
    for (i = 0; i < 3; i++) {
        button.children[i].style.backgroundColor = "#fff";
    }
    button.children[j].style.backgroundColor = "#ddd";

    
    list.style.display = "block";
    if (flag == 0) {
        for (i = 0; i < 6; i++) {
            list.children[i].style.display = "none";
        }
        list.children[j].style.display = "block";
        flag = 1;
    } else {
        list.classList.add("updown");
        setTimeout(function () {
            for (i = 0; i < 6; i++) {
                list.children[i].style.display = "none";
            }
            list.children[m].style.display = "block";
        }, 750)
    }

    var wrap = document.getElementsByClassName("wrap")[0];
    var pic = document.getElementsByClassName("pic")[0];
    var help = document.getElementsByClassName("help")[0];
    
    wrap.style.height = "7rem";
    button.style.bottom = "-2.5rem";
    pic.setAttribute('style', 'margin-top:-1.4rem;margin-left:5.5rem;width:6.5rem;height:6rem');
    help.setAttribute('style', 'font-size:1rem;padding-left:1.2rem');
}


button.children[0].addEventListener('click', function () { topMove(0); });
button.children[1].addEventListener('click', function () { topMove(1); });
button.children[2].addEventListener('click', function () { topMove(2); });


var a = document.getElementsByTagName('a');
function row() {
    go = 1;
    setTimeout(function () { go = 0 }, 1500);
    type = 1;

    var wrap = document.getElementsByClassName("wrap")[0];
    var card = document.getElementsByClassName('card')[0];
    wrap.style.backgroundImage = "url(./pic/helptop2.png)";
    list.classList.add("updown");
    for (var i = 0; i < 3; i++) {
        card.children[i].style.backgroundColor = "#fff";
    }
    card.children[0].style.backgroundColor = "#ccc";

    setTimeout(function () {
        for (var i = 0; i < 6; i++) {
            list.children[i].style.display = "none";
        }
        list.children[3].style.display = "block";
        list.style.backgroundColor = "#76dd6e";
    }, 750);

    page = 0;
    card.children[0].classList.add('turn');
    card.children[1].classList.add('turn');
    card.children[2].classList.add('turn');
    card.children[0].children[0].classList.add('pic2');
    card.children[1].children[0].classList.add('pic2');
    card.children[2].children[0].classList.add('pic2');
    card.children[0].children[1].classList.add('none');
    card.children[1].children[1].classList.add('none');
    card.children[2].children[1].classList.add('none');
    card.children[0].children[2].classList.add('show');
    card.children[1].children[2].classList.add('show');
    card.children[2].children[2].classList.add('show');
}

function rerow() {
    type = 0;
    go = 1;
    setTimeout(function () { go = 0 }, 1500)

    var wrap = document.getElementsByClassName("wrap")[0];
    var card = document.getElementsByClassName('card')[0];
    wrap.style.backgroundImage = "url(./pic/helptop.png)";
    list.classList.add("updown");
    for (var i = 0; i < 3; i++) {
        card.children[i].style.backgroundColor = "#fff";
    }
    card.children[0].style.backgroundColor = "#ccc";

    setTimeout(function () {
        for (var i = 0; i < 6; i++) {
            list.children[i].style.display = "none";
        }
        list.children[0].style.display = "block";
        list.style.backgroundColor = "#56a8e9";
    }, 750);

    page = 0;
    card.children[0].classList.remove('turn');
    card.children[1].classList.remove('turn');
    card.children[2].classList.remove('turn');
    card.children[0].children[0].classList.remove('pic2');
    card.children[1].children[0].classList.remove('pic2');
    card.children[2].children[0].classList.remove('pic2');
    card.children[0].children[1].classList.remove('none');
    card.children[1].children[1].classList.remove('none');
    card.children[2].children[1].classList.remove('none');
    card.children[0].children[2].classList.remove('show');
    card.children[1].children[2].classList.remove('show');
    card.children[2].children[2].classList.remove('show');
}

a[0].addEventListener('click', row);
a[1].addEventListener('click', row);
a[2].addEventListener('click', row);
a[3].addEventListener('click', rerow);
a[5].addEventListener('click', rerow);
a[6].addEventListener('click', rerow);