// products context
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import url from '../utils/URL';

export const ProductContext = React.createContext();



export default function ProductProvider({ children }) {
    const [loading, seLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [featured, setFeatured] = useState([]);

    useEffect(() => {
        axios
            .get(`${url}/products`)
            .then(response => {
                setProducts(response.data)
            });
        return () => {

        }
    }, [])

    return (
        <ProductContext.Provider value={{ loading, products, featured }}>
            {children}
        </ProductContext.Provider>
    )
}
