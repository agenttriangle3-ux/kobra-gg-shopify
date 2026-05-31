/* ============================================================
   KOBRA.GG SHOPIFY THEME — theme.js
   Vanilla JS, no external dependencies
   ============================================================ */

'use strict';

// ============================================================
// PROMO BANNER — close + localStorage
// ============================================================
(function () {
  var banner = document.getElementById('promo-banner');
  var closeBtn = document.getElementById('promo-banner-close');
  if (!banner || !closeBtn) return;

  var STORAGE_KEY = 'kobra_banner_closed';

  if (localStorage.getItem(STORAGE_KEY) === '1') {
    banner.style.display = 'none';
    return;
  }

  closeBtn.addEventListener('click', function () {
    banner.style.display = 'none';
    try { localStorage.setItem(STORAGE_KEY, '1'); } catch (e) {}
  });
})();

// ============================================================
// HEADER — sticky scroll class + search toggle
// ============================================================
(function () {
  var header = document.getElementById('site-header');
  if (header) {
    window.addEventListener('scroll', function () {
      header.classList.toggle('site-header--scrolled', window.scrollY > 50);
    }, { passive: true });
  }

  // Search toggle
  var searchToggle = document.getElementById('search-toggle');
  var searchBar = document.getElementById('search-bar');
  var searchClose = document.getElementById('search-close');
  var searchInput = document.getElementById('search-input');

  function openSearch() {
    if (!searchBar) return;
    searchBar.setAttribute('aria-hidden', 'false');
    if (searchInput) searchInput.focus();
  }
  function closeSearch() {
    if (!searchBar) return;
    searchBar.setAttribute('aria-hidden', 'true');
  }

  if (searchToggle) searchToggle.addEventListener('click', openSearch);
  if (searchClose) searchClose.addEventListener('click', closeSearch);

  // Predictive search
  var searchResults = document.getElementById('search-results');
  if (searchInput && searchResults) {
    var searchTimer;
    searchInput.addEventListener('input', function () {
      clearTimeout(searchTimer);
      var query = this.value.trim();
      if (query.length < 2) { searchResults.innerHTML = ''; return; }
      searchTimer = setTimeout(function () {
        fetch('/search/suggest.json?q=' + encodeURIComponent(query) + '&resources[type]=product&resources[limit]=5')
          .then(function (r) { return r.json(); })
          .then(function (data) {
            var products = (data.resources && data.resources.results && data.resources.results.products) || [];
            if (!products.length) { searchResults.innerHTML = '<p style="padding:8px;font-size:13px;color:#9ca3af">Nessun risultato</p>'; return; }
            searchResults.innerHTML = products.map(function (p) {
              return '<a href="' + p.url + '" style="display:flex;align-items:center;gap:10px;padding:8px;border-radius:6px;font-size:14px;" onmouseover="this.style.background=\'#1a1a1a\'" onmouseout="this.style.background=\'\'">' +
                (p.featured_image ? '<img src="' + p.featured_image + '" style="width:40px;height:40px;object-fit:cover;border-radius:4px">' : '') +
                '<span>' + p.title + '</span></a>';
            }).join('');
          })
          .catch(function () {});
      }, 280);
    });
  }

  // Close search on Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeSearch();
  });
})();

// ============================================================
// MOBILE MENU
// ============================================================
(function () {
  var openBtn = document.getElementById('mobile-menu-open');
  var closeBtn = document.getElementById('mobile-menu-close');
  var overlay = document.getElementById('mobile-menu-overlay');
  var menu = document.getElementById('mobile-menu');
  if (!menu) return;

  function openMenu() {
    menu.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    if (openBtn) openBtn.setAttribute('aria-expanded', 'true');
  }
  function closeMenu() {
    menu.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (openBtn) openBtn.setAttribute('aria-expanded', 'false');
  }

  if (openBtn) openBtn.addEventListener('click', openMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);
  if (overlay) overlay.addEventListener('click', closeMenu);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMenu();
  });
})();

