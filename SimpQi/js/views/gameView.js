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
            <span class="js-country">
                <i class="user icon"></i>
            </span>
        </div>
    </div>`;

const QuestionTemplate = `
    <div class="inline fields">
        <div class="message">
            <div class="currentQuestion">
                -Question Number 1-
            </div>
            <p class="info js-question"></p>
        </div>
        <label class="choose">Choose your answer wisely!</label>
        <div class="js-answers"></div>
    </div>`;

const AnswerTemplate = `            
    <div class="field">
        <div class="ui radio checkbox">
            <label>
                <input type="radio" name="answer" tabindex="0" class="hidden">
            </label>
            <label class="answer js-answer"></label>
        </div>
    </div>`;


const ResultTemplate = `
    <table class="ui celled table">
        <thead>
            <tr>
                <th>Username</th>
                <th>Score</th>
            </tr>
        </thead>
        <tbody class="js-results-body">
        </tbody>
    </table>

    <div class="ui segment js-correct-answer">
    </div>
`;
function renderPlayerCardWaiting(playerName, playerImageUrl, country) {
    $(document).attr("title", "SimpQi | Waiting");
    $('.game-header').hide();
    
    var template = $(PlayerCardTemplate);
    template.find('.js-card-name').text(playerName);
    template.find('.js-card-image').attr('src', playerImageUrl);
    template.find('.js-country').append(country);

    $('.js-centered-body').html(template);
}

function renderAnswer(answer, answerIndex) {
    var template = $(AnswerTemplate);
    template.find('.js-answer').text(answer);
    template.find('.checkbox').addClass(`js-answer-selection-${answerIndex}`).addClass('js-answer');
    return template.html();
}

function renderQuestion(question) {
    $(document).attr("title", "SimpQi | Gametime");
    $('.game-header').show();
    $('.js-centered-body').empty();

    var template = $(QuestionTemplate);
    template.find('.js-question').text(question.getQuestion());
    var allAnswers = question.getAllAnswers();
    var templatesCombined = "";
    for(var i = 0; i < allAnswers.length; i++){
        var renderedTemplate = renderAnswer(allAnswers[i], i);
        templatesCombined += renderedTemplate;
        template.find('.js-answers').html(templatesCombined);
    }

    $('.js-centered-body').html(template);
}

function renderResults(question, results) {
    $(document).attr("title", "SimpQi | Results");
    $('.game-header').show();
    $('.js-centered-body').empty();

    var allResults = results
        .sort(function(r1, r2) { return r2.points - r1.points })
        .map(r => `<tr>
                    <td data-lable="username">${r.username}</td>
                    <td data-lable="points">${r.points}</td>
                </tr>`)
        .join('');

    $('.js-centered-body').html(ResultTemplate); 
    $('.js-results-body').html(allResults);
    $('.js-correct-answer').html(`The correct answer was: ${question.getCorrectAnswer()}`)
}