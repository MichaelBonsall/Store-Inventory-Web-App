export interface Item {
    _id: string;
    item_name: string;
    shelf_location: string;
    count: string;
    price: string;
    category: string;
    image_path: string;
    specifications?: Array<string>;
  }