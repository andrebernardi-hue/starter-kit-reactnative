export type CategoryId = 'freezer' | 'fridge' | 'produce' | 'dry' | 'canned' | 'spices' | 'oils' | 'bakery';

export type Unit = 'g' | 'kg' | 'ml' | 'L' | 'pcs' | 'tbsp' | 'tsp' | 'cup';

export interface PantryItem {
  id:        string;
  name:      string;
  category:  CategoryId;
  qty:       number;
  unit:      Unit;
  expiry?:   Date | null;
  dateAdded: Date;
  userId:    string;
}

export const CATEGORIES: { id: CategoryId; label: string }[] = [
  { id: 'freezer', label: 'Freezer'    },
  { id: 'fridge',  label: 'Fridge'     },
  { id: 'produce', label: 'Produce'    },
  { id: 'dry',     label: 'Dry goods'  },
  { id: 'canned',  label: 'Canned'     },
  { id: 'spices',  label: 'Spices'     },
  { id: 'oils',    label: 'Oils'       },
  { id: 'bakery',  label: 'Bakery'     },
];
