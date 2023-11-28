import WelcomePage from "@/components/home/WelcomePage";
import Image from "next/image";
export default function Home(): JSX.Element {
  return (
    <>
      <WelcomePage />
      <footer className="h-44 bg-slate-500 py-4">
        <h4 className="text-slate-50 font-bold text-2xl text-center">
          Contact us
        </h4>
        <ul className="flex mx-auto justify-evenly mt-4">
          <li>
            <a href="" target="_blank">
              <Image
                src={"ui-images/fb.svg"}
                width={50}
                height={50}
                alt={"social media icons"}
              />
            </a>
          </li>
          <li>
            <a href="" target="_blank">
              <Image
                src={"ui-images/github.svg"}
                width={50}
                height={50}
                alt={"social media icons"}
              />
            </a>
          </li>
          <li>
            <a href="" target="_blank">
              <Image
                src={"ui-images/linkedin.svg"}
                alt={"social media icons"}
                width={50}
                height={50}
              />
            </a>
          </li>
        </ul>
      </footer>
    </>
  );
}
