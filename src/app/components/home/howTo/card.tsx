import { HowToListType } from "@/types/home"
import Image from "next/image"

const Card = ({ title, src, description }: HowToListType) => {
    return (
        <div className="col-span-1 shadow-md rounded-[10px] p-3 bg-zinc-200 dark:bg-zinc-700" key={title}>
            <h4 className="text-[30px] text-center">{title}</h4>
            <div>
                <Image src={src} width={200} height={200} alt="write" className="mx-auto" />
            </div>
            <p className="text-center">{description}</p>
        </div>
    )
}

export default Card