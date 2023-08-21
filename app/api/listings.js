import client from "./client";
import httpService from "./httpService";

const listingsEndpoint = "/listings";
const productsEndpoint = "/products";

const getListings = async () => await client.get(listingsEndpoint);

const getProducts = async () => await httpService.get(productsEndpoint);

export default {
  getListings,
  getProducts,
};
