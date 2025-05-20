
export interface AlmanaxResponse {
  day: number;
  month: number;
  year: number;
  bonus: AlmanaxBonus;
  offering: AlmanaxOffering;
}

export interface AlmanaxBonus {
  type: string;
  description: string;
}

export interface AlmanaxOffering {
  item: {
    id: number;
    name: string;
    image_url: string;
    ankama_id: number;
    item_subtype_id: number;
    level: number;
  };
  quantity: number;
}

export interface DateParams {
  day: number;
  month: number;
  year: number;
}
