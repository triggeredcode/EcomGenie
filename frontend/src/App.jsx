import React, { useEffect, useState } from 'react';
import ProductList from './components/ProductList';
import axios from 'axios';
import products_sample from './Hardcode.js';
import { motion } from 'framer-motion';
import { FiShoppingBag, FiLink, FiPlus } from 'react-icons/fi';
import { CopilotKit } from "@copilotkit/react-core";
import "@copilotkit/react-ui/styles.css";

import { CopilotPopup } from "@copilotkit/react-ui";
import { useCopilotReadable } from '@copilotkit/react-core';


const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

console.log('API URL:', API_URL);
const App = () => {

  useEffect(() => {
    document.body.style.zoom = '80%';
  }, []);

  const runtimeurl = `${API_URL}/api/copilotkit`;

  return (
    <CopilotKit runtimeUrl={runtimeurl}>
      <CoreApp />
      <CopilotPopup
        instructions={`You are an AI-powered product advisor designed to assist users in finding the best products based on a pre-scraped list of products. Your primary functions include:

        Product Comparison:Display a comparison table with key features such as price, average rating, and number of reviews for the top products.

        Review Analysis: Analyze user reviews to provide a summary of the most frequently mentioned pros and cons for each product.
        User Interaction: Engage with users to understand their preferences and provide personalized recommendations based on the available product data.

         When a user inputs a search query, you will receive a pre-scraped list of relevant products. Your task is to:

          Display the top products in a comparison table.
          Analyze the user reviews for each product to extract key insights.
          Provide a summary of the most frequently mentioned pros and cons.
          Engage with the user to understand their preferences and offer personalized recommendations.

        Your goal is to provide users with clear, concise, and informed recommendations to help them make the best purchasing decisions.`}
        labels={{
          title: "Shopping Assistant",
          initial: "Hi, I am your shopping assistant. What can I help you with?",
        }}
      />
    </CopilotKit>
  );

};


const CoreApp = () => {
  const [products, setProducts] = useState(products_sample);
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  document.body.style = 'background: #60a5fa;';
  const handleImport = async () => {
    setIsLoading(true);
    console.log("Backend Request Executed");
    console.log(products);

    try {
      const response = await axios.post(`${API_URL}/api/products`, {
        query_url: url,
      });
      console.log(response.data);
      const filteredImages = response.data.images.filter((image) => typeof image === "string" && !image.includes("play-button-overlay"));
      response.data.images = filteredImages;
      setProducts([...products, response.data]);
      setUrl('');
    } catch (error) {
      console.error(error);
      // You might want to add error handling here, e.g., showing an error message to the user
    } finally {
      setIsLoading(false);
    }
  };

   useCopilotReadable({
     description: "These are the product details in array format , each element is detailed json object, user will ask questions around this object to suggest them product based on the user details and preferences and cost and genuine interest in the product, help them out to pick the right product for them",
     value: JSON.stringify(products),
   })

  return (

      <div>
        <div className="min-h-screen p-8 font-mono">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto bg-white shadow-2xl shadow-indigo-200 rounded-xl overflow-hidden"
          >
            <div className="p-8">
              <h1 className="text-4xl font-extrabold text-indigo-800 mb-6 flex items-center">
                <FiShoppingBag className="mr-4" />
                Product Importer
              </h1>
              <div className="flex items-center space-x-4 mb-8">
                <div className="relative flex-grow">
                  <FiLink className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="Enter product URL"
                    className="w-full pl-10 pr-4 py-3 border-2 border-indigo-300 rounded-lg focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleImport}
                  disabled={isLoading || !url || products.length > 4}
                  className={`flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors ${isLoading || !url || products.length > 4 ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {isLoading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    >
                      <FiPlus className="w-5 h-5" />
                    </motion.div>
                  ) : (
                    <>
                      <FiPlus className="mr-2" />
                      Import
                    </>
                  )}
                </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setProducts([])}
                disabled={ products.length === 0}
                className={`flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors ${products.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isLoading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  >
                    <FiPlus className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <>
                    <FiPlus className="mr-2" />
                    Clear Products
                  </>
                )}
              </motion.button>
              </div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {products.length > 0 && <ProductList products={products} />}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
  );
}
export default App;