export type TFlower = {
  name: string;
  price: number;
  quantity: number;
  bloomDate: Date;
  color: string;
  type: 'Annuals' | 'Perennials' | 'Biennials';
  size: 's' | 'm' | 'l' | 'xl' | 'xxl';
  arrangement: string;
  style: string;
  fragrance:
    | 'rose'
    | 'neroli'
    | 'jasmine'
    | 'geranium'
    | 'lavender'
    | 'ylang-ylang'
    | 'lily of the valley'
    | 'violet and peony';
};
