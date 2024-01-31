import { NextRequest } from "../../../../node_modules/next/server";
import dummyData from "./dummyData";

//mockup api
export function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url)
    const keyword = searchParams.get('keyword') || "";
    const page = searchParams.get('page') || 1;

    let {products} = dummyData;

    
    if(keyword == ""){
        return Response.json({ products }, { status: 200 });
    }else{
        products = products.filter((p) => p.name.includes(keyword))
        return Response.json({ products }, { status: 200 });
    }
    
}