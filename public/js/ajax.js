
// making variables for the add friend section 
var $friends = $('#friends');
var $name = $('#name');
var $age = $('#age');


//Using mustache language to create a template for the list to be designed
var friendTemplate = "" +
"<li>" +
"<p><strong>Name:</strong> {{name}}</p>"+
"<p><strong>Age:</strong> {{age}}</p>"+
"<button id= '{{id}}' class = 'remove'>X</button>" +
"</li";

//add the data into the template as well as creating the html elements
function addFriend(friend){
    $friends.append(Mustache.render(friendTemplate, friend));
};




$(document).ready(function(){
    //Ajax request to grab the the objects from the api
    $.ajax({
        type: 'GET',
        url: 'http://rest.learncode.academy/api/learncode/friends',
        //On successful get request use a for each loop to iterate through the array of objects recieved from the get request
        success: function(friends){
            //for each loop
            $.each(friends, function(i, friend){
                //Calls addfriend and passes current friend object as a parameter               
                if(friend.name){
                    addFriend(friend);
                }
            });
        },
        //Displays a message if the GET request is unsuccessful
        error: function(){ 
            alert('error loading friends');
        }
    });
    //When the element with the add-friend id is clicked perform the designated function
    $('#add-friend').on('click', function(){
        //create friend object. 
        //Then populate the name: with the text in #name field and populate age: with the text in the #age field
        var friend = {
            name: $name.val(),
            age: $age.val()
        };
        //Sends a post request to the server to add the newly created friend object to the api
        $.ajax({
            type: 'POST',
            url: 'http://rest.learncode.academy/api/learncode/friends',
            data: friend,
            //on success, adds the new friend object to the api
            success: function(newFriend){
                addFriend(newFriend);

            },
            //on failure, displays an alert
            error: function(){
                alert('error saving order');
              }
            });
        });

        //perform a function when an element with the remove class is clicked
        $friends.delegate('.remove','click', function(){
            //creates an oject that points to the li element it is nested in
            var $li = $(this).closest('li');
            //AJAX DELETE Function - click the .remove class button and the id identifies what to delete
            $.ajax({
                type: 'DELETE',
                url: 'http://rest.learncode.academy/api/learncode/friends/' + $(this).attr('id'),
                //on success  perfrom fadeout animation then remove the element from the page
                success: function(){
                    //hides from user
                    $li.fadeOut(300, function(){
                        //removes element from html
                        $(this.remove());
                    });  
                }
            });
        });
    });
