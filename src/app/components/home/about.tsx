import Image from "next/image"

const About = () => {
    return (
        <div className="pt-[140px] pb-[140px]">
            <div className="container flex justify-center">
                <div className="w-full lg:w-[80%]">
                    <h3 className="sm:text-center text-[30px] lg:text-[39px] font-[700] mb-[30px]">誰にだって失敗はあるはず...</h3>
                    <p className="w-full lg:w-[70%] mx-auto mb-[40px] text-[14px] sm:tracking-[0.25rem] leading-6 sm:leading-8">
                        ポートフォリオには、成功作品だけが含まれるわけではありません。確かに成功は素晴らしいですが、失敗にも魅力がたくさん隠されています。
                        私たちは成功ではなく、誰もが経験する「失敗」に焦点を当て、それを皆で共有できるプラットフォームを作りました。
                    </p>
                    <div>
                        <Image src="/images/home/about2.png" width={250} height={200} alt="about" className="mx-auto"/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About