function createNotify(text, title, time){
    var $html = $(
        `
        <div class="notification"">
            <p id="title">` + title + `</p>
            <p id="text">` + text + `</p>
        </div>
        `
    );

    $(".notifications").prepend($html).fadeIn();
    $html.fadeOut(0);
    $html.fadeIn(1000);

    setTimeout(() => {
        $html.fadeOut(1000);

        setTimeout(() => {
            $html.remove();
        }, 850);
    }, time);
}

function callNotify(state, title, message)
{
    switch (state) {
        case "Success":
            createNotify(message, title, 5000);
        break;

        case "Warning":
            createNotify(message, title, 5000);
        break;

        case "Info":
            createNotify(message, title, 5000);
        break;

        case "Error":
            createNotify(message, title, 5000);
        break;
    }
}