const StatsTableRow = `
<tr>           
    <td>
        <h4 class="ui image header">
            <img src="img/player/freddie.jpg" class="ui mini rounded image" alt="pic">
            <div class="content">
                <div class="js-username"></div>
                <div class="suber"></div>
            </div>
        </h4>
    </td>
    <td class="js-points"></td>
</tr>`;

const StatsTemplate = `
<div class="intro">
    <div class="js-title"></div>
</div>
<div class="ui container table-container">
    <table class="ui very basic collapsing celled table">
        <thead class="heading">
        <tr>
            <th>Players</th>
            <th>Correct Answers</th>
        </tr>
        </thead>
        <tbody class="js-results-body">
        </tbody>
    </table>
    <div class="ui blue submit button js-again-button">Another round?</div>
</div>
`;

function renderStats(username, results) {
    $(document).attr("title", "SimpQi | Stats");
    $('.game-header').show();
    $('.js-header-title').text("Results");
    $('.js-centered-body').html(StatsTemplate);

    var players = results.getPlayerResults();

    var maxPoints = Math.max(...(players.map(p => p.getCorrectAnswersCount())));
    console.log(maxPoints);
    var playersWithMaxPoints = players
        .filter(p => p.getCorrectAnswersCount() === maxPoints)
        .map(p => p.getUsername());
    console.log(playersWithMaxPoints);
    var allResults = players
        .sort(function(p1, p2) { return p2.getCorrectAnswersCount() - p1.getCorrectAnswersCount() })
        .map(p => {
            var rowTemplate = $(StatsTableRow);
            rowTemplate.find('.js-points').html(p.getCorrectAnswersCount());
            rowTemplate.find('.js-username').html(p.getUsername());
            return '<tr>'+rowTemplate.html()+'</tr>';
        })
        .join('');

    console.log(allResults);
    
    $('.js-results-body').html(allResults);
    playersWithMaxPoints.forEach(p => $('.js-title').append(`<h2>${p} wins.</h2>`));

}
