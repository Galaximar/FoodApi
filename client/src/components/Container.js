import { CardFood } from "./CardFood"
import { Filter } from "./Filter"
import { Pagination } from "./Pagination"
import { Search } from "./Search"
import { SearchDataBase } from "./SearchDataBase"

export const Container= ()=>{
    return (
        <div>
            <Search />
            <CardFood />
            <Pagination />
            <Filter />
        </div>
    )
}