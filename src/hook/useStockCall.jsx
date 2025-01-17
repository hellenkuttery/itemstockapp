import React from "react";
import {
  fetchFail,
  fetchStart,
  getFirmsBrandsProductsSuccess,
  getProductsCatBrandsSuccess,
  getPurcSalesSuccess,
  stockSuccess,
} from "../features/stockSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import axios from "axios";
import useAxios from "./useAxios";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";
import Products from "../pages/Products";

const useStockCall = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const { axiosWithToken } = useAxios();
  /* -------------------------------------------------------------------------- */
  //   const getFirm = async () => {
  //     dispatch(fetchStart());

  //     try {
  //       const { data } = await axios(`${BASE_URL}firms`, {
  //         headers: {
  //           Authorization: `Token ${token}`,
  //         },
  //       });

  //       console.log(data);
  //       dispatch(firmSuccess(data))
  //     } catch (error) {
  //       dispatch(fetchFail());
  //     }
  //   };
  // /* -------------------------------------------------------------------------- */
  // const getBrands = async () => {
  //     dispatch(fetchStart());

  //     try {
  //       const { data } = await axios(`${BASE_URL}brands`, {
  //         headers: {
  //           Authorization: `Token ${token}`,
  //         },
  //       });

  //       console.log(data);
  //       dispatch(brandSuccess(data))
  //     } catch (error) {
  //       dispatch(fetchFail());
  //     }
  //   };

  //   Bu şekilde hersayfa için ayrı bir fonksyion yazmak yerine DRY gereği tek bir fonksyion yazıyoruz.
  //   Bu nedenle getFirm ve getBrand fonksiyonlarını kullanmayıp getStockDatayı kullanacağız.
  /* -------------------------------------------------------------------------- */
  /* -------------------------------------------------------------------------- */
  /*                               GET STOCK DATA                               */
  /* -------------------------------------------------------------------------- */

  const getStockData = async (url) => {
    dispatch(fetchStart());

    try {
      const { data } = await axiosWithToken.get(`${url}`);
      dispatch(stockSuccess({ data, url }));
    } catch (error) {
      dispatch(fetchFail());
    }
  };

  /* -------------------------------------------------------------------------- */
  /*                                 DELETE DATA                                */
  /* -------------------------------------------------------------------------- */
  const getDeleteData = async (url, id) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken.delete(`${url}/${id}`);
      getStockData(url);
      toastSuccessNotify(`${url} is deleted successfully!`);
    } catch (error) {
      dispatch(fetchFail());
    }
  };
  /* -------------------------------------------------------------------------- */
  /*                                ADD NEW                                     */
  /* -------------------------------------------------------------------------- */
  const postStockData = async (url, info) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken.post(`${url}`, info);
      getStockData(url);
      toastSuccessNotify(`${url} is saved successfully!`);
    } catch (error) {
      dispatch(fetchFail());
    }
  };

  /* -------------------------------------------------------------------------- */
  /*                                 UPDATE DATA                                */
  /* -------------------------------------------------------------------------- */

  const putStockData = async (url, info) => {
    dispatch(fetchStart());
    try {
      console.log(info);
      const { data } = await axiosWithToken.put(`${url}/${info._id}`, info);
      getStockData(url);
      toastSuccessNotify(`${url} is updated successfully!`);
    } catch (error) {
      dispatch(fetchFail());
    }
  };

 /* -------------------------------------------------------------------------- */
 /*                             PROMISEALL YAPILARI                            */
 /* -------------------------------------------------------------------------- */

  const getProductCatBrand = async () => {
    // Array destructure işlemi ile products,categories ve brands arraylarının içini doldurduk -ÖRN: const [a,b,c]=[3,5,7]
    dispatch(fetchStart());

    try {
      const [products, categories, brands] = await Promise.all([
        axiosWithToken("products"),
        axiosWithToken("categories"),
        axiosWithToken("brands"),
      ]);
      //Optional Cahining ile undefined,null olan verierden dolayı projenin sorun çıkarmasını engeller
      dispatch(
        getProductsCatBrandsSuccess([
          products?.data?.data,
          categories?.data?.data,
          brands?.data?.data,
        ])
      );
    } catch (error) {
      dispatch(fetchFail());
    }
  };

  /* -------------------------------------------------------------------------- */
  const getFirmBrandProduct = async () => {
    // Array destructure işlemi ile products,categories ve brands arraylarının içini doldurduk -ÖRN: const [a,b,c]=[3,5,7]
    dispatch(fetchStart());

    try {
      const [purchases, firms, brands, products] = await Promise.all([
        axiosWithToken("purchases"),
        axiosWithToken("firms"),
        axiosWithToken("brands"),
        axiosWithToken("products"),
      ]);
      //Optional Cahining ile undefined,null olan verierden dolayı projenin sorun çıkarmasını engeller
      dispatch(
        getFirmsBrandsProductsSuccess([
          purchases?.data?.data,
          firms?.data?.data,
          brands?.data?.data,
          products?.data?.data,
        ])
      );
    } catch (error) {
      dispatch(fetchFail());
    }
  };
  
/* -------------------------------------------------------------------------- */
  const getPurcSales= async () => {
    dispatch(fetchStart());

    try {
      const [purchases,sales]= await Promise.all([
        axiosWithToken("purchases"),
        axiosWithToken("sales"),
      ]);
      //Optional Cahining ile undefined,null olan verierden dolayı projenin sorun çıkarmasını engeller
      dispatch(
        getPurcSalesSuccess([
          purchases?.data?.data,
          sales?.data?.data,
        ])
      );
    } catch (error) {
      dispatch(fetchFail());
    }
  };


  return {
    getStockData,
    getDeleteData,
    postStockData,
    putStockData,
    getProductCatBrand,
    getFirmBrandProduct,
    getPurcSales
  };
};

export default useStockCall;
