const PlayerCardTemplate = `
    <div class="ui centered card">
        <div class="image">
            <img class="js-card-image" src="">
        </div>
        <div class="content">
            <div class="header js-card-name"></div>
                <div class="meta">
                    <a>SimpQi-Player</a>
                </div>
            <div class="description">
                Waiting for further players
                <div class="spinner">
                    <div class="bounce1"></div>
                    <div class="bounce2"></div>
                    <div class="bounce3"></div>
                </div>
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
`;

function renderPlayerCardWaiting(playerName, playerImageUrl) {
    $(document).attr("title", "SimpQi | Waiting");
    var template = $(PlayerCardTemplate);
    template.find('.js-card-name').text(playerName);
    template.find('.js-card-image').attr('src', playerImageUrl);

    $('.js-centered-body').html(template);
}
