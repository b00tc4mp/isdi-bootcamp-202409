import { useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import useContext from './useContext'

import Product from './components/Product'

import logic from '../logic'

export default function searchProducts({ onProductDetails }) {
  const { alert, confirm } = useContext()
  const [searchParams, setSearchPararms] = useSearchParams()
  const [products, setProducts] = useState([])

  const category = searchParams.get('category')
  const keyword = searchParams.get('keyword') || null

  useEffect(() => {
    console.log(searchParams.toString())
    if (category)
      logic.searchProducts(category, keyword)
        .then(fetchedProducts => {
          setProducts(fetchedProducts)
        })
        .catch(error => {
          alert(error.message)

          console.error(error)
        })
  }, [category, keyword])

  const handleSearch = event => {
    event.preventDefault()

    const form = event.target

    const categoryNew = form.category.value
    const keywordNew = form.keyword.value

    if (categoryNew !== category || keywordNew !== keyword) {
      setSearchPararms({ category: categoryNew, keyword: keywordNew })
    }
  }
  return <main className="pt-10">
    <h2>Search your product</h2>

    <form onSubmit={handleSearch}>
      <select id="category">
        <option value="Rostro">Rostro</option>
        <option value="Mejillas">Mejillas</option>
        <option value="Ojos">Ojos</option>
        <option value="Cejas">Cejas</option>
        <option value="Labios">Labios</option>
      </select>

      <input type="text" placeholder="more info" name="keyword" />

      <button type="submit">Search</button>
    </form>

    <ul>
      {products.length > 0 ? (
        products.map(product => (
          <Product
            key={product.id}
            product={product}
            onProductDetails={onProductDetails}
          />
        ))
      ) : (
        <p>No products found.</p>
      )}
    </ul>
  </main>
}
