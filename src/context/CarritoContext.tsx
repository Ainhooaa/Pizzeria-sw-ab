import React, { createContext, useContext, useState, useEffect } from 'react';

interface ItemCarrito {
  id: string;
  nombre: string;
  ingredientes: string;
  precio: number;
  cantidad: number;
  imagen: string;
  tipo: 'menu' | 'personalizada';
}

interface CarritoContextType {
  items: ItemCarrito[];
  agregarAlCarrito: (item: Omit<ItemCarrito, 'cantidad'>) => void;
  cambiarCantidad: (id: string, delta: number) => void;
  eliminarItem: (id: string) => void;
  vaciarCarrito: () => void;
  total: number;
}

const CarritoContext = createContext<CarritoContextType | undefined>(undefined);

export const useCarrito = () => {
  const context = useContext(CarritoContext);
  if (!context) throw new Error('useCarrito debe usarse dentro de CarritoProvider');
  return context;
};

export const CarritoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<ItemCarrito[]>(() => {
    const guardado = localStorage.getItem('carrito');
    return guardado ? JSON.parse(guardado) : [];
  });

  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(items));
  }, [items]);

  const agregarAlCarrito = (nuevoItem: Omit<ItemCarrito, 'cantidad'>) => {
    setItems(prev => {
      const existe = prev.find(i => i.id === nuevoItem.id);
      if (existe) {
        return prev.map(i =>
          i.id === nuevoItem.id ? { ...i, cantidad: i.cantidad + 1 } : i
        );
      }
      return [...prev, { ...nuevoItem, cantidad: 1 }];
    });
  };

  const cambiarCantidad = (id: string, delta: number) => {
    setItems(prev =>
      prev
        .map(i => (i.id === id ? { ...i, cantidad: i.cantidad + delta } : i))
        .filter(i => i.cantidad > 0)
    );
  };

  const eliminarItem = (id: string) => {
    setItems(prev => prev.filter(i => i.id !== id));
  };

  const vaciarCarrito = () => {
    setItems([]);
  };

  const total = items.reduce((sum, i) => sum + i.precio * i.cantidad, 0);

  return (
    <CarritoContext.Provider
      value={{ items, agregarAlCarrito, cambiarCantidad, eliminarItem, vaciarCarrito, total }}
    >
      {children}
    </CarritoContext.Provider>
  );
};