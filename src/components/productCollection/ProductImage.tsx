import React from "react";
import { Image, Typography } from "antd";

interface PropType {
  id: string | number;
  size: "large" | "small";
  imageSrc: string;
  price: string | number;
  title: string;
}

export const ProductImage: React.FC<PropType> = ({
  id,
  size,
  imageSrc,
  price,
  title,
}) => {
  const src = `http://robohash.org/${id}`;

  return (
    <>
      {size === "large" ? (
        <Image src={src} height={285} width={490} />
      ) : (
        <Image src={src} height={120} width={240} />
      )}
      <div>
        <Typography.Text type="secondary">{title.slice(0, 25)}</Typography.Text>
        <Typography.Text type="danger" strong>
          ¥ {price} 起
        </Typography.Text>
      </div>
    </>
  );
};
