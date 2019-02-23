fb = firebase.database();

let counter;


$('#postButton').on("click", (event) => {
    event.preventDefault();
    let postTitle = $('#inputTitle').val();
    let postText = $('#inputText').val();
    let path = `posts/${counter++}`;
    let dataToSave = { Title: postTitle, Text: postText };
    if (postTitle !== "" && postText !== "") {
        $('.posts').append(`
        <div class="card">
            <div class="card-header">
            ${postTitle}
            </div>
            <div class="card-body">
                <p class="card-text">${postText}</p>
                <a href="#" class="btn btn-primary">Megnyitás</a>
            </div>
        </div>
        `);
        fb.ref(path).set(dataToSave);
    }
});

fb.ref("posts").once('value').then(data => {
    counter = data.val().length;
    data.forEach(element => {
        $('.posts').append(`
        <div class="card">
            <div class="card-header">
            ${element.child('Title').val()}
            </div>
            <div class="card-body">
                <p class="card-text">${element.child(`Text`).val()}</p>
                <a href="#" class="btn btn-primary">Megnyitás</a>
            </div>
        </div>
        `);
    });
});