// ============================================================
// CART DRAWER
// ============================================================
(function () {
  var drawer = document.getElementById('cart-drawer');
  var openBtn = document.getElementById('cart-drawer-open');
  var closeBtn = document.getElementById('cart-drawer-close');
  var overlay = document.getElementById('cart-drawer-overlay');
  var body = document.getElementById('cart-drawer-body');
  var footer = document.getElementById('cart-drawer-footer');
  var subtotalEl = document.getElementById('cart-drawer-subtotal');
  var cartCount = document.getElementById('cart-count');
  if (!drawer) return;

  function openDrawer() {
    loadCart();
    drawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
  function closeDrawer() {
    drawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (openBtn) openBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  if (overlay) overlay.addEventListener('click', closeDrawer);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeDrawer(); });

  function formatMoney(cents) {
    return '€' + (cents / 100).toFixed(2).replace('.', ',');
  }

  function updateCount(count) {
    if (!cartCount) return;
    cartCount.textContent = count;
    cartCount.classList.toggle('hidden', count === 0);
  }

  function loadCart() {
    if (!body) return;
    fetch('/cart.js')
      .then(function (r) { return r.json(); })
      .then(function (cart) {
        updateCount(cart.item_count);
        if (cart.item_count === 0) {
          body.innerHTML = '<div style="text-align:center;padding:40px 20px"><div style="font-size:48px;margin-bottom:16px">🛒</div><p style="color:#9ca3af">Il carrello è vuoto</p><a href="/collections/all" style="display:inline-block;margin-top:16px;color:#39FF14;text-decoration:underline">Esplora i prodotti</a></div>';
          if (footer) footer.style.display = 'none';
          return;
        }
        if (footer) footer.style.display = 'block';
        if (subtotalEl) subtotalEl.textContent = formatMoney(cart.total_price);
        body.innerHTML = cart.items.map(function (item) {
          return '<div class="cart-drawer__item">' +
            (item.image ? '<img src="' + item.image + '" class="cart-drawer__item-img" alt="' + (item.product_title || '') + '">' : '') +
            '<div class="cart-drawer__item-info">' +
            '<p class="cart-drawer__item-title">' + item.product_title + '</p>' +
            (item.variant_title && item.variant_title !== 'Default Title' ? '<p class="cart-drawer__item-variant">' + item.variant_title + '</p>' : '') +
            '<p class="cart-drawer__item-price">' + formatMoney(item.final_price) + '</p>' +
            '<button class="cart-drawer__item-remove" data-line="' + item.key + '" onclick="window.kobraRemoveFromCart(this)">Rimuovi</button>' +
            '</div></div>';
        }).join('');
      })
      .catch(function () { if (body) body.innerHTML = '<p style="padding:16px;color:#9ca3af">Errore caricamento carrello</p>'; });
  }

  window.kobraRemoveFromCart = function (btn) {
    var key = btn.getAttribute('data-line');
    fetch('/cart/change.js', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: key, quantity: 0 })
    }).then(function () { loadCart(); }).catch(function () {});
  };

  // AJAX Add to Cart for product-card forms
  document.addEventListener('submit', function (e) {
    var form = e.target;
    if (!form.action || form.action.indexOf('/cart/add') === -1) return;
    e.preventDefault();
    var data = new FormData(form);
    fetch('/cart/add.js', {
      method: 'POST',
      body: data
    }).then(function (r) { return r.json(); })
      .then(function () {
        loadCart();
        openDrawer();
      })
      .catch(function () { form.submit(); });
  });

  // Load count on page load
  fetch('/cart.js')
    .then(function (r) { return r.json(); })
    .then(function (cart) { updateCount(cart.item_count); })
    .catch(function () {});
})();

// ============================================================
// PRODUCT PAGE — Gallery, Variants, Quantity, Tabs
// ============================================================
(function () {
  // Gallery thumbnails
  var thumbs = document.querySelectorAll('.product-gallery__thumb');
  var mainImg = document.getElementById('product-main-image');
  thumbs.forEach(function (thumb) {
    thumb.addEventListener('click', function () {
      if (mainImg) {
        mainImg.src = this.getAttribute('data-image-url');
        mainImg.alt = this.getAttribute('data-image-alt');
      }
      thumbs.forEach(function (t) { t.classList.remove('active'); });
      this.classList.add('active');
    });
  });

  // Quantity selectors (all pages)
  document.querySelectorAll('.quantity-selector').forEach(function (qs) {
    var input = qs.querySelector('.quantity-selector__input');
    qs.querySelectorAll('.quantity-selector__btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        if (!input) return;
        var val = parseInt(input.value, 10) || 1;
        var action = this.getAttribute('data-action');
        if (action === 'decrease') val = Math.max(1, val - 1);
        if (action === 'increase') val = Math.min(99, val + 1);
        input.value = val;
      });
    });
  });

  // Product tabs
  var tabs = document.querySelectorAll('.product-tabs__tab');
  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      var target = this.getAttribute('data-tab');
      tabs.forEach(function (t) { t.classList.remove('active'); t.setAttribute('aria-selected', 'false'); });
      document.querySelectorAll('.product-tabs__panel').forEach(function (p) { p.classList.remove('active'); });
      this.classList.add('active');
      this.setAttribute('aria-selected', 'true');
      var panel = document.getElementById('tab-' + target);
      if (panel) panel.classList.add('active');
    });
  });

  // Variant selector → update hidden input
  document.querySelectorAll('.product-option__input').forEach(function (input) {
    input.addEventListener('change', function () {
      updateSelectedVariant();
    });
  });

  function updateSelectedVariant() {
    // Build selected options array
    var options = [];
    document.querySelectorAll('.product-option__values').forEach(function (optGroup) {
      var checked = optGroup.querySelector('.product-option__input:checked');
      if (checked) options.push(checked.value);
    });

    // Find matching variant from page JSON (Shopify injects product JSON via script tag)
    var productJSON = document.getElementById('product-json');
    if (!productJSON) return;
    try {
      var product = JSON.parse(productJSON.textContent);
      var variant = product.variants.find(function (v) {
        return v.options.every(function (opt, i) { return opt === options[i]; });
      });
      if (variant) {
        var variantInput = document.getElementById('variant-id');
        if (variantInput) variantInput.value = variant.id;
        // Update price display
        var priceEl = document.querySelector('#product-price .price__current');
        var compareEl = document.querySelector('#product-price .price__compare');
        if (priceEl) priceEl.textContent = '€' + (variant.price / 100).toFixed(2).replace('.', ',');
        if (compareEl) {
          if (variant.compare_at_price > variant.price) {
            compareEl.textContent = '€' + (variant.compare_at_price / 100).toFixed(2).replace('.', ',');
            compareEl.style.display = '';
          } else {
            compareEl.style.display = 'none';
          }
        }
        var atcBtn = document.getElementById('atc-btn');
        if (atcBtn) {
          atcBtn.disabled = !variant.available;
          atcBtn.querySelector('span').textContent = variant.available ? 'Aggiungi al Carrello' : 'Prodotto Esaurito';
        }
      }
    } catch (e) {}
  }
})();

// ============================================================
// SMOOTH SCROLL for anchor links
// ============================================================
document.querySelectorAll('a[href^="#"]').forEach(function (a) {
  a.addEventListener('click', function (e) {
    var target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
