var items = [
  {
    id: 'blog',
    name: '日誌、部落格',
    link: 'blog.deray.org',
  },
  {
    id: 'henro',
    name: '單車-四國遍路 (2017年)',
    link: 'deray.org/henro',
  },
  {
    id: 'nippon',
    name: '單車-日本 (2015年)',
    link: 'nippon.deray.org',
  },
  {
    id: 'hokkaido',
    name: '機車-北海道 (2014年)',
    link: 'deray.org/hokkaido',
  },
  {
    id: 'tibet',
    name: '單車-西藏：青藏線 (2013年)',
    link: 'deray.org/tibet',
  },
  {
    id: 'franceWithMisasa',
    name: '背包-法國 (2012年)',
    link: 'deray.org/franceWithMisasa',
  },
  {
    id: 'btp',
    name: '單車-北京到巴黎 (2007年)',
    link: 'btp.deray.org',
  },
  {
    id: 'kyoto',
    name: '背包-京都、大阪 (2006年)',
    link: 'deray.org/kyoto',
  },
  {
    id: 'france',
    name: '單車-法國 (2005年)',
    link: 'france.deray.org',
  },
  {
    id: 'taiwan',
    name: '單車-台灣 (2003年)',
    link: 'deray.org/taiwan',
  }
];

var baseHeight = 250;
var baseWidth = 341;
var gutter = 5;
var windowWidth;
var rate;
var width;
var extWidth;
var height;
var flag = null;

function handleResize() {
  //windowWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  //$('.grid').css('margin-left', (windowWidth % width) / 2);
}

function calculatorSize() {
  windowWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  rate = Math.round(windowWidth / baseWidth);
  width = Math.floor(windowWidth / rate) - gutter;
  extWidth = Math.floor(width / 3);
  height = Math.floor(baseHeight * (width / baseWidth));
}

function createGridItems() {
  $.each(items, function(index, item) {
    var a = $(document.createElement('a')).attr({
      href: '//' + item.link,
    });

    var gridItem = $(document.createElement('div'))
      .addClass('grid-item').height(height).width(width);

    var image = $(document.createElement('img')).attr({
      src: 'image/' + item.id + '.jpg',
      name: '#' + item.id,
      title: item.name,
      height: height + 'px',
      width: width + 'px',
    });

    var context = $(document.createElement('div')).attr({
      id: item.id
    }).html(item.name + '<br/><a href="' + a.attr('href') + '">' + item.link + '</a>');

    $(a).append($(image)).append($(context));
    $(gridItem).append($(a));
    $('.grid').append($(gridItem));

    $(image).capty({
      animation: 'fixed',
      height: 60,
      opacity: 0.75,
    });
  });
}

function initPage() {

}

$(document).ready(function() {
  if (window.self !== window.top) {
    window.top.location = window.location.href;
    return;
  }
  calculatorSize();

  $(window).resize(function() {
    clearTimeout(flag);
    flag = setTimeout(handleResize, 800)
  });

  if (window.location.href.toLowerCase().indexOf('github.io') > -1) {
    window.document.title += ' - GitHub 版本';
  }

  initPage();
  createGridItems();

  $('.grid').masonry({
    itemSelector: '.grid-item',
    columnWidth: width,
    gutter: gutter
  });
});
