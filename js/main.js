function addMultipleChoice(parent) {
    $(parent).html(
        '<div class="control-group mt-3" id="fields">' +
        '<div class="controls">' +
        '<div class="entry input-group col-xs-3">' +
        '<input class="form-control" name="fields[]" type="text" placeholder="Type something" />' +
        '<span class="input-group-btn input-group-append">' +
        '<button class="btn btn-success btn-add" type="button">' +
        '<span class="fa fa-plus"></span>' +
        '</button>' +
        '</span>' +
        '</div>' +
        '</div>' +
        '</div>'
    );
}

function addParagraph(parent) {

    $(parent).html(
        $('<textarea>', {
            class: 'form-control col-12 mt-3',
            readonly: 'true',
            placeholder: 'User answer',
        })
    );

}


$QuestionsListGroup = $('.QuestionsList');
var controlForm = $($QuestionsListGroup).find('.Question:first').clone();

$(function () {


    $(document).on('change', '.slctQuestionType', function (e) {
        $relatedOptionsElement = $(this).closest('.Question').find('.Options');
        e.preventDefault();
        switch ($(this).val()) {
            case 'MultipleChoice':
                addMultipleChoice($relatedOptionsElement);
                break;
            case 'Paragraph':
                addParagraph($relatedOptionsElement);
                break;
            default:
                addParagraph($relatedOptionsElement);
                break;
        }

    });

    $(document).on('click', '.btn-add', function (e) {
        e.preventDefault();
        $relatedOptionsElement = $(this).closest('.Question');
        var controlForm = $($relatedOptionsElement).find('.controls:first'),
            currentEntry = $(this).parents('.entry:first'),
            newEntry = $(currentEntry.clone()).appendTo(controlForm);
        newEntry.find('input').val('');
        controlForm.find('.entry:not(:last) .btn-add')
            .removeClass('btn-add').addClass('btn-remove')
            .removeClass('btn-success').addClass('btn-danger')
            .html('<span class="glyphicon glyphicon-minus"></span>');
    }).on('click', '.btn-remove', function (e) {
        $(this).parents('.entry:first').remove();

        e.preventDefault();
        return false;
    });

    $(document).on('click', '.addQuestion', function (e) {
        e.preventDefault();
        // currentEntry = $(this).parents('.entry:first'),
        $(controlForm).appendTo($QuestionsListGroup);
        controlForm = controlForm.clone();
    });

    $(document).on('click', '.saveForm', function (e) {
        e.preventDefault();
        var finalQuestions = $('.QuestionsList .Question');
        var FormObj = new Object();
        FormObj.FormTitle = $('.formTitle').html();
        FormObj.Questions = Array();
        finalQuestions.each(function (Idx, Question) {
            var QuestionObj = new Object();
            QuestionObj.QuestionTitle = $(Question).find('.inpQuestionTitle').val();
            QuestionObj.QuestionType = $(Question).find('.slctQuestionType').val();
            QuestionObj.isRequired = $(Question).find('.isRequired')[0].checked;            
            QuestionObj.Options = Array();
            if (QuestionObj.QuestionType == "MultipleChoice") {
                $(Question).find("input[name*='Choices']").each(function () {
                    QuestionObj.Options.push($(this).val());
                    // alert(QuestionTitle + '=' +  $(this).val());
                });
            }
            FormObj.Questions.push(QuestionObj);
        });

        postToServer(FormObj);

    });

});


function postToServer(formData) {
    $.ajax({
        type: 'POST',
        url: 'app/view.php',
        dataType: 'json',
        data:{
            FORM : formData,
        },
        success: function (response) {
            alert(JSON.stringify(response));            
        },
        error: function (error) {
            alert(JSON.stringify(error));
        }
    })
}