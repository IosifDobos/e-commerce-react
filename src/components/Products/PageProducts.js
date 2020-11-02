import React, { useContext } from 'react';
import ProductList from './ProductList';
import { FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa';
// context
import { ProductContext } from '../../context/products';

export default function PaginatedProducts() {
    const { sorted, page, changePage } = useContext(ProductContext);

    if (sorted[page]) {
        return (
            <section>
                <ProductList products={sorted[page]} />
                {sorted.length > 1 && (
                    <article className="pagination-buttons">
                        {/* previous button */}
                        {page > 0 && (
                            <button
                                className="prev-page-btn"
                                onClick={() => changePage(page - 1)}
                            >
                                <FaAngleDoubleLeft />
                            </button>
                        )}
                        {sorted.map((_, index) => {
                            return (
                                <button
                                    onClick={() => changePage(index)}
                                    key={index}
                                    className={`page-btn ${page === index && `page-btn-current`}`}
                                >
                                    {index + 1}
                                </button>
                            )
                        })}
                        {/* next button */}
                        {page < sorted.length - 1 && (
                            <button
                                className="next-page-btn"
                                onClick={() => changePage(page + 1)}
                            >
                                <FaAngleDoubleRight />
                            </button>
                        )}
                    </article>
                )}
            </section>
        )
    } else {
        return (
            <h3 className="search-errors">
                unfortunately your search criteria did not return any products
            </h3>
        )
    }
}
