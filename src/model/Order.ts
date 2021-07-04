class Order {
    private _id: string;
    private restaurantId: string;
    private createdAt: Date;
    private status: OrderStatus;
    private options: Food[];
    private cost: number;
    private shipping: number;
}