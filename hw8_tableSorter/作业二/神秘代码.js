(function() {
    this.flag = false;
    this.sort = function(flag, idx, arr) {
        var i, j, tmp, arrLen = arr.length, str1, str2;
        for (i = 0; i < arrLen - 1; i ++)
        for (j = 0; j < arrLen - 1 - i; j ++) {
            str1 = $($(arr[j]).find('td')[idx]).text(), str2 = $($(arr[j + 1]).find('td')[idx]).text();
            // console.log(str1, str2);
            if (isNaN(str1) || isNaN(str2)) {
                if (flag ^ (str1 < str2)) {
                    tmp = $(arr[j]).html();
                    $(arr[j]).html($(arr[j + 1]).html());
                    $(arr[j + 1]).html(tmp);
                }
            } else {
                if (flag ^ (str1.length < str2.length || (str1.length == str2.length && str1 < str2))) {
                    tmp = $(arr[j]).html();
                    $(arr[j]).html($(arr[j + 1]).html());
                    $(arr[j + 1]).html(tmp);
                }
            }

        }
        // alert('sorted successfully');
    };

    var that = this;
    $('table').each(function() {
        $(this).find('th').click(function() {
            if ($(this).is('.sorted')) {
                that.flag = true;
                $(this).removeClass('sorted');
            } else {
                that.flag = false;
                $(this).addClass('sorted');
            }
            
            that.sort(flag, $(this).index(), $(this).parents('table').find('tbody tr'));
        });
    });
})();