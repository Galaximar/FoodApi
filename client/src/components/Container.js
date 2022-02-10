import { CardFood } from "./CardFood"
import { Filter } from "./Filter"
import { Pagination } from "./Pagination"
import { Search } from "./Search"

export const Container= ()=>{
    return (
        <div>
            <Search />
            <div className="gridCards">
                <Filter />
                <CardFood />
            </div>
            <Pagination />
        </div>
    )
}