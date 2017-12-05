
//Define our model
var Book = Backbone.Model.extend({
    defaults: {
        ID: "",
        BookName: ""
    },
    idAttribute: "ID", //this tells backbone to use the prop "ID" as the model id MUST BE UNQIUE
    initialize: function () {
        this.on("invalid", function (model, error) {
            console.log("Error: " + error)
        });        
        this.on('change', function () { //could say 'change:BookName' to only target changes to that property
            if (this.hasChanged('ID')) {

                //as the Id in the model has changed we want to do a GET to the server to get the new info
                book.fetch({
                    success: function (b) {
                        $('#container').css("display", "block");
                        $('#errorDiv').css("display", "none");                        
                    },
                    error: function (e) {
                        console.log("ERROR getting book from server!");
                        $('#errorDiv').css("display", "block");
                        $('#container').css("display", "none");
                    }
                });
            }
            if (this.hasChanged('BookName')) {

                //We would do a PUT to update the details on the server in this case
            }
        });
    },
    constructor: function (attributes, options) {
        Backbone.Model.apply(this, arguments); //ensures default behaviour still applied
    },
    validate: function (attr) { //this will be called whenever model is updated
        if (attr.ID <= 0) {
            console.log("validation error in backbone model!");
            $('#errorDiv').css("display", "block");
            $('#container').css("display", "none");
            return "Invalid value for ID supplied."
        }
    },
    urlRoot: '/BackboneJSDemo3/api/Books' //this is the root address that methods like "fetch" will use. The HTTP verb is all that will vary.
});

//instantiate the model (otherwise error will be thrown in view definition)
var book = new Book();

//view definition
var bookView = Backbone.View.extend({
    el: $('#container'), //the html element that we are manipulating
    initialize: function () {
        this.model.on('change', this.render, this); //sets up the view to re-render when the model is changed
    },
    render: function () {
        this.$el.html(this.model.get("BookName")); //sets the inner html of the target element 'el' with the data from the model
        return this;
    }
});

//button handler for when user clicks submit
function process() {

    var v = $('#entry').val();
    
    book.set({ ID: v }); //amend the ID in the model to whatever the user has entered
}

//instantiate the view
bookList = new bookView({ model: book });
