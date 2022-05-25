export type InvestmentQueryItem = {
  investmentImage_s: string,
  investmentName_t: string
};
export type InvestmentPageQueryData = {
  component_investment: { items: InvestmentQueryItem[] };
};

export type Hero = {
  heading_t: string;
  subheading_t?: string;
  heroImage_s: string;
}

export type HelpPageQueryData = {
  component_helpPageHero: { items: Hero[] };
}
