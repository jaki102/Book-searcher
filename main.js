var typingTimer;
var doneTypingInterval = 2000;
var $input = $('.search-input');

$input.on('keyup', function(){
    clearTimeout(typingTimer);
    typingTimer = setTimeout(doneTyping, doneTypingInterval);
});
$input.on('keydown', function(){
    clearTimeout(typingTimer);
});
function doneTyping(){
    var word = $input.val();
    if(word){
        $('.book').remove();
        $.ajax({
            type: 'GET',
            url: `https://www.googleapis.com/books/v1/volumes?q=${word}`,
            success: function(books){
                $.each(books.items, function(i, book) {
                    var photo;
                    var description;
                    if(book.volumeInfo.imageLinks){
                        photo = book.volumeInfo.imageLinks.thumbnail;
                    }else{
                        photo = "./asset/no-image.jpg";
                    }
                    if(book.volumeInfo.description){
                        description = book.volumeInfo.description.slice(0,150);
                        if(description.slice(-1) != "."){
                            description += "...";
                        } 
                    } else {
                        description = "brak opisu";
                    }
                    $('.content').append(`<div class="book">   
                                            <img src="${photo}"/>                             
                                            <h3>${book.volumeInfo.title}</h3>
                                            <p>${description}</p>
                                        </div>`)
                })
            }
        })
    }
}