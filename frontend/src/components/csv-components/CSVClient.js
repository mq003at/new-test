import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import CSVInterface from "./CSVInterface";

function CSVClient () {
    const location = useLocation();

    const [shopId, getShopId] = useState();

    useEffect(() => {
        const path = location.pathname.split("/");
        getShopId(path[1]);
    }, [location]);

    useEffect(() => {
        console.log("shopId", shopId)
    })

    return (
        <CSVInterface />
    )
}

export default CSVClient;