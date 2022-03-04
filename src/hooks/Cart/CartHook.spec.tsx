import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { waitFor, act } from '@testing-library/react';

import { CartProvider, useCart } from '.';

describe('Teste do hook Cart', () => {
  test('Adicionar um produto no localStorage e recuperar esse produto com o getItem', async () => {
    const { result } = renderHook(() => useCart(), {
      wrapper: CartProvider,
    });

    /* Criando um mock pra adiconar no carrinho */
    const itemAddedToCart = {
      id: 1,
      createdAt: 'some_value',
      name: 'Product Test',
      price: 90,
      image: 'image_path',
      stock: 9,
    };

    /* Adicionando o produto no carrinho */
    act(() => {
      result.current.addToCart(itemAddedToCart);
    });

    /* Espero que o item com o nome Product Test esteja no carrinho */
    await waitFor(() => {
      expect(result.current.products[0].name).toEqual('Product Test');
    });

    /* Obter item do armazenamento localStorage */
    jest.spyOn(Storage.prototype, 'getItem').mockImplementation(key => {
      switch (key) {
        case '@ReactUnitTest:cart':
          return JSON.stringify([itemAddedToCart]);

        default:
          return null;
      }
    });

    await waitFor(() => {
      expect(result.current.products[0].name).toEqual('Product Test');
    });
  });
});
