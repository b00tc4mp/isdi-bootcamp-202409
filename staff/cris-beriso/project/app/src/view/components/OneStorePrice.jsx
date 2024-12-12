import logic from '../../logic'

export default function OneStorePrice({ storePrices: { id, price, store: { name } } }) {

  return <section>
    <p>{name}: {price}€</p>
  </section>
}