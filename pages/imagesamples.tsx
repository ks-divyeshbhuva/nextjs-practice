import Image from "next/image";

const ImageSamples = () => {
  const images = ["1", "2", "3", "4", "5"];
  const ImgUrl = "https://asia.olympus-imaging.com/content/000107506.jpg";

  return (
    <div>
      <Image
        loader={() => ImgUrl}
        src={ImgUrl}
        alt="sample-image"
        width={280}
        height={480}
      />
      {images.map((ele) => {
        return (
          <div key={ele}>
            <Image
              src={`/${ele}.jpg`}
              loading="lazy"
              alt="sample-image"
              width={280}
              height={480}
            />
          </div>
        );
      })}
    </div>
  );
};

export default ImageSamples;
