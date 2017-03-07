var templates;

function testFun(){
    // $('#hiddenP').text("DSKJGBKSDHBFDBVDSBHDSL");
}

function deletePost(id) {
    // $('#hiddenP').text("OKOKOKOO");
    hidePost(id);
    propagateDelete(id);
    fixListIndexes();
}

function hidePost(id){
    $('#' + id).remove();
}

function propagateDelete(id){
    $.ajax({
        type: 'DELETE',
        url: '/wikipost/delete/' + id
    });
}

function fixListIndexes(){
        $('#wikiposts li').each(function() {
            var i = $(this).index() + 1;
            $(this).find('.position').text( i );
    });
}

function addWikiPost(originalTemplates, wikipost){
    var wikiPostTemplate = $('li.wikipost', originalTemplates).clone();

    $(wikiPostTemplate).attr('id', wikipost.id);
    $('.position', wikiPostTemplate).text( $( "li.wikipost" ).length + 1 );
    $('.user', wikiPostTemplate).text( wikipost.user );
    $('.title', wikiPostTemplate).text( wikipost.title );
    $("#wikiposts").append( $(wikiPostTemplate) );
}

function getTemplatesAsync(templContainer){
	$.ajax({
        type: 'GET',
        url: '/templates',
        success: function(data) {
            templates = $.parseHTML(data);
        }
    });
}

function getWikiPostsAsync(){
    $.ajax({
        type: 'GET',
        url: '/getwikiposts',
        success: function(data) {
            var wikiposts = JSON.parse(data);
            for (var i = 0; i < wikiposts.length; i++) {
                addWikiPost(templates, wikiposts[i]);
            }
        }
    });
}

function getFieldsInfoAsync(){
    $.getScript("fieldparser.js", function(){
        $.ajax({
            type: 'GET',
            url: '/fieldsInfo',
            success: function(data) {
            	$('#hiddenP').append(data);
                var fields = JSON.parse(data);
                for(var i = 0; i < fields.length; i++){
                    var temp = createFieldParser(fields[i]).showChoices(templates);
                }
            }
        });
    });
}

$(document).ready(function () {
	getTemplatesAsync();
    getWikiPostsAsync();
    getFieldsInfoAsync();

    var socket = io();

    socket.on('addwikipost', function(wikipost) {
        addWikiPost(templates, wikipost);
	});

	socket.on('delete', function(wikipost) {
        hidePost(wikipost.id);
    });

    $('#wikiposts').on('click', '.deletePost', function (e) {
        var postID = $(this).parent('li')[0].id;
        deletePost(postID);
    });

    $('#form').on('submit', function (event) {
        event.preventDefault();
        var input = $('#title');
        var t = input.val();
        if(!t || t.trim().length === 0) {
            alert('The title is required');
            return false;
        } else {
            $.ajax({
                type: 'POST',
                url: '/addwikipost',
                data: {
                    title: t
                },
                success: function(data) {
                    input.val('');
                }
            });
        }
    });
});
