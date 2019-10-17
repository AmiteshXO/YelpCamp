  #   Yelp Camp

### Overview  
it is a fullstack website which consists of a list of campgrounds.these campgrounds are manually entered into database using an input form.
every user has its own set of campgrounds, this is accomplished by implementing passportjs( An Authentication tool for websites/webapps ).
each individual campground also has edit and delete functionality.every user who is login to yelp camp can also add comments to the campgrounds.
the main landing page of website consists of all the campgrounds which the users have entered but a user can only edit or delete thier own campgrounds.

### YelpCamp STACK
- MongoDB (Non relational database)
- Expressjs
- NodeJS ( JS runtime enviroment to run JS in Backend ).

Other tools
- PassportJS (Passport is authentication middleware for Node.js) - It is used to implement signup/login functionality.
- NPM ( node package manager ) - it consists of different js packages to be included in your project. 



## Frontend implementation 

- HTML5
- CSS3
- Javascript
- Bootstrap

The main landing page with all campgrounds is made using the bootstrap grid system ( it divides the browser page into rows and columns forming grid for each campground ). 
bootstrap classes are applied to style buttons, fit images to grid, make the grid responsive ( automatically done by bootstrap ), add padding and border to images.

The basic html header and footer are added into partial directory ( a single directory of html structure , to be included on other pages of the website using an 'include' tag ).


## Backend Implementation 
- Expressjs ( a node package )
- NodeJS ( Runtime for js in backend ).

The complete website is divided into 3 Routes ( an HTTP verb or a link/pathway to a differnt webpage ) sections -:
1. index routes ( signup/login Routes are made ).
2. campground routes.
3. comments routes.

Each route section consistes of 4 Routes -:
1. GET route - to send a 'get' request ( a request to get the requested webpage ) to a webpage.
2. POST route - to send a post request ( a request to store or upload data send in the request body. )
3. PUT route - to send put request to server ( to update already existing data ).
4. Delete route - to delete the requested data.

Each route is also passed with a *middleware and a **callback function.
*middleware - it is the name of the function which is passed to the route , this function runs before the callbackfunction and after the route request is made.
**callback func. - the function which runs after route request and middleware.

So when we need to add new campground a input form is opened by making a 'get request' to the 'add campground' Page.
and when we hit the submit button on the form a 'post request' is made to store the data to the database. 

Same are the case for Edit and Delete button in each Campground.
Edit - PUT request is made to edit existing data in DB.
Delete - To delete an entity form database.

A different sets of routes are made for comments to Edit, Add, delete the comments same as above.



## Database 
- MongoDB (NON- Relational DB)
Here mongodb is implemented using a node package 'mongoose' to make request to mongodb server using JS.

So here for each entity in yelpcamp a Schema is made which consists of the key-value pair for that entity like name,age,date,etc.
then each Schema is created into a Model ( it means to add functions like create,edit,delete,findbyid,deletebyid,etc to each schema in this Yelpcamp ).
then using those function data is been added to the database.
like - Campground.find({}, function(err, allCampgrounds).  
