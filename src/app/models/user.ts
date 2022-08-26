import { userproduct } from "./userproduct"

export class user{
    name?:string
    username?:string
    password?:string
    image?:string
    wishlist:userproduct[]=[]
    cart:userproduct[]=[]
    id?:number
}