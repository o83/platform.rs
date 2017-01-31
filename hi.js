function highlightCurrentNavLink() {
    var list = document.querySelector('.main-nav ul');
    var links = list.querySelectorAll('.main-nav a');
    var items = list.querySelectorAll('.main-nav li');

    var current = undefined;
    var hovered = undefined;

    for (var i = 0; i < links.length; i++) {
        if (links[i].href.replace(/\/$/, '') === location.href.replace(/\/$/, '')) {
            current = hovered = items[i];
            current.classList.add('main-nav--current');
        }

        items[i].addEventListener('mouseenter', function() {
            current.classList.remove('main-nav--current');
            hovered.classList.remove('main-nav--current');
            hovered = this;
            hovered.classList.add('main-nav--current');
        })
    }

    list.addEventListener('mouseleave', function(e) {
        hovered.classList.remove('main-nav--current');
        current.classList.add('main-nav--current');
    })
}

highlightCurrentNavLink();




function highlight() {
    var code = document.getElementsByTagName('code');
    for (var i = 0; i < code.length; i++) {
        code[i].innerHTML = code[i].innerHTML
            .replace(/([(){}→∀λ,=]+|::=|:=<>)/g,
                '<span class="h__symbol">$1</span>')
            .replace(/\b(pub|sub|$|rcv|spawn|snd|struct|enum|Vec|Arc|Rc|usize|u64|u32|unsafe|for|if|let|fn|move|Option|loop|UnsafeCell|Cell|UncheckedUnsafeArc)\b(?!:)/g,
                '<span class="h__keyword">$1</span>');
    }
}

highlight();



function parallax() {
    var lastScrollPosition = 0;
    var ticking = false;
    window.addEventListener('scroll', function(e) {
        lastScrollPosition = window.scrollY
        if (!ticking) {
            window.requestAnimationFrame(function() {
                doSomething(lastScrollPosition);
                ticking = false;
            });
        }
        ticking = true;
    });

    var titles = document.querySelector('.header__titles');
    var logo = document.querySelector('.header__logo');

    function doSomething(scrollPos) {
        titles.style.transform = 'translate3d(0px, ' + (scrollPos / 2) + 'px, 0px)';
        logo.style.transform = 'translate3d(0px, ' + (scrollPos / 2) + 'px, 0px)';
    }
}


function p(t) {
    t = t || {}
    this.waves = t.waves || []
    this.phase = 0
    this.run = false
    this._rotation = 0
    this.container = t.container || document.body
    this.ratio = t.ratio || window.devicePixelRatio || 1
    this.width = t.width || this.container.offsetWidth || 1280
    this.width_2 = this.width / 2
    this.width_4 = this.width / 4
    this.height = t.height || this.container.offsetHeight || 720
    this.height_2 = this.height / 2
    this.height_3 = this.height / 3
    this.MAX = this.height_2 - 4
    this.amplitude = t.amplitude || 0
    this.speed = t.speed || .02
    this.frequency = t.frequency || 2
    this.angle = 0
    this.circleProgress = 0
    this.radius = (t.ratio || 1) * this.height * .4
    this.canvas = document.createElement("canvas")
    this.canvas.width = this.width
    this.canvas.height = this.height
    this.container.appendChild(this.canvas)
    this.ctx = this.canvas.getContext("2d")
    this.backingStoreRatio = this.ctx.webkitBackingStorePixelRatio || this.ctx.mozBackingStorePixelRatio || this.ctx.msBackingStorePixelRatio || this.ctx.oBackingStorePixelRatio || this.ctx.backingStorePixelRatio || 1
    this.gradient = this.ctx.createLinearGradient(0, 0, 0, 2 * this.radius)
    this.gradient.addColorStop(0, "#4aa3da")
    this.gradient.addColorStop(1, "#ce3745")
    this.squareSide = Math.sqrt(Math.pow(2 * this.radius, 2) / 2)
}

p.prototype._getRadius = function() {
    this.radius = .44 * this.height
    this.squareSide = Math.sqrt(Math.pow(2 * this.radius, 2) / 2)
}

p.prototype._drawBase = function() {
    this.ctx.strokeStyle = this.gradient
    this.ctx.beginPath()
    this.ctx.arc(this.width_2, this.height_2, this.radius, 0, Math.PI / 180 * this.circleProgress)
    this.ctx.stroke()
}

