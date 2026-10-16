const cards = [...document.querySelectorAll('.property-card')];
const tabs = [...document.querySelectorAll('.property-tabs button')];
const form = document.querySelector('#property-search');
const typeFilter = document.querySelector('#type-filter');
const locationFilter = document.querySelector('#location-filter');
const priceFilter = document.querySelector('#price-filter');
const note = document.querySelector('#results-note');
const empty = document.querySelector('#empty-state');

function applyFilters(type = typeFilter.value, location = locationFilter.value, price = priceFilter.value) {
  const term = location.trim().toLocaleLowerCase('pt-BR');
  const shown = cards.filter(card => {
    const matchesType = type === 'all' || card.dataset.type === type;
    const matchesLocation = !term || card.dataset.location.toLocaleLowerCase('pt-BR').includes(term);
    const matchesPrice = price === 'all' || card.dataset.price === price;
    const show = matchesType && matchesLocation && matchesPrice;
    card.hidden = !show;
    return show;
  });
  note.textContent = `${shown.length} ${shown.length === 1 ? 'imóvel encontrado' : 'imóveis encontrados'}`;
  empty.hidden = shown.length !== 0;
}

tabs.forEach(tab => tab.addEventListener('click', () => {
  tabs.forEach(item => item.classList.remove('active'));
  tab.classList.add('active');
  typeFilter.value = tab.dataset.filter;
  applyFilters();
}));

form.addEventListener('submit', event => {
  event.preventDefault();
  tabs.forEach(tab => tab.classList.toggle('active', tab.dataset.filter === typeFilter.value));
  applyFilters();
  document.querySelector('#imoveis').scrollIntoView({behavior: 'smooth', block: 'start'});
});

document.querySelectorAll('.favorite').forEach(button => button.addEventListener('click', () => {
  button.classList.toggle('saved');
  button.textContent = button.classList.contains('saved') ? '♥' : '♡';
  button.setAttribute('aria-label', button.classList.contains('saved') ? 'Imóvel salvo' : 'Salvar imóvel');
}));

const toggle = document.querySelector('.menu-toggle');
const links = document.querySelector('.nav-links');
toggle?.addEventListener('click', () => {
  const open = links.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(open));
  toggle.querySelector('span').textContent = open ? '−' : '+';
});
links?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  links.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); toggle.querySelector('span').textContent = '+';
}));
