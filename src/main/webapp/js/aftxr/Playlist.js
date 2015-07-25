(function(css) {

    var closePanelButton = $('.closePanel');
    var footer = $("#footer");
    var panels = $('.panel');
    var links = $('.panelLink');

    var currentPanel;
    var panelsByName = {};

    $.each(panels, function(index, panel) {
        panel = $(panel);
        panelsByName[panel.data("panel")] = panel;
    });

    $.each(links, function(index, link) {
        link = $(link);
        link.click(function() {
            linkClicked(link);
        })
    });

    function linkClicked(link) {
        toggle(panelsByName[link.data("panel")]);
    }

    function open(panel) {
        panel.velocity({ top: 0 }, { duration: 100 });
        panel.data("open", true);
    }

    function close(panel) {
        panel.velocity({ top: "100%" }, { duration: 100 });
        panel.data("open", false);
    }

    function toggle(panel) {
        if (currentPanel != null && currentPanel != panel) {
            close(currentPanel);
        }
        if (panel.data("open")) {
            close(panel);
        } else {
            currentPanel = panel;
            open(panel);
        }
    }

    closePanelButton.click(function() {
        if (currentPanel != null) close(currentPanel);
    });

    function recept() {
        $.each($('.reception'), function(i, elem) {
            if (Math.random() > 0.8) {
                $(elem).hide();
            } else {
                $(elem).show();
            }
        });
        setTimeout(function() { recept() }, Math.random() * 50);
    }

    recept();

})(window.CSSUtils);
