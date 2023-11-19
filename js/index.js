class Model {
    constructor() {
    }
}


class View {
    constructor() {
    }

}

class Controller {
    constructor(model, view) {
    }

}

var app
function setup() {
    app = new Controller(new Model(), new View())
}