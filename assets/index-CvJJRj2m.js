(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))d(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const f of i.addedNodes)f.tagName==="LINK"&&f.rel==="modulepreload"&&d(f)}).observe(document,{childList:!0,subtree:!0});function n(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function d(s){if(s.ep)return;s.ep=!0;const i=n(s);fetch(s.href,i)}})();let a=document;const c=a.querySelector(".header__toggle-theme");let l=a.querySelector(".extensions__list");const u=a.querySelectorAll(".filter__btn"),g='<svg id="moon-icon"><use xlink:href="#sun"></use></svg>',v='<svg id="moon-icon"><use xlink:href="#moon"></use></svg>';let o=[],r=[],h;c.addEventListener("click",e=>{a.documentElement.classList.toggle("dark"),a.documentElement.classList.contains("dark")?(localStorage.setItem("theme","dark"),c.innerHTML=g):(localStorage.setItem("theme","light"),c.innerHTML=v)});async function x(){try{const e=await fetch("./data.json");if(!e.ok)throw new Error("Fetch Error :(");const t=await e.json();o=JSON.parse(localStorage.getItem("allExtensions"))||t,r=o;const n=localStorage.getItem("selectedFilter")||"all";m(n)}catch(e){console.warn(e)}}function _(e){if(l.innerHTML="",!e.length){l.insertAdjacentHTML("beforeend",`<div class="empty-state" role="status" aria-live="polite">
          <div class="empty-state__icon-wrap">
            <div class="empty-state__icon-bg">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"
                stroke-linejoin="round" aria-hidden="true">
                <path
                  d="M20.5 11H19V7a2 2 0 0 0-2-2h-4V3.5a2.5 2.5 0 0 0-5 0V5H4a2 2 0 0 0-2 2v3.8h1.5a2.5 2.5 0 0 1 0 5H2V20a2 2 0 0 0 2 2h3.8v-1.5a2.5 2.5 0 0 1 5 0V22H17a2 2 0 0 0 2-2v-4h1.5a2.5 2.5 0 0 0 0-5Z" />
              </svg>
            </div>
          </div>

          <h2 class="empty-state__title">No extensions here</h2>
          <p class="empty-state__desc">
            There are no extensions matching this filter right now.
            Try switching to a different category.
          </p>

        </div>`);return}let t="";e.forEach(n=>{t+=`<div class="extension-card">
          <div class="extension-card__info">
            <img src="${n.logo}" alt="${n.name}">
            <div class="extension-card__texts">
              <h2 class="extension-card__name">${n.name}</h2>
              <p class="extension-card__description">${n.description}</p>
            </div>
          </div>
          <div class="extension-card__actions">
            <button class="btn extension-card__remove" data-name="${n.name}">Remove</button>
            <label class="extension-card__toggle">
              <input type="checkbox" class="extension-card__checkbox" data-name="${n.name}" ${n.isActive?"checked":""} aria-label="Switch-active/inactive">
              <span class="extension-card__slider extension-card__round"></span>
            </label>
          </div>
        </div>`}),l.innerHTML=t}function m(e){h=e,localStorage.setItem("selectedFilter",e),e==="all"?r=o:e==="active"?r=o.filter(t=>t.isActive===!0):e==="inactive"&&(r=o.filter(t=>t.isActive===!1)),p(e),_(r)}function p(e){u.forEach(t=>{t.classList.remove("filter-btn--active"),t.getAttribute("data-filter")===e&&t.classList.add("filter-btn--active")})}u.forEach(e=>{e.addEventListener("click",t=>{m(t.target.dataset.filter)})});l.addEventListener("change",e=>{e.target.classList.contains("extension-card__checkbox")&&(E(e),localStorage.setItem("allExtensions",JSON.stringify(o)),_(r))});l.addEventListener("click",e=>{e.target.classList.contains("extension-card__remove")&&(L(e),localStorage.setItem("allExtensions",JSON.stringify(o)),m(h))});function L(e){const t=e.target.dataset.name;o=o.filter(n=>n.name!==t)}function E(e){const t=e.target.dataset.name,n=o.find(d=>d.name===t);n.isActive=!n.isActive}window.addEventListener("DOMContentLoaded",()=>{localStorage.getItem("theme")==="dark"?(a.documentElement.classList.add("dark"),c.innerHTML=g):(a.documentElement.classList.remove("dark"),c.innerHTML=v),x()});
