(function(){
    "use strict";
    var me = {};
    var form = document.querySelector('.form-container');

    function onClose (e) {
        e.preventDefault();

        me.close();
        closeButton.removeEventListener('click', onClose);
    }

    me.open = function () {
        form.classList.remove('is-hidden');

        var closeButton = document.querySelector('.form__close-button');
        closeButton.addEventListener('click', onClose);
    };

    me.close = function () {
        form.classList.add('is-hidden');
    };

    window.form = me;

})();