const LoginTemplate = `
<div class="ui one column stackable center aligned page grid login-container">
    <div class="column">
        <h2 class="ui blue image header">
            <div class="content">
                Welcome to SimpQi
            </div>
        </h2>
        <form class="ui large form">
            <div class="ui stacked segment">
                <div class="field">
                    <div class="ui left icon input">
                        <i class="user icon"></i>
                        <input class="js-username-input" type="text" name="username" placeholder="Username">
                    </div>
                </div>
                <div class="ui fluid large blue submit button js-login-button">Let's Play!</div>
            </div>
            <div class="ui error message js-error-message"></div>
        </form>
    </div>
</div>`;

function renderLogin() {
    $(document).attr("title", "SimpQi | Login");
    $('.js-centered-body').html(LoginTemplate);
}
