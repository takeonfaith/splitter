import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContacts } from "../../../entity/contacts/model";
import {
  addProduct,
  editProduct,
  removeProduct,
  useProducts,
} from "../../../entity/product/model";
import { TProduct } from "../../../entity/product/type";
import calculateTotalCost from "./calculate-total-cost";
import { v4 as uuid } from "uuid";

const useAddProducts = () => {
  const { products } = useProducts();
  const { payers } = useContacts();
  const [edit, setEdit] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number | undefined>();
  const [quantity, setQuantity] = useState<number | undefined>();
  const nameRef = useRef<HTMLInputElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const isActive = !!name && !!price && !!quantity;
  const totalCost = calculateTotalCost(payers);
  const productsSum = products.reduce((acc, product) => {
    acc += product.price * product.quantity;
    return acc;
  }, 0);
  const isNext = products.length >= 1 && totalCost === productsSum;
  const navigate = useNavigate();

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleChangePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(Number.parseInt(e.target.value));
  };

  const handleChangeQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(Number.parseInt(e.target.value));
  };

  const resetFields = () => {
    setName("");
    setPrice(NaN);
    setQuantity(NaN);
  };

  const handleAddProduct = () => {
    if (isActive) {
      addProduct({
        id: uuid(),
        name,
        price,
        quantity,
      } as TProduct);
    }
    resetFields();
    nameRef.current?.focus();
  };

  const editingStartHandle = (id: string) => {
    const { name, price, quantity } = products.find((p) => p.id === id)!;
    setEdit(id);
    setName(name);
    setPrice(price);
    setQuantity(quantity);
    nameRef.current?.focus();
  };

  const editHandle = () => {
    setEdit(null);
    if (edit && price && quantity) {
      const newProduct = { id: edit, name, price, quantity } as TProduct;
      editProduct({ id: edit, newProduct });
    }
    resetFields();
    nameRef.current?.focus();
  };

  const handleRemove = () => {
    removeProduct(edit as string);
    resetFields();
    setEdit(null);
  };

  const handleGoNext = () => {
    navigate("/assign-products-to-contacts");
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!!edit) {
      return editHandle();
    }

    handleAddProduct();
  };

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [products]);

  return {
    products,
    bottomRef,
    handleSubmit,
    productsSum,
    name,
    nameRef,
    handleChangeName,
    totalCost,
    price,
    handleChangePrice,
    edit,
    editingStartHandle,
    quantity,
    handleChangeQuantity,
    isActive,
    isNext,
    handleGoNext,
    handleRemove,
  };
};

export default useAddProducts;
