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

    var clone = function(obj) {
        return $.extend({}, obj);
    };

    var forcefeed = function(from, to) {
        if (from) {
            for (var key in to) {
                var previousValue = from[key];
                if (previousValue) {
                    to[key] = [to[key], previousValue];
                }
            }
        }
    };

    var p = function(num, digits) {
        if (!digits) {
            digits = 4;
        }
        return ("0000000000" + num).slice(-1 * digits);
    };

    var c = function(v, min, max) {
        if (v > max) {
            return max
        }
        if (v < min) {
            return min;
        }
        return v;
    };

    var w = function(target, element) {
        return target.x > element.offset().left &&
            target.x < element.offset().left + element.width() &&
            target.y > element.offset().top &&
            target.y < element.offset().top + element.height();
    };

    var f = function(target) {
        return $("#stage")
            .find(".bit")
            .filter(function() {
                return w(target, $(this));
            });
    };

    var r = function(scale) {
        if (!scale) {
            scale = 1;
        }
        return Math.random() * scale;
    };

    var rf = function(scale) {
        return Math.round(r(scale));
    };

    var Television = Class.extnd({
        init: function() {
            this.channels = [];
            this.interrupted = false;
        },

        reception: function(channel) {
            this.channels.push(channel);
        },

        interrupt: function() {
            this.interrupted = true;
        },

        transmit: function() {
            if (!this.interrupted) {
                this.channels.forEach(function(channel) {
                    if (Math.random() > 0.5) {
                        channel.on();
                    } else {
                        channel.off();
                    }
                }.bind(this));
            }
            setTimeout(function() {
                this.transmit();
            }.bind(this), Math.random() * 20);
        }
    });

    var Body = Class.extnd({
        init: function() {
            this.origin = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
        },

        nextY: function(range) {
            var amount = range / 2 - rf(range);
            return this.origin.y + amount - 80;
        },

        nextX: function(range) {
            var amount = range / 2 - rf(range);
            return this.origin.x + amount;
        },

        nextEntityLocation: function(range, constraint) {
            var x = this.nextX(range);
            var y = this.nextY(range);
            if (constraint) {
                if (constraint.x) {
                    x = c(x, 0, constraint.x);
                }
                if (constraint.y) {
                    y = c(y, 0, constraint.y);
                }
            }
            return { x: x, y: y };
        }
    });

    var Channel = Class.extnd({
        init: function() {
            this.element = $("<div class='channel reception'/>");
            this.available = false;
            this.degauss();
        },

        corrupt: function() {
            var x = 0;
            var y = rf(window.innerHeight);
            this.element.css({
                backgroundColor: "rgba(" + rf(256) + ", " + rf(256) + ", " + rf(256) + ", .075)",
                transform: "translate3d(" + x + "px, " + y + "px, 0px)",
                width: window.innerWidth,
                height: rf(window.innerHeight / 2)
            });
        },

        trigger: function() {
            this.available = true;
            setTimeout(function() {
                this.degauss();
            }.bind(this), r(2331));
        },

        degauss: function() {
            this.available = false;
            this.off();
            setTimeout(function() {
                this.trigger();
            }.bind(this), (r(10312)) + 8301);
        },

        on: function() {
            if (this.available) {
                this.element.velocity({ display: 'block' });
                if (!fear && Math.random() > .3) {
                    this.corrupt();
                }
            }
        },

        off: function() {
            this.element.velocity({ display: 'none' });
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

        potentialLocation: function(gene) {
            var bounded = true;
            var target;
            while (bounded) {
                target = this.body.nextEntityLocation(300, { x: window.innerWidth - gene.width});
                target.dimension = gene.dimension;
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
            var location = this.potentialLocation(gene);
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
            this.marker = $("<span class='genetic-marker'/>");
            var geneticContent = $("<span class='genetic-content'/>");

            this.codexPart = $("<span class='codex'/>");
            this.nucleotidePart = $("<span class='nucleotide'/>");
            this.offsetPart = $("<span class='offset'/>");

            this.marker.appendTo(this.container);
            geneticContent.appendTo(this.container);

            this.codexPart.appendTo(geneticContent);
            this.nucleotidePart.appendTo(geneticContent);
            geneticContent.append("<br/>");
            this.offsetPart.appendTo(geneticContent);
        },

        attach: function(element) {
            this.container.appendTo(element);
        },

        recess: function() {
            this.container.css({
                opacity: 0
            });
        },

        dominant: function(location) {
            var x = location.x;
            var y = location.y;
            this.container.css({
                transform: "translate3d(" + x + "px, " + y + "px, 0px)",
                opacity: 1
            });
            this.location = { x: x, y: y};
        },

        isWithin: function(target) {
            return target.x + target.dimension.width > this.location.x &&
                target.x < this.location.x + this.dimension.width &&
                target.y + target.dimension.height > this.location.y &&
                target.y < this.location.y + this.dimension.height;
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

    var Interactor = Class.extnd({
        connect: function() {
            var contact = function(event) {
                interator.gid(f({x: event.pageX, y: event.pageY}).toArray().sample());
            };
            $(document).click(function(event) {
            });
        },

        gid: function(selected) {
            if (this.selectedBit) {
                this.selectedBit = null;
                imgs.forEach(function(img) {
                    var $img = $(img);
                    var previousData = $img.data("velocityData");
                    $img.velocity({
                        opacity: previousData.opacity,
                        translateX: previousData.translateX
                    }, {
                        duration: 200
                    }).velocity({
                        rotateZ: previousData.rotateZ
                    }, {
                        duration: 60
                    })
                });
            } else {
                imgs.filter(function(img) {
                    if (selected == img) {
                        return;
                    }
                    var $img = $(img);
                    $img.velocity({
                        opacity:.1
                    }, {
                        duration: 200
                    })
                });

                $(selected).velocity({
                    rotateZ: 0
                }, {
                    duration: 1
                }).velocity({
                    opacity: 1,
                    zIndex: 200,
                    translateX: "200px"
                }, {
                    duration: 200
                });
                this.selectedBit = selected;
            }
        },

        exp2: function(inv) {
            var inc = (360 / imgs.length) * .0174532925;
            for (var i = 0; i < imgs.length; i++) {
                var $img = $(imgs[i]);
                var previousData = $img.data("velocityData");
                var x, y;
                if (inv) {
                    x = previousData.translateX;
                    y = previousData.translateY;
                } else {
                    var xDist = window.innerWidth * Math.cos(inc * i);
                    var yDist = window.innerHeight * Math.sin(inc * i);
                    x = (window.innerWidth / 2) + xDist;
                    y = (window.innerHeight / 2) + yDist;
                }
                $img.velocity({
                    translateX: x,
                    translateY: y
                }, {
                    duration: 300
                })
            }
        },

        exp: function(inv) {
            for (var i = 0; i < imgs.length; i++) {
                var $img = $(imgs[i]);
                var previousData = $img.data("velocityData");
                if (inv) {
                    $img.velocity(previousData, {
                        duration: 200,
                        easing: "easeInOut"
                    });
                } else {
                    var scale = r(1);
                    var whacko = {
                        rotateZ: r(180) + "deg",
                        scaleX: scale,
                        scaleY: scale,
                        translateX: r(100) + "px",
                        translateY: r(100) + "px",
                        opacity: r(1)
                    };
                    forcefeed(previousData, whacko);
                    $img.velocity(whacko, {
                        duration: 1000,
                        easing: "easeInOut"
                    });
                }
            }
        }
    });
    var imgBits = 125;
    var bits = 135;
    var counter = 0;
    var imgs = [];
    var logo = document.getElementById("logo");
    var stage = document.getElementById("stage");
    var conform = document.getElementById("conform");
    var data = document.getElementById("data");
    var info = document.getElementById("info");
    var interact = document.getElementById("interact");
    var progress = document.getElementById("progress");
    var meter = document.getElementById("meter");
    var statusTX = document.getElementById("status-tx");
    var statusClock = document.getElementById("status-clock");

    var fear = false;
    var codex = ["MXCHINE", "MXCH!NE", "SOMAT!C"];
    var nucleotides = [ "cytos!ne", "guan:ne", "aden!ne", "thxmine"];
    var offsets = ["reset", "evalMutation", "transmit", "send", "void", "function", "kernel", "opt", "aux", "in", "format",
                   "map", "TX", "RX", "violation", "reject", "abort", "abandon", "create", "join", "include", "export"];
    var dna;
    var body;
    var television;
    var interator = new Interactor();

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
        for (var i = 0; i < imgs.length; i++) {
            var img = imgs[i];
            mutateComponent(img);
        }
    }

    function mutateComponent(img) {
        var entityLocation = body.nextEntityLocation(200);
        var $img = $(img);
        setTimeout(function() {
            var scale = (rf(70) + 10) / 100;
            var rotate = rf(180);
            var opacity = r(.7);
            var x = entityLocation.x;
            var y = entityLocation.y;

            var previousData = $img.data("velocityData");

            var velocityData = {
                transformOriginX: x + "px",
                transformOriginY: y + "px",
                rotateZ: rotate + "deg",
                scaleX: scale,
                scaleY: scale,
                translateX: x + "px",
                translateY: y + "px",
                opacity: opacity
            };

            $img.data("velocityData", clone(velocityData));

            forcefeed(previousData, velocityData);

            $img.velocity({
                zIndex: rf(100)
            }).velocity(velocityData, {
                duration: 3000,
                easing: [0.98, 0.1, 0.28, 1.01]
            });

            dna.identifyMutation();
        }, rf(500));
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

            $(stage).addClass("orbit");
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

    function initializeConstructBit(i) {
        var img = document.createElement("img");
        var imgIdx = (i % imgBits) + 1;
        img.src = "images/blue-bits/" + imgIdx + ".png";
        img.className = "bit";
        img.setAttribute("data-bit", "" + imgIdx);
        img.setAttribute("id", "bit" + i);
        img.onload = function() {
            updateProgress();
        };
        var x = window.innerWidth / 2;
        var y = window.innerHeight / 2;
        img.style[css.transform] = "translate3d(" + x + "px, " + y + "px, 0)";
        stage.appendChild(img);
        imgs.push(img);
    }

    function initialize() {
        var i;
        for (i = 1; i <= bits; i++) {
            initializeConstructBit(i);
        }

        body = new Body();
        dna = new DNA(body);
        television = new Television();

        for (i = 0; i < 4; i++) {
            var channel = new Channel();
            channel.element.appendTo(document.getElementById("transmission"));
            television.reception(channel);
        }

        television.transmit();
        interator.connect();
    }

    initialize();
    moveAll();
    mutate();

})(window.CSSUtils);
