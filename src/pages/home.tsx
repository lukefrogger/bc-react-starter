import React, { useEffect, useState } from "react";
import {
  getBrandName,
  getProduct,
  getProductImages,
  getCustomFields,
  getStorefront,
} from "../api/service";
import { BCStorefront } from "../api/storefront";
import { Core, Widgets, Utilities } from "@jingtribe/test-bc-react-components";
import A11yDialog from "mt-a11y-dialog";

const style: any = {};

export interface Measurements {
  weight: number;
  width: number;
  height: number;
  depth: number;
}

interface Product extends Measurements {
  id: string;
  name: string;
  type?: string;
  price: number;
  sale_price: number;
  sku: string;
  description: string;
  inventory_warning_level: number;
  condition: string;
  reviews_count: number;
  reviews_rating_sum: number;
}

interface Brand {
  name: string;
}

interface Image {
  meta: string;
  url_standard: string;
}

const data = { id: 119 };
const brandData = { id: 39 };
const imageQuery = 119;

const Home = () => {
  const [hasError, setErrors] = useState(false);
  const [product, setProducts] = useState({} as Product);
  const [brand, setBrands] = useState({} as Brand);
  const [image, setImages] = useState({} as Image);
  const [specs, setSpecs] = useState([] as string[]);
  const [store_config, setConfig] = useState({});

  useEffect(() => {
    getStorefront()
      .then((res) => setConfig(BCStorefront(res)))
      .catch((err) => console.error(err));

    getProduct(data)
      .then((res) => setProducts(res as Product))
      .catch((err) => {
        setErrors(err);
        console.error(hasError);
      });

    getBrandName(brandData) // TODO: @vinny Need to pass in product.brand_id here.
      .then((res) => setBrands(res || {}))
      .catch((err) => {
        setErrors(err);
        console.error(err);
      });

    getProductImages(imageQuery)
      .then((res) => setImages(res || {}))
      .catch((err) => {
        setErrors(err);
        console.log(hasError);
      });

    getCustomFields(data)
      .then((res: any) => setSpecs(res || []))
      .catch((err) => {
        setErrors(err);
        console.log(hasError);
      });
  }, [hasError]);

  const dialogTrigger = document.querySelector(
    '[data-js="trigger-bc-quickview"]:not(.initialized)'
  );

  if (dialogTrigger) {
    dialogTrigger.classList.add("initialized");
    const dialogOptions = {
      trigger: [dialogTrigger],
      closeButtonClasses: style.a11YDialogCloseButton,
      contentClasses: style.a11YDialogContent,
      overlayClasses: style.a11YDialogOverlay,
      wrapperClasses: style.a11YDialog,
      effect: "fade",
    };

    new A11yDialog(dialogOptions);
  }

  return (
    <div>
      <div className={style.bcComponent}>
        <h3>Product Title Component</h3>
        <Core.ProductTitle
          tag="h1"
          classes="bc-example-product-title"
          styles={{}}
          text={product.name}
          dataAttributes={{
            "data-title": product.name,
            "aria-label": product.type,
          }}
        />
      </div>

      <div className={style.bcComponent}>
        <h3>Product Price Component</h3>
        <Core.ProductPrice
          tag="div"
          tagID={product.id}
          classes="bc-example-price"
          currencySettings={store_config}
          price={product.price}
          salePrice={product.sale_price}
          hasSalePrice={product.sale_price !== 0}
        />
      </div>

      <div className={style.bcComponent}>
        <h3>Product Condition Component</h3>
        <Core.ProductCondition
          tag="span"
          text="Used"
          styles={{
            "background-color": "silver",
            color: "white",
            padding: "4px 8px",
          }}
        />
      </div>

      <div className={style.bcComponent}>
        <h3>Product SKU Component</h3>
        <Core.ProductSKU
          tag="span"
          classes="bc-example-sku"
          styles={{
            background: "teal",
            color: "white",
            padding: "4px 8px",
          }}
          text={product.sku}
        />
      </div>

      <div className={style.bcComponent}>
        <h3>Product Brand Component</h3>
        <Core.Brand
          tag="span"
          classes="bc-example-brand"
          styles={{ "font-weight": "700", color: "#555" }}
          text={brand.name}
        />
      </div>

      <div className={style.bcComponent}>
        <h3>Product Description Component</h3>
        <Core.Description
          tag="div"
          classes="bc-example-brand"
          styles={{ "font-size": "14px", "line-height": "18px" }}
          text={product.description}
        />
      </div>

      <div className={style.bcComponent}>
        <h3>Product Image Component</h3>
        <Core.ProductImage
          src={image.url_standard}
          altText={image.meta}
          wrapperClasses="bc-image-wrapper-example"
          classes="bc-image-example"
          styles={{
            background: "#efefef",
            border: "2px solid lightgrey",
          }}
        />
      </div>

      <div className={style.bcComponent}>
        <h3>Product Specs Component</h3>
        <Core.ProductSpecs
          tag="ul"
          classes="bc-example-specs"
          styles={{ "font-size": "18px", "line-height": "22px" }}
          textObject={product}
          customFields={specs}
        />
      </div>

      <div className={style.bcComponent}>
        <h3>Product Inventory Level Component</h3>
        <Core.ProductInventory
          tag="div"
          classes="bc-example-inventory-level"
          styles={{}}
          showInventoryLevel={true}
          inventoryLevel={8}
          showWarning={true}
          inventoryWarningLevel={product.inventory_warning_level}
          warningMessage={`${product.inventory_warning_level} remaining in stock. More stock due in 2 weeks.`}
        />
      </div>

      <div className={style.bcComponent}>
        <h3>Notifications</h3>
        <Utilities.Notification
          message="Congrats! This was successful."
          type="success"
          styles={{ "margin-bottom": "12px" }}
        />

        <Utilities.Notification
          message="This in just more info about what happened."
          type="info"
          styles={{ "margin-bottom": "12px" }}
        />

        <Utilities.Notification
          message="Uh oh. We have a problem here"
          type="error"
          styles={{ "margin-bottom": "12px" }}
        />

        <Utilities.Notification
          message="Warning! You should probably address this."
          type="warning"
          styles={{ "margin-bottom": "12px" }}
        />
      </div>

      <h1>UI/Widget Components</h1>

      <div className={style.bcComponent}>
        <h3>Product Card Component</h3>
        <Widgets.ProductCard
          product={product}
          image={image}
          brand={brand}
          currencySettings={store_config}
          className="bc-product-card--example"
          cardStyles={{ "max-width": "33.3333%" }}
        />
      </div>

      <div className={style.bcComponent}>
        <h3>Product Grid Component</h3>
        <Widgets.ProductGrid cardStyles={{}}>
          <Widgets.ProductCard
            product={product}
            image={image}
            brand={brand}
            currencySettings={store_config}
          />
          <Widgets.ProductCard
            product={product}
            image={image}
            brand={brand}
            currencySettings={store_config}
          />
          <Widgets.ProductCard
            product={product}
            image={image}
            brand={brand}
            currencySettings={store_config}
          />
          <Widgets.ProductCard
            product={product}
            image={image}
            brand={brand}
            currencySettings={store_config}
          />
          <Widgets.ProductCard
            product={product}
            image={image}
            brand={brand}
            currencySettings={store_config}
          />
          <Widgets.ProductCard
            product={product}
            image={image}
            brand={brand}
            currencySettings={store_config}
          />
        </Widgets.ProductGrid>
      </div>

      <div className={style.bcComponent}>
        <h3>Product Detail Page (PDP) Component</h3>
        <Widgets.ProductDetailPage
          product={product}
          specs={specs}
          image={image}
          brand={brand}
          currencySettings={store_config}
        />
      </div>

      <div className={style.bcComponent}>
        <h3>Product QuickView Component</h3>

        <button
          data-js="trigger-bc-quickview"
          data-content="bc-quickview-content"
        >
          Product QuickView Demo
        </button>
        <script data-js="bc-quickview-content" type="text/template">
          <Widgets.ProductQuickView
            product={product}
            image={image}
            brand={brand}
            currencySettings={store_config}
          />
        </script>
      </div>
    </div>
  );
};

export default Home;
