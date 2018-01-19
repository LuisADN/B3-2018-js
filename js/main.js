(function () {
    let seriesList;
    let seriesEpisodesList;

    $.ajax("./js/seriesList.json")
        .done(data => {
            seriesList = data;
            $.ajax("./js/seriesEpisodesList.json")
                .done(data => {
                    seriesEpisodesList = data;
                    init();
                })
        })
        .fail(function () {
            alert('error');
        });

    let init = function() {
        $("#seriesTitleSearch").on("keyup", event => {
            let seriesTitleSearchValue = $(event.currentTarget)
                .val()
                .toLowerCase()
                .trim();
            if (seriesTitleSearchValue != "") {
                $("#seriesDetail").html("");

                // retrieve series matching title
                let matchingSeries = seriesList.filter(
                    a => a.seriesName.toLowerCase().indexOf(seriesTitleSearchValue) > -1
                );
                let bufferString = "";
                // for each serie
                for (let matchingSerie of matchingSeries) {
                    bufferString += "<li>";
                    bufferString += matchingSerie.seriesName;
                    bufferString += "<ul>";
                    let matchingSerieEpisodesList = seriesEpisodesList.filter(
                        b => b.serie_id == matchingSerie.id
                    )[0];
                    // for each serie episode
                    for (let episode of matchingSerieEpisodesList.episodes_list) {
                        bufferString += "<li>" + episode.episodeName + "</li>";
                    }
                    bufferString += "</ul>";
                    bufferString += "</li>";

                }
                $("#seriesDetail").append($(bufferString));
            } else {
                $("#seriesDetail").html($("<li>Ta race</li>"));
            }
        });
    }
})(jQuery);
