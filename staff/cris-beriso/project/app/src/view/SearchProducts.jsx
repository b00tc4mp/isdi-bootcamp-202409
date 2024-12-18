import { useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import useContext from './useContext'

import { Button } from './library'
import Product from './components/Product'

import logic from '../logic'

export default function searchProducts() {
  const { alert } = useContext()
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
  return <main className="bg-back text-customblack pt-5 pb-14 flex flex-col items-center ">
    < h2 className="text-3xl pt-10" > Search your product</h2 >
    <div className="bg-box w-[15rem] h-24 flex flex-col justify-center gap-y-2 rounded-lg shadow-lg">
      <form onSubmit={handleSearch} className=" flex flex-col items-center ">
        <select id="category" className='w-[10rem]'>
          <option value="Face">Face</option>
          <option value="Cheeks">Cheeks</option>
          <option value="Eyes">Eyes</option>
          <option value="Brows">Brows</option>
          <option value="Lips">Lips</option>
        </select>

        <input type="text" placeholder="more info" name="keyword" className="w-[10rem] mb-2" />

        <Button className="mt-2" type="submit">Search</Button>
      </form>
    </div>
    <ul className="grid gap-y-2 pt-2">
      {products.length > 0 ? (
        products.map(product => (
          <Product
            key={product.id}
            product={product}
          />
        ))
      ) : (
        <p className="pt-10">No products found.</p>
      )}
    </ul>

  </main >
}
