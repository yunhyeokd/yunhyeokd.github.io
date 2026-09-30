// Shared site header. Loaded in <head> so <site-header> is filled in as soon as the parser reaches it.
(function () {
  var html = `
    <header class="site-header">
      <nav class="nav">
        <div class="nav-id">
          <button class="nav-avatar-btn" type="button" aria-label="프로필 사진 크게 보기">
            <img class="nav-avatar" src="images/profile.jpg" alt="" />
          </button>
          <a class="nav-name" href="index.html#top">yunhyeokd</a>
        </div>
        <div class="nav-links">
          <a href="index.html#projects">프로젝트</a>
          <a href="index.html#skills">기술</a>
          <a href="index.html#history">이력</a>
          <a href="index.html#contact">연락처</a>
        </div>
        <button class="theme-toggle" id="themeToggle" type="button" aria-label="테마 전환">
          <svg class="icon-sun" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="4"></circle>
            <line x1="12" y1="2" x2="12" y2="4"></line>
            <line x1="12" y1="20" x2="12" y2="22"></line>
            <line x1="4.93" y1="4.93" x2="6.34" y2="6.34"></line>
            <line x1="17.66" y1="17.66" x2="19.07" y2="19.07"></line>
            <line x1="2" y1="12" x2="4" y2="12"></line>
            <line x1="20" y1="12" x2="22" y2="12"></line>
            <line x1="4.93" y1="19.07" x2="6.34" y2="17.66"></line>
            <line x1="17.66" y1="6.34" x2="19.07" y2="4.93"></line>
          </svg>
          <svg class="icon-moon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
        </button>
      </nav>
      <dialog class="photo-dialog" aria-label="프로필 사진">
        <img src="images/profile.jpg" alt="도윤혁 프로필 사진" />
        <button class="photo-close" type="button" aria-label="닫기">&times;</button>
      </dialog>
    </header>`;

  customElements.define(
    "site-header",
    class extends HTMLElement {
      connectedCallback() {
        this.innerHTML = html;

        var dialog = this.querySelector(".photo-dialog");
        this.querySelector(".nav-avatar-btn").addEventListener(
          "click",
          function () {
            dialog.showModal();
          },
        );
        this.querySelector(".photo-close").addEventListener(
          "click",
          function () {
            dialog.close();
          },
        );
        // A click that lands on the dialog itself (not the photo) is a click on the backdrop.
        dialog.addEventListener("click", function (e) {
          if (e.target === dialog) dialog.close();
        });
      }
    },
  );
})();
