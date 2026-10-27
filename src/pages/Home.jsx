import ProductFilter from "../features/products/components/ProductFilter";
import ProductsGrid from "../features/products/components/ProductsGrid";

const Home = () => {
  return (
    <div className="bg-base-300 flex flex-col">
      <ProductFilter />
      <ProductsGrid />
    </div>
  )
}

export default Home