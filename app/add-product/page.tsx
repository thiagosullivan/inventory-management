import SideBar from "@/components/sidebar";
import { createProduct } from "@/lib/actions/products";
import Link from "next/link";
import React from "react";

export default async function AddProductPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <SideBar currentPath="/add-product" />

      <main className="ml-64 p-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">
                Add Product
              </h1>
              <p className="text-sm text-gray-500">
                Add a new product to your inventory
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-2xl">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <form className="space-y-6" action={createProduct}>
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Product Name *
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-transparent"
                  placeholder="Enter Product Name"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="quantity"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Quantity *
                  </label>
                  <input
                    id="quantity"
                    type="number"
                    name="quantity"
                    min="0"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-transparent"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label
                    htmlFor="price"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Price *
                  </label>
                  <input
                    id="price"
                    type="number"
                    name="price"
                    step="0.01"
                    min="0"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-transparent"
                    placeholder="0"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="sku"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  SKU (optional)
                </label>
                <input
                  id="sku"
                  type="text"
                  name="sku"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-transparent"
                  placeholder="Enter SKU"
                />
              </div>
              <div>
                <label
                  htmlFor="lowStockAt"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Low Stock At (optional)
                </label>
                <input
                  id="lowStockAt"
                  type="text"
                  name="lowStockAt"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-transparent"
                  placeholder="Enter low stock threshold"
                />
              </div>
              <div className="flex gap-5">
                <button
                  type="submit"
                  className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                >
                  Add Product
                </button>
                <Link
                  href="/inventory"
                  className="px-6 py-3 bg-gray-200 text-white rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </Link>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
