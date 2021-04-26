

$(document).ready(function(){
  $('.delete-article').on('click',function(e){
    $target = $(e.target);
    console.log($target.attr('data-id'));
  });
});//client side javascript file
//use jquery to make AJAX request