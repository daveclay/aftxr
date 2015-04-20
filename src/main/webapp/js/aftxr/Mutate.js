(function(css) {

    var imgBits = 125;
    var bits = 135;
    var counter = 0;
    var identities = 3;
    var logo = document.getElementById("logo");
    var stage = document.getElementById("stage");
    var conform = document.getElementById("conform");
    var data = document.getElementById("data");
    var info = document.getElementById("info");
    var interact = document.getElementById("interact");
    var progress = document.getElementById("progress");
    var meter = document.getElementById("meter");
    var activeGenes = [];
    var genes = [];
    var fear = false;

    function mutate() {
        setTimeout(function() {
            moveAll();

            if (Math.random() < .1) {
                operand();
            } else if (fear) {
                remission();
            }

            mutate();
        }, Math.round(Math.random() * 4000) + 8000);
    }

    function moveAll() {
        var imgs = document.getElementsByTagName("img");
        for (var i = 0; i < imgs.length; i++) {
            var img = imgs[i];
            if (img.className == 'bit') {
                mutateComponent(img);
            }
        }
    }

    function identifyComponent(gene, x, y) {
        gene.style[css.transform] = "translate3d(" + x + "px, " + y + "px, 0)";
        gene.style.opacity = .9;
        if (!fear || Math.random() > .1) {
            var geneticInfo;
            if (Math.random() > .5) {
                geneticInfo = "MXCH" + Math.round(Math.random() * 10) + "NE"
            } else {
                geneticInfo = "SOMATIC." + Math.round(Math.random() * 10);
            }
            gene.className = "gene";
            gene.innerText = geneticInfo + ".GENE+" + Math.round(Math.random() * 300);
        } else {
            gene.className = "gene genetic-error";
            gene.innerText = "ERR0R/" + Math.round(Math.random() * 10) + ".V/RUS+" + Math.round(Math.random() * 30);
        }
    }

    function mutateComponent(img) {
        var origin = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

        var entityLocation = {
            y: function() {
                var range = 250;
                var amount = range / 2 - Math.round(Math.random() * range);
                return origin.y + amount - 80;
            },
            x: function() {
                var range = 250;
                var amount = range / 2 - Math.round(Math.random() * range);
                return origin.x + amount;
            }
        };

        setTimeout(function() {
            var scale = (Math.round(Math.random() * 70) + 10) / 100;
            var rotate = Math.round(Math.random() * 180);
            var opacity = Math.random() * .4;
            var x = entityLocation.x();
            var y = entityLocation.y();
            img.style[css.transformOrigin] = x + "px " + y + "px";
            img.style[css.transform] = "rotate(" + rotate + "deg) scale(" + scale + ") translate3d(" + x + "px, " + y + "px, 0)";
            img.style.opacity = opacity;
            img.style.zIndex = Math.round(Math.random() * 100);

            if (Math.random() < .02 && genes.length > 0) {
                var gene = genes.pop();
                setTimeout(function() {
                    activeGenes.push(gene);
                    identifyComponent(gene, x, y);
                    setTimeout(function() {
                        clearIdentity(gene);
                    }, 3000);
                }, 400);
            }

        }, Math.round(Math.random() * 500));
    }

    function clearIdentity(gene) {
        gene.style.opacity = 0;
        activeGenes.splice(activeGenes.indexOf(gene), 1);
        genes.push(gene);
    }

    function updateProgress() {
        counter++;
        var percent = Math.round(counter / bits * 100);
        meter.style.width = percent + "%";
        info.innerText = percent + "%";
        if (percent >= 100) {
            meter.style.display = "none";
            progress.style.display = "none";
            info.style.display = "none";
        }
    }

    function remission() {
        fear = false;
        for (var i = 1; i <= bits; i++) {
            var img = document.getElementById("bit" + i);
            var src = img.getAttribute("data-bit");
            img.src = "images/blue-bits/"+ src + ".png";
        }
    }

    function operand() {
        fear = true;
        for (var i = 1; i <= bits; i++) {
            var img = document.getElementById("bit" + i);
            var src = img.getAttribute("data-bit");
            img.src = "images/rust-bits/"+ src + ".png";
        }
    }

    function initialize() {
        var i;
        for (i = 1; i <= bits; i++) {
            var img = document.createElement("img");
            var imgIdx = (i % imgBits) + 1;
            img.src = "images/blue-bits/" + imgIdx + ".png";
            img.className = "bit";
            img.setAttribute("data-bit", "" + imgIdx);
            img.setAttribute("id", "bit" + i);
            img.onload = function() {
                updateProgress();
            };
            var x = window.innerWidth / 3;
            var y = window.innerHeight / 3;
            img.style[css.transform] = "translate3d(" + x + "px, " + y + "px, 0)";
            stage.appendChild(img);
        }

        for (i = 0; i < identities; i++) {
            var gene = document.createElement("div");
            gene.className = "gene";
            data.appendChild(gene);
            genes.push(gene);
        }
    }

    initialize();
    moveAll();
    mutate();

})(window.CSSUtils);
