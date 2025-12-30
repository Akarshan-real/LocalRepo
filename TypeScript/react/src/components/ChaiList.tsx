import type { Chai } from "../types"
import ChaiCard from "./ChaiCard"

interface ChaiListProps {
    items: Chai[]
}

export const ChaiList = ({ items }: ChaiListProps) => {
    return (
        <div>
            {items.map((chai) => (
                <ChaiCard
                    key={chai.id}
                    name={chai.name}
                    price={chai.price}
                    isSpecial={chai.price > 20}
                />
            ))}
        </div>
    )
}

export default ChaiList