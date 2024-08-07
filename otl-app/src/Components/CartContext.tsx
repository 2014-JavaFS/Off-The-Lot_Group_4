import React, {ReactNode, createContext, useContext, useReducer, useState} from 'react';

interface CartItem {
    id: number;
    make: string;
    Model: string;
    price: number;
}

interface CartContextProps {
    cart: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (id: number) => void;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
        const [cart, setCart] = useState<CartItem[]>([]);
    
        const addToCart = (item: CartItem) => {
            setCart([...cart, item]);
        };
    
        const removeFromCart = (id: number) => {
            setCart(cart.filter(item => item.id !== id));
        };
    
        return (
            <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
                {children}
            </CartContext.Provider>
        );
    };
