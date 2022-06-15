$(function() {

    let name;
    let loggedin = $(".loggedin").hide();
    let t = 500;

    function store() {
        name = $("input#username").val();
    }

    function init() {
        $("input[type='submit']").on("click", function() {
            store();
            $(".login-inner, .login-inner-avatar").animate({
                'opacity': '0'
            }, t);
            setTimeout(function() {
                $(".login-inner-check").css({
                    'opacity': '1',
                    'animation': 'spinner 4s 0s linear',
                    'transition': 'all ease 3s'
                });
            });
            setTimeout(function() {
                $(".login-inner-check-complete").find('i').animate({
                    'opacity': '1'
                }, 500);
            }, 4200);
            setTimeout(function() {
                $(".login").fadeOut(500, function() {
                    $(this).remove();
                });
            }, 5000);
            setTimeout(function() {
                loggedin.fadeIn(t, function() {
                    $(this).show();
                    $(this).find('h2').html("Welcome " + name);
                });
                setTimeout(() => { window.location.href = 'http://127.0.0.1:3040/' }, 2000);
            }, 5500);
            setTimeout(function() {
                $(".loggedin h2").animate({
                    'opacity': '1'
                }, t);
            }, 6000);
        });
    };
    init();
});