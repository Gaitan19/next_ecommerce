import { handleFilterProduct } from '@/actions/filterProducts';
import { categories } from '@/data/categories';
import React from 'react';

const Filter = async ({ filter }: any) => {
  const renderCategories = () =>
    categories.map((category, index) => (
      <option key={index} defaultValue={category}>
        {category}
      </option>
    ));

  return (
    <div className="bg-white mb-3">
      <nav className="bg-gray-200 py-4">
        <div className="container mx-auto px-4">
          <form className="flex items-center flex-col sm:flex-row gap-3 sm:gap-5">
            <div>
              <label className="text-md mr-5" htmlFor="category">
                Filter:
              </label>
              <select
                name="category"
                className="p-2 border border-gray-400 rounded"
                defaultValue={filter}
                required
              >
                {renderCategories()}
              </select>
            </div>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              formAction={handleFilterProduct}
              type="submit"
            >
              Search
            </button>
          </form>
        </div>
      </nav>
    </div>
  );
};

export default Filter;
