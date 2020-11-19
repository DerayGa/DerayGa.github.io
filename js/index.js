var baseHeight = 250;
var baseWidth = 342;
var gutter = 0;
var browserWidth;
var gridItemPerRow;
var gridItemWidth;
var gridItemHeight;
var flag = null;

function handleResize() {
  calculatorSize();

  $('.grid-item').animate({
    width: gridItemWidth,
    height: gridItemHeight
  }, 100, function() {
    $('.grid').masonry({
      columnWidth: gridItemWidth,
      gutter: gridItemPerRow > 1 ? gutter : 0
    });
  })
}

function calculatorSize() {
  var scrollWidth = window.innerWidth - document.documentElement.clientWidth;

  browserWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0) - scrollWidth;
  gridItemPerRow = Math.round(browserWidth / baseWidth);
  gridItemWidth = Math.floor(browserWidth / gridItemPerRow) - (gridItemPerRow > 1 ? gutter : 0);
  gridItemHeight = Math.floor(baseHeight * (gridItemWidth / baseWidth));
}

function activeGridItems() {
  $('.grid-item').height(gridItemHeight).width(gridItemWidth);

  $('.grid').masonry({
    itemSelector: '.grid-item',
    columnWidth: gridItemWidth,
    gutter: gridItemPerRow > 1 ? gutter : 0
  });

  if (window.innerWidth - document.documentElement.clientWidth > 0) {
    handleResize();
  }
}

function cycleImages() {
  $.each($('.cycler .active'), function(index, active) {
    var next = ($(active).next().length > 0) ? $(active).next() : $('img:first', $(active).parent());
    $(next).css('z-index', 2);
    $(active).fadeOut(1500, function() {
      $(active).css('z-index', 1).show().removeClass('active');
      $(next).css('z-index', 3).addClass('active');
    });
  });
}

function loadImage(image, amount, index = 2) {
  if (index <= amount) {
    var group = $(image).attr('alt');
    var divParent = $(image).parent();
    var newImage = $(document.createElement('img')).attr({
      src: 'image/' + group + index.toString(10) + '.jpg'
    });
    $(newImage).load(function() {
      loadImage(image, amount, index + 1);
    });
    $(divParent).append(newImage);
  }
}

$(document).ready(function() {
  if (window.self !== window.top) {
    window.top.location = window.location.href;
    return;
  }
  $(window).resize(function() {
    clearTimeout(flag);
    flag = setTimeout(handleResize, 300)
  });

  if (window.location.href.toLowerCase().indexOf('github.io') > -1) {
    window.document.title += ' - GitHub 版本';

    $.each($('div.grid-item a'), function(index, linkDom) {
      switch ($(linkDom).attr('href')) {
        case '//deray.org/taiwan':
          $(linkDom).attr('href', 'https://derayga.github.io/taiwan');
          break;
        case '//france.deray.org':
          $(linkDom).attr('href', 'https://derayga.github.io/france');
          break;
        case '//btp.deray.org':
          $(linkDom).attr('href', 'https://derayga.github.io/btp');
          break;
        case '//deray.org/tibet':
          $(linkDom).attr('href', 'https://derayga.github.io/tibet');
          break;
        case '//nippon.deray.org':
          $(linkDom).attr('href', 'https://derayga.github.io/nippon');
          break;
        case '//deray.org/henro':
          $(linkDom).attr('href', 'https://derayga.github.io/henro');
          break;
        case '//deray.org/thai':
          $(linkDom).attr('href', 'https://derayga.github.io/thai');
          break;
        default:
          $(linkDom).parent().remove();
          break;
      }
    });
  } else {
    $.each($('div.grid-item a'), function(index, linkDom) {
      switch ($(linkDom).attr('href')) {
        case '//deray.org/hokkaido':
        case '//deray.org/franceWithMisasa':
        case '//deray.org/kyoto':
          $(linkDom).parent().remove();
          break;
      }
    });
  }

  calculatorSize();
  activeGridItems();

  setInterval('cycleImages()', 5000);
});