p.prototype._drawSquare = function() {
    this.ctx.save()
    this.ctx.beginPath()
    this.ctx.strokeStyle = "#D8D8D8"
    this.ctx.translate(this.width_2, this.height_2)
    this.ctx.rotate(this._rotation * Math.PI / 180)
    this.ctx.strokeRect(-this.squareSide / 2, -this.squareSide / 2, this.squareSide, this.squareSide)
    this.ctx.restore()
}

p.prototype._updateBase = function() {
    this.circleProgress += 8
}

p.prototype._GATF_cache = {},
    p.prototype._globAttFunc = function(t) {
        return null == p.prototype._GATF_cache[t] && (p.prototype._GATF_cache[t] = Math.pow(4 / (4 + Math.pow(t, 4)), 4)),
            p.prototype._GATF_cache[t]
    }

p.prototype._color = function(t) {
    t = t || 1
    var e = this.ctx.createLinearGradient(0, 0, this.width, 0)
    return e.addColorStop(0, "rgba(260,55,69," + t + ")"),
        e.addColorStop(1, "rgba(74,163,218," + t + ")"),
        e
}

p.prototype._xpos = function(t, e, i, n) {
    return this.width_2 + this.radius * Math.sin(t)
}

p.prototype._ypos = function(t, e, i, n) {
    var o = this.MAX * n / e
    return this.height_2 + this.radius * Math.cos(t) + (this._globAttFunc(t) + o * Math.sin(i * t + this.phase))
}

p.prototype._drawLine = function(t, e, i, n, o) {
    this.ctx.moveTo(0, 0)
    this.ctx.beginPath()
    this.ctx.strokeStyle = e
    this.ctx.lineWidth = o / this.ratio || 1
    for (var s = 0;
        (s += .01) <= 2 * Math.PI;) {
        var a = this._ypos(s, t, i, n)
        r = this._xpos(s, t, i, n)
        this.ctx.lineTo(r, a)
    }
    this.ctx.closePath()
    this.ctx.stroke()
}

p.prototype._clear = function() {
    this.ctx.globalCompositeOperation = "destination-out"
    this.ctx.fillRect(0, 0, this.width, this.height)
    this.ctx.globalCompositeOperation = "source-over"
}

p.prototype._draw = function() {
    if (this.run) {
        if (this.phase = (this.phase + Math.PI * this.speed) % (2 * Math.PI),
            this._clear(),
            this.circleProgress < 360) {
            this._updateBase()
            this._drawBase()
        } else {
            for (var t = 0, e = this.waves.length; e > t; t++) {
                var i = this.waves[t]
                i.startAmplitude < i.amplitude && (i.startAmplitude += .001)
                this._drawLine(i.attenuation, this._color(i.opacity), i.frequency, i.startAmplitude)
            }
        }
        requestAnimationFrame(this._draw.bind(this))
    }
}

p.prototype.resize = function() {
    this.width = this.container.offsetWidth
    this.height = this.container.offsetHeight
    this.width_2 = this.width / 2
    this.width_4 = this.width / 4
    this.height_2 = this.height / 2
    this.canvas.width = this.width
    this.canvas.height = this.height
    this._getRadius()
}

p.prototype.start = function() {
    this.phase = 0
    this.run = !0
    this._getRadius()
    this._draw()
}

p.prototype.stop = function() {
    this.run = false
}

var S = new p({
    frequency: 4,
    container: document.querySelector('.header'),
    waves: [{
        frequency: 4,
        startAmplitude: 0,
        amplitude: .04,
        opacity: .4,
        attenuation: -2
    }, {
        frequency: 3,
        startAmplitude: 0,
        amplitude: .04,
        opacity: 1,
        attenuation: -6
    }, {
        frequency: 4,
        startAmplitude: 0,
        amplitude: .04,
        opacity: .3,
        attenuation: .4
    }, {
        frequency: 4,
        startAmplitude: 0,
        amplitude: .04,
        opacity: .2,
        attenuation: 2
    }, {
        frequency: 4,
        startAmplitude: 0,
        amplitude: .04,
        opacity: 1,
        attenuation: .8
    }]
});

S.start()
window.addEventListener("resize", function() {
    S.resize()
})
