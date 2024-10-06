import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiGrid, FiList, FiFilter } from 'react-icons/fi';
import Product from './Product';

const ProductList = ({ products }) => {
    const [view, setView] = useState('list');
    const [sortBy, setSortBy] = useState('name');
    const [filteredProducts, setFilteredProducts] = useState(products);

    useEffect(() => {
        const sorted = [...products].sort((a, b) => {
            if (sortBy === 'name') return a.name.localeCompare(b.name);
            if (sortBy === 'price') return parseFloat(a.pricing) - parseFloat(b.pricing);
            return 0;
        });
        setFilteredProducts(sorted);
    }, [products, sortBy]);

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <div className="p-4 bg-opacity-80 min-h-screen">
            <div className="max-w-7xl mx-auto">
                <div className="mb-6 flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-gray-800">Product List</h2>
                    <div className="flex space-x-4">
                        <select
                            className="bg-white border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                        >
                            <option value="name">Sort by Name</option>
                            <option value="price">Sort by Price</option>
                        </select>
                        <button
                            className={`p-2 rounded-md ${view === 'grid' ? 'bg-indigo-500 text-white' : 'bg-white text-gray-600'}`}
                            onClick={() => setView('grid')}
                            aria-label="Grid view"
                        >
                            <FiGrid />
                        </button>
                        <button
                            className={`p-2 rounded-md ${view === 'list' ? 'bg-indigo-500 text-white' : 'bg-white text-gray-600'}`}
                            onClick={() => setView('list')}
                            aria-label="List view"
                        >
                            <FiList />
                        </button>
                    </div>
                </div>
                <motion.div
                    className={`grid gap-6 ${view === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-2' : 'grid-cols-1'}`}
                    variants={container}
                    initial="hidden"
                    animate="show"
                >
                    {filteredProducts.map((product, index) => (
                        <motion.div key={index} variants={item}>
                            <Product product={product} view={view} />
                        </motion.div>
                    ))}
                </motion.div>
                {filteredProducts.length === 0 && (
                    <div className="text-center text-gray-500 mt-10">
                        No products found. Try adjusting your filters.
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductList;