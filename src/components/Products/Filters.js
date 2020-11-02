import React, { useContext } from 'react';
import { ProductContext } from '../../context/products';

export const Filters = () => {
    const {
        filters: {
            search,
            category,
            shipping,
            price
        },
        updateFilters,
        sorted } = useContext(ProductContext);

    return (
        <section className="filters-section">
            <h2 className="section-title">search products</h2>
            <form className="filters-form">
                <div>
                    {/* search imput */}
                    <div className="form-group">
                        <label htmlFor="search">search products</label>
                        <input
                            className="form-control"
                            type="text"
                            id="search"
                            name="search"
                            value={search}
                            onChange={updateFilters}
                        />
                    </div>
                    {/* end of search input */}
                    {/* select category */}
                    <div className="form-group">
                        <label htmlFor="category">Select category</label>
                        <select
                            className="form-control"
                            name="category"
                            id="category"
                            value={category}
                            onChange={updateFilters}
                        >
                            <option value="all">all</option>
                            <option value="phone">phone</option>
                            <option value="computer">computer</option>
                            <option value="radio">radio</option>
                        </select>
                    </div>
                    {/* end of select category */}
                    {/* free shipping */}
                    <div className="form-group">
                        <input
                            type="checkbox"
                            name="shipping"
                            id="shipping"
                            checked={shipping}
                            onChange={updateFilters}
                        />
                        <label htmlFor="shipping">free shipping</label>
                    </div>
                    {/* free shipping */}
                </div>
                <div className="price-group">
                    <p>price</p>
                    <label htmlFor="">
                        <input
                            type="radio"
                            name="price"
                            id="all"
                            value="all"
                            checked={price === 'all'}
                            onChange={updateFilters}
                        />
                        all
                    </label>
                    <label htmlFor="">
                        <input
                            type="radio"
                            name="price"
                            value="0"
                            checked={price === 0}
                            onChange={updateFilters}
                        />
                        $0 - $300
                    </label>
                    <label htmlFor="">
                        <input
                            type="radio"
                            name="price"
                            value="300"
                            checked={price === 300}
                            onChange={updateFilters}
                        />
                        $300 - $650
                    </label>
                    <label htmlFor="">
                        <input
                            type="radio"
                            name="price"
                            value="650"
                            checked={price === 650}
                            onChange={updateFilters}
                        />
                        Over $650
                    </label>
                </div>
            </form>
            <h6>total products: {sorted.flat().length}</h6>
            <hr />
        </section>
    )
}

export default Filters;
