interface IMenuItem {
  to?: string;
  icon?: string;
  label: string;
  items?: IMenuItem[];
  visible?: boolean;
  target?: string;
  class: string;
  url: string;
}

export type { IMenuItem };
