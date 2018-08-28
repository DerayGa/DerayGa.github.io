var items = [
  {
    id: 'blog',
    name: '日誌、部落格',
    link: 'blog.deray.org',
  },
  {
    id: 'henro',
    name: '單車-四國遍路 2017年',
    link: 'deray.org/henro',
    category: 'bike',
  },
  {
    id: 'nippon',
    name: '單車-日本 2015年',
    link: 'nippon.deray.org',
    category: 'bike',
  },
  {
    id: 'hokkaido',
    name: '自助-北海道 2014年',
    link: 'deray.org/hokkaido',
    category: 'backpack',
  },
  {
    id: 'tibet',
    name: '單車-西藏：青藏線 2013年',
    link: 'deray.org/tibet',
    category: 'bike',
  },
  {
    id: 'franceWithMisasa',
    name: '自助-法國 2012年',
    link: 'deray.org/franceWithMisasa',
    category: 'backpack',
  },
  {
    id: 'btp',
    name: '單車-北京到巴黎 2007年',
    link: 'btp.deray.org',
    category: 'bike',
  },
  {
    id: 'kyoto',
    name: '自助-京都、大阪 2006年',
    link: 'deray.org/kyoto',
    category: 'backpack',
  },
  {
    id: 'france',
    name: '單車-法國 2005年',
    link: 'france.deray.org',
    category: 'bike',
  },
  {
    id: 'taiwan',
    name: '單車-台灣 2003年',
    link: 'deray.org/taiwan',
    category: 'bike',
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
      title: item.name + '\n' + item.link
    });

    var caption = $(document.createElement('div'))
      .addClass('caption')
      .addClass(item.category);

    var label = $(document.createElement('span'))
      .addClass('label')
      .html(item.name);

    $(a).append($(image)).append($(caption)).append($(label));
    $(gridItem).append($(a));
    $('.grid').append($(gridItem));
  });

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
    flag = setTimeout(handleResize, 800)
  });

  if (window.location.href.toLowerCase().indexOf('github.io') > -1) {
    window.document.title += ' - GitHub 版本';
  }

  calculatorSize();
  createGridItems();
});
