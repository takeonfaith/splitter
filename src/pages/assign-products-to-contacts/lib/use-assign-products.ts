import { useCallback, useState } from "react";
import { useBillName } from "../../../entity/bill-name/model";
import { useContacts } from "../../../entity/contacts/model";
import { useProducts } from "../../../entity/product/model";
import { TProduct } from "../../../entity/product/type";
import useTelegram from "../../../hooks/use-telegram";

const useAssignProducts = () => {
  const { tg } = useTelegram();
  const { name } = useBillName();
  const { products } = useProducts();
  const { contacts, chosenContacts, payers } = useContacts();
  const [error, setError] = useState<string | null>(null);
  const [productsUsage, setProductsUsage] = useState(
    products.reduce((acc, el) => {
      acc[el.id] = 0;
      return acc;
    }, {} as Record<string, number>)
  );
  const [currentContact, setCurrentContact] = useState(0);
  const [assignedProducts, setAssignedProducts] = useState(
    chosenContacts.reduce((acc, id) => {
      const contact = contacts.find((c) => c.id === id)!;
      acc[contact.name] = [];
      return acc;
    }, {} as Record<string, { product: TProduct; proportion: number }[]>)
  );

  const currentContactData = contacts.find(
    (c) => c.id === chosenContacts[currentContact]
  );

  console.log(productsUsage);

  const handleChooseProduct = useCallback(
    (product: TProduct) => {
      const alreadyAssigned = !!assignedProducts[
        currentContactData?.name ?? ""
      ].find((el) => el.product.id === product.id);
      let newAssigned = assignedProducts;
      console.log("handleChooseProduct");

      if (alreadyAssigned) {
        newAssigned[currentContactData?.name ?? ""] = newAssigned[
          currentContactData?.name ?? ""
        ].filter((el) => el.product.id !== product.id);
        setProductsUsage({
          ...productsUsage,
          [product.id]: productsUsage[product.id] - 1,
        });
      } else {
        newAssigned[currentContactData?.name ?? ""].push({
          product,
          proportion: 1,
        });

        setProductsUsage({
          ...productsUsage,
          [product.id]: productsUsage[product.id] + 1,
        });
      }

      setAssignedProducts({ ...newAssigned });
    },
    [assignedProducts, currentContactData?.name, productsUsage]
  );

  const handleNextContact = () => {
    setCurrentContact((prev) => prev + 1);
  };

  const handlePrevContact = () => {
    setCurrentContact((prev) => prev - 1);
  };

  const handleSend = () => {
    try {
      const normalizedAssigned = assignedProducts;
      Object.keys(normalizedAssigned).forEach((name) => {
        normalizedAssigned[name].forEach((p) => {
          console.log(p.product.name, productsUsage[p.product.id]);

          const quantity = productsUsage[p.product.id];
          p.proportion = 1 / quantity;
        });
      });
      console.log(normalizedAssigned);

      const data = JSON.stringify({
        billName: name,
        payers,
        list: normalizedAssigned,
      });
      tg.sendData(data);
      tg.close();
    } catch (error) {
      setError(JSON.stringify(error));
    }
  };

  return {
    currentContactData,
    products,
    error,
    assignedProducts,
    handleChooseProduct,
    currentContact,
    handlePrevContact,
    handleNextContact,
    chosenContacts,
    handleSend,
  };
};

export default useAssignProducts;
