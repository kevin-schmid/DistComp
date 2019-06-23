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
    <h2>You win / lose!!</h2>
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
</div>
`;

function renderStats(username, results) {
    $(document).attr("title", "SimpQi | Stats");
    $('.game-header').show();
    $('.js-centered-body').html(StatsTemplate);
    

    var allResults = results
        .sort(function(r1, r2) { return r2.points - r1.points })
        .map(r => {
            var rowTemplate = $(StatsTableRow);
            rowTemplate.find('.js-points').html(r.points);
            rowTemplate.find('.js-username').html(r.username);
            return rowTemplate.html();
        })
        .join('');

    console.log(allResults);
    
    $('.js-results-body').html(allResults);

}