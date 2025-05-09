from django.shortcuts import render, redirect, get_object_or_404
from tienda.models import Producto

def ver_carrito(request):
    carrito = request.session.get('carrito', {})
    productos = []
    total = 0
    for producto_id, cantidad in carrito.items():
        producto = get_object_or_404(Producto, id=producto_id)
        subtotal = producto.precio * cantidad
        total += subtotal
        productos.append({
            'producto': producto,
            'cantidad': cantidad,
            'subtotal': subtotal
        })
    return render(request, 'carrito/carrito.html', {'productos': productos, 'total': total})


def agregar_producto(request, producto_id):
    carrito = request.session.get('carrito', {})
    carrito[str(producto_id)] = carrito.get(str(producto_id), 0) + 1
    request.session['carrito'] = carrito
    return redirect('carrito:ver_carrito')


def eliminar_producto(request, producto_id):
    carrito = request.session.get('carrito', {})
    if str(producto_id) in carrito:
        del carrito[str(producto_id)]
    request.session['carrito'] = carrito
    return redirect('carrito:ver_carrito')


def vaciar_carrito(request):
    request.session['carrito'] = {}
    return redirect('carrito:ver_carrito')
