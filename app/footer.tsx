import lottie from "lottie-web";
import { use, RefObject, useEffect, useRef } from "react";

export default function Footer() {
    //useRef
    const lottieRef = useRef<Element>() as RefObject<HTMLDivElement>;
    useEffect(() => {
        lottie.loadAnimation({
            container: lottieRef.current as Element,
            renderer: "svg",
            loop: true,
            autoplay: true,
            //reduce size

            path: "https://lottie.host/289800cd-9c34-4d9c-8552-21b3236489db/VKHEyizxao.json",
        });
    }, []);
    return (
        <div className="flex flex-col items-center justify-center bg-gray-100 p-6 rounded-lg shadow-lg mt-4">
            <h2 className="text-xl  mb-4">
                {" "}
                Made with ❤️ by{" "}
                <a href="https://amanikiruga.github.io/">Amani</a>
            </h2>
            <div className="flex flex-row space-x-4 items-center justify-center">
                <a href="https://www.buymeacoffee.com/amanik">
                    <img src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=&slug=amanik&button_colour=FFDD00&font_colour=000000&font_family=Cookie&outline_colour=000000&coffee_colour=ffffff" />
                </a>
                <div ref={lottieRef} className="w-48"></div>
            </div>
        </div>
    );
}
