import client from "./client";
import httpService from "./httpService";

const listingsEndpoint = "/categories";
const productsEndpoint = "/products/categories";

const getCategories = async () => await client.get(listingsEndpoint);

const getCats = async () => await httpService.get(productsEndpoint);

export default {
  getCats,
  getCategories,
};
