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

// The opening gallery follows the reference's large photo and oval thumbnail ring.
const showcaseImage = document.getElementById('showcase-image');
const showcaseCaption = document.getElementById('showcase-caption');
const orbitCards = [...document.querySelectorAll('.cake-orbit-card')];
const slideButtons = [...document.querySelectorAll('[data-slide]')];
const showcaseSlides = [
  { image: 'mousse', label: 'Moussekakut', alt: 'Inspiraatiokuva: suklaamoussekakku vadelmilla', position: '50% 56%' },
  { image: 'hero', label: 'Juhlakakut', alt: 'Inspiraatiokuva: vaalea juhlakakku marjoilla ja rusetilla', position: '50% 53%' },
  { image: 'wedding', label: 'Hääkakut', alt: 'Inspiraatiokuva: kaksikerroksinen hääkakku vaaleilla kukilla', position: '50% 47%' },
  { image: 'craft', label: 'Käsityön kauneutta', alt: 'Inspiraatiokuva: kakun kermakoristeita pursotetaan käsin', position: '50% 50%' }
];
let showcaseIndex = 0;
let orbitRotation = 0;
let showcaseSlot = 0;
function selectShowcase(index, slot) {
  const next = (index + showcaseSlides.length) % showcaseSlides.length;
  const nextSlot = slot ?? next * 3;
  let distance = nextSlot - showcaseSlot;
  if (distance > 6) distance -= 12;
  if (distance < -6) distance += 12;
  orbitRotation -= distance * 30;
  showcaseSlot = nextSlot;
  showcaseIndex = next;
  const slide = showcaseSlides[next];
  showcaseImage.src = './assets/images/' + slide.image + '.webp';
  showcaseImage.parentElement.style.setProperty('--showcase-background', 'url("./assets/images/' + slide.image + '.webp")');
  showcaseImage.alt = slide.alt;
  showcaseImage.style.objectPosition = slide.position;
  showcaseCaption.replaceChildren(document.createTextNode(slide.label + ' '));
  const counter = document.createElement('span');
  counter.textContent = String(next + 1).padStart(2, '0') + ' / 04';
  showcaseCaption.append(counter);
  slideButtons.forEach(button => button.setAttribute('aria-pressed', String(Number(button.dataset.slot) === nextSlot)));
  orbitCards.forEach(card => {
    const angle = (90 + Number(card.dataset.slot) * 30 + orbitRotation) * Math.PI / 180;
    const depth = (Math.sin(angle) + 1) / 2;
    card.style.left = (50 + Math.cos(angle) * 39) + '%';
    card.style.top = (43 + Math.sin(angle) * 25) + '%';
    card.style.setProperty('--card-scale', .7 + depth * .45);
    card.style.zIndex = String(Math.round(depth * 20) + 1);
  });
}
slideButtons.forEach(button => button.addEventListener('click', () => selectShowcase(Number(button.dataset.slide), Number(button.dataset.slot))));
document.getElementById('showcase-previous').addEventListener('click', () => selectShowcase(showcaseIndex - 1));
document.getElementById('showcase-next').addEventListener('click', () => selectShowcase(showcaseIndex + 1));
document.querySelector('.cake-selector').addEventListener('keydown', event => {
  if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
    event.preventDefault();
    selectShowcase(showcaseIndex + (event.key === 'ArrowRight' ? 1 : -1));
  }
});
let showcaseTouchStart = null;
showcaseImage.addEventListener('touchstart', event => { showcaseTouchStart = event.touches[0].clientX; }, { passive: true });
showcaseImage.addEventListener('touchend', event => {
  if (showcaseTouchStart === null) return;
  const distance = event.changedTouches[0].clientX - showcaseTouchStart;
  if (Math.abs(distance) > 45) selectShowcase(showcaseIndex + (distance < 0 ? 1 : -1));
  showcaseTouchStart = null;
}, { passive: true });
showcaseImage.addEventListener('touchcancel', () => { showcaseTouchStart = null; }, { passive: true });
selectShowcase(0);

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
