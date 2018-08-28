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

var externals = [/*
    {
      id: 'youtube',
      height: 81,
      name: 'YouTube',
      link: 'www.youtube.com/user/DerayGo/videos'
    },
    {
      id: 'gmail',
      height: 83,
      name: 'Gmail',
      link: 'deraygo@gmail.com?subject=Hi~Deray'
    },
    {
      id: 'github',
      height: 114,
      name: 'GitHub',
      link: 'github.com/derayGa'
    },
    {
      id: 'wikipedia',
      height: 103,
      name: '維基百科',
      link: 'zh.wikipedia.org/wiki/%E8%96%9B%E5%BE%B7%E7%91%9E'
    },
    {
      id: 'linkedin',
      height: 114,
      name: 'LinkedIn',
      link: 'tw.linkedin.com/in/derayga'
    },
    {
      id: 'cv',
      height: 114,
      name: 'CV',
      link: 'derayga.github.io/cv'
    }*/
];

var baseHeight = 250;
var baseWidth = 341;
var baseExtWidth = 113;
var windowWidth;
var images;
var rate;
var width;
var extWidth;
var height;
var flag = null;

function handleResize() {
  windowWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  $('.grid').css('margin-left', (windowWidth % width) / 2);
}

function createGridItems() {
  images = [];
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
    $('.grid').append($(gridItem).append($(a)));

    images.push(image);
  });
}

function createExtraItem() {
  var extItem = $(document.createElement('div'))
    .addClass('grid-item').height(height).width(width);

  $.each(externals, function(index, item) {
    var protocol = (item.id === 'gmail') ? 'mailto:' : '//';

    var a = $(document.createElement('a')).attr({
      href: protocol + item.link
    });

    var image = $(document.createElement('img')).attr({
      src: 'image/' + item.id + '.jpg',
      name: '#' + item.id,
      title: item.name,
      height: Math.floor(item.height * (extWidth / baseExtWidth)) + 'px',
      width: extWidth + 'px',
    });

    var context = $(document.createElement('div')).attr({
      id: item.id
    }).html(item.name);

    $(a).append($(image)).append($(context))
    $(extItem).append($(a));
    images.push(image);
  });

  $('.grid').append($(extItem));
}

$(document).ready(function() {
  if (window.self !== window.top) {
    window.top.location = window.location.href;
    return;
  }
  windowWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  rate = Math.round(windowWidth / baseWidth);
  width = Math.floor(windowWidth / rate);
  extWidth = Math.floor(width / 3);
  height = Math.floor(baseHeight * (width / baseWidth));

  handleResize();

  $(window).resize(function() {
    clearTimeout(flag);
    flag = setTimeout(handleResize, 800)
  });

  if (window.location.href.toLowerCase().indexOf('github.io') > -1) {
    window.document.title += ' - GitHub 版本';
  }

  createGridItems();
  createExtraItem();

  $('.grid').masonry({
    itemSelector: '.grid-item',
    columnWidth: width,
    gutter: 0
  });

  $.each(images, function(index, image) {
    var context = $(image).siblings();
    if (context) {
      var imageWidth = Number($(image).attr('width').replace('px', ''));
      $(image).capty({
        animation: (imageWidth <= extWidth) ? undefined : 'fixed',
        height: (imageWidth <= extWidth) ? 35 : 60,
        opacity: 0.75,
      });
    }
  });
});
