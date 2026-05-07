export type CardSubscriptionListTs = {
    opcion: string;
    tipo: boolean;
};
export interface CardSubscriptionTs {
    tipo: 0 | 1;
    modo: string;
    precio: number;
    textoBoton: string;
    beneficios: CardSubscriptionListTs[];
}