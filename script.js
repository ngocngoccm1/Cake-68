'use strict';

const sidebar = document.querySelector('.sidebar');
const menuOpen = document.querySelector('.menu-open');
const menuClose = document.querySelector('.menu-close');
const backdrop = document.querySelector('.menu-backdrop');
const main = document.querySelector('main');
const mobileBar = document.querySelector('.mobile-bar');
const mobileQuery = window.matchMedia('(max-width: 1023px)');
let menuIsOpen = false;

function setMenu(open, restoreFocus = true) {
  menuIsOpen = open && mobileQuery.matches;
  document.body.classList.toggle('menu-is-open', menuIsOpen);
  menuOpen.setAttribute('aria-expanded', String(menuIsOpen));
  sidebar.inert = mobileQuery.matches && !menuIsOpen;
  main.inert = menuIsOpen;
  mobileBar.inert = menuIsOpen;
  if (menuIsOpen) {
    sidebar.setAttribute('role', 'dialog');
    sidebar.setAttribute('aria-modal', 'true');
    menuClose.focus();
  } else {
    sidebar.removeAttribute('role');
    sidebar.removeAttribute('aria-modal');
    if (restoreFocus && mobileQuery.matches) menuOpen.focus();
  }
}
menuOpen.addEventListener('click', () => setMenu(true));
menuClose.addEventListener('click', () => setMenu(false));
backdrop.addEventListener('click', () => setMenu(false));
sidebar.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  if (menuIsOpen) setMenu(false);
}));
mobileQuery.addEventListener('change', () => setMenu(false, false));
setMenu(false, false);

document.addEventListener('keydown', event => {
  if (!menuIsOpen) return;
  if (event.key === 'Escape') { event.preventDefault(); setMenu(false); }
  if (event.key === 'Tab') {
    const focusable = [...sidebar.querySelectorAll('a, button')].filter(el => el.getClientRects().length);
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  }
});

// Keep the current location visible in the navigation at every viewport size.
const navLinks = [...document.querySelectorAll('.nav-link')];
const sections = [...document.querySelectorAll('.observed-section')];
let scrollScheduled = false;
function updateActiveSection() {
  const marker = window.innerHeight * .3;
  let current = sections[0];
  sections.forEach(section => { if (section.getBoundingClientRect().top <= marker) current = section; });
  if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 6) current = sections[sections.length - 1];
  navLinks.forEach(link => {
    const active = link.hash === '#' + current.id;
    link.classList.toggle('active', active);
    if (active) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
  scrollScheduled = false;
}
window.addEventListener('scroll', () => {
  if (!scrollScheduled) { requestAnimationFrame(updateActiveSection); scrollScheduled = true; }
}, { passive: true });
window.addEventListener('resize', updateActiveSection);
updateActiveSection();

// Every cake remains available in the HTML when JavaScript is disabled.
const tabs = [...document.querySelectorAll('.cake-tab')];
const panels = [...document.querySelectorAll('.cake-panel')];
const categoryImage = document.getElementById('category-image');
const categoryCaption = document.getElementById('category-caption');
const categories = [
  { image: 'wedding', alt: 'Kakkuidea: kaksikerroksinen hääkakku vaaleilla kukilla', caption: 'JUHLAN NÄKÖINEN KAKKU' },
  { image: 'mousse', alt: 'Kakkuidea: suklaamoussekakku vadelmilla', caption: 'HETKI HERKUTTELULLE' },
  { image: 'hero', alt: 'Kakkuidea: vaalea juhlakakku marjoilla ja rusetilla; kuva ei esitä erityisruokavaliotuotetta', caption: 'SINUN TOIVEESI MUKAAN' },
  { image: 'craft', alt: 'Kuvitus: kakun valkoisia koristeita pursotetaan käsin', caption: 'KAUNEUS ON YKSITYISKOHDISSA' }
];
function selectTab(index, focus = false) {
  tabs.forEach((tab, i) => {
    const selected = i === index;
    tab.setAttribute('aria-selected', String(selected));
    tab.tabIndex = selected ? 0 : -1;
    panels[i].hidden = !selected;
  });
  const category = categories[index];
  categoryImage.src = './assets/images/' + category.image + '.webp';
  categoryImage.alt = category.alt;
  categoryCaption.textContent = category.caption;
  if (focus) tabs[index].focus();
}
tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => selectTab(index));
  tab.addEventListener('keydown', event => {
    let next;
    if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
    if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = tabs.length - 1;
    if (next !== undefined) { event.preventDefault(); selectTab(next, true); }
  });
});
selectTab(0);

const makeEmail = cake => {
  const subject = 'Kakkutoive – Cake68' + (cake ? ' – ' + cake : '');
  const body = 'Hei Cake68!\n\nHaluaisin kakun juhlaani.\n\nJuhlan ajankohta: \nHenkilömäärä: \nKakkutoive: ' + (cake || '') + '\nMaut ja värit: \nErityisruokavaliot ja allergiat: \n\nNimi ja puhelinnumero: ';
  return 'mailto:cake68fin@gmail.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
};
document.getElementById('email-template').href = makeEmail();
document.querySelectorAll('[data-cake]').forEach(link => { link.href = makeEmail(link.dataset.cake); });

const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const lightboxCaption = document.getElementById('lightbox-caption');
document.querySelectorAll('.gallery-item').forEach(item => {
  item.addEventListener('click', () => {
    lightboxImage.src = item.dataset.image;
    lightboxImage.alt = item.querySelector('img').alt;
    lightboxCaption.textContent = item.dataset.caption;
    lightbox.showModal();
    document.body.classList.add('lightbox-is-open');
  });
});
lightbox.querySelector('.lightbox-close').addEventListener('click', () => lightbox.close());
lightbox.addEventListener('click', event => {
  const rect = lightbox.getBoundingClientRect();
  if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) lightbox.close();
});
lightbox.addEventListener('close', () => document.body.classList.remove('lightbox-is-open'));

const copyButton = document.getElementById('copy-email');
const copyStatus = document.getElementById('copy-status');
copyButton.addEventListener('click', async () => {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText('cake68fin@gmail.com');
    } else {
      const field = document.createElement('textarea');
      field.value = 'cake68fin@gmail.com';
      field.style.cssText = 'position:fixed;left:-9999px;top:0';
      document.body.append(field);
      field.select();
      const copied = document.execCommand('copy');
      field.remove();
      copyButton.focus();
      if (!copied) throw new Error('Clipboard unavailable');
    }
    copyStatus.textContent = 'Sähköpostiosoite kopioitu.';
  } catch {
    copyStatus.textContent = 'Kopioi osoite: cake68fin@gmail.com';
  }
});
document.getElementById('copyright-year').textContent = new Date().getFullYear();

const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
if ('IntersectionObserver' in window && !motionQuery.matches) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
    });
  }, { threshold: .08, rootMargin: '0px 0px 30px 0px' });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  motionQuery.addEventListener('change', () => {
    if (motionQuery.matches) document.querySelectorAll('.reveal').forEach(el => el.classList.add('is-visible'));
  });
} else {
  document.querySelectorAll('.reveal').forEach(el => el.classList.add('is-visible'));
}
document.documentElement.classList.add('js');
