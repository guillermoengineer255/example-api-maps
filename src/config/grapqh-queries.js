import gql from 'graphql-tag';


export const getIdByLocalization = gql`query pocSearchMethod($now: DateTime!, $algorithm: String!, $lat: String!, $long: String!) {
    pocSearch(now: $now, algorithm: $algorithm, lat: $lat, long: $long) { 
        id
    }
    }`

export const getProductsCategory = gql`query allCategoriesSearch {
  allCategory{
    title
  }
} `

export const getProductById = gql`query poc($id: ID!, $categoryId: Int, $search: String){
    poc(id: $id) {
      id
      products(categoryId: $categoryId, search: $search) {
        id
        title
        images {
          url
        }
        productVariants {
          price
          title
        }
      }
    }
  }`