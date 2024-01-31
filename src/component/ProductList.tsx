
import SearchIcon from '@mui/icons-material/Search';
import { List, ListItem } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import InfiniteScroll from './InfiniteScroll';
import ProductCard from './ProductCard';

interface Products {
    name: String;
    priceUsd: number;
    imageUrl: String;
}

const ProductList: React.FC = () => {

    const [products, setProducts] = useState<Products[]>([]);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [keyword, setKeyword] = useState("");

    useEffect(() => {
        setProducts([]);
        setHasMore(true);
        fetchProducts();
    }, [keyword])

    useEffect(() => {
        fetchProducts();
    }, []);

    // callback for feching new data
    const fetchProducts = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get(`/products/search`, {
                params: {
                    keyword: keyword,
                    page: page
                }
            });
            const newProducts: Products[] = response.data.products;
            setProducts((prevProducts) => [...prevProducts, ...newProducts]);
            setPage((prevPage) => prevPage + 1);
            setIsLoading(false);
            if (newProducts.length === 0) {
                setHasMore(false);
            }
        } catch (error) {
            console.error('Error fetching product:', error);
            setIsLoading(false);
        }
    };

    return (<>
        <h1>Product Listing</h1>
        <TextField
            id="input-with-icon-textfield"
            color="info"
            autoFocus={true}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <SearchIcon />
                    </InputAdornment>
                ),
            }}
            variant="standard"
            onChange={(e: any) => setKeyword(e.target.value)}
        />
        <InfiniteScroll fetchMore={fetchProducts} hasMore={hasMore} isLoading={isLoading}>
            <List>
                {products.map((product) => (
                    <ListItem key={product.name}>
                        <ProductCard name={product.name} priceUsd={product.priceUsd} imageUrl={product.imageUrl} />
                    </ListItem>
                ))}
            </List>
        </InfiniteScroll>

    </>


    );
};

export default ProductList;
