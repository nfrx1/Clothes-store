export default async function useProducts(){
    let loading = true;
    let error = null
    let results = null
    try{
        const response = await fetch("https://fakestoreapi.com/products")
        results = response.json()
    }
    catch (err){
        error = err
    }
    finally{
        loading = false
    }
    return {results, loading, error}
}