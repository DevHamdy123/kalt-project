import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// إجبار الخادم على جلب بيانات جديدة دائماً
export const dynamic = "force-dynamic";

// --- تعريف الأنواع (Types) للطلب ---

interface AddToCartRequest {
  productId: string;
  quantity: number;
  size?: string;
}

interface UpdateCartRequest {
  id: string; // هذا هو معرف العنصر داخل السلة (CartItem ID)
  quantity: number;
}

// ==========================================
// 1. جلب بيانات السلة (GET)
// ==========================================
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;

    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    let cart = await prisma.cart.findUnique({
      where: { userId },
      include: {
        items: {
          include: {
            product: {
              include: {
                images: { take: 1 },
              },
            },
          },
        },
      },
    });

    if (!cart) {
      cart = await prisma.cart.create({
        data: { userId },
        include: {
          items: { include: { product: { include: { images: true } } } },
        },
      });
    }

    return NextResponse.json(cart, { status: 200 });
  } catch (error) {
    console.error("Cart GET Error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}

// ==========================================
// 2. إضافة منتج للسلة (POST)
// ==========================================
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;

    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body: AddToCartRequest = await request.json();
    const { productId, quantity, size } = body;

    if (!productId || !quantity) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 },
      );
    }

    const product = await prisma.product.findUnique({
      where: { id: productId },
      select: { stock: true },
    });

    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 },
      );
    }

    let cart = await prisma.cart.findUnique({ where: { userId } });
    if (!cart) {
      cart = await prisma.cart.create({ data: { userId } });
    }

    const existingItem = await prisma.cartItem.findFirst({
      where: {
        cartId: cart.id,
        productId: productId,
        size: size || null,
      },
    });

    const currentQty = existingItem ? existingItem.quantity : 0;

    if (currentQty + quantity > product.stock) {
      return NextResponse.json(
        {
          message: `Cannot add. Available stock is ${product.stock}, you have ${currentQty} in cart.`,
        },
        { status: 400 },
      );
    }

    if (existingItem) {
      await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: currentQty + quantity },
      });
    } else {
      await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId: productId,
          quantity: quantity,
          size: size || null,
        },
      });
    }

    return NextResponse.json(
      { message: "Item added successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Cart POST Error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}

// ==========================================
// 3. تعديل كمية منتج في السلة (PATCH) - مُعدل للحماية
// ==========================================
export async function PATCH(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body: UpdateCartRequest = await request.json();
    const { id, quantity } = body;

    if (!id || quantity < 0) {
      return NextResponse.json({ message: "Invalid data" }, { status: 400 });
    }

    // إذا كان التحديث هو حذف (quantity = 0)، لا نحتاج فحص المخزون
    if (quantity === 0) {
      await prisma.cartItem.delete({ where: { id } });
      return NextResponse.json({ message: "Item removed" }, { status: 200 });
    }

    // جلب المنتج المرتبط بالعنصر للتحقق من المخزون قبل التحديث
    const item = await prisma.cartItem.findUnique({
      where: { id },
      include: { product: { select: { stock: true } } },
    });

    if (!item) {
      return NextResponse.json({ message: "Item not found" }, { status: 404 });
    }

    // التحقق الأمني: هل الكمية الجديدة المطلوبة أكبر من المخزون المتاح؟
    if (quantity > item.product.stock) {
      return NextResponse.json(
        { message: `Only ${item.product.stock} items available.` },
        { status: 400 },
      );
    }

    await prisma.cartItem.update({
      where: { id },
      data: { quantity },
    });

    return NextResponse.json({ message: "Cart updated" }, { status: 200 });
  } catch (error) {
    console.error("Cart PATCH Error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}

// ==========================================
// 4. حذف منتج من السلة (DELETE)
// ==========================================
export async function DELETE(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const itemId = searchParams.get("itemId");

    if (!itemId) {
      return NextResponse.json({ message: "Item ID missing" }, { status: 400 });
    }

    await prisma.cartItem.delete({
      where: { id: itemId },
    });

    return NextResponse.json({ message: "Item removed" }, { status: 200 });
  } catch (error) {
    console.error("Cart DELETE Error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
