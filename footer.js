// Shared site footer. Loaded in <head> alongside header.js so <site-footer> is filled in as it is parsed.
(function () {
  var html = `
    <footer class="site-footer">
      <p>&copy; 2026 yunhyeokd</p>
    </footer>`;

  customElements.define(
    "site-footer",
    class extends HTMLElement {
      connectedCallback() {
        this.innerHTML = html;
      }
    },
  );
})();
