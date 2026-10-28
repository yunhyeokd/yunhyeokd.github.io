(function () {
  var root = document.documentElement;
  var toggle = document.getElementById("themeToggle");
  var media = window.matchMedia("(prefers-color-scheme: dark)");

  function currentTheme() {
    try {
      var stored = localStorage.getItem("theme");
      if (stored === "light" || stored === "dark") return stored;
    } catch (error) {}
    return media.matches ? "dark" : "light";
  }
  function updateThemeLabel() {
    if (toggle) toggle.setAttribute("aria-label", currentTheme() === "dark" ? "라이트 테마로 전환" : "다크 테마로 전환");
  }
  updateThemeLabel();
  if (toggle) toggle.addEventListener("click", function () {
    var next = currentTheme() === "dark" ? "light" : "dark";
    try { localStorage.setItem("theme", next); } catch (error) {}
    root.setAttribute("data-theme", next);
    updateThemeLabel();
  });
  if (media.addEventListener) media.addEventListener("change", updateThemeLabel);

  var progress = document.createElement("div");
  progress.className = "reading-progress";
  progress.setAttribute("aria-hidden", "true");
  document.body.appendChild(progress);

  var wrap = document.querySelector(".case-study .wrap");
  var sections = [];
  var tocLinks = [];
  if (wrap) {
    sections = Array.prototype.filter.call(wrap.children, function (child) {
      return child.tagName === "SECTION" && child.id && child.querySelector("h2");
    });
    if (sections.length > 1) {
      var toc = document.createElement("nav");
      toc.className = "case-toc";
      toc.setAttribute("aria-label", "프로젝트 목차");
      var label = document.createElement("p");
      label.textContent = "이 페이지에서";
      toc.appendChild(label);
      sections.forEach(function (section, index) {
        var link = document.createElement("a");
        link.href = "#" + section.id;
        var number = document.createElement("span");
        number.textContent = String(index + 1).padStart(2, "0");
        link.appendChild(number);
        link.appendChild(document.createTextNode(section.querySelector("h2").textContent.trim()));
        toc.appendChild(link);
        tocLinks.push(link);
      });
      wrap.classList.add("has-toc");
      wrap.insertBefore(toc, sections[0]);
    }
  }

  var ticking = false;
  function updateScrollState() {
    var max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.transform = "scaleX(" + (max > 0 ? Math.min(1, window.scrollY / max) : 0) + ")";
    if (tocLinks.length) {
      var active = 0;
      sections.forEach(function (section, index) {
        if (section.getBoundingClientRect().top <= window.innerHeight * .35) active = index;
      });
      tocLinks.forEach(function (link, index) {
        link.classList.toggle("active", index === active);
        if (index === active) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });
    }
    ticking = false;
  }
  window.addEventListener("scroll", function () {
    if (!ticking) { requestAnimationFrame(updateScrollState); ticking = true; }
  }, { passive: true });
  window.addEventListener("resize", updateScrollState);
  updateScrollState();
})();
