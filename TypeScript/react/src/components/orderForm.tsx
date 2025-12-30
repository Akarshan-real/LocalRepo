import { useState } from "react"

interface OrderFormProps {
    onSubmit(order: { name: string, cups: number }): void;
}

export const OrderForm = ({ onSubmit }: OrderFormProps) => {

    const [name, setName] = useState<string>("Masala");
    const [cups, setCups] = useState<number>(1);

    function handelSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        onSubmit({ name, cups });
    }

    return (
        <form onSubmit={handelSubmit}>
            <label>Chai Name</label>
            <input
                value={name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setName(e.target.value) }}
            />
            <label>Cups</label>
            <input
                type="number"
                value={cups}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setCups(Number(e.target.value) || 0) }}
            />
            <button type="submit">Place Order</button>
        </form>
    )
}

