$(function() {

	//Chrome Smooth Scroll
	try {
		$.browserSelector();
		if($("html").hasClass("chrome")) {
			$.smoothScroll();
		}
	} catch(err) {

	};

	$("img, a").on("dragstart", function(event) { event.preventDefault(); });

    $(document).ready(function() {
        $(".select-sp").select2();
    });

    $('.hamburger').on('click',function(){
        $(this).toggleClass('is-active');
        $(".h-mn").toggleClass('is-active');
    });
    $(document).on("click",function(event){
        if( $(event.target).closest(".h-mn,.hamburger").length )return;
        $('.hamburger').removeClass('is-active');
        $(".h-mn").removeClass('is-active');
        event.stopPropagation();
    });

    $(document).ready(function() {
        $('#header-slider').lightSlider({
            adaptiveHeight:true,
            item:1,
            enableDrag: false,
            slideMargin:0,
            loop:true,
            controls: false
        });
    });

    $(".tab-container").each(function(){
        var $this = $(this);
        var activeTab = $this.find(".tab-title.active").attr("href");
        $(activeTab).slideDown();

        $this.find(".tab-title").on("click",function(){
            var id = $(this).attr("href");
            $this.find(".tab-content").slideUp();
            $(id).slideDown();
            $this.find(".tab-title").removeClass("active");
            $(this).addClass("active");
        });
    });

    $(document).ready(function() {
        var vrSlider = $('#vertical').lightSlider({
            gallery:true,
            item:1,
            vertical:true,
            verticalHeight:430,
            vThumbWidth:92,
            thumbItem:4,
            thumbMargin:4,
            slideMargin:0,
            controls: false,
        });

        $(".vr-a-prev").on("click",function(e){
            e.preventDefault();
            vrSlider.goToPrevSlide();
        });

        $(".vr-a-next").on("click",function(e){
            e.preventDefault();
            vrSlider.goToNextSlide();
        });
    });

    $('.fn-line-a1').on('click',function(){
        $(this).toggleClass('is-active');
        $(".fn-block1").toggleClass('is-active');
    });
    $(document).on("click",function(event){
        if( $(event.target).closest(".fn-block1,.fn-line-a1").length )return;
        $('.fn-line-a1').removeClass('is-active');
        $(".fn-block1").removeClass('is-active');
        event.stopPropagation();
    });

    $('.fn-line-a2').on('click',function(){
        $(this).toggleClass('is-active');
        $(".fn-block2").toggleClass('is-active');
    });
    $(document).on("click",function(event){
        if( $(event.target).closest(".fn-block2,.fn-line-a2").length )return;
        $('.fn-line-a2').removeClass('is-active');
        $(".fn-block2").removeClass('is-active');
        event.stopPropagation();
    });

    $('.fn-line-a3').on('click',function(){
        $(this).toggleClass('is-active');
        $(".fn-block3").toggleClass('is-active');
    });
    $(document).on("click",function(event){
        if( $(event.target).closest(".fn-block3,.fn-line-a3").length )return;
        $('.fn-line-a3').removeClass('is-active');
        $(".fn-block3").removeClass('is-active');
        event.stopPropagation();
    });

    var text;
    $(".a-tab").on("click",function(event){
        event.preventDefault();
        if($(this).hasClass('active')){
            $(this).find("span").text(text);
        }else{
            text = $(this).find("span").text();
            console.log(text);
            $(this).find("span").text("Свернуть расширенный поиск");
        }
        $(this).toggleClass("active");
        $(".form-none").toggleClass("active");
    });

});

//Форма отправки 2.0
$(function() {
    $("[name=send]").click(function () {
        $(":input.error").removeClass('error');
        $(".allert").remove();

        var error;
        var btn = $(this);
        var ref = btn.closest('form').find('[required]');
        var msg = btn.closest('form').find('input, textarea');
        var send_btn = btn.closest('form').find('[name=send]');
        var subject = btn.closest('form').find('[name=form_subject]');
        var form = btn.closest('form'), name = form.find('[name=name]').val();
        $(ref).each(function () {
            if ($(this).val() == '') {
                var errorfield = $(this);
                $(this).addClass('error').parent('.field').append('<div class="allert"><span>Заполните это поле</span><i class="fa fa-exclamation-triangle" aria-hidden="true"></i></div>');
                error = 1;
                $(":input.error:first").focus();
                return;
            } else {
                var pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;
                if ($(this).attr("type") == 'email') {
                    if (!pattern.test($(this).val())) {
                        $("[name=email]").val('');
                        $(this).addClass('error').parent('.field').append('<div class="allert"><span>Укажите коректный e-mail</span><i class="fa fa-exclamation-triangle" aria-hidden="true"></i></div>');
                        error = 1;
                        $(":input.error:first").focus();
                    }
                }
                var patterntel = /^()[0-9]{9,18}/i;
                if ($(this).attr("type") == 'tel') {
                    if (!patterntel.test($(this).val())) {
                        $("[name=phone]").val('');
                        $(this).addClass('error').parent('.field').append('<div class="allert"><span>Укажите коректный номер телефона</span><i class="fa fa-exclamation-triangle" aria-hidden="true"></i></div>');
                        error = 1;
                        $(":input.error:first").focus();
                    }
                }
            }
        });
        if (!(error == 1)) {
            $(send_btn).each(function () {
                $(this).attr('disabled', true);
            });



            $.ajax({
                type: 'POST',
                url: 'mail.php',
                data: msg,
                success: function (data) {
                    $.magnificPopup.close();
                    form[0].reset();
                    $(send_btn).each(function () {
                        $(this).attr('disabled', false);
                    });

                    if(subject == "Заказать звонок"){
                        $("a[href='#popupthx']").click();
                    }else{
                        $("a[href='#block-popup']").click();
                    }


                },
                error: function (xhr, str) {
                    alert('Возникла ошибка: ' + xhr.responseCode);
                }
            });
        }
        else{
            if(form.hasClass("form-shake")){
                form.parents(".form-block").addClass("shake");
                form.parents(".form-block").one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(e) {
                    $(this).removeClass("shake");
                });
            }
        }
        return false;
    });



});