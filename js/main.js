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

$(function () {

    $(document).on('change', '.QuestionType', function (e) {
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
});