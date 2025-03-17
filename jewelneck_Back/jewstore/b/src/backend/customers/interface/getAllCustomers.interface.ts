export interface GetAllCustomersInterface{
  cust_id: number
  email: string
  username: string
  phone: string

  cart : {
    cart_id: number
    prod_id: number
    created: Date
  } []

  orders : {
    order_id: number
    prod_id: number
    created: Date
  } []
}