interface IMenuItem {
  to?: string;
  icon?: string;
  label: string;
  items?: IMenuItem[];
  visible?: boolean;
  target?: string;
  class?: string;
  url?: string;
  disabled?: boolean,
  command?: ({ originalEvent, item }: { originalEvent: MouseEvent, item: IMenuItem }) => void,
  soon?: boolean
}

export type { IMenuItem };
