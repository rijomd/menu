
export type Item = {
    name: string;
    image: string;
    description?: string;
    status: string;
    createdAt?: string;
    sellingPrice: number;
    quantity: number;
    offer: number;
    category: string;
    location: string;
};


export type Category = {
    _id?: string;
    name: string;
    image: any;
    location: string;
    status: string;
    createdAt?: string;
};

