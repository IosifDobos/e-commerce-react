// import url from './URL'

// flatten function
export function flattenProducts(data) {
    return data.map(item => {
        // cloudinary
        let image = (item.image && item.image.url) || null;

        // // local setup no deployment
        // let image = `${url}${item.image.url}`;
        return { ...item, image };
    });
}

// helper functions
export function featuredProducts(data) {
    return data.filter(item => {
        return item.featured === true;
    });
}

// pagination
export function paginate(products) {
    // set how many items per page you want
    const itemsPerPage = 4;

    // calculate total products
    const numberOfPages = Math.ceil(products.length / itemsPerPage);

    // set up a new product
    const newProducts = Array.from({ length: numberOfPages }, (_, index) => {
        const start = index * itemsPerPage;
        return products.slice(start, start + itemsPerPage);
    })

    return newProducts;
}