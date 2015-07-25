(function(css) {

    // https://github.com/borisschapira/preloadr
    // https://github.com/DominicTobias/extnd

    Array.prototype.sample = function(items) {
        if ( ! items) {
            items = 1;
        }
        var result = [];
        for (var i = 0; i < items; i++) {
            result.push(this[Math.floor(Math.random() * this.length)]);
        }
        return result;
    };

    var imgBits = 125;
    var bits = 135;
    var counter = 0;
    var logo = document.getElementById("logo");
    var stage = document.getElementById("stage");
    var conform = document.getElementById("conform");
    var data = document.getElementById("data");
    var info = document.getElementById("info");
    var interact = document.getElementById("interact");
    var progress = document.getElementById("progress");
    var meter = document.getElementById("meter");
    var fear = false;
    var codex = ["MXCHINE", "MXCH!NE", "SOMAT!C"];
    var nucleotides = [ "cytos!ne", "guan:ne", "aden!ne", "thxmine"];
    var offsets = ["reset", "evalMutation", "transmit", "send", "void", "function", "kernel", "opt", "aux", "in", "format",
                   "map", "TX", "RX", "violation", "reject", "abort", "abandon", "create", "join", "include", "export"];
    var dna;
    var body;

    var Body = Class.extnd({
        init: function() {
            this.origin = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
        },

        nextY: function() {
            var range = 250;
            var amount = range / 2 - Math.round(Math.random() * range);
            return this.origin.y + amount - 80;
        },

        nextX: function() {
            var range = 250;
            var amount = range / 2 - Math.round(Math.random() * range);
            return this.origin.x + amount;
        },

        nextEntityLocation: function() {
            var x = this.nextX();
            var y = this.nextY();
            return { x: x, y: y };
        }
    });

    var DNA = Class.extnd({
        init: function(body) {
            var identities = 3;
            this.body = body;
            this.genes = [];
            this.activeGenes = [];
            for (var i = 0; i < identities; i++) {
                var gene = new Gene();
                gene.attach(data);
                this.genes.push(gene);
            }
        },

        withinAllActiveGenes: function(target) {
            var within = false;
            for (var i = 0; i < this.activeGenes.length; i++) {
                if (this.activeGenes[i].isWithin(target)) {
                    within = true;
                    break;
                }
            }
            return within;
        },

        transmitLocation: function() {
            var bounded = true;
            var target;
            while (bounded) {
                target = this.body.nextEntityLocation();
                if ( ! this.withinAllActiveGenes(target)) {
                    bounded = false;
                }
            }
            return target;
        },

        identifyMutation: function() {
            if (Math.random() < .03 && this.genes.length > 0) {
                var gene = this.genes.pop();
                setTimeout(function() {
                    this.activate(gene);
                }.bind(this), 400);
            }
        },

        activate: function(gene) {
            gene.next();
            var location = this.transmitLocation();
            gene.dominant(location);
            this.activeGenes.push(gene);
            setTimeout(function() {
                this.clearIdentity(gene);
            }.bind(this), 3000);
        },

        clearIdentity: function(gene) {
            gene.recess();
            this.activeGenes.splice(this.activeGenes.indexOf(gene), 1);
            this.genes.push(gene);
        }
    });

    var Gene = Class.extnd({
        init: function() {
            this.container = $("<div class='gene'/>");
            this.codexPart = $("<span class='codex'/>");
            this.nucleotidePart = $("<span class='nucleotide'/>");
            this.offsetPart = $("<span class='offset'/>");

            this.codexPart.appendTo(this.container);
            this.nucleotidePart.appendTo(this.container);
            this.container.append("<br/>");
            this.offsetPart.appendTo(this.container);
        },

        attach: function(element) {
            this.container.appendTo(element);
        },

        recess: function() {
            this.container.css({
                opacity: 0
            })
        },

        dominant: function(location) {
            var x = location.x;
            var y = location.y;
            this.container.css({
                transform: "translate3d(" + x + "px, " + y + "px, 0px)",
                opacity: .9
            });
            this.location = { x: x, y: y};
        },

        isWithin: function(target) {
            return target.x + this.dimension.width < this.location.x &&
                    target.x > this.location.x + this.dimension.width &&
                    target.y + this.dimension.height < this.location.y &&
                    target.y > this.location.y + this.dimension.height;
        },

        next: function() {
            if (fear || Math.random() > .8) {
                this.container.addClass("genetic-error");
                this.codexPart.text("ERR0R/" + Math.round(Math.random() * 10));
                this.nucleotidePart.text(".V/RUS+" + Math.round(Math.random() * 30));
            } else {
                this.container.removeClass("genetic-error");
                this.codexPart.text(codex.sample());
                this.nucleotidePart.text(nucleotides.sample());
            }
            this.evalMutation();
            this.dimension = {
                width: this.container.width(),
                height: this.container.height()
            };
        },

        evalMutation: function() {
            this.offsetPart.text(offsets.sample(4).join(".") + ":" + Math.random().toString(36).split("").sample());
        }
    });

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

    function mutateComponent(img) {
        var entityLocation = body.nextEntityLocation();
        setTimeout(function() {
            var scale = (Math.round(Math.random() * 70) + 10) / 100;
            var rotate = Math.round(Math.random() * 360);
            var opacity = Math.random() * .4;
            var x = entityLocation.x;
            var y = entityLocation.y;
            img.style[css.transformOrigin] = x + "px " + y + "px";
            img.style[css.transform] = "rotate(" + rotate + "deg) scale(" + scale + ") translate3d(" + x + "px, " + y + "px, 0)";
            img.style.opacity = opacity;
            img.style.zIndex = Math.round(Math.random() * 100);

            dna.identifyMutation();
        }, Math.round(Math.random() * 500));
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

        body = new Body();
        dna = new DNA(body);
    }

    initialize();
    moveAll();
    mutate();

})(window.CSSUtils);
