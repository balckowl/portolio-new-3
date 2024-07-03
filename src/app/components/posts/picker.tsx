import Image from "next/image"
import { Dispatch, SetStateAction, useState } from "react"

const zasetuList = [
    { id: "1", text: "ちょっとした挫折" },
    { id: "2", text: "普通の挫折" },
    { id: "3", text: "かなりの挫折" },
    { id: "4", text: "立ち直れないくないの挫折" },
    { id: "5", text: "おわり" },
]
export default function Picker({ icon, setIcon }: { icon: string, setIcon: Dispatch<SetStateAction<string>> }) {

    return (
        <div>
            <h3 className="text-center font-bold mb-[10px]">挫折度を選ぼう</h3>
            <div className="flex flex-col gap-3">
                {zasetuList.map((zasetu) => (
                    <div key={zasetu.id} className={`flex items-center rounded-lg cursor-pointer border-[3px] ${zasetu.id == icon ? "border-green-300" : "border-[#eee]"}`} onClick={() => setIcon(zasetu.id)}>
                        <div className="bg-muted py-1 px-3">
                            <Image src={`/images/editor/face${zasetu.id}.png`} width="60" height="60" alt="" />
                        </div>
                        <div className="px-7">{zasetu.text}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}
