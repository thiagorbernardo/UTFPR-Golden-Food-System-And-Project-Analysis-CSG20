class Restaurant {
    private _id: string;
    private name: string;
    private city: string;
    private employees: string[];

    constructor(name: string, city: string) {
        this._id = Math.random().toString();
        this.name = name;
        this.city = city;
    }
}


/*
    Um sistema administrativo de uma rede de restaurantes
    O operário do sistema pode:
        - Ver todas as lojas da rede,
        - Ver os pedidos do restaurante
        - Atualizar o status de um pedido no restaurante
        - Ver o cardápio com somente os ingredientes disponiveis
        - Adicionar / Remover receitas de comidas
        - Adicionar / Remover ingredientes
        - Ver / atualizar informações dos funcionários (horas de trabalho)
*/