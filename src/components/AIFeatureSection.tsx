import { CardBody, CardContainer, CardItem } from "./ui/3d-card";
import { useNavigate } from "react-router-dom";

export default function AIFeatureSection() {
  const navigate = useNavigate()
  return (
    <div>
        <div> <h1 className="text-4xl font-bold text-center">AI-Snippet Generator</h1></div>
      <div className="px-4 sm:px-6 lg:px-8 ">
    <CardContainer className="inter-var animate-pulse-glow">
      <CardBody className="bg-black-50 border-2 border-pink-500 w-full max-w-sm sm:max-w-md md:max-w-4xl lg:max-w-6xl h-auto rounded-xl p-4 sm:p-6 md:p-8 mx-auto">

        <CardItem translateZ="100" className="w-full mt-2 sm:mt-4 border-2 border-blue-500 rounded-xl animate-pulse-glow">
          <img
            src="public/chatinterface.png"
            height="1000"
            width="1000"
            className="h-48 sm:h-64 md:h-80 lg:h-96 w-full object-contain rounded-xl group-hover/card:shadow-xl"
            alt="thumbnail"
          />
        </CardItem>
        <div className="flex flex-col sm:flex-row justify-between items-center mt-6 sm:mt-10 md:mt-20 gap-4 sm:gap-0 cursor-pointer">
          <CardItem
            translateZ={20}
            as="a"
            onClick={() => {
              navigate("/signup")
            }}
            target="__blank"
            className="px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-normal dark:text-white text-center"
          >
            Try now →
          </CardItem>
          <CardItem
            translateZ={20}
            as="button"
            onClick={() => {
              navigate("/signup")
            }}
            className="px-3 sm:px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs sm:text-sm font-bold w-full sm:w-auto"
          >
            Sign up
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
    </div>
      </div>
  )
} 