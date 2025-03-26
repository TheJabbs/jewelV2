export interface GetAllProductInterface{
  prod_id: number,
  prod_name: string,
  prod_description: string,
  cost: number,
  cat_id: number,
  prod_img: string

  product_img: {
    img_id: number,
    img_prio: number,
    img: string
  }[]
}