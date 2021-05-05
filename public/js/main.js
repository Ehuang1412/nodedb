<<<<<<< HEAD
//client side javascript file
//alert('Testing main.js')
/*
To make a delete request, you cannot just use a link or submitting a form. You have to use GET or POST. Therefore use AJAX.

Use jquery to make a delete request with AJAX to the route.
*/
 
=======

>>>>>>> 5e55c28a6ff318d0117f6e3ee7f165e991b69afb

$(document).ready(function(){
  $('.delete-article').on('click',function(e){
    $target = $(e.target);
    console.log($target.attr('data-id'));
  });
<<<<<<< HEAD
});
//use jquery to make AJAX request
=======
});//client side javascript file
//use jquery to make AJAX request
>>>>>>> 5e55c28a6ff318d0117f6e3ee7f165e991b69afb
