$.ajax("./js/seriesList.json")
    .done(data => {
        seriesList = data;
        $.ajax("./js/seriesEpisodesList.json")
            .done(data => {
                seriesEpisodesList = data;
            })
    })
    .fail(function () {
        alert('error');
    });
