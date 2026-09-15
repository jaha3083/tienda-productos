import { useEffect, useMemo, useState } from 'react'
import './App.css'
import { prepareProducts } from './productRules'

function App() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch('/api/products')
      .then((response) => {
        if (!response.ok) throw new Error('No se pudieron cargar los productos.')
        return response.json()
      })
      .then((data) => setProducts(prepareProducts(data)))
      .catch((requestError) => setError(requestError.message))
      .finally(() => setLoading(false))
  }, [])

  const metrics = useMemo(() => ({
    lowStock: products.filter((product) => product.price >= 100 && product.stock < 10).length,
    value: products.reduce((total, product) => total + product.price * product.stock, 0),
  }), [products])

  const formatCurrency = (value) => new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
  }).format(value)

  const renderProductRows = () => {
    if (error) {
      return (
        <tr>
          <td colSpan="5">
            <div className="empty-state">
              <div className="empty-icon">!</div>
              <h3>No se pudo conectar</h3>
              <p>{error} Revisa tu archivo .env y que MySQL esté activo.</p>
            </div>
          </td>
        </tr>
      )
    }

    if (products.length === 0 && !loading) {
      return (
        <tr>
          <td colSpan="5">
            <div className="empty-state">
              <div className="empty-icon">▦</div>
              <h3>Aún no hay productos</h3>
              <p>Agrega registros a la tabla Products para ver aquí tu catálogo.</p>
            </div>
          </td>
        </tr>
      )
    }

    return products.map((product) => {
      const lowStock = product.price >= 100 && product.stock < 10

      return (
        <tr key={product.id}>
          <td>{product.name}</td>
          <td>{formatCurrency(product.price)}</td>
          <td>{product.stock}</td>
          <td>
            <span className={`stock-status ${lowStock ? 'low' : ''}`}>
              {lowStock ? 'Stock bajo' : 'Disponible'}
            </span>
          </td>
          <td />
        </tr>
      )
    })
  }

  return (
    <main className="inventory-shell">
      <header className="topbar">
        <a className="brand" href="/" aria-label="Inicio de Stockroom">
          <span className="brand-mark">S</span>
          <span>stockroom</span>
        </a>
        <div className={`connection-status ${error ? 'is-error' : ''}`}>
          <span />
          {loading ? 'Conectando...' : error ? 'Error de conexión' : 'Base de datos conectada'}
        </div>
      </header>

      <section className="page-heading">
        <div>
          <p className="eyebrow">Operaciones / Inventario</p>
          <h1>Productos</h1>
          <p className="subtitle">Gestiona existencias y mantén tus productos listos para vender.</p>
        </div>
        <button className="primary-button" type="button" disabled>
          <span aria-hidden="true">+</span>
          Nuevo producto
        </button>
      </section>

      <section className="metrics" aria-label="Resumen del inventario">
        <div>
          <span>Productos registrados</span>
          <strong>{loading ? '--' : products.length}</strong>
        </div>
        <div>
          <span>Stock bajo</span>
          <strong>{loading ? '--' : metrics.lowStock}</strong>
        </div>
        <div>
          <span>Valor del inventario</span>
          <strong>{loading ? '--' : formatCurrency(metrics.value)}</strong>
        </div>
        <div>
          <span>Última actualización</span>
          <strong>{loading ? '--' : 'Ahora'}</strong>
        </div>
      </section>

      <section className="products-panel" aria-labelledby="products-title">
        <div className="panel-toolbar">
          <div>
            <h2 id="products-title">Todos los productos</h2>
            <span className="record-count">
              {loading ? 'Cargando...' : `${products.length} registros`}
            </span>
          </div>
          <div className="toolbar-actions">
            <label className="search-field">
              <span aria-hidden="true">⌕</span>
              <input type="search" placeholder="Buscar producto..." disabled />
            </label>
            <button className="filter-button" type="button" disabled>
              Filtrar <span>⌄</span>
            </button>
          </div>
        </div>

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Producto</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Estado</th>
                <th />
              </tr>
            </thead>
            <tbody>{renderProductRows()}</tbody>
          </table>
        </div>
      </section>

      <footer className="rule-note">
        <span className="rule-icon">!</span>
        <p>
          <strong>Advertencia de stock bajo</strong>
          <br />
          Los productos de $100 o más con menos de 10 unidades aparecen marcados para reponerlos.
        </p>
      </footer>
    </main>
  )
}

export default App