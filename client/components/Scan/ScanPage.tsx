import { useEffect, useState } from "react";
import BarcodeScanner from "../BarcodeScanner/BarcodeScanner";
import axios from "axios";
import { Button, Text, Loader, Alert, Container } from "@mantine/core";

export interface ProductData {
  name: string;
  brand: string;
  ingredientsList: string;
  allergens: string;
  traces: string;
  frontImageUrl: string;
  ingredientsImageUrl: string;
  barcode: string;
}

function ScanPage() {
  const [product, setProduct] = useState<ProductData | null>(null);
  const [barcode, setBarcode] = useState<string>("Not Found");
  const [scannerVisible, setScannerVisible] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (barcode === "Not Found") {
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          `http://localhost:5000/product/${barcode}`
        );

        const temp: ProductData = {
          name: response.data.product.product_name,
          brand: response.data.product.brands,
          ingredientsList: response.data.product.ingredients_text,
          allergens: getAllergens(response).toString(),
          traces: response.data.product.traces || "None",
          frontImageUrl: response.data.product.image_url,
          ingredientsImageUrl: response.data.product.image_ingredients_url,
          barcode,
        };

        setProduct(temp);
      } catch (error) {
        setError("Error fetching data: Product not found or server error.");
        console.error("Error fetching data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [barcode]);

  const handleScanAgain = () => {
    setScannerVisible(true);
    setProduct(null);
    setBarcode("Not Found");
  };

  function getAllergens(response: any) {
    const ALLERGENS = [
      "milk",
      "egg",
      "fish",
      "shellfish",
      "nut",
      "wheat",
      // "gluten",
      "soy",
      "sesame",
    ];

    const data = response.data.product.allergens;
    const allergensFromIngredients =
      response.data.product.allergens_from_ingredients;
    const allergensFromUser = response.data.product.allergens_from_user;
    const ingredientsText = response.data.product.ingredients_text;

    const uniqueAllergens = new Set<string>();

    ALLERGENS.forEach((item) => {
      if (
        (data && Array.isArray(data) && data.includes(item)) ||
        (allergensFromIngredients &&
          Array.isArray(allergensFromIngredients) &&
          allergensFromIngredients.includes(item)) ||
        (allergensFromUser &&
          Array.isArray(allergensFromUser) &&
          allergensFromUser.includes(item)) ||
        (ingredientsText &&
          typeof ingredientsText === "string" &&
          ingredientsText.includes(item))
      ) {
        uniqueAllergens.add(item);
      }
    });

    console.log(uniqueAllergens);
    return Array.from(uniqueAllergens);
  }

  return scannerVisible ? (
    <Container>
      <BarcodeScanner
        width={500}
        height={500}
        onUpdate={(err, result: any) => {
          if (result) {
            setBarcode(result.text);
            setScannerVisible(false);
          } else {
            setBarcode("Not Found");
            console.error(err);
          }
        }}
      />
    </Container>
  ) : (
    <>
      {loading && <Loader />}
      {error && <Alert color="red">{error}</Alert>}
      {product ? (
        <Container>
          <Text>Product Name: {product.name}</Text>
          <Text>Brand: {product.brand}</Text>
          <Text>Ingredients: {product.ingredientsList}</Text>
          <Text>Allergens: {product.allergens}</Text>
          <Text>Traces: {product.traces}</Text>
          <Text>Barcode: {product.barcode}</Text>
          {product.frontImageUrl && (
            // eslint-disable-next-line jsx-a11y/img-redundant-alt
            <img src={product.frontImageUrl} alt={`${product.name} image`} />
          )}
          {product.ingredientsImageUrl && (
            // eslint-disable-next-line jsx-a11y/img-redundant-alt
            <img
              src={product.ingredientsImageUrl}
              alt={`${product.name} image`}
            />
          )}
          <br />
          <Button onClick={handleScanAgain}>Scan Again</Button>
        </Container>
      ) : (
        <Container>
          {!loading && <Text>{barcode} - Product not found</Text>}
        </Container>
      )}
    </>
  );
}

export default ScanPage;
