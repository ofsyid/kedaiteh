// ==========================================
// DATA KERANJANG
// ==========================================

let cart = [];

// ==========================================
// FORMAT RUPIAH
// ==========================================

function rupiah(number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(number);
}

// ==========================================
// TAMBAH PRODUK
// ==========================================

function addToCart(name, price) {
  let product = cart.find((item) => item.name === name);

  if (product) {
    product.quantity++;
  } else {
    cart.push({
      name: name,
      price: price,
      quantity: 1,
    });
  }

  updateCart();

  openCart();
}

// ==========================================
// UPDATE KERANJANG
// ==========================================

function updateCart() {
  const cartItems = document.getElementById("cartItems");

  const cartCount = document.getElementById("cartCount");

  const totalPrice = document.getElementById("totalPrice");

  // TOTAL ITEM

  let totalItem = cart.reduce((total, item) => total + item.quantity, 0);

  cartCount.textContent = totalItem;

  // KOSONG

  if (cart.length === 0) {
    cartItems.innerHTML = `
            <p class="empty">
                Keranjang masih kosong 🍃
            </p>
        `;

    totalPrice.textContent = "Rp0";

    return;
  }

  // PRODUK

  cartItems.innerHTML = cart
    .map((item, index) => {
      return `
                <div class="cart-item">

                    <div>

                        <b>
                            ${item.name}
                        </b>

                        <small>
                            ${item.quantity}
                            ×
                            ${rupiah(item.price)}
                        </small>

                    </div>

                    <button
                        class="remove"
                        onclick="removeItem(${index})">

                        Hapus

                    </button>

                </div>
            `;
    })
    .join("");

  // TOTAL HARGA

  let total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  totalPrice.textContent = rupiah(total);
}

// ==========================================
// HAPUS PRODUK
// ==========================================

function removeItem(index) {
  cart.splice(index, 1);

  updateCart();
}

// ==========================================
// BUKA CART
// ==========================================

function openCart() {
  document.getElementById("cart").classList.add("active");

  document.getElementById("overlay").classList.add("active");
}

// ==========================================
// TUTUP CART
// ==========================================

function closeCart() {
  document.getElementById("cart").classList.remove("active");

  document.getElementById("overlay").classList.remove("active");
}

// ==========================================
// FILTER MENU
// ==========================================

const filters = document.querySelectorAll(".filter");

const products = document.querySelectorAll(".product");

filters.forEach((filter) => {
  filter.addEventListener("click", function () {
    // Hapus active

    filters.forEach((button) => {
      button.classList.remove("active");
    });

    // Active button

    this.classList.add("active");

    let category = this.dataset.filter;

    products.forEach((product) => {
      if (category === "all" || product.dataset.category === category) {
        product.style.display = "block";
      } else {
        product.style.display = "none";
      }
    });
  });
});

// ==========================================
// CHECKOUT
// ==========================================

// function checkout() {

//     if (cart.length === 0) {

//         alert(
//             "Keranjang masih kosong 🍃"
//         );

//         return;

//     }

//     let total = cart.reduce(
//         (sum, item) =>
//             sum +
//             item.price *
//             item.quantity,
//         0
//     );

//     alert(
//         "Pesanan berhasil dibuat! 🍵\n\n" +
//         "Total: " +
//         rupiah(total) +
//         "\n\n" +
//         "Ini masih mode demo."
//     );

// }

function checkout() {

    // Cek apakah keranjang kosong
    if (cart.length === 0) {

        alert("Keranjang masih kosong 🍃");

        return;
    }


    // NOMOR WHATSAPP KEDAI
    // Ganti dengan nomor WhatsApp kamu
    // Format: 628xxxxxxxxxx
    const nomorWhatsApp = "6285692809583";


    // Membuat daftar pesanan
    let pesan = "Halo TEAHORA! 🍵\n";
    pesan += "Saya ingin memesan:\n\n";


    let total = 0;


    cart.forEach((item, index) => {

        let subtotal =
            item.price * item.quantity;

        total += subtotal;


        pesan +=
            `${index + 1}. ${item.name}\n`;

        pesan +=
            `   ${item.quantity} x ${rupiah(item.price)} = ${rupiah(subtotal)}\n\n`;

    });


    // Total pembayaran
    pesan += "━━━━━━━━━━━━━━━━━━\n";
    pesan += `TOTAL: ${rupiah(total)}\n`;
    pesan += "━━━━━━━━━━━━━━━━━━\n\n";

    pesan += "Mohon konfirmasi pesanan saya ya. Terima kasih! 🙏";


    // Encode pesan agar aman dimasukkan ke URL
    const pesanEncoded =
        encodeURIComponent(pesan);


    // Membuat link WhatsApp
    const whatsappURL =
        `https://wa.me/${nomorWhatsApp}?text=${pesanEncoded}`;


    // Buka WhatsApp
    window.open(
        whatsappURL,
        "_blank"
    );

}
// ==========================================
// INIT
// ==========================================

updateCart();
