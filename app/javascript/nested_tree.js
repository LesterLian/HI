// caret click event
var toggler = document.getElementsByClassName("caret");
var i;

for (i = 0; i < toggler.length; i++) {
  toggler[i].addEventListener("click", function() {
    this.parentElement.parentElement.querySelector(".nested")
      .classList.toggle("active");
    this.classList.toggle("caret-down");
  });
}

// search
function tree_search() {
    var input, filter, lis, item, i;
    input = document.getElementById("search_input");
    filter = input.value.toUpperCase();
    lis = document.querySelectorAll(".treeUL li");
    for (i = 0; i < lis.length; i++) {
        item = lis[i].getElementsByTagName('span')[0] || lis[i];
        if (item.textContent.toUpperCase().indexOf(filter) > -1) {
            item.style.display = "";
        } else {
            item.style.display = "none";
        }
    }
};
