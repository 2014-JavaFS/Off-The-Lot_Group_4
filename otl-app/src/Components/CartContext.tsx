import React, {ReactNode, createContext, useContext, useState} from 'react';

export interface CartItem {
    id: number;
    make: string;
    model: string;
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
            <div className='mt-3 mb-3'>
                <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
                    {children}
                </CartContext.Provider>
            </div>
        );
    };
