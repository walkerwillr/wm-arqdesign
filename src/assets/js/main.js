/* WM Arquitetura & Design — interações (vanilla JS, sem dependências) */
(function () {
  "use strict";

  /* ---- Header: sólido ao rolar --------------------------------------- */
  var header = document.querySelector(".site-header");
  if (header) {
    var onScroll = function () {
      if (window.scrollY > 24) header.classList.add("is-solid");
      else header.classList.remove("is-solid");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---- Hero: carrossel de fundo (crossfade) --------------------------- */
  var heroSlides = document.querySelectorAll(".hero__slide");
  if (heroSlides.length > 1) {
    var reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (!reduceMotion) {
      var heroCurrent = 0;
      setInterval(function () {
        heroSlides[heroCurrent].classList.remove("is-active");
        heroCurrent = (heroCurrent + 1) % heroSlides.length;
        heroSlides[heroCurrent].classList.add("is-active");
      }, 6000);
    }
  }

  /* ---- Carrossel de fotos do profissional --------------------------- */
  var rotators = document.querySelectorAll(".photo-rotator");
  if (rotators.length) {
    var rotReduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!rotReduce) {
      rotators.forEach(function (rot) {
        var slides = rot.querySelectorAll(".photo-rotator__slide");
        if (slides.length < 2) return;
        var idx = 0;
        setInterval(function () {
          slides[idx].classList.remove("is-active");
          idx = (idx + 1) % slides.length;
          slides[idx].classList.add("is-active");
        }, 5000);
      });
    }
  }

  /* ---- Menu mobile ---------------------------------------------------- */
  var toggle = document.getElementById("nav-toggle");
  var nav = document.getElementById("site-nav");
  if (toggle && header) {
    var setOpen = function (open) {
      header.classList.toggle("is-open", open);
      document.body.classList.toggle("nav-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    };
    toggle.addEventListener("click", function () {
      setOpen(!header.classList.contains("is-open"));
    });
    if (nav) {
      nav.querySelectorAll("a").forEach(function (a) {
        a.addEventListener("click", function () {
          setOpen(false);
        });
      });
    }
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && header.classList.contains("is-open")) setOpen(false);
    });
  }

  /* ---- Reveal ao rolar ------------------------------------------------ */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    reveals.forEach(function (el) {
      io.observe(el);
    });
  } else {
    reveals.forEach(function (el) {
      el.classList.add("is-in");
    });
  }

  /* ---- Filtro de portfólio ------------------------------------------- */
  var filterBtns = document.querySelectorAll(".filter-btn");
  var grid = document.getElementById("portfolio-grid");
  var emptyMsg = document.getElementById("filter-empty");
  if (filterBtns.length && grid) {
    var cards = Array.prototype.slice.call(grid.querySelectorAll(".project-card"));
    filterBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var filter = btn.getAttribute("data-filter");
        filterBtns.forEach(function (b) {
          b.classList.remove("is-active");
          b.setAttribute("aria-pressed", "false");
        });
        btn.classList.add("is-active");
        btn.setAttribute("aria-pressed", "true");
        var visible = 0;
        cards.forEach(function (card) {
          var match = filter === "all" || card.getAttribute("data-category") === filter;
          card.classList.toggle("is-hidden", !match);
          if (match) visible++;
        });
        if (emptyMsg) emptyMsg.style.display = visible === 0 ? "block" : "none";
      });
    });
  }

  /* ---- Lightbox (galeria de projeto) --------------------------------- */
  var gallery = document.getElementById("gallery");
  var lb = document.getElementById("lightbox");
  if (gallery && lb) {
    var lbImg = document.getElementById("lb-img");
    var lbCount = document.getElementById("lb-count");
    var figures = Array.prototype.slice.call(gallery.querySelectorAll(".gallery__item"));
    var current = 0;
    var lastFocus = null;

    var largestSrc = function (fig) {
      var img = fig.querySelector("img");
      if (!img) return "";
      var ss = img.getAttribute("srcset");
      if (ss) {
        var parts = ss.split(",");
        var last = parts[parts.length - 1].trim();
        return last.split(/\s+/)[0];
      }
      return img.currentSrc || img.src;
    };

    var render = function () {
      var fig = figures[current];
      lbImg.setAttribute("src", largestSrc(fig));
      var img = fig.querySelector("img");
      lbImg.setAttribute("alt", img ? img.getAttribute("alt") || "" : "");
      if (lbCount) lbCount.textContent = current + 1 + " / " + figures.length;
    };
    var open = function (i) {
      current = i;
      lastFocus = document.activeElement;
      render();
      lb.classList.add("is-open");
      document.body.style.overflow = "hidden";
      document.getElementById("lb-close").focus();
    };
    var close = function () {
      lb.classList.remove("is-open");
      document.body.style.overflow = "";
      lbImg.setAttribute("src", "");
      if (lastFocus) lastFocus.focus();
    };
    var go = function (dir) {
      current = (current + dir + figures.length) % figures.length;
      render();
    };

    figures.forEach(function (fig, i) {
      fig.addEventListener("click", function () {
        open(i);
      });
      fig.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          open(i);
        }
      });
    });
    document.getElementById("lb-close").addEventListener("click", close);
    document.getElementById("lb-prev").addEventListener("click", function () {
      go(-1);
    });
    document.getElementById("lb-next").addEventListener("click", function () {
      go(1);
    });
    lb.addEventListener("click", function (e) {
      if (e.target === lb) close();
    });
    document.addEventListener("keydown", function (e) {
      if (!lb.classList.contains("is-open")) return;
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
    });
  }

  /* ---- Formulário de contato (Web3Forms via AJAX) -------------------- */
  var form = document.getElementById("contact-form");
  if (form) {
    var statusEl = document.getElementById("form-status");
    var submitBtn = document.getElementById("form-submit");
    var accessKey = form.getAttribute("data-access-key") || "";

    var showStatus = function (msg, ok) {
      statusEl.textContent = msg;
      statusEl.className =
        "form-status is-visible " + (ok ? "is-success" : "is-error");
    };

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      // honeypot
      if (form.querySelector('[name="botcheck"]').value) return;

      // validação nativa
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      // chave ainda não configurada
      if (!accessKey || accessKey.indexOf("<<") === 0) {
        showStatus(
          "Formulário ainda não configurado. Use o WhatsApp ou o e-mail acima, ou configure a chave do Web3Forms (veja o README).",
          false
        );
        return;
      }

      var data = Object.fromEntries(new FormData(form).entries());
      submitBtn.disabled = true;
      var originalText = submitBtn.textContent;
      submitBtn.textContent = "Enviando…";

      fetch(form.action, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(data),
      })
        .then(function (r) {
          return r.json();
        })
        .then(function (res) {
          if (res.success) {
            showStatus(
              "Mensagem enviada com sucesso! Em breve entraremos em contato. Obrigado.",
              true
            );
            form.reset();
          } else {
            showStatus(
              "Não foi possível enviar agora. Tente novamente ou fale pelo WhatsApp.",
              false
            );
          }
        })
        .catch(function () {
          showStatus(
            "Erro de conexão. Tente novamente ou fale pelo WhatsApp.",
            false
          );
        })
        .finally(function () {
          submitBtn.disabled = false;
          submitBtn.textContent = originalText;
        });
    });
  }
})();
