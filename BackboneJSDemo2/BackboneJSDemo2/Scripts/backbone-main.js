var app = {}; // create namespace for our app

app.Todo = Backbone.Model.extend({
    defaults: {
        title: '',
        completed: false
    }
});

app.TodoList = Backbone.Collection.extend({
    model: app.Todo,
    localStorage: new Store("backbone-todo")
});

// renders individual todo items list (li)
app.TodoView = Backbone.View.extend({
    tagName: 'li',
    template: _.template($('#item-template').html()),
    render: function () {
        this.$el.html(this.template(this.model.toJSON()));
        return this; // enable chained calls
    }
});

var object = {},
    callback = function (msg) { console.log("Triggered " + msg); };
_.extend(object, Backbone.Events);
object.on("my_event", callback);
object.trigger("my_event", "my custom event");

// renders the full list of todo items calling TodoView for each one.
app.AppView = Backbone.View.extend({
    el: '#todoapp',
    initialize: function () {
        this.input = this.$('#new-todo');
        // when new elements are added to the collection render then with addOne
        app.todoList.on('add', this.addOne, this);
        app.todoList.on('reset', this.addAll, this);
        app.todoList.fetch(); // Loads list from local storage
    },
    events: {
        'keypress #new-todo': 'createTodoOnEnter'
    },
    createTodoOnEnter: function (e) {
        if (e.which !== 13 || !this.input.val().trim()) { // ENTER_KEY = 13
            return;
        }
        app.todoList.create(this.newAttributes());
        this.input.val(''); // clean input box
    },
    addOne: function (todo) {
        var view = new app.TodoView({ model: todo });
        $('#todo-list').append(view.render().el);
    },
    addAll: function () {
        this.$('#todo-list').html(''); // clean the todo list
        app.todoList.each(this.addOne, this);
    },
    newAttributes: function () {
        return {
            title: this.input.val().trim(),
            completed: false
        }
    }
});
//--------------
// Initializers
//--------------
app.appView = new app.AppView();

// instance of the Collection
app.todoList = new app.TodoList();

var view = new app.TodoView({ model: todo });