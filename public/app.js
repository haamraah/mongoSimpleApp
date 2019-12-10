// Grab the articles as a json
$.getJSON("/articles", function(data) {
  $("#articles").empty();

  // For each one
  let newUl = $("<ul>")
    .addClass("list-group w-100")
    .attr("id", "myUL");

  for (var i = 0; i < data.length; i++) {
    // Display the apropos information on the page
    let newLi = $("<li>")
      .addClass("list-group-item w-100")
      .attr("data-id", data[i]._id)
      .html(
        `${data[i].title} </br><a target="_blank" class = "btn btn-outline-success" href=${data[i].link} > Open Link </a>`
      );
    let newButton = $("<button>")
      .addClass("saveArticle btn btn-outline-success float-right")
      .text("save")
      .attr("data-id", data[i]._id);
    newLi.append(newButton);
    newUl.append(newLi);
  }
  $("#articles").append(newUl);
});

$("#savedArticles").click(() => {
  $("#articles").empty();
  // Grab the articles as a json
  $.getJSON("/savedArticles", function(data) {
    // For each one
    let newUl = $("<ul>")
      .addClass("list-group w-100")
      .attr("id", "myUL");

    for (var i = 0; i < data.length; i++) {
      // Display the apropos information on the page
      let newLi = $("<li>")
        .addClass("list-group-item w-100")
        .attr("data-id", data[i]._id)
        .html(
          `${data[i].title} </br><a target="_blank"class = "btn btn-outline-success" href=${data[i].link} > Open Link </a>`
        );
      let newButton = $("<button>")
        .addClass("deleteArticle btn btn-outline-success float-right")
        .text("X")
        .attr("data-id", data[i]._id);
      newLi.append(newButton);
      newUl.append(newLi);
    }
    $("#articles").append(newUl);
  });
});

$("#clear").click(() => {
  $.ajax({
    method: "GET",
    url: "/delArticles",
  });
  $("#articles").empty();
});
// // When you click the savenote button
$(document).on("click", ".saveArticle", function() {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");

  $.ajax({
    method: "GET",
    url: "/articles/" + thisId,
  })
    // With that done, add the note information to the page
    .then(function(data) {
      console.log(data, "data........................");
      $.ajax({
        method: "POST",
        url: "/saveArticle",
        data: {
          title: data.title,
          link: data.link,
        },
      });
    });
});

$(document).on("click", ".deleteArticle", function() {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");
  $.ajax({
    method: "GET",
    url: "/deleteArticle/" + thisId,
  }).then(() => {
    $("#articles").empty();
    // Grab the articles as a json
    $.getJSON("/savedArticles", function(data) {
      // For each one
      let newUl = $("<ul>")
        .addClass("list-group w-100")
        .attr("id", "myUL");

      for (var i = 0; i < data.length; i++) {
        // Display the apropos information on the page
        let newLi = $("<li>")
          .addClass("list-group-item w-100")
          .attr("data-id", data[i]._id)
          .html(
            `${data[i].title} </br><a target="_blank"class = "btn btn-outline-success" href=${data[i].link} > Open Link </a>`
          );
        let newButton = $("<button>")
          .addClass("deleteArticle btn btn-outline-success float-right")
          .text("X")
          .attr("data-id", data[i]._id);
        newLi.append(newButton);
        newUl.append(newLi);
      }
      $("#articles").append(newUl);
    });
  });
});

// // When you click the savenote button
$(document).on("click", "#reScrape", function() {
  // Grab the id associated with the article from the submit button

  $.ajax({
    method: "GET",
    url: "/scrape",
  }).then(() => {
    // Grab the articles as a json
    $.getJSON("/articles", function(data) {
      $("#articles").empty();

      // For each one
      let newUl = $("<ul>")
        .addClass("list-group w-100")
        .attr("id", "myUL");

      for (var i = 0; i < data.length; i++) {
        // Display the apropos information on the page
        let newLi = $("<li>")
          .addClass("list-group-item w-100")
          .attr("data-id", data[i]._id)
          .html(
            `${data[i].title} </br><a target="_blank"class = "btn btn-outline-success" href=${data[i].link} > Open Link </a>`
          );
        let newButton = $("<button>")
          .addClass("saveArticle btn btn-outline-success float-right")
          .text("save")
          .attr("data-id", data[i]._id);
        newLi.append(newButton);
        newUl.append(newLi);
      }
      $("#articles").append(newUl);
    });
  });
});

function myFunction() {
  // Declare variables
  var input, filter, ul, li, a, i, txtValue;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  ul = document.getElementById("myUL");
  li = ul.getElementsByTagName("li");

  // Loop through all list items, and hide those who don't match the search query
  for (i = 0; i < li.length; i++) {
    a = li[i];
    txtValue = a.textContent || a.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
}
