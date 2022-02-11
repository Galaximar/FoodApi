import { CardFood } from "./CardFood"
import { Filter } from "./Filter"
import { Pagination } from "./Pagination"

export const Container= ()=>{
    return (
        <div>
            <div className="gridCards">
                <Filter />
                <CardFood />
            </div>
            <Pagination />
        </div>
    )
}