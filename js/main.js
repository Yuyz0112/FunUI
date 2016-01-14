//binding data
var controlArray = new Array();
var formatArray = new Array();
var cacheArray = new Array('', '', '', '', '', '');
var string;
$(function() {
	setElevator($('.container'));
	setStarRank('#fecf0e', 'star', '40px');
	makeTitleList($('.container'), $('#article h2'), 150);
	animateShareGroup();
	renderNav();
	$('.exclude').sortable({
				items: ':not(.disabled)'
			});
	$('.exclude li').on('dragend', function() {
			sortHTML();
		})
		//control mask
	$('#sort').click(function() {
		$('#mask').toggle();
		$('#tips').toggle();
	})
	$('#mask').click(function() {
		$('#mask').hide();
		$('#tips').hide();
	})
})

function sortHTML() {
	controlArray = [];
	formatArray = [];
	string = '';
	for (var i = 0; i < $('.control-item').length; i++) {
		controlArray.push($('.control-item').eq(i).attr('data-role'));
	}
	for (var i = 0; i < $('.format-item').length; i++) {
		for (var j = 0; j < controlArray.length; j++) {
			if ($('.format-item').eq(i).attr('data-role') === controlArray[j]) {
				formatArray.push(j);
			}
		}
	}
	for (var i = 0; i < formatArray.length; i++) {
		for (var j = 0; j < formatArray.length; j++) {
			if (formatArray[j] === i) {
				cacheArray[i] = j;
			}
		}
	}
	for (var i = 0; i < $('.format-item').length; i++) {
		string += $('.format-item')[cacheArray[i]].outerHTML;
	}
	$('.formatWrapper').html(string);
}

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
	$('#tips').css('top', topPosition).css('left', leftPostion);
	$('.elevator li:last').click(function(e) {
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
			} else {
				$('.star-rank i').eq(i).addClass('fa-' + pattern + '-o');
			}
		}
	})
}

function animateShareGroup() {
	$('.share-btn').click(function() {
		if ($('.share-btn').children().hasClass('fa-share-alt')) {
			$('.share-group').children('.wechat').animate({
				right: 100
			}, 100);
			$('.share-group').children('.weibo').animate({
				right: 71,
				bottom: 71
			}, 200)
			$('.share-group').children('.Qzone').animate({
				bottom: 100
			}, 300)
			$('.share-btn').children().removeClass('fa-share-alt').addClass('fa-close');
		} else {
			$('.share-group').children('.wechat').animate({
				right: 0
			}, 300);
			$('.share-group').children('.weibo').animate({
				right: 0,
				bottom: 0
			}, 200)
			$('.share-group').children('.Qzone').animate({
				bottom: 0
			}, 100)
			$('.share-btn').children().removeClass('fa-close').addClass('fa-share-alt');
		}
	})
}

function renderNav() {
	$('.first-row span').on('mouseover', function() {
		var leftPos = $(this).offset().left - $('.nav').offset().left;
		$('.second-row ul').css('margin-left', leftPos);
		$('.second-row').animate({
			top: 36
		}, 200);
	})
	$('.nav').on('mouseleave', function() {
		$('.second-row').animate({
			top: 9
		}, 200);
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
						position: 'fixed',
						top: 0,
						left: 0
					});
				} else {
					$('.nav').css('position', 'relative');
				}
			}, 1) //longer time gap will cause an obviously visual 'jump'.
	})
}

/*
 * HTML5 Sortable jQuery Plugin
 * http://farhadi.ir/projects/html5sortable
 * 
 * Copyright 2012, Ali Farhadi
 * Released under the MIT license.
 */
(function($) {
	var dragging, placeholders = $();
	$.fn.sortable = function(options) {
		var method = String(options);
		options = $.extend({
			connectWith: false
		}, options);
		return this.each(function() {
			if (/^enable|disable|destroy$/.test(method)) {
				var items = $(this).children($(this).data('items')).attr('draggable', method == 'enable');
				if (method == 'destroy') {
					items.add(this).removeData('connectWith items')
						.off('dragstart.h5s dragend.h5s selectstart.h5s dragover.h5s dragenter.h5s drop.h5s');
				}
				return;
			}
			var isHandle, index, items = $(this).children(options.items);
			var placeholder = $('<' + (/^ul|ol$/i.test(this.tagName) ? 'li' : 'div') + ' class="sortable-placeholder">');
			items.find(options.handle).mousedown(function() {
				isHandle = true;
			}).mouseup(function() {
				isHandle = false;
			});
			$(this).data('items', options.items)
			placeholders = placeholders.add(placeholder);
			if (options.connectWith) {
				$(options.connectWith).add(this).data('connectWith', options.connectWith);
			}
			items.attr('draggable', 'true').on('dragstart.h5s', function(e) {
				if (options.handle && !isHandle) {
					return false;
				}
				isHandle = false;
				var dt = e.originalEvent.dataTransfer;
				dt.effectAllowed = 'move';
				dt.setData('Text', 'dummy');
				index = (dragging = $(this)).addClass('sortable-dragging').index();
			}).on('dragend.h5s', function() {
				dragging.removeClass('sortable-dragging').show();
				placeholders.detach();
				if (index != dragging.index()) {
					items.parent().trigger('sortupdate', {
						item: dragging
					});
				}
				dragging = null;
			}).not('a[href], img').on('selectstart.h5s', function() {
				this.dragDrop && this.dragDrop();
				return false;
			}).end().add([this, placeholder]).on('dragover.h5s dragenter.h5s drop.h5s', function(e) {
				if (!items.is(dragging) && options.connectWith !== $(dragging).parent().data('connectWith')) {
					return true;
				}
				if (e.type == 'drop') {
					e.stopPropagation();
					placeholders.filter(':visible').after(dragging);
					return false;
				}
				e.preventDefault();
				e.originalEvent.dataTransfer.dropEffect = 'move';
				if (items.is(this)) {
					if (options.forcePlaceholderSize) {
						placeholder.height(dragging.outerHeight());
					}
					dragging.hide();
					$(this)[placeholder.index() < $(this).index() ? 'after' : 'before'](placeholder);
					placeholders.not(placeholder).detach();
				} else if (!placeholders.is(this) && !$(this).children(options.items).length) {
					placeholders.detach();
					$(this).append(placeholder);
				}
				return false;
			});
		});
	};
})(jQuery);