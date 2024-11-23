// import gsap from "gsap";
// import { useGSAP } from "@gsap/react";
// import { ScrollTrigger } from "gsap/all";
// import { TiLocationArrow } from "react-icons/ti";
// import { useEffect, useRef, useState } from "react";
// import VideoPreview from "./VideoPreview";
// import Button from "./Button";
// gsap.registerPlugin(ScrollTrigger)

// const Hero = () => {
//   const [currentIndex, setCurrentIndex] = useState(1);
//   const [hasClicked, setHasClicked] = useState(false);

//   const [loading, setLoading] = useState(true);
//   const [loadedVideos, setLoadedVideos] = useState(0);

//   const totalVideos = 4;
//   const nextVdRef = useRef(null);

//   const handleVideoLoad = () => {
//     setLoadedVideos((prev) => prev + 1);
//   };

//   useEffect(() => {
//     if (loadedVideos === totalVideos - 1) {
//       setLoading(false);
//     }
//   }, [loadedVideos]);

//   const handleMiniVdClick = () => {
//     setHasClicked(true);

//     setCurrentIndex((prevIndex) => (prevIndex % totalVideos) + 1);
//   };

//   useGSAP(
//     () => {
//       if (hasClicked) {
//         gsap.set("#next-video", { visibility: "visible" });
//         gsap.to("#next-video", {
//           transformOrigin: "center center",
//           scale: 1,
//           width: "100%",
//           height: "100%",
//           duration: 1,
//           ease: "power1.inOut",
//           onStart: () => nextVdRef.current.play(),
//         });
//         gsap.from("#current-video", {
//           transformOrigin: "center center",
//           scale: 0,
//           duration: 1.5,
//           ease: "power1.inOut",
//         });
//       }
//     },
//     {
//       dependencies: [currentIndex],
//       revertOnUpdate: true,
//     }
//   );

//   useGSAP(() => {
//     gsap.set("#video-frame", {
//       clipPath: "polygon(14% 0, 72% 0, 88% 90%, 0 95%)",
//       borderRadius: "0% 0% 40% 10%",
//     });
//     gsap.from("#video-frame", {
//       clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
//       borderRadius: "0% 0% 0% 0%",
//       ease: "power1.inOut",
//       scrollTrigger: {
//         trigger: "#video-frame",
//         start: "center center",
//         end: "bottom center",
//         scrub: true,
//       },
//     });
//   });

//   const getVideoSrc = (index) => `videos/hero-${index}.mp4`;

//   return (
//     <div className="relative h-dvh w-screen overflow-x-hidden">
//       {loading && (
//         <div className="flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-violet-50">
//           {/* https://uiverse.io/G4b413l/tidy-walrus-92 */}
//           <div className="three-body">
//             <div className="three-body__dot"></div>
//             <div className="three-body__dot"></div>
//             <div className="three-body__dot"></div>
//           </div>
//         </div>
//       )}

//       <div
//         id="video-frame"
//         className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75"
//       >
//         <div>
//           <div className="mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg">
//             <VideoPreview>
//               <div
//                 onClick={handleMiniVdClick}
//                 className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100"
//               >
//                 <video
//                   ref={nextVdRef}
//                   src={getVideoSrc((currentIndex % totalVideos) + 1)}
//                   loop
//                   muted
//                   id="current-video"
//                   className="size-64 origin-center scale-150 object-cover object-center"
//                   onLoadedData={handleVideoLoad}
//                 />
//               </div>
//             </VideoPreview>
//           </div>

//           <video
//             ref={nextVdRef}
//             src={getVideoSrc(currentIndex)}
//             loop
//             muted
//             id="next-video"
//             className="absolute-center invisible absolute z-20 size-64 object-cover object-center"
//             onLoadedData={handleVideoLoad}
//           />
//           <video
//             src={getVideoSrc(
//               currentIndex === totalVideos - 1 ? 1 : currentIndex
//             )}
//             autoPlay
//             loop
//             muted
//             className="absolute left-0 top-0 size-full object-cover object-center"
//             onLoadedData={handleVideoLoad}
//           />
//         </div>

//         <h1 className="special-font hero-heading absolute bottom-5 right-5 z-40 text-white">
//           G<b>A</b>MING
//         </h1>

//         <div className="absolute left-0 top-0 z-40 size-full">
//           <div className="mt-24 px-5 sm:px-10">
//             <h1 className="special-font hero-heading text-red-50">
//               v<b>a</b>lor<b>a</b>nt
//             </h1>

//             <p className="mb-5 max-w-64 font-robert-regular text-red-50">
//             A 5v5 character-based tactical shooter
//             </p>

