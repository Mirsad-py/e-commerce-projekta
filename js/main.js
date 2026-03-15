// =============================
// Konstante / promenljive
// =============================

const PRODUCT1_NAME = "Blazer";
const PRODUCT1_PRICE = 4500;
let PRODUCT1_QTY = 1;

const PRODUCT2_NAME = "Wool Sweater";
const PRODUCT2_PRICE = 3200;
let PRODUCT2_QTY = 0;

const VAT_RATE = 0.2;
const CURRENCY = "USD";
const USD_PER_EUR = 1.16;

// ==========
// Kuponi
// ==========

// Sve vrednosti su već normalizovane
const VALID_COUPONS = ["SAVE10", "SAVE15", "FREESHIP"];
// Samoprovera u konzoli:
console.log(VALID_COUPONS);

// Različita poruka za svaki kupon
const COUPON_MESSAGES = {
  SAVE10: "Vaš kupon donosi 10% popusta.",
  SAVE15: "Vaš kupon donosi 15% popusta.",
  FREESHIP: "Vaš kupon donosi besplatnu dostavu.",
};

console.log("typeof PRODUCT1_NAME =", typeof PRODUCT1_NAME);
console.log("typeof PRODUCT1_PRICE =", typeof PRODUCT1_PRICE);
console.log("typeof VAT_RATE =", typeof VAT_RATE);

// =============================
// Globalni iznos kupovine
// =============================

let iznos = 0; // u $

function dodajNaIznos(cena) {
  try {
    const num = Number(cena);
    if (Number.isNaN(num)) {
      throw new Error("Cena nije validan broj.");
    }
    iznos += num;
    console.log("Iznos nakon dodavanja:", iznos);
  } catch (err) {
    console.error("Greška u dodajNaIznos:", err.message);
  }
}

// Rad funkcije (3 poziva) + ispis
(function demoDodajNaIznos() {
  const old = iznos;
  iznos = 0;
  dodajNaIznos(10);
  dodajNaIznos(5.5);
  dodajNaIznos(23);
  // reset na početnu vrednost nakon demonstracije
  iznos = old;
})();

const RSD_PER_USD = 110; // fiksni kurs, za potrebe zadatka

function usdToRsd(usd) {
  return Number(usd) * RSD_PER_USD;
}

function rsdToUsd(rsd) {
  return Number(rsd) / RSD_PER_USD;
}

function openCart() {
  const usd = Number(iznos);
  const rsd = usdToRsd(usd);
  alert(
    `Trenutni ukupni iznos porudžbine je: ${usd.toFixed(2)} $ (${rsd.toFixed(2)} RSD)`,
  );
}

// =============================
// normalizeCoupon
// =============================

function normalizeCoupon(code) {
  // ukloniti razmake
  code = String(code).trim();
  // prebaciti u velika slova
  code = code.toUpperCase();
  // vratiti modifikovani kupon
  return code;
}

// =============================
// isValidCoupon
// =============================

function isValidCoupon(code) {
  for (let i = 0; i < VALID_COUPONS.length; i++) {
    if (VALID_COUPONS[i] === code) return true;
  }
  return false;
}

// =============================
// validateAndNotify
// =============================

function validateAndNotify() {
  const el = document.getElementById("promo-input");
  const inputCode = el ? el.value : "";
  const normalized = normalizeCoupon(inputCode);

  if (!normalized) {
    alert("Molimo unesite promo kod.");
    return;
  }

  if (isValidCoupon(normalized)) {
    alert(COUPON_MESSAGES[normalized] || "Uneti kod je validan.");
  } else {
    alert("Uneti kod nije validan.");
  }
}

// =============================
// Proizvodi (lager)
// =============================

const allProducts = [
  { name: "Blazer", price: 4500, qty: 12 },
  { name: "Wool Sweater", price: 3200, qty: 6 },
  { name: "Midi Coat", price: 7800, qty: 9 },
  { name: "Retro Jeans", price: 5100, qty: 14 },
  { name: "Denim Shirt", price: 2900, qty: 7 },
  { name: "Knit Sweater Vest", price: 2600, qty: 18 },
  { name: "Belted Coat", price: 9200, qty: 4 },
  { name: "Chunky Knit Sweater", price: 4100, qty: 11 },
];

function calcTotalInventoryValue(list) {
  let totalValue = 0;

  const arr = Array.isArray(list) ? list : Object.values(list || {});
  for (const p of arr) {
    totalValue += Number(p.price) * Number(p.qty);
  }

  console.log(`Ukupna vrednost lagera: ${totalValue} ${CURRENCY}`);
  return totalValue;
}

//  lowStock (qty < 10)
const lowStock = allProducts.filter((p) => Number(p.qty) < 10);
console.log("Low stock proizvodi (qty < 10):", lowStock);

// Pretraga po nazivu (case-insensitive)
function findProductByName(list, searchName) {
  if (!searchName) return null;
  const needle = String(searchName).trim().toLowerCase();
  if (!needle) return null;

  const arr = Array.isArray(list) ? list : Object.values(list || {});
  for (const p of arr) {
    if (!p || typeof p.name !== "string") continue;
    if (p.name.trim().toLowerCase() === needle) return p;
  }
  return null;
}

// Test
calcTotalInventoryValue(allProducts);
console.log(
  "findProductByName(allProducts, 'blazer') =>",
  findProductByName(allProducts, "blazer"),
);
console.log(
  "findProductByName(allProducts, 'Not existing') =>",
  findProductByName(allProducts, "Not existing"),
);

// =============================
// login
// =============================

function login() {
  const emailEl = document.getElementById("email");
  const passEl = document.getElementById("password");

  const email = (emailEl ? emailEl.value : "").trim();
  const password = (passEl ? passEl.value : "").trim();

  // oba moraju biti "admin"
  return email === "admin" && password === "admin";
}

function handleLoginSubmit(event) {
  event.preventDefault();

  if (login()) {
    alert("Login uspešan!");
  } else {
    alert("Pogrešan email ili lozinka!");
  }

  return false;
}

window.dodajNaIznos = dodajNaIznos;
window.openCart = openCart;
window.normalizeCoupon = normalizeCoupon;
window.isValidCoupon = isValidCoupon;
window.validateAndNotify = validateAndNotify;
window.allProducts = allProducts;
window.calcTotalInventoryValue = calcTotalInventoryValue;
window.lowStock = lowStock;
window.findProductByName = findProductByName;
window.login = login;
window.handleLoginSubmit = handleLoginSubmit;
