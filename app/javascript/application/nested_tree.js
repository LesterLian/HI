
document.addEventListener('DOMContentLoaded', () => {
  var toggler = document.getElementsByClassName("caret");
  var i;
  // caret click event
  for (i = 0; i < toggler.length; i++) {
    // toggle .active for li when span onclick
    toggler[i].addEventListener("click", function() {
      this.parentElement.parentElement.classList.toggle("active"); // toggle li
    });
    // toggle .active for li when li get match
    var li = toggler[i].parentElement.parentElement;
    li.addEventListener("match", function() {
      this.classList.add("active");
    });
  }
  // tree filter
  var input = document.getElementById("search_input");
  if (input) {
    input.addEventListener('keyup', tree_search);
  }
});


// tree filter
function tree_search(labels) {
  var filter, item, labels;
  filter = this.value.toUpperCase();
  labels = document.querySelectorAll('.treeUL label');

  for (i = 0; i < labels.length; i++) {
    item = labels[i];
    // collapse all span first
    item.parentElement.classList.remove('active')
    if (filter) {
      // if filter not empty
      if (item.textContent.toUpperCase().indexOf(filter) > -1) {
        // if matched, show and send event
        item.style.display = "";
        item.dispatchEvent(new Event('match', {bubbles: true}))
      } else {
        // if not matched, hide
        if (item.children.length == 0) {
          item.style.display = "none";
        }
      }
    } else {
      // if filter empty, show everything and send event from the selected one
      item.style.display = "";
      if (document.querySelector('input:checked')) {
        document.querySelector('input:checked').dispatchEvent(new Event('match', {bubbles: true}));
      }
    }
  }
}
