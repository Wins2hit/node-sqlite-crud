const API = 'http://localhost:3000/api/products'; 

const $ = (id) => document.getElementById(id);

async function load() {
  const res = await fetch(API);
  const data = await res.json();
  $('tbody').innerHTML = data.map(p => `
    <tr>
      <td>${p.id}</td>
      <td>${p.product_name}</td>
      <td>${p.category || ''}</td>
      <td>${p.brand || ''}</td>
      <td>${p.price ?? ''}</td>
      <td>${p.stock_quantity ?? ''}</td>
      <td>
        <button onclick='edit(${JSON.stringify(p)})'>Edit</button>
        <button onclick="del(${p.id})">Delete</button>
      </td>
    </tr>`).join('');
}

function edit(p) {
  $('id').value = p.id;
  $('product_name').value = p.product_name;
  $('category').value = p.category || '';
  $('brand').value = p.brand || '';
  $('price').value = p.price ?? '';
  $('stock_quantity').value = p.stock_quantity ?? '';
  $('description').value = p.description || '';
  window.scrollTo(0, 0);
}

async function del(id) {
  if (!confirm('Delete?')) return;
  await fetch(`${API}/${id}`, { method: 'DELETE' });
  load();
}

$('form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const id = $('id').value;
  const body = {
    product_name: $('product_name').value,
    category: $('category').value,
    brand: $('brand').value,
    price: parseFloat($('price').value) || 0,
    stock_quantity: parseInt($('stock_quantity').value) || 0,
    description: $('description').value
  };
  await fetch(id ? `${API}/${id}` : API, {
    method: id ? 'PUT' : 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  $('form').reset();
  $('id').value = '';
  load();
});

load();