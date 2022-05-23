export type InvestmentQueryItem = {
  investmentImage_s: string,
  investmentName_t: string
};
export type InvestmentQueryData = {
  component_investment: { items: InvestmentQueryItem[] };
};
