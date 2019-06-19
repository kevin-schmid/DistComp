const PlayerCardTemplate = `
<div class="ui middle aligned center aligned link cards">
    <div class="card">
        <div class="image">
            <img class="js-card-image" src="">
        </div>
        <div class="content">
            <div class="header js-card-name"></div>
                <div class="meta">
                    <a>SimpQi-Player</a>
                </div>
            <div class="description">
                This is you for the next game! Please wait while we find players.
            </div>
        </div>
        <div class="extra content">
            <span class="right floated">
                2019
            </span>
            <span>
                <i class="user icon"></i>
                Austria
            </span>
        </div>
    </div>
</div>
`;

function renderPlayerCardWaiting(playerName, playerImageUrl) {
    $(document).attr("title", "SimpQi | Waiting");
    var template = $(PlayerCardTemplate);
    template.find('.js-card-name').text(playerName);
    template.find('.js-card-image').attr('src', playerImageUrl);

    $('.js-centered-body').html(template);
}
