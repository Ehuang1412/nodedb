//client side javascript file
//alert('Testing main.js')
/*
To make a delete request, you cannot just use a link or submitting a form. You have to use GET or POST. Therefore use AJAX.

Use jquery to make a delete request with AJAX to the route.
*/
 

$(document).ready(function(){
  $('.delete-article').on('click',function(e){
    $target = $(e.target);
    console.log($target.attr('data-id'));
  });
});
//use jquery to make AJAX request
