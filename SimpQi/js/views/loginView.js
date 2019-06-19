const LoginTemplate = `
<div class="ui middle aligned center aligned grid">
    <div class="column">
        <h2 class="ui teal image header">
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
                <div class="ui fluid large teal submit button js-login-button">Login</div>
            </div>
            <div class="ui error message js-error-message"></div>
        </form>
    </div>
</div>`;

function renderLogin() {
    $(document).attr("title", "SimpiQi | Login");
    $('.js-centered-body').html(LoginTemplate);
}
