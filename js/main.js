(function () {
  "use strict";

  var appEl = document.getElementById("app");
  var envelopeButton = document.getElementById("envelope-button");
  var envelopeStage = document.querySelector(".envelope-stage");
  var openButton = document.getElementById("open-button");
  var welcomeScreen = document.getElementById("welcome-screen");
  var letterScreen = document.getElementById("letter-screen");
  var letterArticle = document.getElementById("letter");
  var particleLayer = document.getElementById("particle-layer");
  var transitionGlow = document.getElementById("transition-glow");

  var prefersReducedMotion =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var hasFinePointer =
    window.matchMedia && window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  var hasOpened = false;

  /* ---------------------------------------------------------
     Respuesta sutil del sobre al cursor (tilt 3D)
     --------------------------------------------------------- */
  function initTilt() {
    if (prefersReducedMotion || !hasFinePointer || !envelopeStage) {
      return;
    }

    var ticking = false;
    var pendingEvent = null;

    function applyTilt() {
      ticking = false;
      if (!pendingEvent) {
        return;
      }
      var rect = envelopeStage.getBoundingClientRect();
      var relX = (pendingEvent.clientX - rect.left) / rect.width - 0.5;
      var relY = (pendingEvent.clientY - rect.top) / rect.height - 0.5;
      var maxTilt = 7;
      var rotateY = relX * maxTilt * 2;
      var rotateX = relY * -maxTilt * 2;

      envelopeButton.style.transform =
        "perspective(900px) rotateX(" +
        rotateX.toFixed(2) +
        "deg) rotateY(" +
        rotateY.toFixed(2) +
        "deg) scale(1.015)";
    }

    envelopeStage.addEventListener("mousemove", function (event) {
      if (hasOpened) {
        return;
      }
      pendingEvent = event;
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(applyTilt);
      }
    });

    envelopeStage.addEventListener("mouseleave", function () {
      envelopeButton.style.transform =
        "perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)";
    });
  }

  function setStaggerIndexes() {
    var items = letterArticle.querySelectorAll(".reveal-item");
    items.forEach(function (el, index) {
      el.style.setProperty("--i", index);
    });
  }

  function createParticles() {
    if (prefersReducedMotion || !particleLayer) {
      return;
    }

    var total = 7;

    for (var i = 0; i < total; i++) {
      (function spawn(delayMs) {
        setTimeout(function () {
          var particle = document.createElement("span");
          particle.className =
            "particle" + (Math.random() > 0.5 ? " gold" : "");

          var leftPercent = 10 + Math.random() * 80;
          var drift = Math.round((Math.random() - 0.5) * 60);
          var spin = Math.round((Math.random() - 0.5) * 70);
          var size = 7 + Math.random() * 5;

          particle.style.left = leftPercent + "%";
          particle.style.width = size + "px";
          particle.style.height = size * 0.68 + "px";
          particle.style.setProperty("--drift", drift + "px");
          particle.style.setProperty("--spin", spin + "deg");
          particle.style.animationDuration = 4.2 + Math.random() * 2 + "s";

          particleLayer.appendChild(particle);

          particle.addEventListener("animationend", function () {
            particle.remove();
          });
        }, delayMs);
      })(i * 240);
    }
  }

  function focusLetterHeading() {
    var heading = letterArticle.querySelector(".letter-title");
    if (heading) {
      heading.setAttribute("tabindex", "-1");
      heading.focus({ preventScroll: true });
    }
  }

  /* ---------------------------------------------------------
     Apertura instantánea (prefers-reduced-motion)
     --------------------------------------------------------- */
  function openLetterInstant() {
    welcomeScreen.hidden = true;
    letterScreen.hidden = false;
    letterScreen.classList.add("is-active");
    document.body.classList.add("state-letter");
    setStaggerIndexes();
    focusLetterHeading();
  }

  /* ---------------------------------------------------------
     Transición cinematográfica: el sobre se abre, la hoja
     emerge y la escena se funde de forma continua con la carta.
     --------------------------------------------------------- */
  function openLetterCinematic() {
    envelopeButton.classList.add("is-opening");
    appEl.classList.add("is-crossfading");

    // La solapa y el sello ya están en marcha; cuando la hoja
    // termina de elevarse, la carta empieza a tomar su lugar.
    setTimeout(function () {
      welcomeScreen.classList.add("is-leaving");

      letterScreen.hidden = false;
      document.body.classList.add("state-letter");
      setStaggerIndexes();

      if (transitionGlow) {
        transitionGlow.classList.add("is-flashing");
      }

      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          letterScreen.classList.add("is-active");
        });
      });

      createParticles();
      focusLetterHeading();
    }, 900);

    // Una vez completado el cruce, la carta vuelve al flujo normal
    // del documento para que el desplazamiento funcione con naturalidad.
    setTimeout(function () {
      welcomeScreen.hidden = true;
      appEl.classList.remove("is-crossfading");
    }, 900 + 700);
  }

  function openLetter() {
    if (hasOpened) {
      return;
    }
    hasOpened = true;

    openButton.disabled = true;
    envelopeButton.setAttribute("aria-disabled", "true");

    if (prefersReducedMotion) {
      openLetterInstant();
      return;
    }

    openLetterCinematic();
  }

  envelopeButton.addEventListener("click", openLetter);
  openButton.addEventListener("click", openLetter);

  initTilt();
})();
