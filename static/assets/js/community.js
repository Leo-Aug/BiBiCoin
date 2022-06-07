function getComment() {
    var comment = document.getElementById("comment-textarea").value;
    return comment;
}

function getTime() {
    // YYYY/MM/DD HH:MM
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hour = date.getHours();
    let minute = date.getMinutes();
    let time = year + "/" + month + "/" + day + " " + hour + ":" + minute;
    return time;
}

$(document).ready(function () {
    $("#publish-comment").click(function () {
        let comment = getComment();
        let comment_example = $("#comment-example").clone();
        comment_example.removeAttr("id");

        let p_html = '<a href="#">Mike:</a>&nbsp';
        p_html += comment;
        p_html += '<br><small id="comment-time" class="text-muted">' + getTime() + '</small>';

        comment_example.find("p").html(p_html);
        $("#comment-list").append(comment_example);
    });
});