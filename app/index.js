$(document).ready(function () {
    var gradesList;
    function calcBrain(event) {
        var creditsList = $(".credits");
        gradesList = $(".grade");

        var credit = 0;
        var totCredits = 0;
        var currGradepnt = 0;
        var totGradepnt = 0;
        var GPA = 0;

        for (var i = 0; i < $(".credits").length; i++) {
            if (creditsList[i].value === "") {
                credit = 0;
            } else {
                credit = Number(creditsList[i].value, 10);
            }

            totCredits += credit;
            console.log(totCredits);

            currGradepnt = pointsMap[gradesList[i].value];
            // console.log(currGradepnt);

            totGradepnt += credit * currGradepnt;
            // console.log(totGradepnt);
        }
        GPA = totGradepnt / totCredits;
        if (isNaN(GPA)) {
            GPA = 0.0;
        }
        // console.log(GPA);

        resultField.html(GPA.toFixed(2));
    }

    var add = $("#add");

    var reset = $("#reset");
    var message = $("#message");
    var maintable = $("#maintable");

    var resultField = $("#finaljudgement");
    var themetoggler = $(".fa-moon");
    var rowhtml =
        '<tr class="field"> <td> <i class="del" data-feather="x-circle"></i> </td> <td></td> <td> <label for="grade"></label> <input type="number" class="credits" min=1> </td> <td> <select name="grade" class="grade"> <option selected="selected">O</option> <option>A+</option> <option>A</option> <option>B+</option> <option>B</option> <option>C</option> <option>P</option> <option>F</option> <option>Ab</option> <option>I</option> </select> </td> </tr>';

    pointsMap = {
        O: 10,
        "A+": 9,
        A: 8,
        "B+": 7,
        B: 6,
        C: 5,
        P: 4,
        F: 0,
        Ab: 0,
        I: 0,
    };

    add.on({
        mouseover: function () {
            message.html("Add a subject?");
        },
        mouseleave: function () {
            message.html("Scorecard this semester");
        },
    });

    $("body").on("click", "#add", function () {
        console.log("add");
        maintable.append(rowhtml);
        feather.replace();
    });

    reset.on({
        mouseenter: function () {
            message.html("Reset scorecard?");
        },
        mouseleave: function () {
            message.html("Scorecard this semester");
        },
    });

    $("#maintable").on("click", ".del", function () {
        console.log("del");
        $(this).parent().parent().remove();
        calcBrain();
    });

    reset.click(function () {
        $(".credits").val("");
        // window.location.reload();
        resultField.html("0.00");
        gradesList.val("O");
    });

    $(document).on("keyup", ".credits", calcBrain);
    $(document).on("change", ".grade", calcBrain);

    $.getJSON(
        "https://api.countapi.xyz/hit/srm-gpa-calc/view-record",
        function (response) {
            $("#visits").text(response.value);
        }
    );

    themetoggler.on("click", function () {
        if (themetoggler.hasClass("fa-moon")) {
            themetoggler.removeClass("fa-moon");
            themetoggler.addClass("fa-sun");
            $("link").attr("href", "./styles/dark.css");
        } else if (themetoggler.hasClass("fa-sun")) {
            themetoggler.removeClass("fa-sun");
            themetoggler.addClass("fa-moon");
            $("link").attr("href", "./styles/light.css");
        }
    });
});
