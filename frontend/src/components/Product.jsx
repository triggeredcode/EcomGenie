import React from 'react'
import { Star, ShoppingCart, ChevronRight } from 'lucide-react'

export default function Product({ product }) {
    if (!product) {
        return (
            <div className="max-w-3xl mx-auto my-8 p-6 bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl shadow-lg animate-pulse">
                <div className="h-8 bg-gray-700 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-700 rounded w-1/2"></div>
            </div>
        )
    }

    return (
        <div className="border-4 border-gray-300 max-w-3xl my-8 overflow-hidden bg-sky-100 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/20">
            <div className="p-6">
                <h2 className=" font-medium text-zinc-800 mb-2 font-mono">{product.name}</h2>
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-lg text-purple-700 font-semibold font-sans">{product.pricing}</p>
                        <p className="text-sm text-gray-400 font-sans">{product.rate_pricing}</p>
                    </div>
                    <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-5 h-5 ${i < product.average_rating ? 'text-yellow-400 fill-current' : 'text-gray-600'}`} />
                        ))}
                    </div>
                </div>
            </div>

            <div className="relative">
                <div className="flex overflow-x-auto p-6 space-x-8 scrollbar-hide">
                    {product.images.map((image, index) => (
                        <div key={index} className="flex-none w-64 aspect-square">
                            <img
                                src={image}
                                alt={`${product.name} - Image ${index + 1}`}
                                className="border-2 border-gray-400  w-full h-full object-cover rounded-lg shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/20"
                            />
                        </div>
                    ))}
                </div>
                {product.images.length > 3 && (
                    <div className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-700 bg-opacity-75 p-2 rounded-l-full shadow-md">
                        <ChevronRight className="w-6 h-6 text-purple-400" />
                    </div>
                )}
            </div>

            <div className="px-6 py-4 bg-gradient-to-r from-sky-200 to-sky-300 bg-opacity-90 flex justify-between items-center mt-4">
                <button className="bg-purple-600 bg-opacity-80 text-white font-bold py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors duration-300 flex items-center space-x-2">
                    <ShoppingCart className="w-5 h-5" />
                    <span>Add to Cart</span>
                </button>
                <button className="text-zinc-600 font-semibold hover:text-zinc-900 transition-colors duration-300 flex items-center">
                    <span>View Details</span>
                    <ChevronRight className="w-5 h-5 ml-1" />
                </button>
            </div>
        </div>
    )
}