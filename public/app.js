// Grab the articles as a json
$.getJSON("/articles", function(data) {
  $("#articles").empty();

  // For each one
  let newUl = $("<ul>").addClass("list-group");

  for (var i = 0; i < data.length; i++) {
    // Display the apropos information on the page
    let newLi = $("<li>")
      .addClass("list-group-item")
      .attr("data-id", data[i]._id)
      .html(data[i].title + "</br>" + data[i].link);
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
    let newUl = $("<ul>").addClass("list-group");

    for (var i = 0; i < data.length; i++) {
      // Display the apropos information on the page
      let newLi = $("<li>")
        .addClass("list-group-item")
        .attr("data-id", data[i]._id)
        .html(data[i].title + "</br>" + data[i].link);
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
    url: "/delArticles"
  })
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
  }).then(()=>{
    $("#articles").empty();
    // Grab the articles as a json
    $.getJSON("/savedArticles", function(data) {
      // For each one
      let newUl = $("<ul>").addClass("list-group");
  
      for (var i = 0; i < data.length; i++) {
        // Display the apropos information on the page
        let newLi = $("<li>")
          .addClass("list-group-item")
          .attr("data-id", data[i]._id)
          .html(data[i].title + "</br>" + data[i].link);
        let newButton = $("<button>")
          .addClass("deleteArticle btn btn-outline-success float-right")
          .text("X")
          .attr("data-id", data[i]._id);
        newLi.append(newButton);
        newUl.append(newLi);
      }
      $("#articles").append(newUl);
    });

  })
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
      let newUl = $("<ul>").addClass("list-group");

      for (var i = 0; i < data.length; i++) {
        // Display the apropos information on the page
        let newLi = $("<li>")
          .addClass("list-group-item")
          .attr("data-id", data[i]._id)
          .html(data[i].title + "</br>" + data[i].link);
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
