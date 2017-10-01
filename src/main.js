var intro = document.getElementsByClassName('intro')[0];
['animationend', 'webkitAnimationEnd'].forEach(function (evt) {
  intro.addEventListener(evt, function () {
    intro.className = intro.className.replace('fadeIn', 'attention pulse');
  }, { once: true });
});

var email = document.getElementById('email')
email.href = ['mail', 'to', ':', 'felipe', '@', 'fvgs.ai'].join('')
