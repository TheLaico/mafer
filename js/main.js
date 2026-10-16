(function () {
  "use strict";

  var envelopeButton = document.getElementById("envelope-button");
  var openButton = document.getElementById("open-button");
  var welcomeScreen = document.getElementById("welcome-screen");
  var letterScreen = document.getElementById("letter-screen");
  var letterArticle = document.getElementById("letter");
  var particleLayer = document.getElementById("particle-layer");

  var prefersReducedMotion =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var hasOpened = false;

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

    var total = 8;

    for (var i = 0; i < total; i++) {
      (function spawn(delayMs) {
        setTimeout(function () {
          var particle = document.createElement("span");
          particle.className =
            "particle" + (Math.random() > 0.5 ? " gold" : "");

          var leftPercent = 10 + Math.random() * 80;
          var drift = Math.round((Math.random() - 0.5) * 60);
          var size = 4 + Math.random() * 4;

          particle.style.left = leftPercent + "%";
          particle.style.width = size + "px";
          particle.style.height = size + "px";
          particle.style.setProperty("--drift", drift + "px");
          particle.style.animationDuration = 4 + Math.random() * 2 + "s";

          particleLayer.appendChild(particle);

          particle.addEventListener("animationend", function () {
            particle.remove();
          });
        }, delayMs);
      })(i * 220);
    }
  }

  function showLetterScreen() {
    welcomeScreen.hidden = true;
    letterScreen.hidden = false;
    document.body.classList.add("state-letter");

    setStaggerIndexes();

    // Pequeño respiro para que el navegador aplique "hidden" antes de animar.
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        letterScreen.classList.add("is-active");
      });
    });

    createParticles();

    var heading = letterArticle.querySelector(".letter-title");
    if (heading) {
      heading.setAttribute("tabindex", "-1");
      heading.focus({ preventScroll: true });
    }
  }

  function openLetter() {
    if (hasOpened) {
      return;
    }
    hasOpened = true;

    openButton.disabled = true;
    envelopeButton.setAttribute("aria-disabled", "true");

    if (prefersReducedMotion) {
      showLetterScreen();
      return;
    }

    envelopeButton.classList.add("is-opening");
    setTimeout(showLetterScreen, 950);
  }

  envelopeButton.addEventListener("click", openLetter);
  openButton.addEventListener("click", openLetter);
})();
