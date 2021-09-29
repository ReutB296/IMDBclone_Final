import React, { useEffect ,useContext ,useState } from "react"
import { UserContext } from "../User.context";

const users = useContext(UserContext);
const WishlistContext = React.createContext([]);
const [wishList, setWishlist] = useSate([]);

useEffect(() => {
    users.map(user => {
        user.wishlist
    })
})

export function WishListContext(){
    return(
        <WishListContext.Provider value={

        }>

        </WishListContext.Provider>
    )
}