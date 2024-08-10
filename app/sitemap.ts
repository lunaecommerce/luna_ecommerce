import getProducts from "@/actions/products/get-products";
import { Product } from "@/types";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap>{
    const products: Product[] = await getProducts()

    const productsId: MetadataRoute.Sitemap = products.map(({id, updatedAt}) => ({
        url: `${process.env.NEXT_PUBLIC_SITE_URL}product/${id}`,
        lastModified: new Date(updatedAt)
    }))
    return [
        {
            url: `${process.env.NEXT_PUBLIC_SITE_URL}`,
        },
        ...productsId
    ]
}