import { handleFilterProduct } from "@/actions/filterProducts";
import { categories } from "@/data/categories";
import React from "react";

const Filter = async () => {
  const renderCategories = () =>
    categories.map((category, index) => (
      <option key={index} value={category}>
        {category}
      </option>
    ));

  return (
    <div>
      <form>
        <label className="text-md" htmlFor="category">
          Filter:
        </label>
        <select name="category" defaultValue={categories[0]} required>
          {renderCategories()}
        </select>
        <button formAction={handleFilterProduct} type="submit">
          search
        </button>
      </form>
    </div>
  );
};

export default Filter;
