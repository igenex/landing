(function () {
    var me = {};

    me.isEmail = function (email) {
        var re = /.+@.+\..+/i;
        return re.test(email);
    };

    me.isNumber = function (number) {
        var re = /[\d-+()\s]*?/;
        return re.test(number);
    };

    me.isNotEmpty = function (str) {
        return Boolean(str);
    };

    me.isValid = function () {
        if(!me.isAllComplited(document.querySelectorAll('[data-valid="required"'))) {
            alert("Заполните все необходимые поля!");
            return false;
        } else if (!practice.validation.isEmail(document.querySelector('[data-email]').value)) {
            alert("Не верный email");
            return false
        } else if (!practice.validation.isNumber(document.querySelector('[data-number]').value)) {
            alert("Не верный номер");
            return false;
        }
        return true;
    };

    me.isAllComplited = function (data) {
        var result = true,
            count = data.length;
        for (var i = 0; i < count; i++) {
            if(!practice.validation.isNotEmpty(data[i].value)){
                result = false;
                break;
            }
        }
        return result;
    };

    practice.validation = me;



})();