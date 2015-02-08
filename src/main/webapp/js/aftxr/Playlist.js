(function(css) {
    var theFaithfulPlaylist = $(".theFaithful.playlist");
    var withinTolerancesPlaylist = $(".withinTolerances.playlist");
    var closePlaylistButton = $('.closePlaylist');

    var theFaithful = $("#theFaithful");
    var withinTolerances = $("#withinTolerances");
    var footer = $("#footer");

    var currentPlaylist;

    function open(playlist) {
        playlist.velocity({ top: 0 }, { duration: 100 });
        playlist.data("open", true);
    }

    function close(playlist) {
        playlist.velocity({ top: "100%" }, { duration: 100 });
        playlist.data("open", false);
    }

    function toggle(playlist) {
        if (currentPlaylist != null && currentPlaylist != playlist) {
            close(currentPlaylist);
        }
        if (playlist.data("open")) {
            close(playlist);
        } else {
            currentPlaylist = playlist;
            open(playlist);
        }
    }

    withinTolerances.click(function() {
        toggle(withinTolerancesPlaylist);
    });

    theFaithful.click(function() {
        toggle(theFaithfulPlaylist);
    });

    closePlaylistButton.click(function() {
        if (currentPlaylist != null) close(currentPlaylist);
    });

})(window.CSSUtils);
