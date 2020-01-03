// Change links according to selected instance in nested tree of index view.

document.addEventListener('turbolinks:load', (e) => {
  var links = document.querySelectorAll('.mutable_link');
  if (links.length > 0) {
    document.querySelector('form').addEventListener('input', function(e) {
      links.forEach(function(link) {
        strs = link.href.split('/');
        // TODO better way to replace id in link
        link.idx ? null : link.idx = strs.indexOf('0');
        strs[link.idx] = e.srcElement.value;
        link.href = strs.join('/');
        // link.style.display = ''
        link.classList.remove('mutable_link');
      });
    });
  }

});
