import { Product } from "@/types/products-type";
import apiSlice from "../api/apiSlice";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "@/lib/firebase";
import { CreateProductSubmissionData } from "@/types";

const productAPi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllProduct: builder.query<
      Product[],
      { category: string; page: number; limit: number }
    >({
      query: ({ category, page, limit }) => {
        return `/products/?productCategory=${category}&page=${page}&limit=${limit}`;
      },
      providesTags: [{ type: "Products" }],
    }),
    addNewProduct: builder.mutation<
      Record<PropertyKey, any>,
      {
        userId: string;
        imageFile: File;
        data: CreateProductSubmissionData;
      }
    >({
      async queryFn(
        {
          userId,
          imageFile,
          data: { availableCount, description, name, price, productCategory },
        },
        _queryApi,
        _extraOptions,
        baseQuery
      ) {
        try {
          const imageRef = ref(
            storage,
            `product-images/${File.name + crypto.randomUUID() + Date.now()}`
          );
          await uploadBytes(imageRef, imageFile);
          const url = await getDownloadURL(imageRef);
          const producData: CreateProductSubmissionData & {
            imagePath: string;
            sellerId: string;
          } = {
            availableCount,
            description,
            name,
            price,
            productCategory,
            sellerId: userId,
            imagePath: url,
          };

          await baseQuery({
            url: `/products`,
            method: "POST",
            credentials: "include",
            body: producData,
          });

          return {
            data: {} as Record<PropertyKey, any>,
          };
        } catch (error) {
          return {
            error: {
              status: 500,
              statusText: "Internal Server Error",
              data: "Failed to create the product!",
            },
          };
        }
      },
      invalidatesTags(_result, _error, arg) {
        return [
          {
            type: "Products",
            id: arg.userId,
          },
        ];
      },
    }),
    getProduct: builder.query<Product, { id: string }>({
      query: ({ id }) => `/products/${id}`,
      providesTags(_result, _error, arg, meta) {
        return [
          {
            type: "Product",
            id: arg.id,
          },
        ];
      },
    }),
    getUsersProducts: builder.query<Product[], { userId: string }>({
      query: ({ userId }) => `/user/${userId}/products`,
      providesTags: (_result, _error, arg) => {
        return [
          {
            type: "Products",
            id: arg.userId,
          },
        ];
      },
    }),
    deleteProduct: builder.mutation<
      unknown,
      { productId: string; userId: string }
    >({
      query: ({ productId }) => ({
        url: `/products/${productId}`,
        method: "DELETE",
      }),
      invalidatesTags(_result, _error, arg) {
        return [
          {
            type: "Products",
            id: arg.userId,
          },
        ];
      },
    }),
    editProduct: builder.mutation<
      {},
      {
        file: File;
        data: CreateProductSubmissionData;
        productId: string;
        userId: string;
        imagePath: string;
      }
    >({
      async queryFn(
        { file, data, productId, imagePath },
        _api,
        _extraOptions,
        baseQuery
      ) {
        try {
          let url = "";
          url = imagePath;
          if (!url) {
            const imageRef = ref(
              storage,
              `product-images/${(file as File).name + crypto.randomUUID() + Date.now()}`
            );
            await uploadBytes(imageRef, file as File);
            url = await getDownloadURL(imageRef);
          }

          const producData: CreateProductSubmissionData & {
            imagePath: string;
          } = { ...data, imagePath: url };

          await baseQuery({
            url: `/products/${productId}`,
            method: "PATCH",
            body: producData,
            credentials: "include",
          });
          return {
            data: {},
          };
        } catch (error) {
          return {
            error: {
              status: 500,
              statusText: "Internal Server Error",
              data: "Failed to create the product!",
            },
          };
        }
      },
      invalidatesTags(_result, _error, arg) {
        return [
          {
            type: "Product",
            id: arg.productId,
          },
          {
            type: "Products",
            id: arg.userId,
          },
          { type: "Products" },
        ];
      },
    }),
  }),
});
export const {
  useGetAllProductQuery,
  useGetProductQuery,
  useGetUsersProductsQuery,
  useDeleteProductMutation,
  useAddNewProductMutation,
  useEditProductMutation,
} = productAPi;
