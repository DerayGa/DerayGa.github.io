var items = [
  {
    id: 'blog',
    name: '日誌、部落格',
    link: 'blog.deray.org',
  },
  {
    id: 'henro',
    name: '四國遍路',
    link: 'deray.org/henro',
    year: '2017年',
    category: '單車',
  },
  {
    id: 'nippon',
    name: '日本',
    link: 'nippon.deray.org',
    year: '2015年',
    category: '單車',
  },
  {
    id: 'hokkaido',
    name: '北海道',
    link: 'deray.org/hokkaido',
    year: '2014年',
    category: '旅行',
  },
  {
    id: 'tibet',
    name: '西藏：青藏線',
    link: 'deray.org/tibet',
    year: '2013年',
    category: '單車',
  },
  {
    id: 'franceWithMisasa',
    name: '法國',
    link: 'deray.org/franceWithMisasa',
    year: '2012年',
    category: '旅行',
  },
  {
    id: 'btp',
    name: '北京到巴黎',
    link: 'btp.deray.org',
    year: '2007年',
    category: '單車',
  },
  {
    id: 'kyoto',
    name: '京都、大阪',
    link: 'deray.org/kyoto',
    year: '2006年',
    category: '旅行',
  },
  {
    id: 'france',
    name: '法國',
    link: 'france.deray.org',
    year: '2005年',
    category: '單車',
  },
  {
    id: 'taiwan',
    name: '台灣',
    link: 'deray.org/taiwan',
    year: '2003年',
    category: '單車',
  }
];

var baseHeight = 250;
var baseWidth = 341;
var gutter = 5;
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

function createGridItems() {
  $.each(items, function(index, item) {
    var a = $(document.createElement('a')).attr({
      href: '//' + item.link,
    });

    var gridItem = $(document.createElement('div'))
      .addClass('grid-item').height(gridItemHeight).width(gridItemWidth);

    var image = $(document.createElement('img')).attr({
      src: 'image/' + item.id + '.jpg',
      name: '#' + item.id,
      title: item.name + ' ' + item.link
    });

    var caption = $(document.createElement('div'))
      .addClass('caption');

    var label = $(document.createElement('span'))
      .addClass('label')
      .html(item.name);

    $(a).append($(image)).append($(caption)).append($(label));

    if (item.category) {
      switch (item.category) {
        case '單車':
          caption.addClass('bike');
          break;

        case '旅行':
          caption.addClass('backpack');
          break;
      }
      var category = $(document.createElement('span'))
        .addClass('category')
        .html(`#${item.category}`);
      $(a).append($(category))
    }

    if (item.year) {
      var year = $(document.createElement('span'))
        .addClass('year')
        .html(item.year);
      $(a).append($(year))
    }

    $(gridItem).append($(a));
    $('.grid').append($(gridItem));
  });

  $('.grid').masonry({
    itemSelector: '.grid-item',
    columnWidth: gridItemWidth,
    gutter: gridItemPerRow > 1 ? gutter : 0
  });
}

function activeGridItems() {
  $('.grid > .grid-item').height(gridItemHeight).width(gridItemWidth);

  $('.grid').masonry({
    itemSelector: '.grid-item',
    columnWidth: gridItemWidth,
    gutter: gridItemPerRow > 1 ? gutter : 0
  });
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
  }

  calculatorSize();
  //createGridItems();
  activeGridItems();
});
