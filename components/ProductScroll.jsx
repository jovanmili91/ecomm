import React from "react";
import Link from "next/link";

import { urlFor } from "../lib/client";

function ProductScroll({ product: { image, slug, name, price } }) {
  return (
    <div>
      <Link href={`/product/${slug.current}`}>
        <div className="media-element">
          <img
            src={urlFor(image && image[0])}
            width={250}
            height={250}
            alt=""
          />
          <p>{name}</p>
          <p>${price}</p>
        </div>
      </Link>
    </div>
  );
}

export default ProductScroll;
