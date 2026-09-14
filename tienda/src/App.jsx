import './App.css'

function App() {
  return (
    <main className="inventory-shell">
      <header className="topbar">
        <a className="brand" href="/" aria-label="Inicio de Stockroom"><span className="brand-mark">S</span><span>stockroom</span></a>
        <div className="connection-status"><span /> Base de datos pendiente</div>
      </header>
      <section className="page-heading">
        <div><p className="eyebrow">Operaciones / Inventario</p><h1>Productos</h1><p className="subtitle">Gestiona existencias y mantén tus productos listos para vender.</p></div>
        <button className="primary-button" type="button" disabled><span aria-hidden="true">+</span> Nuevo producto</button>
      </section>
      <section className="metrics" aria-label="Resumen del inventario">
        <div><span>Productos registrados</span><strong>--</strong></div><div><span>Stock bajo</span><strong>--</strong></div><div><span>Valor del inventario</span><strong>--</strong></div><div><span>Última actualización</span><strong>--</strong></div>
      </section>
      <section className="products-panel" aria-labelledby="products-title">
        <div className="panel-toolbar"><div><h2 id="products-title">Todos los productos</h2><span className="record-count">0 registros</span></div><div className="toolbar-actions"><label className="search-field"><span aria-hidden="true">⌕</span><input type="search" placeholder="Buscar producto..." disabled /></label><button className="filter-button" type="button" disabled>Filtrar <span>⌄</span></button></div></div>
        <div className="table-wrap"><table><thead><tr><th>Producto</th><th>SKU</th><th>Categoría</th><th>Precio</th><th>Stock</th><th>Estado</th><th /></tr></thead><tbody><tr><td colSpan="7"><div className="empty-state"><div className="empty-icon">▦</div><h3>Aún no hay productos</h3><p>Conecta tu base de datos para ver aquí tu catálogo.</p><button type="button" className="outline-button" disabled>Conectar base de datos</button></div></td></tr></tbody></table></div>
      </section>
      <footer className="rule-note"><span className="rule-icon">↗</span><p><strong>Reposición automática activa</strong><br />Los productos de $100 o más con menos de 10 unidades se ajustarán automáticamente a 10.</p></footer>
    </main>
  )
}

export default App