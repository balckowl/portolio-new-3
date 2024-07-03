import Image from "next/image";
import { Yomogi } from "next/font/google";

const YomogiFont = Yomogi(
    {
        weight: "400",
        subsets: ["latin"]
    }
)

const Loading = () => {
    return (
        <div className={`flex flex-col text-center items-center text-[23px] ${YomogiFont.className}`}>
            <Image src="/images/loading/mokumoku.gif" alt="頭から煙が出ている人のイラスト" width={250} height={290} className="pl-[30px]"/>
            <div className="flex justify-center relative w-[250px] bg-pink-300 mt-[30px]">
                <div className="bg-gray-400 text-white w-[45px] h-[45px] rounded-[20px] flex items-center justify-center absolute bottom-0 left-8">読</div>
                <div className="bg-gray-400 text-white w-[45px] h-[45px] rounded-[20px] flex items-center justify-center absolute bottom-0 left-16">み</div>
                <div className="bg-gray-400 text-white w-[45px] h-[45px] rounded-[20px] flex items-center justify-center absolute bottom-0 left-24">込</div>
                <div className="bg-gray-400 text-white w-[45px] h-[45px] rounded-[20px] flex items-center justify-center absolute bottom-0 left-32">み</div>
                <div className="bg-gray-400 text-white w-[45px] h-[45px] rounded-[20px] flex items-center justify-center absolute bottom-0 left-40">に</div>
            </div> 
            <div className="flex justify-center relative w-[250px] bg-pink-300 mt-[34px]">
                <div className="bg-gray-400 text-white w-[45px] h-[45px] rounded-[20px] flex items-center justify-center absolute bottom-0 left-0">挫</div>
                <div className="bg-gray-400 text-white w-[45px] h-[45px] rounded-[20px] flex items-center justify-center absolute bottom-0 left-8">折</div>
                <div className="bg-gray-400 text-white w-[45px] h-[45px] rounded-[20px] flex items-center justify-center absolute bottom-0 left-16">し</div>
                <div className="bg-gray-400 text-white w-[45px] h-[45px] rounded-[20px] flex items-center justify-center absolute bottom-0 left-24">て</div>
                <div className="bg-gray-400 text-white w-[45px] h-[45px] rounded-[20px] flex items-center justify-center absolute bottom-0 left-32">い</div>
                <div className="bg-gray-400 text-white w-[45px] h-[45px] rounded-[20px] flex items-center justify-center absolute bottom-0 left-40">ま</div>
                <div className="bg-gray-400 text-white w-[45px] h-[45px] rounded-[20px] flex items-center justify-center absolute bottom-0 left-48">す</div>
            </div>
        </div>
    )
}

export default Loading;
