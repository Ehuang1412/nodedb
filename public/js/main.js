//client side javascript file
//alert('Testing main.js')
/*
To make a delete request, you cannot just use a link or submitting a form. You have to use GET or POST. Therefore use AJAX.

Use jquery to make a delete request with AJAX to the route.
*/
 
$(document).ready(function(){
  $('.delete-article').on('click',function(e){
    $target = $(e.target);
    //console.log($target.attr('data-id'));
    const id = $target.attr('data-id');
    $.ajax({
      type: 'DELETE',
      url: '/article/'+id,
      success: function(response){
        alert('Deleting Article');
        window.location.href='/';
      },
      error: function(err){
        console.log(err);
      }
    });
  });
});//client side javascript file
//use jquery to make AJAX request