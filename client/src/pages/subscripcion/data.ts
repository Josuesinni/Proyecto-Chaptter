import type { CardSubscriptionListTs, CardSubscriptionTs } from "./types";


const beneficiosModoGratuito: CardSubscriptionListTs[] = [
    {
        opcion: "Acceso a la plataforma",
        tipo: true,
    },
    {
        opcion: "Soporte 24/7",
        tipo: false,
    },
    {
        opcion: "Acceso a funciones de prueba",
        tipo: false,
    },
]


const beneficiosModoPremium: CardSubscriptionListTs[] = [
    {
        opcion: "Acceso a la plataforma",
        tipo: true,
    },
    {
        opcion: "Soporte 24/7",
        tipo: true,
    },
    {
        opcion: "Acceso a funciones de prueba",
        tipo: true,
    },
]


export const PlanesList: CardSubscriptionTs[] = [
    {
        tipo:0,
        modo: "Gratuito",
        precio: 0,
        textoBoton: "Empezar",
        beneficios: beneficiosModoGratuito,
    },
    {
        tipo:1,
        modo: "Premium",
        precio: 99.99,
        textoBoton: "Suscribirse",
        beneficios: beneficiosModoPremium,
    },
];

