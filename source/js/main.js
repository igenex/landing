(function () {

    var openFormButton = document.querySelector('.arrow-down'),
        form = document.querySelector('.form');

    if(openFormButton) {
        openFormButton.addEventListener('click', function () {
            practice.form.open();
        })
    }
    
    if(form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            if(practice.validation.isValid()) {
                console.log("All good");
            }
            else {
                console.log("Is not valid");
            }
        })
    }
})();