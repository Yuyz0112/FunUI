$(function() {
	setElevator($('.container'));
	setStarRank('#fecf0e', 'star', '40px');
	makeTitleList($('.container'), $('#article h2'), 150);
	animateShareGroup();
	renderNav();
})

function toTop(e) {
	e.preventDefault();
	$('html, body').animate({
		scrollTop: 0
	}, 800);
}

function setElevator(container) {
	var windowHeight = $(window).height();
	var elevatorHeight = $('.elevator').height();
	var elevatorWidth = $('.elevator').width();
	var topPosition = (windowHeight - elevatorHeight) / 2;
	var leftPostion = (container.offset().left - elevatorWidth);
	$('.elevator').css('top', topPosition).css('left', leftPostion);
	$('.elevator li:last').css('border-bottom', 'none').click(function(e) {
		toTop(e);
	})
}

function makeTitleList(container, title, width) {
	$('.title-list').css({
		'width': width,
		'left': container.offset().left + container.width() - width
	})
	var strDOM = '';
	var positionArr = new Array;
	for (var i = 0; i < title.length; i++) {
		strDOM += '<li>' + title.eq(i).text() + '</li>';
		positionArr.push(title.eq(i).offset().top);
	}
	strDOM += '<li><i class="fa fa-chevron-up"></i>&nbsp;回到顶部</li>';
	$('.title-list').html(strDOM);
	$('.title-list li').click(function(e) {
		if ($(this).index() != $('.title-list li').length - 1) {
			e.preventDefault();
			$('html, body').animate({
				scrollTop: positionArr[$(this).index()]
			}, 200);
		};
	})
	$('.title-list li:last').click(function(e) {
		toTop(e);
	})
	var Timer = null;
	$(window).on('scroll', function() {
		if (Timer) {
			clearTimeout(Timer)
		}
		Timer = setTimeout(function() {
			$('.title-list li').removeClass('cur');
			for (var i = 0; i < title.length; i++) {
				if ($(window).scrollTop() >= positionArr[i - 1] && $(window).scrollTop() < positionArr[i]) {
					$('.title-list li').eq(i - 1).addClass('cur');
				}
				if ($(window).scrollTop() < positionArr[0]) {};
				if ($(window).scrollTop() > positionArr[title.length - 1]) {
					$('.title-list li').eq(title.length - 1).addClass('cur');
				}
			}
		}, 30)
	})
}

function setStarRank(color, pattern, size) {
	var num = $('.star-rank i').length;
	$('.star-rank').css({
		color: color,
		fontSize: size
	})
	$('.star-rank i').addClass('fa-' + pattern + '-o').click(function() {
		$('.star-rank i').removeClass('fa-' + pattern + '-o');
		for (var i = 0; i < num; i++) {
			if (i < $(this).index() + 1) {
				$('.star-rank i').eq(i).addClass('fa-' + pattern);
			}else{
				$('.star-rank i').eq(i).addClass('fa-' + pattern + '-o');
			}
		}
	})
}

function animateShareGroup(){
	$('.share-btn').click(function(){
		if ($('.share-btn').children().hasClass('fa-share-alt')) {
			$('.share-group').children('.wechat').animate({
				right:100
			},100);
			$('.share-group').children('.weibo').animate({
				right:71,
				bottom:71
			},200)
			$('.share-group').children('.Qzone').animate({
				bottom:100
			},300)
			$('.share-btn').children().removeClass('fa-share-alt').addClass('fa-close');
		}else{
			$('.share-group').children('.wechat').animate({
				right:0
			},300);
			$('.share-group').children('.weibo').animate({
				right:0,
				bottom:0
			},200)
			$('.share-group').children('.Qzone').animate({
				bottom:0
			},100)
			$('.share-btn').children().removeClass('fa-close').addClass('fa-share-alt');
		}
	})
}

function renderNav(){
	$('.first-row span').on('mouseover',function(){
		var leftPos = $(this).offset().left - $('.nav').offset().left;
		$('.second-row ul').css('margin-left',leftPos);
		$('.second-row').animate({
			top: 36
		},200);
	})
	$('.nav').on('mouseleave',function(){
		$('.second-row').animate({
			top: 9
		},200);
	})
	var navTimer = null;
	var navPos = $('.nav').offset().top;
	$(window).on('scroll', function() {
		if (navTimer) {
			clearTimeout(navTimer)
		}
		navTimer = setTimeout(function() {
			if ($(window).scrollTop() >= navPos) {
				$('.nav').css({
					position:'fixed',
					top:0,
					left:0
				});
			}else{
				$('.nav').css('position','relative');
			}
		}, 1)//longer time gap will cause an obviously visual 'jump'.
	})
}