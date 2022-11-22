const calculateTotalCost = (payers: Record<string, number>) =>
  Object.keys(payers).reduce((acc, name) => {
    acc += payers[name];
    return acc;
  }, 0);

export default calculateTotalCost;
