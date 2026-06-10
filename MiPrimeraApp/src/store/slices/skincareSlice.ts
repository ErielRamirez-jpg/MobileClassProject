import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product, ProductReview, Routine } from "../../utils/types/Skincare"


type SkincareState = {
    products: Product[];
    routine: Routine;
};

const initialState: SkincareState ={
    products: [],
    routine: {
        morning: [],
        night: []
    },
};

const skincareSlice = createSlice({
    name: "skincare",
    initialState,
    reducers:{
        addProduct: (state, action: PayloadAction<Omit<Product,"id">>) => {
          const newProduct: Product = {
            ...action.payload,
            id: Date.now().toString(),
          }; 
          state.products.push(newProduct);  
        },
        updateProduct: (state, action: PayloadAction<{id: string, updates: Partial<Product>}>) => {
            const {id, updates} = action.payload;
            //actualizar propiedades por medio de coincidencia de ids --> implementacion salida del context
            // state.products.map((p)=> (p.id === id ? { ...p, ...updates} : p  ))

            //actualizar propiedades por medio posicion del objeto
            const index = state.products.findIndex((p)=> p.id === id);
            if (index !== -1){
                state.products[index] = {...state.products[index], ...updates};
            };

        },
        deleteProduct: (state, action: PayloadAction<string>) =>{
            state.products = state.products.filter((p)=> p.id !== action.payload);
            state.routine.morning = state.routine.morning.filter((pid)=> pid !== action.payload);
            state.routine.night = state.routine.night.filter((pid)=> pid !== action.payload);

        },
        addReview: (state, action:PayloadAction<{productId: string; review: ProductReview}>)=>{
            const {productId, review} = action.payload;
            
            //actualizar propiedad de review por medio posicion del objeto, si este existe en el arreglo products
            const index = state.products.findIndex((p)=> p.id === productId);
            if (index !== -1){
                state.products[index].review = review;
            };
            //to do: asignar tarea para que se puedan crear multiples reviews
        },
        addToRoutine: (state, action: PayloadAction<{type: "morning" | "night"; productId: string}>) => {
            const {type, productId} = action.payload;
            if (!state.routine[type].includes(productId)){
                state.routine[type].push(productId);
            }
        },
        removeFromRoutine: (state, action: PayloadAction<{type: "morning" | "night"; productId: string}>)=>{
            const {type, productId} = action.payload;
            state.routine[type] = state.routine[type].filter((pid) => pid !== productId);
        },
    },
});

export const {
addProduct,
updateProduct,
deleteProduct,
addReview,
addToRoutine,
removeFromRoutine
} = skincareSlice.actions;

export default skincareSlice.reducer;