//             <Button
//               id="watch-trailer"
//               title="Watch trailer"
//               leftIcon={<TiLocationArrow />}
//               containerClass="bg-red-500 flex-center gap-1"
//             />
//           </div>
//         </div>
//       </div>

//       <h1 className="special-font hero-heading absolute bottom-5 right-5 text-red-50">
//         G<b>A</b>MING
//       </h1>
//     </div>
//   );
// };

// export default Hero;

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { TiLocationArrow } from "react-icons/ti";
import { useEffect, useRef, useState } from "react";
import VideoPreview from "./VideoPreview";
import Button from "./Button";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadedVideos, setLoadedVideos] = useState(0);

  const totalVideos = 4;
  const videoRefs = useRef(Array(totalVideos).fill(null).map(() => useRef(null)));
  const currentVideoRef = useRef(null);
  const nextVideoRef = useRef(null);

  const handleVideoLoad = () => {
    setLoadedVideos((prev) => prev + 1);
  };

  useEffect(() => {
    if (loadedVideos === totalVideos) {
      setLoading(false);
    }
  }, [loadedVideos]);

  useEffect(() => {
    videoRefs.current.forEach((ref) => {
      if (ref.current) {
        ref.current.play();
      }
    });
  }, []);

  const handleMiniVdClick = () => {
    const nextIndex = (currentIndex % totalVideos) + 1;
    setCurrentIndex(nextIndex);

    const currentVideo = currentVideoRef.current;
    const nextVideo = videoRefs.current[nextIndex - 1].current;

    gsap.set(nextVideo, { visibility: "visible", zIndex: 30, opacity: 0 });
    gsap.to(nextVideo, {
      opacity: 1,
      duration: 1,
      ease: "power1.inOut",
    });
    gsap.to(currentVideo, {
      opacity: 0,
      duration: 1,
      ease: "power1.inOut",
      onComplete: () => {
        gsap.set(currentVideo, { visibility: "hidden", zIndex: 10 });
        currentVideoRef.current = nextVideo;
      },
    });
  };

  useGSAP(() => {
    gsap.set("#video-frame", {
      clipPath: "polygon(14% 0, 72% 0, 88% 90%, 0 95%)",
      borderRadius: "0% 0% 40% 10%",
    });
    gsap.from("#video-frame", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      borderRadius: "0% 0% 0% 0%",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#video-frame",
        start: "center center",
        end: "bottom center",
        scrub: true,
      },
    });
  });

  const getVideoSrc = (index) => `videos/hero-${index}.mp4`;

  return (
    <div className="relative h-dvh w-screen overflow-x-hidden">
      {loading && (
        <div className="flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-violet-50">
          <div className="three-body">
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
          </div>
        </div>
      )}

      <div
        id="video-frame"
        className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75"
      >
        <div className="relative h-full w-full">
          {[...Array(totalVideos)].map((_, index) => (
            <video
              key={index}
              ref={(el) => {
                videoRefs.current[index].current = el;
                if (index === 0) currentVideoRef.current = el;
              }}
              src={getVideoSrc(index + 1)}
              loop
              muted
              playsInline
              className="absolute left-0 top-0 h-full w-full object-cover object-center"
              style={{
                visibility: index === 0 ? "visible" : "hidden",
                zIndex: index === 0 ? 20 : 10,
              }}
              onLoadedData={handleVideoLoad}
            />
          ))}

          <div className="mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg">
            <VideoPreview>
              <div
                onClick={handleMiniVdClick}
                className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100"
              >
                <video
                  src={getVideoSrc((currentIndex % totalVideos) + 1)}
                  loop
                  muted
                  playsInline
                  className="size-64 origin-center scale-150 object-cover object-center"
                />
              </div>
            </VideoPreview>
          </div>
        </div>

        <h1 className="special-font hero-heading absolute bottom-5 right-5 z-40 text-white">
          G<b>A</b>MING
        </h1>

        <div className="absolute left-0 top-0 z-40 size-full">
          <div className="mt-24 px-5 sm:px-10">
            <h1 className="special-font hero-heading text-red-50">
              v<b>a</b>lor<b>a</b>nt
            </h1>

            <p className="mb-5 max-w-64 font-robert-regular text-red-50">
              A 5v5 character-based tactical shooter
            </p>

            <Button
              id="watch-trailer"
              title="Watch trailer"
              leftIcon={<TiLocationArrow />}
              containerClass="bg-red-500 flex-center gap-1"
            />
          </div>
        </div>
      </div>

      <h1 className="special-font hero-heading absolute bottom-5 right-5 text-red-50">
        G<b>A</b>MING
      </h1>
    </div>
  );
};

export default Hero;


