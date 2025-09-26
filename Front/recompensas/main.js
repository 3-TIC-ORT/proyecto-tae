/* Referencias */
const openBtn = document.getElementById('openModal');
const overlay = document.getElementById('modalOverlay');
const modal = overlay.querySelector('.modal');
const closeBtn = document.getElementById('modalClose');
const cancelBtn = document.getElementById('cancelBtn'); // <- si no existe podés borrar esta línea
const recompensas = document.querySelectorAll('.recompensa'); // 👈 seleccionamos los divs
let lastFocusedElement = null;

/* Busca elementos focusables dentro del modal */
function getFocusableElements() {
  const selectors = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex]:not([tabindex="-1"])';
  const nodes = [...modal.querySelectorAll(selectors)];
  return nodes.filter(el => el.offsetWidth || el.offsetHeight || el.getClientRects().length);
}

/* Abrir */
function openModal() {
  lastFocusedElement = document.activeElement;
  overlay.classList.add('is-open');
  overlay.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');

  const focusable = getFocusableElements();
  (focusable.length ? focusable[0] : modal).focus();
}

/* Cerrar */
function closeModal() {
  overlay.classList.remove('is-open');
  overlay.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');

  if (lastFocusedElement) lastFocusedElement.focus();
}

/* Listeners */
openBtn.addEventListener('click', openModal);
closeBtn.addEventListener('click', closeModal);

// 👇 Cierra cuando hago click en cualquier recompensa
recompensas.forEach(div => {
  div.addEventListener('click', closeModal);
});

/* Cerrar si clickean fuera del contenido (overlay) */
overlay.addEventListener('click', (e) => {
  if (e.target === overlay) closeModal();
});
modal.addEventListener('click', (e) => e.stopPropagation());

/* Teclado: Escape para cerrar y trap de Tab */
document.addEventListener('keydown', (e) => {
  if (!overlay.classList.contains('is-open')) return;

  if (e.key === 'Escape') {
    e.preventDefault();
    closeModal();
    return;
  }

  if (e.key === 'Tab') {
    const focusable = getFocusableElements();
    if (focusable.length === 0) {
      e.preventDefault();
      return;
    }
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    } else if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    }
  }
});
